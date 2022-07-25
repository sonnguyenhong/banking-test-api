import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:5000')

describe('Physical Card', function() {

    const loginData = {
        "phone": "0967780420",
        "password": "1234567"
    }
    
    let token = ""

    this.beforeEach(async function() {
        const response = await request.post('/auth/login').send(loginData)
        token = response.body.data.token
    }) 
    
    
    // Test /physical_card/get_list
    it('POST /physical_card/get_list - All input are valid', () => {
        request
            .post('/physical_card/get_list')
            .set({ Authorization: `Bearer ${token}` })
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })


    // Test /physical_card/detail
    it('POST /physical_card/detail - All input are valid', () => {
        const id = "0bc415d1-9bd6-4aa6-96e6-fabc266ea744"
        const data = {
            id: id
        }
        request
            .post('/physical_card/detail')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
                expect(res.body.data.id).to.eq(data.id)
            })
    })

    it('POST /physical_card/detail - id is not exists', () => {
        const id = "1"
        const data = {
            id: id
        }
        request
            .post('/physical_card/get_list')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1136)
            })
    })

    // Test /physical_card/update
    it('POST /physical_card/update - All input are valid', () => {
        const id = "0bc415d1-9bd6-4aa6-96e6-fabc266ea744"
        const data = {
            id: id,
            limit_cash: 500000000,
            limit_internet: 1000000000
        }
        request
            .post('/physical_card/update')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
                expect(res.body.data.id).to.eq(data.id)
            })
    })

    it('POST /physical_card/update - id is not exist', () => {
        const id = "1"
        const data = {
            id: id,
            limit_cash: 500000000,
            limit_internet: 1000000000
        }
        request
            .post('/physical_card/update')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1136)
            })
    })
      
    // Test /physical_card/get_limit_trans
    it('POST /physical_card/get_limit_trans - All input are valid', () => {
        const id = "0bc415d1-9bd6-4aa6-96e6-fabc266ea744"
        const data = {
            id: id
        }
        request
            .post('/physical_card/get_limit_trans')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    it('POST /physical_card/get_limit_trans - id is not exist', () => {
        const id = "1"
        const data = {
            id: id
        }
        request
            .post('/physical_card/get_limit_trans')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1136)
            })
    })

    // Test /physical_card/change_pin
    it('POST /physical_card/change_pin - All input are valid', () => {
        const id = "0bc415d1-9bd6-4aa6-96e6-fabc266ea744"
        const data = {
            id: id,
            pin_old: "123456",
            pin_new: "123456"
        }
        request
            .post('/physical_card/change_pin')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    it('POST /physical_card/change_pin - id is not exist', () => {
        const id = "1"
        const data = {
            id: id,
            pin_old: "123456",
            pin_new: "123456"
        }
        request
            .post('/physical_card/change_pin')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1136)
            })
    })


})

