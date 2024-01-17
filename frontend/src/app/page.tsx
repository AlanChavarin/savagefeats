// const getData = async (): Promise<string> => {
//   'use server'
//   return new Promise(resolve => {
//     console.log(`${process.env.BACKEND_API}example`)
//       fetch(`${process.env.BACKEND_API}example`, {cache: 'no-store'})
//       .then(r => r.json())
//       .then(data => {
//           console.log(data)
//           resolve(data.data)
//       })
//       .catch(error => {
//         console.error(error)
//       })
//   })
// }

'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from "@fortawesome/free-solid-svg-icons"

export default async function Home() {

  //const data: string = await getData()

  return (
    <main className="flex-1">
      <div className=''> 
        hello world
        <FontAwesomeIcon icon={faCaretUp} width='32px'/>
      </div>
    </main>
  )
}
