import PaginationButton from "./PaginationButton"


function Pagination({count, limit}: {count: number | undefined, limit: number}) {
  return (<>
    {(count && count>0) && 
        <div className="flex flex-row gap-[8px] flex-wrap justify-center w-[75%]">
          {count && Array.from(Array(Math.floor(count/limit + 1)), (_, i) => <div key={i}>
            <PaginationButton page={i}/>
          </div>)}
        </div>
      }
    </>
  )
}
export default Pagination