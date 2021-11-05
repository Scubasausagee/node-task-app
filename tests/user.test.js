const request =require('supertest')
const app=require('../src/app')
const User=require("../src/models/user")
const {userOne,userOneId,setUpDatabase}=require('./fixtures/DB')


beforeEach(setUpDatabase)

test('Should signup a new users',async()=>{
    await request(app).post('/users').send({
        name: "Alek",
        email:"alek@example.com",
        password:"Pass1234."
    }).expect(201)
})

test('Should login existing user',async()=>{
    const response =await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user= await User.findById(userOneId)

    await expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexisting user',async()=>{
    await request(app).post('/users/login').send({
        email: "trajce@example.com",
        password: "nemapass1234"
    }).expect(400)
})

test('Should get profile for user',async()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user',async()=>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user',async()=>{
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user=await User.findById(userOneId)

    await expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user',async()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image',async()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user=await User.findById(userOneId)
    await expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields',async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        name:'Alek'
    }).expect(200)

    const user=await User.findById(userOneId)
    await expect(user.name).toBe('Alek')
})

test('Should not update invalid user fields',async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        location:'LA'
    }).expect(400)
})