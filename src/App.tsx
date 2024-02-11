import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css'

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function App() {
  const CLIENT_ID = "47e9b6d8f3324b1e939b936ea67710ae"
  const REDIRECT_URI = "http://localhost:5174/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = 'user-read-private user-read-email';
  var STATE = generateRandomString(16);

  const [token, setToken] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    let token = window.localStorage.getItem("token")

    if(token){
      setToken(token)
      navigate('/Dashboard');
    }
  }, [navigate])

  return (
    <div className='container'>
        <a href={`${AUTH_ENDPOINT}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&state=${STATE}&show_dialog=true`}>Login to Spotify</a>
    </div>
  )
}

export default App
