import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:5000')
describe('Transaction', function() {

    const loginData = {
        "phone": "0967780420",
        "password": "1234567"
    }
    
    let token = ""

    this.beforeEach(async function() {
        const response = await request.post('/auth/login').send(loginData)
        token = response.body.data.token
    }) 


    // Test /transaction/send_money
    it('POST /transaction/send_money - Account number not exists', () => {
        const data = {
            account_number_sender: "123123",
            account_number_receiver: "456456",
            money: 50000,
            content: "ok do",
            save_contact: 1,
            pin: "123456"
        }

        request
            .post('/transaction/send_money')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1110)
            })
    })

})