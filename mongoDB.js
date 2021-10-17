const mongoDB=require('mongodb')

const MongoClient=mongoDB.MongoClient
const ObjectId = mongoDB.ObjectId

const connectionURL ='mongodb://127.0.0.1:27017'
const databaseName ='task-menager'


MongoClient.connect(connectionURL,{ useNewUrlParser: true },(error,client)=>
{
    if(error)
    {
        return console.log('Unable to connect to database')
    }

    const db=client.db(databaseName)

    db.collection('tasks').deleteOne({
        description: "Do homework"
    }).then((result)=>{
        console.log(result.acknowledged)
    }).catch((error)=>{
        console.log(error)
    })
})