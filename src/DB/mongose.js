const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-menager-api',{
    useNewUrlParser: true,
})

const User = mongoose.model('User',{
    name:{
        type: String
    },
    age:{
        type: Number
    }
})

// const me = new User({
//     name: "Alek",
//     age: "Mike"
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })

const Task= mongoose.model('Task',{
    description:{ type: String},
    completed: {type: Boolean}
})

const task1= new Task({
    description:"Clean the house",
    completed: false
})

const task2= new Task({
    description:"Go shopping",
    completed: false
})

task1.save().then(()=>{
    console.log(task1)
}).catch((error)=>{
    console.log(error)
})

task2.save().then(()=>{
    console.log(task2)
}).catch((error)=>{
    console.log(error)
})