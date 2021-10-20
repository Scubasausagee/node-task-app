const express=require('express')
require('./DB/mongose')
const UserRouter=require('./Routers/user')
const TaskRouter=require('./Routers/task')

const app=express()
const port=process.env.PORT || 3000

// app.use((req,res,next)=>{
//     if(req.method==='GET'){
//         res.send('GET requests are disabled')
//     }else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Page under maintenance please try again soon')
// })

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port,()=>{
    console.log('Server up on port '+port)
})