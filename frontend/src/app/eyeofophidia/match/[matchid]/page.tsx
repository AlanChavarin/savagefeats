function page({params}: {params: {matchid: string}}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
        Match page for match id of {params.matchid}
    </div>
  )
}
export default page