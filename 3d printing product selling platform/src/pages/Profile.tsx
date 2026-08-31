import React from 'react'

const Profile = () => {
  return (
    <>
    <div className='flex gap-2' >
      <div >
        <div className='h-[100px] w-[100px] bg-gray-400 rounded-2xl'>photo</div>
      </div>
      <div>
        <h1>test name</h1>
        <p>@testuser</p>
      </div>
    </div>
    </>
  )
}

export default Profile