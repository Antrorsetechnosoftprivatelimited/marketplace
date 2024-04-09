import React from 'react'
import video from '../../assets/images/Video.mp4'
const FooterBanner = () => {
  return (
    <div className='mb-10 mt-8 sm:mt-0 sm:mb-24 p-8 flex flex-col justify-center items-center bg-[#EFF2F5]'>
      <div>
        <h3 className='text-sm sm:text-2xl font-bold sm:px-8 pb-8 text-center'>Good For You, Good For The Planet & Good For The People Who Make It.</h3>
      </div>
      <video className=" w-[95vw] lg:w-[75vw] rounded-[15px] " controls autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  )
}
export default FooterBanner;