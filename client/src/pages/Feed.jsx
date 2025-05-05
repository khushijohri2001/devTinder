import React, { useEffect } from 'react'
import UserCard from '../components/UserCard'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { BASE_URL } from '../redux/constants';
import { addFeed } from '../redux/feedSlice';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
   try {
    const res = await axios.get(BASE_URL + "/user/feed", {withCredentials: true});
    dispatch(addFeed(res.data))
    
   } catch (error) {
    console.error(error.message)
   }
  }

  useEffect(() => {
    getFeed();
  }, [])

  return (
    <div className='flex items-center justify-center h-screen'>
     {
      feed ? (
        <UserCard {...feed[1]} />
      ) : (
        <div>Feed Empty!</div>
      )
     }
    </div>
  )
}

export default Feed