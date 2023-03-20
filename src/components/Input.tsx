import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineGif } from 'react-icons/ai';
import { BsEmojiSmile, BsImage } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiBarChart2Line } from 'react-icons/ri';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import emojiData from '@emoji-mart/data';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Picker  from '@emoji-mart/react';

const Input = () => {

    const [loading, setLoading] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);   
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const {data: session} = useSession();

    const addImageToPost = (e: any) => {
        const reader = new FileReader();
        
        if (!e.target.files) return;
        if (e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target?.result)
        }
    }

    const sendPost = async () => {
        if(loading) return;

        setLoading(true);

        const docRef = await addDoc(collection(db, "posts"),{
            id: session?.user?.uid,
            username: session?.user?.name,
            userImg: session?.user?.image,
            tag: session?.user?.tag,
            text: input,
            timestamp: serverTimestamp()
        })

        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        if(selectedFile){
            await uploadString(imageRef, selectedFile, "data_url")
            .then(async() => {
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, 'posts', docRef.id), {
                    image: downloadURL
                })
            })
        }

        setLoading(false)
        setInput("")
        setSelectedFile(null)
        setShowEmojis(false)
    }

    const addEmoji = (e: { unified: string; }) => {
        let sym = e.unified.split("-")
        let codesArray: any[] = []
        sym.forEach((el: any ) => codesArray.push("0x" + el))
        let emoji = String.fromCodePoint(...codesArray)
        setInput(input + emoji)
    }

  return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3  ${loading && "opacity-60"}`}>
        <img src={session?.user?.image!} alt="" className='object-contain w-12 h-12 rounded-full'/>
        <div className="w-full">
            <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                <textarea 
                 rows={2}
                 className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]" 
                    value={input} placeholder="What's happening?" onChange={(e) => setInput(e.target.value)}/>
                {selectedFile && (
                    <div className='relative mb-4'>
                        <div className='absolute w-8 h-8 bg-[#15181c] hover:[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer' onClick={() => setSelectedFile(null)}>
                            <AiOutlineClose className='h-5 text-white' />
                        </div>

                        <img
                            src={selectedFile}
                            alt=""
                            className='object-contain rounded-2xl max-h-80' />
                    </div>
                  )}
               
            </div>
            {!loading && (
                     <div className="flex items-center justify-between pt-2.5">
                          <div className="flex items-center">
                            <label  className="icon"  htmlFor="file">
                                <BsImage className='text-[#1d9bf0] h-[22px]'/>
                                <input type="file" name="file" id="file" hidden onChange={(e)=>addImageToPost(e)} />
                            </label>
                            <div className='icon'>
                                <AiOutlineGif className='text-[#1d9bf0] h-[22px]' />
                            </div>
                            <div className="icon rotate-90">
                                <RiBarChart2Line className='text-[#1d9bf0] h-[22px]'/>
                            </div>
                            <div className="icon">
                                <BsEmojiSmile className='text-[#1d9bf0] h-[22px]' onClick={() => setShowEmojis(!showEmojis)}/>
                            </div>
                            <div className="icon">
                                <IoCalendarNumberOutline className="text-[#1d9bf0] h-[22px]" />
                            </div>
                            <div className="icon">
                                <HiOutlineLocationMarker className="text-[#1d9bf0] h-[22px]" />
                            </div>
                            
                        </div>

                        <button
                            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                            disabled={!input.trim() && !selectedFile}
                            onClick={sendPost}
                         >
                            Tweet
                        </button>
                    </div>
                )}

                {showEmojis && (
                    <div className='absolute mt-[10px] -ml-[40px] max-w-[320px] rounded-[20px]'>
                        <Picker onEmojiSelect={addEmoji} data={emojiData} theme="dark" />
                    </div>
                )}
        </div>
    </div>
  )
}

export default Input