import './home.css'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'

export default function Home() {
   return (
      <div>
         <>
            <Header />
            <div className='home'>
               <Posts />
            </div>
         </>
      </div>
   )
}
