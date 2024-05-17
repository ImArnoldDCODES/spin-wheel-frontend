import React from 'react'

export default function Navbar() {
  return (
        <main className='flex flex-col w-[20%] h-[full] bg-[#FFA500]'>
            <ul className='flex flex-col gap-10 mt-20'>
                <li className='bg-[#F5F5DC] py-1 px-2 ml-2 rounded-l cursor-pointer'>Dashboard</li>
                <li className='bg-[#F5F5DC] py-1 px-2 ml-2 rounded-l cursor-pointer'>Create</li>
            </ul>
            <h5 className='text-white mt-auto ml-auto mb-[1rem] mr-[1rem] cursor-pointer'>Logout</h5>
        </main>
  )
}
