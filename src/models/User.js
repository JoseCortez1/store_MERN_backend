const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }

},{
    timestamps: true
})
userSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(password, salt)
}
userSchema.methods.verifyPassword = function(password){
    if(password){
        return bcrypt.compare(password, this.password)
    }
    return false
}


module.exports = model('User', userSchema)