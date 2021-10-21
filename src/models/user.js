const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('../models/task')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (validator.contains(value.toLowerCase(), "password")) {
                throw new Error("Can not contain word password in your password")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a pozitive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required:true
        }
    }]
})

//Hash the plain text password before saving
userSchema.pre('save',async function(next){
    const user=this

    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }

    next()
})

//Delete user tasks when user is deleted
userSchema.pre('remove',async function(next){
    const user=this
    await Task.deleteMany({owner:user._id})
    next()
})

userSchema.methods.toJSON = function(){
    const user=this
    const userObject=user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user=this
    const token=jwt.sign({_id: user._id.toString()},'thisismysignvalue')

    user.tokens= user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.virtual('tasks',{
    ref:'Task',
    localField: '_id',
    foreignField: 'owner'
})

//Method used for user login in
userSchema.statics.findByCredentials= async (email,password)=>{
    const user= await User.findOne({email})

    if(!user){
        throw new Error('Unable to log in')
    }

    const isMatch= await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Unable to log in')
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports= User