const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
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
    }
})

userSchema.pre('save',async function(next){
    const user=this

    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports= User