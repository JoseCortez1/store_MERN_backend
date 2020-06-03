const productsCtrl = {}

const Products = require('../models/Product')

productsCtrl.getProducts = async(req, res)=>{
    const products = await  Products.find()
    res.json(products)
}

productsCtrl.getProduct = async (req, res)=>{
    const id = req.params.id
    const note = await Products.findById(id)

    res.json(note)
}

productsCtrl.deleteProduct = async (req, res)=>{
    const id = req.params.id
    await Products.findByIdAndDelete(id)
    res.json({
        message:"product deleted"
    })
}

productsCtrl.createProduct = async (req, res)=>{
    const product = new Products(req.body)
    try{
        product.setImgurl(req.file.filename);
        product.defineTags(req.body.description)

        const result = await product.save()
        
        res.json({
            productNew: product,
            message: "product saved"
        })
    }catch(e){
        if(e.keyValue){
            res.json({
                message: "error",
                "prducto": e.keyValue.productName
            })
        }
    }
}
productsCtrl.updateProduct = async (req, res)=>{
    const result = await Products.findByIdAndUpdate(req.params.id, req.body)
    result.defineTags(req.body.description)
    const update = await Products.findByIdAndUpdate(
        req.params.id, 
        {
            description: result.description
        })
    if(req.file){
        result.setImgurl(req.file.filename)
        console.log(result)
        update = await Products.findByIdAndUpdate(
            req.params.id, 
            {
                fileName: result.fileName,
            })
       
    }
    //El archivo llega modificar solo la direccion de la imagen

    res.json({
        message: "product updated"
    })
}

module.exports = productsCtrl