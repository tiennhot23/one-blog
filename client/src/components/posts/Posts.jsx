import Post from '../post/Post'
import './posts.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionFetchPosts } from '../../redux/action/action'

export default function Posts() {

   const posts = useSelector(state => state.posts)
   const query = useSelector(state => state.query)
   const tags = useSelector(state => state.tags)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(actionFetchPosts({ query: query, tags: tags.flatMap(e => e.isSelected ? [e.tag] : []) }))
   }, [query, tags])

   return (
      <div className='posts'>
         {posts.data.map((post, index) => (
            <Post post={post} key={index} />
         ))}
      </div>
   )
}
