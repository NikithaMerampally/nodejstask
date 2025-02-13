import usermodel from "../schemas/userschema"

export const createUser = async (body:any) =>{
    try{
        let userdata= body
        let createUser = await usermodel.create(userdata)
        if(createUser) return createUser
    }catch(err){
        throw new Error(err.message)
    }
}


export const getUsersByEmail = async (email:string)=>{
    try{
      const getallusers= await usermodel.find({email: email})
      return getallusers
     
    }catch(error){
        console.log(error)
        throw new Error(error.message)
        
    }
}

