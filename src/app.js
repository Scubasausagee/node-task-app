const express = require('express')
require('./DB/mongose')
const UserRouter = require('./Routers/user')
const TaskRouter = require('./Routers/task')

const app = express()

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

module.exports=app