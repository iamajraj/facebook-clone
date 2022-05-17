import Image from 'next/image'
import React from 'react'

const StoryCard = ({name, src, profile}) => {
  return (
    <div className='relative h-14 w-14 md:w-20 md:h-20 lg:h-56 lg:w-32 cursor-pointer p-3 transition duration-200 ease-in hover:scale-105 hover:animate-pulse'>
    <Image
    className='absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10'
    src={profile}
    width={40}
    height={40}
    layout="fixed"
    objectFit='cover'
    />
    <Image
    className='object-cover filter brightness-75 rounded-full lg:rounded-3xl'
    src={src}
    layout="fill"
    />
    <p className='absolute w-full bottom-3 px-2 left-0 text-base text-center text-white font-semibold overflow-hidden text-ellipsis whitespace-nowrap opacity-0 lg:opacity-100'>{name}</p>
    </div>
  )
}

export default StoryCard