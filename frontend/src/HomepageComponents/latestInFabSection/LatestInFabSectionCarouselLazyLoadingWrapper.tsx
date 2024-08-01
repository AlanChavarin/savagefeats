'use client'
import { contentSchemaType, eventSchemaType } from "@/app/types/types"
import LazyComponentWrapper from "../LazyComponentWrapper"
import LoadingSection from "../LoadingSection"
import dynamic from "next/dynamic"
// import LatestInFABSectionCarousel from "./LatestInFabSectionCarousel"

const DynamicLatestInFABSectionCarousel = dynamic(() => import("./LatestInFabSectionCarousel"), {
  ssr: true,
  loading: () => <LoadingSection />
})

function LatestInFabSectionCarouselLazyLoadingWrapper({backgroundImage, contents, events, backgroundImageBlur} : { backgroundImage: string, contents: contentSchemaType[], events?: eventSchemaType[], backgroundImageBlur?: string}) {
  return (
    <LazyComponentWrapper>
        <DynamicLatestInFABSectionCarousel backgroundImage={backgroundImage} backgroundImageBlur={backgroundImageBlur} contents={contents}/>
    </LazyComponentWrapper>
    // <LatestInFABSectionCarousel backgroundImage={backgroundImage} backgroundImageBlur={backgroundImageBlur} contents={contents}/>
  )
}
export default LatestInFabSectionCarouselLazyLoadingWrapper