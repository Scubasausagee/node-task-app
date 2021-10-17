const mongoose=require('mongoose')
const validator=require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-menager-api',{
    useNewUrlParser: true,
})

const User = mongoose.model('User',{
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
               throw new Error('Email is invalid') 
            }
        }
    },
    password:{
        type: String,
        required:true,
        trim:true,
        minLength: 7,
        validate(value) {
            if(validator.contains(value.toLowerCase(),"password")){
                throw new Error("Can not contain word password in your password")
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value) {
            if(value< 0){
                throw new Error('Age must be a pozitive number')    
            }
        }
    }
})

// const me = new User({
//     name: "      Alek      ",
//     email: "MYeMaIL@gmail.com       ",
//     password: "qgrthju678"
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })

const Task= mongoose.model('Task',{
    description:{
        type: String,
        required:true,
        trim:true,
    },
    completed:{
        type: Boolean,
        default:false
    }
})

// const task1= new Task({
    
// })

// const task2= new Task({
//     description:"     Go shopping    ",
//     completed: false
// })

// task1.save().then(()=>{
//     console.log(task1)
// }).catch((error)=>{
//     console.log(error)
// })

// task2.save().then(()=>{
//     console.log(task2)
// }).catch((error)=>{
//     console.log(error)
// })