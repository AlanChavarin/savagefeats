import Title from "../helperComponents/Title"
import TournamentSearchForm from "./TournamentSearchForm"
import { useState } from "react"
import { eventSchemaType } from "@/app/types/types"
import { useSearchParams } from "next/navigation"

function Tournaments() {

  // const [events, setEvents] = useState<eventSchemaType[] | undefined>()
  // const [count, setCount] = useState<number | undefined>()
  // const searchParams = useSearchParams()

  return (
    <div className="flex-1 overflow-hidden pb-[128px] flex flex-col justify-start items-center w-[100%] p-[16px] gap-[48px] pt-[32px]">
      <Title subheader="Tournaments"/>
      <TournamentSearchForm />

    </div>
  )
}
export default Tournaments