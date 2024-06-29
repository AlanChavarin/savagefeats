'use client'
import { FormEvent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane"

function ContactUsSection() {

    // const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()

    //     const formData = new FormData(e.currentTarget)

    //     console.log('this form doesnt properly work yet!')
    //     console.log(formData)
    // }

  return (
    <div id="contactUsSection" className='relative w-full py-[64px] lg:py-[96px] text-white flex flex-col justify-center items-center skew-y-[-3deg] lg:skew-y-[-2deg] bg-custom-dark'>
        {/* <div className='w-full h-[60vw] min-[370px]:h-[256px] lg:h-[384px] skew-y-[-3deg] lg:skew-y-[-2deg] bg-custom-dark absolute top-0 right-0 z-[-1]'></div> */}
        <form action="https://formsubmit.co/contact@savagefeats.com" method="POST" id="contactUsForm" className="text-black bg-white p-[16px] flex flex-col gap-[8px] w-[90%] box-shadow skew-y-[3deg] lg:skew-y-[2deg] min-[300px]:max-w-[384px] lg:max-w-[512px] lg:p-[32px] lg:gap-[16px]">
            <div className='text-[16px] font-bold min-[350px]:text-[23px] lg:text-[33px]'>We want to work with you!</div>
            <div className='text-[9px] font-bold min-[350px]:text-[13px] lg:text-[16px]'>
                We offer multiple packages for <span className='text-custom-primary'>livestreaming</span> your event and even more opportunities for <span className='text-custom-primary'>sponsorship</span>. Send us a message today!
            </div>
            <div className='text-[9px] font-bold min-[350px]:text-[13px] lg:text-[16px]'>
                Feel free to also email us directly at <span className='text-custom-primary'><a href="mailto:contact@savagefeats.com">contact@savagefeats.com</a></span>
            </div>
            <div className='flex flex-col lg:text-[19px]'>
                <label htmlFor="name" className='font-bold'>Name</label>
                <input type="text" name="name" className='border border-black border-1 text-[11px] py-[2px] px-[4px] min-[350px]:text-[13px] lg:text-[16px]' placeholder="John Smith"/>
            </div>
            <div className='flex flex-col lg:text-[19px]'>
                <label htmlFor="email" className='font-bold'>Email</label>
                <input type="email" name="email" className='border border-black border-1 text-[11px] py-[2px] px-[4px] min-[350px]:text-[13px] lg:text-[16px]' placeholder="johnsmith@gmail.com"/>
            </div>
            <div className='flex flex-col lg:text-[19px]'>
                <label htmlFor="message" className='font-bold'>Message</label>
                <textarea name="message" id="" rows={4} className='border border-black border-1 text-[11px] p-[4px] min-[350px]:text-[13px] lg:text-[16px]' placeholder="Dear Savage Feats Team,"></textarea>
            </div>
            <button type="submit" className='text-[13px] bg-custom-primary text-white py-[4px] box-shadow-small min-[350px]:text-[16px] lg:text-[19px]'>
                Send &nbsp;&nbsp;
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </form>
    </div>
    
  )
}
export default ContactUsSection