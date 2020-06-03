const {Schema, model } = require('mongoose')

const productsSchema = new Schema({
    'productName':{
        type: String,
        trim:true,
        required:true,
        unique: true
    }
    ,
    "cost":{
        type: Number,
        required: true
    },
    'description': [{
        type: String
    }],
    'fileName':String 
},{
    timestamps: true
})

productsSchema.methods.defineTags = function(tags){
    this.description = tags.split(",")
}

productsSchema.methods.setImgurl= function (fileName){
    this.fileName = "http://localhost:4000/public/"+ fileName
}
module.exports = model('Product', productsSchema)