import './post.css'

export default function Post() {
   return (
      <div className='post'>
         <img
            className='postImg'
            src='https://cdn.lifehack.org/wp-content/uploads/2015/11/10164555/blog-header-design.jpg'
            alt='' />
         <div className='postInfo'>
            <div className="postCats">
               <span className="postCat">Music</span>
               <span className="postCat">Life</span>
            </div>
            <span className="postTitle">This is a post title</span>
            <hr />
            <span className="postDate">1 hour ago</span>
         </div>
      </div>
   )
}
