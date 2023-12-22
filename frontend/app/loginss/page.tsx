import React from 'react'

export default function Login() {
  const authorizeUrl="https://auth.riotgames.com/authorize"
  const appCallbackUrl= "https://www.efmleague.com/api/auth/riot/oauth2-callback"
  const clientID= "ad73d3e5-099f-4681-adb7-5036f0a6821d"

  
  const link = authorizeUrl
            + "?redirect_uri=" + appCallbackUrl
            + "&client_id=" + clientID
            + "&response_type=code"
            + "&scope=openid";

  return (
    <a href={link} className='text-2xl'>SIGN IN</a>
  )
}
