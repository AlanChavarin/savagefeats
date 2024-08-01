import { Hourglass } from 'react-loader-spinner'

function LoadingSection() {
  return (
    <div className="flex items-center justify-center bg-slate-400 w-full h-[60vw] min-[370px]:h-[256px] lg:h-[384px] skew-y-[-3deg] lg:skew-y-[-2deg]">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['Black', 'Black']}
        />
    </div>
  )
}
export default LoadingSection