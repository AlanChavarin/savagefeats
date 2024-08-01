'use client'
import Image from "next/image"
import { useEffect, useState } from "react"

function HomePageHeroBackground2() {
  const [position, setPosition] = useState<number>(0)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.innerWidth > 600){
        setPosition(window.scrollY * .5)
      } else {
        setPosition(0)
      }
    })
  }, [])

  return (
    <div className="h-full w-full absolute z-[-1] top-0 overflow-hidden">
      <div className='h-[130%] w-[100%] relative' style={{top: position-128}}>
        <Image 
          alt="background Image"
          src={'/mulch.jpg'}
          fill
          sizes="100%"
          className={`object-cover object-top`}
          placeholder="blur"          
          blurDataURL={'/mulchBlur.jpg'}
        />
      </div>
    </div>
  )
}
export default HomePageHeroBackground2