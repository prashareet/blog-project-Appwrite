import React from 'react'
import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useDispatch} from "react-redux"
import { login,logout } from './store/authSlice'
import { authService } from './appwrite/auth'
import { Footer, Header } from './components'

function App() {
 
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(()=>{
     authService.getCurrentUser()
     .then((userData)=>{
      if (userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout());
      }
     })
     .finally(setIsLoading(false))
  }, [])
  if (!isLoading){
    return (
      <div className=' min-h-screen flex flex-wrap content-between bg-slate-800 '>
        <div className=' w-full block'>
          <Header/>
          <main>
            
          </main>
          <Footer />
        </div>
      </div>
    )
  }
  else{
    return (
      <div>

      </div>
    )
  }
}

export default App
