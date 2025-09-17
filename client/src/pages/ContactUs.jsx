import React from 'react'
import SocialIcons from '../components/common/SocialIcons'

const ContactUs = () => {
  return (
     <div className="flex flex-col items-center gap-8 py-24 h-screen">
      <h2 className="text-3xl">Contact Us</h2>
      <div className="w-1/2 flex flex-col gap-4">
        <p>
          We’re here to help!
        </p>
        <p><span className="font-bold">Email: </span>khushi.johri01@gmail.com</p>
        <p><span className="font-bold">Social Media: </span> <div className='inline-block ml-5'><SocialIcons /></div></p>
        <p><span className="font-bold">Office Hours: </span>All time</p>
        <p>Feel free to contact us directly whenever you face any issues.</p>
        </div>
    </div>
  )
}

export default ContactUs