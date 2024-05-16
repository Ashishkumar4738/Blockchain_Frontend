import React from 'react'

const Loader = () => {
  return (
    <>
        <div className='fixed flex justify-center items-center w-screen h-screen z-40 backdrop-blur-sm shadow-inner shadow-black ' >
           
                <img src="./images/loader.gif" alt="loader" className=' h-[50%] ' />
            
        </div>
    </>
  )
}

export default Loader;
