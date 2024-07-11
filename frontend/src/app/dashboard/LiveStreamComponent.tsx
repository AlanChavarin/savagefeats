import { toast } from "react-toastify"
import { liveStreamSchema } from "../schemas/schemas"
import { errorSchema } from "../schemas/schemas"
import DeleteButton from "../eyeofophidia/helperComponents/DeleteButton"


function LiveStreamComponent({id}: {id: string}) {

    const deleteAction = () => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_API}livestreams/${id}`

        fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
        })
        .then(r => r.json())
        .then(data => {
        const validatedData = liveStreamSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
            console.log(validatedData.data.link + ' Successfully deleted')
            toast(validatedData.data.link + ' Successfully deleted')
            return
        }

        if(validatedError.success){
            throw new Error(validatedError.data.errorMessage)
        }

        console.error(validatedData.error?.toString())
        console.error(validatedError.error.toString())
        throw new Error('Unexpected contentcreator data. Check console for further details')
        }).catch(err => {
        toast(err.message)
        })
    }

  return (
    <div key={id} className='flex flex-col items-end gap-[16px]'>
        <iframe className='h-[50vw] w-[85vw] md:w-[500px] md:h-[282px] box-shadow' src={`https://www.youtube-nocookie.com/embed/${id}?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
        <DeleteButton warningText="Are you sure you want to delete this live stream?" deleteAction={deleteAction}/>
    </div>
  )
}
export default LiveStreamComponent