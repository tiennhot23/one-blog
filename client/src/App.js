import Home from "./pages/home/Home"
import Single from "./pages/single/Single"
import Write from "./pages/write/Write"
import {
   BrowserRouter as Router,
   Route,
   Routes,
} from 'react-router-dom'
import TopBar from './components/topbar/TopBar'
import store from "./redux/store"
import { Provider } from "react-redux"

function App() {
   return (
      <Provider store={store}>
         <Router>
            <TopBar />
            <Routes>
               <Route exact path="/write" element={<Write />} />
               <Route path="/post/:postId" element={<Single />} />
               <Route path="*" element={<Home />} />
            </Routes>
         </Router>
      </Provider>
   )
}

export default App
