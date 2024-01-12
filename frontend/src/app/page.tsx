const getData = async (): Promise<string> => {
  'use server'
  return new Promise(resolve => {
    console.log(`${process.env.BACKEND_API}example`)
      fetch(`${process.env.BACKEND_API}example`, {cache: 'no-store'})
      .then(r => r.json())
      .then(data => {
          console.log(data)
          resolve(data.data)
      })
      .catch(error => {
        console.error(error)
      })
  })
}

export default async function Home() {

  const data: string = await getData()

  return (
    <main className="bg-red-300">
      <div>{data}</div>
    </main>
  )
}
