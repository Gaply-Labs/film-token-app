import { Image } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <Link href={"/"} className='font-bold text-lg tracking-widest text-white uppercase'>
        <Image src='/images/logo.png' className='max-w-[140px]' width={"100%"} alt='Cinemania' />
    </Link>
  )
}
