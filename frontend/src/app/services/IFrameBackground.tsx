

function IFrameBackground() {
  return (<>
    <div className='flex flex-col items-center min-[1500px]:hidden '>
      <iframe src="https://www.youtube-nocookie.com/embed/ylRmj7ASGAQ?si=N84jlPMUdwFTjPap&amp;start=26487&autoplay=1&mute=1&controls=0&vq=medium" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className='min-[1500px]:hidden w-[2100px] h-[800px]'  style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70))`}}></iframe>
      <div style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70))`}} className='absolute w-[100%] h-[100%] z-[1] top-0 right-0 '></div>
    </div>
  
    <div className='overflow-hidden h-[50vw] min-[500px]:h-[55vw] relative hidden min-[1500px]:block'>
      <div className='relative w-[full] pb-[56.25%] translate-y-[-22vw]'>
        <iframe src="https://www.youtube-nocookie.com/embed/ylRmj7ASGAQ?si=N84jlPMUdwFTjPap&amp;start=26487&autoplay=1&mute=1&controls=0&vq=medium" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className='absolute w-[100%] h-[180%]'></iframe>
      </div>

      <div style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70))`}} className='absolute w-[100%] h-[100%] z-[1] top-0 right-0 '></div>
    </div>
  </>
    
  )
}
export default IFrameBackground

/// h-[50vw] min-[500px]:h-[55vw]