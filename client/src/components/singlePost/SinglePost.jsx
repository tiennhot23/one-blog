import './singlePost.css'

export default function singlePost() {
   return (
      <div className='singlePost'>
         <div className="singlePostWrapper">
            <img
               className='singlePostImg'
               src='https://cdn.lifehack.org/wp-content/uploads/2015/11/10164555/blog-header-design.jpg'
               alt='' />
            <h1 className="singlePostTitle">
               This is the title of post
               <div className="singlePostEdit">
                  <i class="singlePostIcon fa-solid fa-pen-to-square"></i>
                  <i class="singlePostIcon fa-solid fa-trash-can"></i>
               </div>
            </h1>
            <div className="singlePostInfo">
               <span className="singlePostAuthor">
                  Author: <b>Tiennhot23</b>
               </span>
               <span className="singlePostDate">1 hour ago</span>
            </div>
            <p className='singlePostDesc'>
               This is a nothingThis is a nothingThis is a nothingThis is a nothing
               This is a nothingThis is a nothingThis is a nothingThis is a nothing
               This is a nothingThis is a nothingThis is a nothingThis is a nothing
               This is a nothingThis is a nothingThis is a nothingThis is a nothing
               This is a nothingThis is a nothingThis is a nothingThis is a nothing
               This is a nothingThis is a nothingThis is a nothingThis is a nothing
               This is a nothingThis is a nothingThis is a nothingThis is a nothing
               This is a nothingThis is a nothingThis is a nothingThis is a nothing
               This is a nothingThis is a nothingThis is a nothingThis is a nothing
               This is a nothingThis is a nothingThis is a nothingThis is a nothing
               This is a nothingThis is a nothingThis is a nothingThis is a nothing
               This is a nothingThis is a nothingThis is a nothingThis is a nothing
            </p>
         </div>
      </div>
   )
}
