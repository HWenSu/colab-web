"use client"
import { useRef, useState, useEffect } from 'react'

const CustomCursor = ( { active, cursorText } ) => {
  const cursorRef = useRef(null)

  useEffect(()=> {
    const moveCursor = (e) => {
      const cursor = cursorRef.current
      if ( cursor ) {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  if (!active) return

  return (
    <div
      ref={cursorRef}
      className={`w-4 h-4 rounded-full bg-black/80 text-white text-[0.3rem]  flex items-center justify-center pointer-events-none fixed z-[9999] scale-[3] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
    >
      {cursorText}
    </div>
  );
}

export default CustomCursor