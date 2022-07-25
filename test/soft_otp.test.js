import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:5000')

describe('Soft OTP', () => {

    const loginData = {
        "phone": "0967780420",
        "password": "1234567"
    }
    
    let token = ""

    beforeEach(async function() {
        const response = await request.post('/auth/login').send(loginData)
        token = response.body.data.token
    }) 

    describe('Soft OTP API', () => {
        
        // Test /soft_otp/turn_on
        it('POST /soft_otp/turn_on - All input are valid', () => {
            const data = {
                password: "123456",
                pin: "123456"
            }

            request
                .post('/soft_otp/turn_on')
                .set({ Authorization: `Bearer ${token}` })
                .send(data)
                .then((res) => {
                    expect(res.body.success).to.eq(true)
                    expect(res.body.code).to.eq(1000)
                })
        })

        it('POST /soft_otp/turn_on - OTP is already turn on', () => {
            const data = {
                password: "123456",
                pin: "123456"
            }

            request
                .post('/soft_otp/turn_on')
                .set({ Authorization: `Bearer ${token}` })
                .send(data)
                .then((res) => {
                    expect(res.body.success).to.eq(false)
                    expect(res.body.code).to.eq(1115)
                })
        })

        // Test /soft_otp/turn_off
        it('POST /soft_otp/turn_off - All input are valid', () => {
            const data = {
                password: "123456",
                pin: "123456"
            }

            request
                .post('/soft_otp/turn_off')
                .set({ Authorization: `Bearer ${token}` })
                .send(data)
                .then((res) => {
                    expect(res.body.success).to.eq(true)
                    expect(res.body.code).to.eq(1000)
                })
        })

        // Test /soft_otp/check_otp
        it('POST /soft_otp/check_otp - All input are valid', () => {
            const data = {
                pin: "123456"
            }
            request
                .post('/soft_otp/check_otp')
                .set({ Authorization: `Bearer ${token}` })
                .send(data)
                .then((res) => {
                    expect(res.body.success).to.eq(true)
                    expect(res.body.code).to.eq(1000)
                })
        })

        // Test /soft_otp/update
        it('POST /soft_otp/update - All input are valid', () => {
            const data = {
                pin_old: "123456",
                pin_new: "123454"
            }
            request
                .post('/soft_otp/update')
                .set({ Authorization: `Bearer ${token}` })
                .send(data)
                .then((res) => {
                    expect(res.body.success).to.eq(true)
                    expect(res.body.code).to.eq(1000)
                })
        })

        it('POST /soft_otp/update - pin_new length is greater than 6', () => {
            const data = {
                pin_old: "123456",
                pin_new: "1234547"
            }
            request
                .post('/soft_otp/update')
                .set({ Authorization: `Bearer ${token}` })
                .send(data)
                .then((res) => {
                    expect(res.body.success).to.eq(false)
                    expect(res.body.code).to.eq(1004)
                })
        })

        it('POST /soft_otp/update - pin_new and retype_pin_new is not match', () => {
            const data = {
                pin_old: "123456",
                pin_new: "1234547"
            }
            request
                .post('/soft_otp/update')
                .set({ Authorization: `Bearer ${token}` })
                .send(data)
                .then((res) => {
                    expect(res.body.success).to.eq(false)
                })
        })

        // Test /soft_otp/forget
        it('POST /soft_otp/forget - All input are valid', () => {
            const data = {
                pin_new: "123455",
                password: "1234567"
            }
            request
                .post('/soft_otp/forget')
                .set({ Authorization: `Bearer ${token}` })
                .send(data)
                .then((res) => {
                    expect(res.body.success).to.eq(true)
                    expect(res.body.code).to.eq(1000)
                })
        }) 

        it('POST /soft_otp/forget - Password is incorrect', () => {
            const data = {
                pin_new: "123455",
                password: "12345"
            }
            request
                .post('/soft_otp/forget')
                .set({ Authorization: `Bearer ${token}` })
                .send(data)
                .then((res) => {
                    expect(res.body.success).to.eq(false)
                    expect(res.body.code).to.eq(1102)
                })
        }) 

    })

})