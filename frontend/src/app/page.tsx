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

export default async function Home() {

  //const data: string = await getData()

  return (
    <main className="flex-1">
      <div className='w-full h-[1200px] bg-cover' style={{backgroundImage: `url('/mulch.jpg')`}}> 

      </div>
    </main>
  )
}
