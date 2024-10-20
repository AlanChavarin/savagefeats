'use client'
import { eventSchemaType } from "@/app/types/types"
import dynamic from "next/dynamic"
import LoadingSection from "../LoadingSection"
import LazyComponentWrapper from "../LazyComponentWrapper"

const DynamicEventSectionCarousel = dynamic(() => import("./EventsSectionCarousel"), {
  ssr: true,
  loading: () => <LoadingSection />
})

function EventsSectionCarouselLazyLoadWrapper({events, header, backgroundImage, backgroundImageBlur, whichEvents}: {events: eventSchemaType[] | undefined, header: string, backgroundImage: string, backgroundImageBlur?: string, whichEvents?: ("pastEventsOnly" | "futureEventsOnly" | "currentEventsOnly")}) {
  return (
    <LazyComponentWrapper>
      <DynamicEventSectionCarousel events={events} header={header} backgroundImage={backgroundImage} backgroundImageBlur={backgroundImageBlur} whichEvents={whichEvents}/>
    </LazyComponentWrapper>
  )
}
export default EventsSectionCarouselLazyLoadWrapper