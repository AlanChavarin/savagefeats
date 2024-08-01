'use client'
import { ReactNode } from "react"
import { useState, useRef, useEffect } from "react"

function LazyComponentWrapper({children}: {children: ReactNode}) {

    const [seen, setSeen] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setSeen(true)
              observer.disconnect()
            }
          },
          {
            rootMargin: "10px",
          },
        )
    
        if (ref.current) {
          observer.observe(ref.current)
        }
    
        return () => {
          if (observer.unobserve && ref.current) {
            observer.unobserve(ref.current)
          }
        }
      }, [])

  return (
    <div ref={ref}>
        {seen && children}
    </div>
  )

}
export default LazyComponentWrapper