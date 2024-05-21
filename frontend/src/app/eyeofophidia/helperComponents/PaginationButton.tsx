'use client'
import { useSearchParams, useRouter, usePathname} from "next/navigation"

function PaginationButton({page}: {page: number}) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    let params = new URLSearchParams(searchParams.toString())

    const handleClick = () => {
      params.set('page', page.toString())
      router.push(pathname + '?' + params.toString())
    }

  return (
    <div key={page} onClick={() => handleClick()} className={`border-[1px] border-black flex flex-col justify-center items-center w-[32px] h-[32px] text-[13px] box-shadow-extra-small font-bold cursor-pointer ${((page === 0 && !params.get('page')) || params.get('page') === page.toString()) ? 'bg-custom-primary hover:bg-custom-primaryHover' : 'bg-white hover:bg-custom-whiteHover'}`} >
      {page + 1}
    </div>
  )
}
export default PaginationButton