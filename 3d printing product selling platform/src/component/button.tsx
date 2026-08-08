// import React from 'react'

const Btn = ({btnTitle="Button"}: {btnTitle: string}) => {
  return (
    <div>
        <button className='bg-[#4F46E5] h-48px  text-white rounded-2xl px-2 py-1'>{btnTitle}</button>
      
    </div>
  )
}

export default Btn
