import React from 'react'

const Btn = ({btnTitle="Button"}: {btnTitle: string}) => {
  return (
    <div>
         <button
          className="
            h-[48px]
             w-[216px]
            rounded-[24px]
            bg-indigo-600
            text-white
            text-[16px]
            flex
            items-center
            justify-center
            px-[15px]
            hover:bg-indigo-700
            transition
          "
        >
          {btnTitle}
        </button>
      
    </div>
  )
}

export default Btn
