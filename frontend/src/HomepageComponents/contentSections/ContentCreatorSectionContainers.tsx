import { responseSchemaType } from "./ContentCreatorSection"
import ContentCreatorSectionContainer from "./ContentCreatorSectionContainer"

function ContentCreatorSectionContainers({responseData}: {responseData: responseSchemaType}) {
  return (
    <div className="flex flex-col gap-[128px] min-[480px]:gap-[280px]">
        {responseData.map(data => <ContentCreatorSectionContainer contents={data.contents} contentCreator={data.contentCreator} key={data.contentCreator._id}/>)}
    </div>
  )
}
export default ContentCreatorSectionContainers