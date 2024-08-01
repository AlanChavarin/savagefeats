'use client'
import dynamic from "next/dynamic"
import { responseSchemaType } from "./ContentCreatorSection"
import LoadingSection from "../LoadingSection"
import LazyComponentWrapper from "../LazyComponentWrapper"
//import ContentCreatorSectionContainers from "./ContentCreatorSectionContainers"

const DynamicContentCreatorSectionContainers = dynamic(() => import('./ContentCreatorSectionContainers'), {
  ssr: true,
  loading: () => <LoadingSection />
})

function ContentCreatorSectionContainersLazyLoadWrapper({responseData}: {responseData: responseSchemaType}) {
  return (
    <LazyComponentWrapper>
        <DynamicContentCreatorSectionContainers responseData={responseData}/>
    </LazyComponentWrapper>
  )
}
export default ContentCreatorSectionContainersLazyLoadWrapper