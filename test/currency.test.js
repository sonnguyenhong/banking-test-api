import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:5000')

describe('Currency', function() {

    const loginData = {
        "phone": "0967780420",
        "password": "1234567"
    }
    
    let token = ""

    this.beforeEach(async function() {
        const response = await request.post('/auth/login').send(loginData)
        token = response.body.data.token
    }) 
    
    
    // Test /currency_price/get_list
    it('POST /currency_price/get_list - All input are valid', () => {
        request
            .post('/currency_price/get_list')
            .set({ Authorization: `Bearer ${token}` })
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

})

