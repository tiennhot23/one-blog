import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './singlePost.css'

export default function SinglePost() {
   const location = useLocation()
   const navigate = useNavigate()
   const slug = location.pathname.split('/')[2]
   const [post, setPost] = useState({})

   useEffect(() => {
      fetch(`/posts/${slug}`).then(response => response.json())
         .then(response => setPost(response.data[0]))
         .catch(err => setPost({}))
   }, [])

   const handleEditPost = () => {
      navigate(`/write`, { state: { post } })
   }

   const handleDeletePost = () => {
      fetch(`/posts/${slug}`, {
         method: 'DELETE',
         body: {}
      }).then(response => response.json())
         .then(response => navigate(`/posts`))
         .catch(err => console.log(err))
   }

   return (
      <div className='singlePost'>
         <div className="singlePostWrapper">
            <img
               className='singlePostImg'
               src={post.image}
               alt='' />
            <h1 className="singlePostTitle">
               {post.title}
               <div className="singlePostEdit">
                  <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={handleEditPost}></i>
                  <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDeletePost}></i>
               </div>
            </h1>
            <div className="singlePostInfo">
               <span className="singlePostAuthor">
                  Tags: {post.tags?.map((tag, index) => (
                     <b key={tag}>{tag}{index !== post.tags.length - 1 ? ', ' : ' '}</b>
                  ))}
               </span>
               <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <div className='singlePostDesc' dangerouslySetInnerHTML={{ __html: post.sanitizedHtml }} />
         </div>
      </div>
   )
}
