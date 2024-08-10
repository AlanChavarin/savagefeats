import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

function GetInTouchButton() {
  return (
    <Link href="/services#contactUsSection" className='whitespace-nowrap py-[12px] px-[24px] bg-custom-primary flex flex-row gap-[16px] items-center box-shadow font-bold text-[19px]
    min-[1900px]:text-[27px] hover:bg-custom-primaryHover'>
      <div>Get in touch</div>
      <FontAwesomeIcon icon={faArrowDown} className='text-black'/>
    </Link>
  )
}
export default GetInTouchButton