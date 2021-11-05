const request=require('supertest')
const app = require('../src/app')
const Task=require('../src/models/task')
const { userOne, userOneId, setUpDatabase,userTwoId,userTwo,taskOne } = require('./fixtures/DB')

beforeEach(setUpDatabase)

test('Should create task for user',async()=>{
    const response =await request(app)
    .post('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'From my test'
    }).expect(201)

    const task =await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should get tasks for user',async()=>{
    const response =await request(app)
    .get('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    expect(response.body.length).toBe(2)
})

test('Should not delte other users task',async()=>{
    await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    const confirmation =await Task.findById({_id:taskOne._id,owner:userOneId})
    expect(confirmation).not.toBeNull()
})