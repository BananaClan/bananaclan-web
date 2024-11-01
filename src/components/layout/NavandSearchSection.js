import React from 'react'
import { SearchBar } from '../common/SearchBar'
import { NavBar } from '../common/NavBar'

export const NavandSearchSection = () => {
  return (
    <div className='flex flex-col h-[124px] gap-6 mx-10 '>
        <SearchBar/>
        <NavBar/>
    </div>
  )
}
