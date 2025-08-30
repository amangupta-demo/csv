import React, {useState} from "react";
import { useForm } from "react-hook-form"
 import { ToastContainer, toast } from 'react-toastify'
function UploadCSV(){

    const {register, handleSubmit , reset} = useForm()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seccuss,setSeccuss] = useState(null)
    return(
        
        <>
        <div className="w-full h-screen flex items-center justify-center">

        <form action="" method="POST" encType="multipart/form-data" onSubmit={
            handleSubmit( async (data)=>{

                console.log(data)
                if(!data){
                    
                    return toast.error('file not found')
                }
                const formData = new FormData();
                formData.append("file",data.file[0] );  
                try{
                    const response = await fetch(`http://localhost:3000/upload`,{
                        method:'POST',
                        body:formData
                    })
                    console.log(response)
                    
                    const data = await response.json()
                    // setSeccuss(data)
                    console.log(data)
                    if(data.Error){

                        toast.error(data.Error)
                    }
                    toast.success(data.message)
                    reset();
                    if(!response.ok){
                        toast.error('something went wrong !!')
                        setError(response.status)
                    }
                }catch(error){
                    toast.error(`${error.message}`)
                    console.log(error)
                    
                }
                
            })} >
                    <ToastContainer/>
                {/* {seccuss} */}
            <input {...register("file")} type="file" placeholder="Add file"  />
            <button className="text-white bg-blue-600 p-1 rounded">Submit</button>
        </form>
                </div>
        </>
    )
}
export default UploadCSV