import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionSetQuery } from '../../redux/action/queryAction'
import { actionFetchTags, actionSetSelectedTags } from '../../redux/action/tagsAction'
import Tag from '../tag/Tag'
import './header.css'

export default function Header() {
   const tags = useSelector(state => state.tags)
   const query = useSelector(state => state.query)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(actionFetchTags())
   }, [])

   const handleOnTagClick = (tag) => {
      dispatch(actionSetSelectedTags(tag))
   }

   const handleOnQuery = (event) => {
      dispatch(actionSetQuery(event.target.value))
   }

   return (
      <div className='header'>
         <>
            <input placeholder='Search here...' type='text'
               className='headerSearchBar' 
               onChange={handleOnQuery} />
            <div className="headerTags">
               {tags.map(tag => (
                  <Tag tag={tag} key={tag.tag} onClick={handleOnTagClick} />
               ))}
            </div>
         </>
      </div>
   )
}
