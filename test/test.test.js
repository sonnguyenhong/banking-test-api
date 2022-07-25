// // import { expect } from "chai";
// // import supertest from "supertest";

// // describe('outer describe', function() {
// //     this.beforeEach(function() {
// //         console.log('outer describe - beforeEach')
// //     })

// //     it('test 1', () => {

// //     })

// //     it('test 2', () => {
        
// //     })

// //     describe('inner describe 1', function() {
// //         before(function () {
// //             console.log('inner describe 1 - before')
// //         });

// //         it('test 3', () => {
        
// //         })

// //         it('test 4', () => {
        
// //         })

// //         describe('inner describe 2', function() {
// //             this.beforeEach(function() {
// //                 console.log('inner describe 2 - beforeEach')
// //             })

// //             it('test 5', () => {
        
// //             })

// //             it('test 6', () => {
        
// //             })
// //         })
// //     })
// // })

// import { expect } from "chai";
// import supertest from "supertest";

// const request = supertest('http://localhost:5000')

// describe('test', function() {
    
//     const loginData = {
//         "phone": "0967874928",
//         "password": "123456"
//     }
    
//     let token = ""
    
//     this.beforeEach(async function() {
//         const response = await request.post('/auth/login').send(loginData)
//         token = response.body.data.token
//         console.log('inner token', token)
//     })
    

//     it('Should return ...', function() {
//         console.log('token', token)
//         const data = {

//         }

//         request
//             .post('/user/getInfor')
//             .set({ Authorization: `Bearer ${token}` })
//             .send(data)
//             .then((res) => {
//                 expect(res.body.success).to.eq(false)
//                 expect(res.body.data.phone).to.eq(loginData.phone)
//             })
//     })

//     it('Should return ...', function() {
//         console.log('token', token)
//         const data = {

//         }

//         request
//             .post('/user/getInfor')
//             .set({ Authorization: `Bearer ${token}` })
//             .send(data)
//             .then((res) => {
//                 expect(res.body.success).to.eq(false)
//                 expect(res.body.data.phone).to.eq(loginData.phone)
//             })
//     })

// })