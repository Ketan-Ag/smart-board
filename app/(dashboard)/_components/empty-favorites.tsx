import Image from 'next/image'
import React from 'react'

const EmptyFavorites = () => {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
        <Image src="/logo.svg" height={140} width={140} alt="Empty"/>
        <h2 className='text-2xl font-semibold mt-6'>
            No favorite boards!
        </h2>
        <p className='text-muted-foreground text-sm mt-2'>
            Try favoriting a board
        </p>
    </div>
  )
}

export default EmptyFavorites