import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import Feed from '@/components/Feed'
import { useSession } from 'next-auth/react';
import Login from '@/components/Login';
import Modal from '@/components/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '@/atoms/modalAtom';
import Widgets from '@/components/Widgets';




export default function Home() {

  const {data: session} = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  if (!session) return <Login/>
  
  return (
    <div className=''>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-black min-h-screen flex max-w-[1500px] max-auto'>
          <Sidebar/>
          <Feed/>
          <Widgets />

          {isOpen && <Modal />}
      </main>
      
    </div>
  )
}



