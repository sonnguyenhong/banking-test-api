import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:5000')
describe('User', () => {

    const loginData = {
        "phone": "0967780420",
        "password": "1234567"
    }
    
    let token = ""

    beforeEach(async function() {
        const response = await request.post('/auth/login').send(loginData)
        token = response.body.data.token
    }) 

    describe('User API', () => {
        
        // Test /user/getInfor
        it('POST /user/getInfor - All input are valid', () => {
            const data = {

            }

            request
                .post('/user/getInfor')
                .set({ Authorization: `Bearer ${token}` })
                .send(data)
                .then((res) => {
                    expect(res.body.success).to.eq(true)
                    expect(res.body.data.phone).to.eq(loginData.phone)
                })
                
        })

        // Test /user/get_trans_limit
        it('POST /user/get_trans_limit - All input are vilid', () => {
            request
                .post('/user/get_trans_limit')
                .set({ Authorization: `Bearer ${token}` })
                .then((res) => {
                    expect(res.body.success).to.eq(true)
                    expect(res.body.code).to.eq(1000)
                })
        })

        // Test /user/update_trans_limit
        it('POST /user/update_trans_limit - All input are valid', () => {
            const data = {
                limit_per_trans: 120000000,
                limit_per_day: 1100000000
            }

            request
                .post('/user/update_trans_limit')
                .set({ Authorization: `Bearer ${token}` })
                .then((res) => {
                    expect(res.body.success).to.eq(true)
                    expect(res.body.code).to.eq(1000)
                })
        })

        
        // Test /user/get_list_bank_account
        it('POST /user/get_list_bank_account - All input are valid', () => {
            request
                .post('/user/get_list_bank_account')
                .set({ Authorization: `Bearer ${token}` })
                .then((res) => {
                    expect(res.body.success).to.eq(true)
                    expect(res.body.code).to.eq(1000)
                })
        })

        
        // Test /user/get_list_saving_account
        it('POST /user/get_list_saving_account - All input are valid', () => {
            request
                .post('/user/get_list_saving_account')
                .set({ Authorization: `Bearer ${token}` })
                .then((res) => {
                    expect(res.body.success).to.eq(true)
                    expect(res.body.code).to.eq(1000)
                })
        })

    })

})