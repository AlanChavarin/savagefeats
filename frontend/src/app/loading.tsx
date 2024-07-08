'use client'
import { Hourglass } from 'react-loader-spinner'

function loading() {
  return (
    <div className="w-[100%] justify-center flex flex-1">
        <div className="absolute top-[25%]"><Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['Black', 'Black']}
        /></div>
    </div>
  )
}
export default loading