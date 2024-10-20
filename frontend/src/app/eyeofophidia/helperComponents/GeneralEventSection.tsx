import { generalEventSectionSchemaType } from "@/app/types/types"
import EditButton from "./EditButton"
import { useState, useContext } from "react"
import UserContext from "../../../context/UserContext"

function GeneralEventSection({generalEventSection, eventName}: {generalEventSection: generalEventSectionSchemaType, eventName: string}) {

  const {user} = useContext(UserContext)

  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="flex flex-col items-center w-[100%] gap-[12px] md:gap-[24px] relative">
      <div className="text-[24px] md:text-[39px] font-bold text-center">
        {generalEventSection.header}
      </div>
      <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
      {generalEventSection.image && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative group">
              <img 
                src={generalEventSection.image.toString()} 
                alt="header image" 
                className="h-[400px] max-w-full object-contain box-shadow cursor-zoom-in"
                
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 cursor-zoom-in" onClick={toggleFullscreen}></div>
            </div>
          </div>
          {isFullscreen && (
            <div 
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50 cursor-zoom-out"
              onClick={toggleFullscreen}
            >
              <img 
                src={generalEventSection.image.toString()} 
                alt="fullscreen image" 
                className="max-w-[90%] max-h-[90%] size-full object-contain"
              />
            </div>
          )}
        </>
      )}
      {(user?.privilege === 'admin' || user?.privilege === 'moderator') &&
        <div className="absolute top-[0px] right-[0px]">
            <EditButton text="Edit Section" link={`/eyeofophidia/postgeneraleventsection?eventname=${eventName}&generalEventSectionId=${generalEventSection._id}`}/>
        </div>
      }
      
    </div>
  )
}
export default GeneralEventSection

function useUserContext(): { user: any } {
    throw new Error("Function not implemented.")
}
