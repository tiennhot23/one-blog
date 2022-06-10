import { Link } from 'react-router-dom'
import './topbar.css'

export default function TopBar() {
   return (
      <div className='top'>
         <div className='topLeft'>
            <i className="topIcon fa-brands fa-facebook-square"></i>
            <i className="topIcon fa-brands fa-twitter"></i>
            <i className="topIcon fa-brands fa-instagram-square"></i>
            <i className="topIcon fa-brands fa-pinterest"></i>
         </div>
         <div className='topCenter'>
            <ul className='topList'>
               <li className='topListItem'><Link className='link' to='/'>HOME</Link></li>
               <li className='topListItem'><Link className='link' to='/write'>WRITE</Link></li>
            </ul>
         </div>
         <div className='topRight'>
            <img
               className='topImg'
               src='https://i.pinimg.com/originals/9c/8c/a5/9c8ca502528fedd93c8e0c5bb41701af.jpg'
               alt='' />
         </div>
      </div>
   )
}
