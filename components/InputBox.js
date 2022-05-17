import { useSession } from "next-auth/react"
import Image from "next/image";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useRef } from "react";
import { db, storage } from '../firebase';
import firebase from "firebase/compat/app";
import { useState } from "react";

const InputBox = () => {
  const {data:session} = useSession();
  const inputRef = useRef()
  const filePickRef = useRef()
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = e => {
      e.preventDefault();
      if(inputRef.current.value.trim()=="") return;
      
      db.collection('posts').add({
          message: inputRef.current.value,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(doc => {
          if(imageToPost){
              // funky upload stuffs
              const uploadTask = storage.ref(`posts/${doc.id}`).putString(imageToPost, 'data_url');
              removeImage();
              uploadTask.on('state_change', null, error => console.error(error), () => {
                  // When the upload is complete
                  storage.ref(`posts`).child(doc.id).getDownloadURL().then(url => {
                      db.collection('posts').doc(doc.id).set({
                          postImage:url
                      }, {merge:true})
                  })
              }) 
          }
      })

      inputRef.current.value = "";
  }

  const addImageToPost = (e) => {
      const reader = new FileReader();
      if(e.target.files[0]){
          reader.readAsDataURL(e.target.files[0])
      }

      reader.onload = (readerEvent) => {
          setImageToPost(readerEvent.target.result)
      }
  }

  const removeImage = () => {
      setImageToPost(null);
  }

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
        <div className="flex space-x-4 p-4 items-center">
            <Image
            className="rounded-full"
            width={40}
            height={40}
            layout="fixed"
            src={session.user.image}
            />
            <form className="flex flex-1">
                <input className="rounded-full bg-gray-100 flex-grow px-5 h-12 focus:outline-none" type="text" ref={inputRef} placeholder={`What's on you mind, ${session.user.name}?`}/>
            <button hidden onClick={sendPost} type="submit"></button>
            </form>
            {imageToPost && (
                <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                    <img className="h-10 object-contain" src={imageToPost}/>
                    <p className="text-xs text-red-500 text-center">Remove</p>
                </div>
            )}
        </div>
        <div className="flex justify-evenly p-3 border-t">
            <div className="inputIcon">
             <VideoCameraIcon className="h-7 text-red-500"/>
             <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
            </div>
            <div onClick={() => filePickRef.current.click()} className="inputIcon">
            <CameraIcon className="h-7 text-green-400"/>
             <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
             <input ref={filePickRef} type="file" onChange={addImageToPost} hidden/>
            </div>
            <div className="inputIcon">
            <EmojiHappyIcon className="h-7 text-yellow-300"/>
             <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
            </div>
        </div>
    </div>
  )
}

export default InputBox