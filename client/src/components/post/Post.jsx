import { Link } from 'react-router-dom'
import './post.css'

export default function Post({ post }) {
   return (
      <Link to={`/post/${post.slug}`} className='post link'>
         <img
            className='postImg'
            src={post.image}
            alt='' />
         <div className='postInfo'>
            <div className="postCats">
               {post.tags.map(tag => (
                  <span className="postCat" key={tag}>{tag}</span>
               ))}
            </div>
            <span className="postTitle">{post.title}</span>
            <hr />
            <span className="postDate"> {new Date(post.createdAt).toDateString()}</span>
         </div>
      </Link>
   )
}
