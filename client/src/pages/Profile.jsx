import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Profile = () => {
    const {targetUserId} = useParams();
    
  return (
     <div className="flex flex-col items-center gap-8 my-24 h-screen">
      <h2 className="text-3xl">My Profile</h2>
      <div className="w-1/2 flex flex-col gap-4">
        <Link to={`/chat/${targetUserId}`}>
        <button>Chat</button>
        </Link>
        
      </div>
    </div>
  )
}

export default Profile