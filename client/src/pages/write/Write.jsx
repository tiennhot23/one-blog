import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './write.css'

export default function Write() {
   const location = useLocation()
   const navigate = useNavigate()
   const [post, setPost] = useState(null)
   const [file, setFile] = useState(null)
   const [isEditted, setIsEditted] = useState(false)

   useEffect(() => {
      setPost(location.state?.post ? location.state?.post : {})
      setIsEditted(location.state?.post !== undefined)
   }, [])

   const onTitleChange = (text) => {
      setPost({
         ...post,
         title: text.target.value
      })
   }

   const onMarkdownChange = (text) => {
      setPost({
         ...post,
         markdown: text.target.value
      })
   }

   const onTagsChange = (text) => {
      setPost({
         ...post,
         tags: text.target.value.split(', ')
      })
   }

   const onFileSelected = (e) => {
      setFile(e.target.files[0])
   }

   const onSubmit = async (e) => {
      e.preventDefault()
      if (file) {
         const data = new FormData()
         data.append('file', file)
         let imageUrl = await fetch('/file/upload', {
            method: 'post',
            body: data
         })
         imageUrl = await imageUrl.json()
         post.image = imageUrl
      }
      if (isEditted) {
         fetch(`/posts/${post.slug}`, {
            method: 'put',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(post),
         }).then(response => response.json())
            .then(response => {
               console.log(response)
               navigate(`/post/${response.data[0].slug}`)
            })
            .catch(err => {
               console.log(err)
               alert(err.message)
            })
      } else {
         fetch('/posts', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(post),
         }).then(response => response.json())
            .then(response => {
               console.log(response)
               navigate(`/post/${response.data[0].slug}`)
            })
            .catch(err => {
               console.log(err)
               alert(err.message)
            })
      }
   }

   return (
      <div className="write">
         <img
            className='writeImg'
            src={file ? URL.createObjectURL(file) :
               isEditted ? post.image :
                  'https://cdn.lifehack.org/wp-content/uploads/2015/11/10164555/blog-header-design.jpg'}
            alt='' />
         <form className="writeForm" onSubmit={onSubmit}>
            <div className="writeFormGroup">
               <label htmlFor='fileInput'>
                  <i className="writeIcon fa-solid fa-file-circle-plus"></i>
               </label>
               <input type='file' id='fileInput' style={{ display: 'none' }}
                  onChange={onFileSelected} />
               <input className='writeInput' type='text' placeholder='Title' autoFocus={true}
                  value={post?.title || ''}
                  onChange={onTitleChange} />
            </div>
            <div className='writeFormGroup'>
               <input className='writeTags' type='text' placeholder='Tags' autoFocus={true}
                  value={post?.tags?.map((tag, index) => index === 0 ? tag : ` ${tag}`) || ''}
                  onChange={onTagsChange} />
            </div>
            <div className="line"></div>
            <div className="writeFormGroup">
               <textarea placeholder='Write here...' type='text' className='writeInput writeText'
                  value={post?.markdown || ''}
                  onChange={onMarkdownChange} />
            </div>
            <button className="writeSubmit" type='submit'>Post</button>
         </form >
      </div >
   )
}
