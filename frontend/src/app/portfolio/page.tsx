'use client'
import Header from "./portfolioPageComponents/Header"
import Videos from "./portfolioPageComponents/Videos"
import ContactUsSection from "../services/servicePageComponents/ContactUsSection"

function page() {
  return (
    <div className="flex-1 overflow-hidden flex flex-col gap-[32px] pb-[128px]">
      <Header />
      <Videos />
      <ContactUsSection />
    </div>
  )
}
export default page