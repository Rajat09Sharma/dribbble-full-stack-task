import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Avatar from "./components/Avatar"
import Login from "./components/Login"
import Seeking from "./components/Seeking"
import Email from "./components/Email"
import UserContextProvider from "./store/acount-setup-context"
import Signup from "./components/Signup";
import Signin from "./components/Signin";


function App() {
  return (
    <UserContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/seeking" element={<Seeking />} />
        <Route path="/email" element={<Email />} />
      </Routes>
    </Router>
    {/* <Login /> */}
    {/* <Seeking/> */}
    {/* <Email/> */}
    </UserContextProvider>
  )
}
  
export default App
