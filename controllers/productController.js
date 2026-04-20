import Product from '../models/product.js'

// POST create product multiple
export const createProducts = async (req, res) => {
    try {
        const data = await Product.insertMany(req.body)
        res.json({ msg: "data posted", data })
    } catch (err) {
        res.status(500).json(err)
    }
}


// GET ALL
export const getProducts = async (req, res) => {
    try {
        const data = await Product.find()
        res.json({ msg: "data fetched", data })
    } catch (err) {
        res.status(500).json(err)
    }
}

// GET BY ID
export const getProductsById = async (req, res) => {
    try {
        const data = await Product.findById(req.params.id)
        res.json({ msg: "single product fetched", data })
    } catch (err) {
        res.status(500).json(err)
    }
}

// UPDATE 
export const updateProduct=async(req,res)=>{
    const {id}=req.params
    try{
        const updated=await Product.findByIdAndUpdate(id,req.body,{returnDocument: 'after'})
        res.json({msg:"updated",data:updated})
    }catch(err){
        res.json(err)
    }
}

// DELETE

export const deleteProduct=async(req,res)=>{
    const {id} =req.params
    
    await Product.findByIdAndDelete(id)

    res.json({msg:"delete product"})
}