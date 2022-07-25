import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:5000')
describe('Auth Change Password', function() {

    const loginData = {
        "phone": "0967780420",
        "password": "1234567"
    }
    
    let token = ""

    this.beforeEach(async function() {
        const response = await request.post('/auth/login').send(loginData)
        token = response.body.data.token
    }) 

    


    // Test /auth/changePassword
    it('POST /auth/changePassword - All input are valid', function() {
        const data = {
            old_password: "123456",
            new_password: "1234567",
            retype_password: "1234567"
        }

        // console.log('token ', token)
        request
            .post('/auth/changePassword')
            .set('Authorization', 'Bearer ' + token) 
            .send(data)
            .then(function(res) {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    it('POST /auth/changePassword - Old password is incorrect', function() {
        const data = {
            old_password: "123",
            new_password: "1234567",
            retype_password: "1234567"
        }
        request
            .post('/auth/changePassword')
            .set('Authorization', 'Bearer ' + token) 
            .send(data)
            .then(function(res) {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1102)
            })
    })

    it('POST /auth/changePassword - New password and retyped-password are not match', function() {
        const data = {
            old_password: "1234567",
            new_password: "1234",
            retype_password: "12345678"
        }
        request
            .post('/auth/changePassword')
            .set('Authorization', 'Bearer ' + token) 
            .send(data)
            .then(function(res) {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
    })
})