const userCtrl = {}


const User = require('../models/User')
const jwt = require('jsonwebtoken')
const verifyToken =  require('../controllers/verifyToken')

userCtrl.getUsers = async (req, res)=>{
    const results = await User.find()
    res.json(results);
}
userCtrl.getUser = async(req,res)=>{    
    const user = await User.findById(req.decoded.id)
    if(!user){
        res.json({
            message:"User doesn't found"
        })
    }
    user.password = ''
    res.json(user)
}
userCtrl.updateUser = async(req, res)=>{
    try{
        const body = req.body
        const id = req.params.id
        var user = await User.findById(id)
        if(body.password != user.password){
            await user.encryptPassword(body.password)
        }
        user.userName = body.userName

        await User.findByIdAndUpdate(id,user)
    }
    catch(e){
        res.status(404).json({
            message:" Query Error"
        })
    }
    res.json({
        message: "User updated"
    })

}
userCtrl.createUser = async(req, res)=>{
    const body = req.body
    try{
        const newUser = new User(body)
        await newUser.encryptPassword(body.password)
        await newUser.save();
        res.json({
            message: "user saved"
        })
    }catch(e){
        res.status(404).json({
            message:" Query Error"
        })
    }
    
}
userCtrl.deleteUser = async(req, res)=>{
    await User.findByIdAndDelete(req.params.id)
    res.json({
        message: "user deleted"
    }) 
}
userCtrl.loginUser = async (req, res, next )=>{
    try{
        const {userName, password} = req.body;
        
        const results = await User.findOne({userName})
        if(!results){
            return res.status(401).json({
                message:"User doesn't found"
            })
        }
        const loginCorrect = await results.verifyPassword(password)
    
        if(!loginCorrect){
            return res.status(401).json({
                message:"Password incorrect"
            })
        }
        const token = jwt.sign({id: results._id}, process.env.SECRET_TOKEN,{
            expiresIn: 60*60*2
        })
        res.json({
            message:"Login",
            token
        })
    }catch(e){
        next(e)
    }
}


module.exports = userCtrl