const express=require('express')
require('./DB/mongose')
const UserRouter=require('./Routers/user')
const TaskRouter=require('./Routers/task')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())

app.use(UserRouter)
app.use(TaskRouter)

app.listen(port,()=>{
    console.log('Server up on port '+port)
})