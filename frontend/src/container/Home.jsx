import { useRef,useState,useEffect } from "react"
import {HiMenu} from 'react-icons/hi'
import { AiFillCloseCircle } from "react-icons/ai";
import {Link,Route,Routes} from 'react-router-dom'
import Sidebar from "../components/Sidebar"
import UserProfile from "../components/UserProfile"
import{client} from '../client'
import logo from "../assets/logo.png"
import Pins from "./Pins"
import { userQuery } from "../utils/data"


const Home = () => {
  const[sidebar,setSidebar]=useState(false)
  const userInfo=localStorage.getItem('user') !=='undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
  const [user,setUser]=useState(null)
  useEffect(() => {
    const query=userQuery(userInfo?.googleId)
  
    client.fetch(query).then((data)=>{
      setUser(data[0])
    })
    return () => {
      
    }
  }, [])
  
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user ={user && user} />
      </div>

      <div className="flex md:hidden flex-row">
        <HiMenu
          fontSize={40}
          className="cursor-pointer"
          onClick={() => setSidebar(true)}
        / >
        <Link to="/">
          <img src={logo} alt="logo" className="w-28" />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="logo" className="w-28" />
        </Link>
      </div>
      {sidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => setSidebar(false)}
            />
          </div>
          <Sidebar user ={user && user} closeToggle={setSidebar}/>
        </div>
      )}
    </div>
  );
}

export default Home