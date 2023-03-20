import { modalState } from '@/atoms/modalAtom';
import Coment from '@/components/Coment';
import Login from '@/components/Login';
import Modal from '@/components/Modal';
import Post from '@/components/Post';
import Sidebar from '@/components/Sidebar';
import Widgets from '@/components/Widgets';
import { db } from '@/firebase';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getProviders, getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRecoilState } from 'recoil';



const PostPage = () => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [post, setPost] = useState<any>();
    const [comments, setComments] = useState<any>([]);
    const router = useRouter();
    const id:any = router.query.id;
  
  
    useEffect(
      () =>
        onSnapshot(doc(db, "posts", id), (snapshot:any) => {
          setPost(snapshot.data());
        }),
      [db]
    );
  
    useEffect(
      () =>
        onSnapshot(
          query(
            collection(db, "posts", id, "comments"),
            orderBy("timestamp", "desc")
          ),
          (snapshot:any) => setComments(snapshot.docs)
        ),
      [db, id]
    );
  
    if (!session) return <Login />;
  
    return (
      <div>
        <Head>
          <title>
            {post?.username} on Twitter: "{post?.text}"
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
          <Sidebar />
          <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
            <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
              <div
                className="flex items-center justify-center hoverEffect w-9 h-9 xl:px-0"
                onClick={() => router.push("/")}
              >
                <AiOutlineArrowLeft className="h-5 text-white" />
              </div>
              Tweet
            </div>
  
            <Post id={id} post={post} postPage />
            {comments.length > 0 && (
              <div className="pb-72">
                {comments.map((comment:any) => (
                  <Coment key={comment.id} id={comment.id} comment={comment.data()} />
                ))}
              </div>
            )}
          </div>
          <Widgets/>
  
          {isOpen && <Modal />}
        </main>
      </div>
    );
  }
  
export default PostPage;
  
export async function getServerSideProps(context: any){
  const trendingResults = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonplaceholder.typicode.com/photos").then(
    (res) => res.json()
  );

  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  }
}