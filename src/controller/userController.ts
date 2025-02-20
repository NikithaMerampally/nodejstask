import {createUser, getUsersByEmail} from  '../services/userService'

export const craeteUser= async function(req,res){
    try{
        const body= req.body
        const userCreated = await createUser(body)
        if(userCreated) return res.status(200).send({message : "User created successfully"})
    }catch(err){
        console.log(err)
        return res.status(500).send("Internal Server Error")
    }
}

export const getUserInfo = async function(req, res){
    try{
        let email = req.body.email
        if(!email) return res.status(400).send({message : "emailId is missing"})
      const userData = await getUsersByEmail(req.body.email)
    }catch(error){
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}
