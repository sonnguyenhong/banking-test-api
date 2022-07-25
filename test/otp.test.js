import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:5000')

describe('Otp', function() {

    const loginData = {
        "phone": "0967780420",
        "password": "1234567"
    }
    
    let token = ""

    this.beforeEach(async function() {
        const response = await request.post('/auth/login').send(loginData)
        token = response.body.data.token
    }) 
    
    
    // Test /otp/get_phone_otp
    it('POST /otp/get_phone_otp - All input are valid', () => {
        const data = {
            
        }

        request
            .post('/otp/get_phone_otp')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    // Test /otp/verify_otp
    


})

