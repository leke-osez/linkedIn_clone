import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { handlePostState } from "../atoms/postAtom";

function Form() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);

  const uploadPost = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        input,
        photoUrl,
        username: session?.user?.name,
        email: session?.user?.email,
        userImg: session?.user?.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setHandlePost(true);
    setModalOpen(false);
  };

  return (
    <div>
      <form className="flex flex-col relative space-y-2 text-black/80 dark:textk-white/75">
        <textarea
          rows="4"
          placeholder="What do you want to talk about?"
          className="bg-transparent focus:outline-none focus:mt-2 dark:text-white/75 dark:placeholder-white/75"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add a photo URL (optional)"
          className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:text-white/75 dark:placeholder-white/60"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <button
          className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
          disabled={!input.trim() && !photoUrl.trim()}
          type="submit"
          onClick={uploadPost}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Form;
