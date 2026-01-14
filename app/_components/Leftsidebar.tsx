"use client";

import Link from 'next/link'
import React from 'react'

const Leftsidebar = () => {
  return (
    <div className="rounded-md shadow-sm flex flex-col gap-1 *:cursor-pointer w-80 mx-auto">
      <Link href={"/"}
        className="mt-3 hover:bg-sky-400 hover:text-white py-2 px-4 rounded-md"
      >Feeds</Link>
      <Link href={"/notes"}
        className="mt-3 hover:bg-sky-400 hover:text-white py-2 px-4 rounded-md"
      >Notes</Link>
      <Link href={"/folders"}
        className="mt-3 hover:bg-sky-400 hover:text-white py-2 px-4 rounded-md"
      >Folders</Link>
       <Link href={"/photos"}
        className="mt-3 hover:bg-sky-400 hover:text-white py-2 px-4 rounded-md"
      >Photos</Link>
       <Link href={"/invitations"}
        className="mt-3 hover:bg-sky-400 hover:text-white py-2 px-4 rounded-md"
      >Invitations</Link>
       <Link href={"/collaborations"}
        className="mt-3 hover:bg-sky-400 hover:text-white py-2 px-4 rounded-md"
      >Collaborations</Link>
 </div>
  )
}

export default Leftsidebar