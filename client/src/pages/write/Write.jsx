import './write.css'

export default function Write() {
   return (
      <div className="write">
         <img
            className='writeImg'
            src='https://cdn.lifehack.org/wp-content/uploads/2015/11/10164555/blog-header-design.jpg'
            alt='' />
         <from className="writeForm">
            <div className="writeFormGroup">
               <label htmlFor='fileInput'>
                  <i className="writeIcon fa-solid fa-file-circle-plus"></i>
               </label>
               <input type='file' id='fileInput' style={{ display: 'none' }} />
               <input className='writeInput' type='text' placeholder='Title' autoFocus={true} />
            </div>
            <div className="line"></div>
            <div className="writeFormGroup">
               <textarea placeholder='Write here...' type='text' className='writeInput writeText'></textarea>
            </div>
            <button className="writeSubmit">Post</button>
         </from >
      </div >
   )
}
