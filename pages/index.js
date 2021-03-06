import Head from 'next/head';
import {signOut} from 'next-auth/react'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Feed from '../components/Feed'
import {getSession,useSession} from 'next-auth/react'
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Modal from '../components/Modal';
import { useRecoilState } from 'recoil';
import { modalState, modalTypeState } from '../atoms/modalAtom';
import { connectToDatabase } from '../util/mongodb';
import Widgets from '../components/Widgets'

export default function Home({posts, articles}) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);  
  const router = useRouter()
  const {status} = useSession({
    required: true,
    onUnauthenticated(){
      router.push('/home')
    }
  })
  console.log(articles)
  return (

    <div className = 'bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6'>
      <Head>
        <title>feed | LinkedIn</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>

      <main className = 'flex justify-center gap-x-5 sm:px-12'>
        <div className = 'flex flex-col md:flex-row gap-5'>
          {/* sidebar */}
          <SideBar/>

          {/* feed */}
          <Feed posts = {posts}/>
          <Widgets articles = {articles}/>
        </div>
        <AnimatePresence>
            {modalOpen && <Modal handleClose={()=> setModalOpen(false)} type = {modalType} />}
        </AnimatePresence>
        <div>
          
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);

  if(!session){
    return{
      redirect:{
        permanent: false,
        destination: '/home'
      }
    }
  }

  //Get posts on SSR
  const {db} = await connectToDatabase()
  const posts = await db.collection("posts")
                  .find()
                  .sort({timestamp:-1})
                  .toArray()

  //Get Google News API

  const results = await fetch( `https://newsapi.org/v2/top-headlines?country=ng&apiKey=${process.env.NEWS_API_KEY}` ).then((res) => res.json())

  return {
    props: {
      session, 
      articles: results.articles,
      posts: posts.map((post)=>({
        _id : post._id.toString(),
        email : post.email,
        username : post.username,
        photoUrl : post.photoUrl,
        input: post.input,
        createdAt : post.createdAt,

      }))
    }
  }
}
