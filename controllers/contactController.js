import UserExp from "../models/contact.js";

export const sendContact=async(req,res)=>{
    const {name,email,message}=req.body

    const newUser= await UserExp.create({
        name,email,message
    }) 
    res.json({msg:"msg sended success",newUser})

}

export const getContact=async(req,res)=>{
    const contact =await UserExp.find()
    res.json({msg:"contact getted ",contact}) 
}

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  await UserExp.findByIdAndDelete(id);

  res.json({ msg: "Deleted successfully ✅" });
};