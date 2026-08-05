import React from 'react'

const Btn = ({btnTitle="Button"}: {btnTitle: string}) => {
  return (
    <div>
        <button className='bg-white text-black rounded-2xl px-1.5 py-1'>{btnTitle}</button>
      
    </div>
  )
}

export default Btn
