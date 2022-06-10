import React from 'react'
import Tag from '../tag/Tag'
import './header.css'

export default function Header() {
   return (
      <div className='header'>
         <>
            <input placeholder='Search here...' type='text'
               className='headerSearchBar' />
            <div className="headerTags">
               <Tag />
               <Tag />
               <Tag />
               <Tag />
               <Tag />
               <Tag />
               <Tag />
               <Tag />
               <Tag />
               <Tag />
               <Tag />
               <Tag />
               <Tag />
               <Tag />
               <Tag />
            </div>
         </>
      </div>
   )
}
