import SearchBarParameters from "./SearchBarParameters"

function matches() {
  return (
    <div className="flex-1 overflow-hidden pb-[128px] flex flex-col justify-start items-center w-[100%] p-[16px]">
      <SearchBarParameters />
    </div>
  )
}
export default matches