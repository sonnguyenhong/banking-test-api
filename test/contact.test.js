import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:5000')
describe('Contact', function() {

    const loginData = {
        "phone": "0967780420",
        "password": "1234567"
    }
    
    let token = ""

    this.beforeEach(async function() {
        const response = await request.post('/auth/login').send(loginData)
        token = response.body.data.token
    }) 


    // Test /contact/get_list
    it('POST /contact/get_list - All input are valid', () => {
        const data = {
            type_contact: 1,
            index: 0,
            count: 20
        }

        request
            .post('/contact/get_list')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
            
    })

    it('POST /contact/get_list - Dont have enough data', () => {
        const data = {
           
        }

        request
            .post('/contact/get_list')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
            
    })

    // Test /contact/:id
    it('POST /contact/:id - All input are valid', () => {
        const id = '5d89eda1-ed6f-4c2e-896e-b2a6a37331ed'

        request
            .post('/contact/' + id)
            .set({ Authorization: `Bearer ${token}` })
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
            
    })

    // Test /contact/create
    it('POST /contact/create - All input are valid', () => {
        const data = {
            type_contact: "1",
            nick_name: "manh_yellow",
            account_number: "7932801610284",
            name_bank_interbank:"viettin bank"
        }

        request
            .post('/contact/create')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
                expect(res.body.data.type_contact).to.eq(data.type_contact)
                expect(res.body.data.nick_name).to.eq(data.nick_name)
                expect(res.body.data.account_number).to.eq(data.account_number)
            })
            
    })

    it('POST /contact/create - Contact already exist', () => {
        const data = {
            type_contact: "1",
            nick_name: "manh_yellow",
            account_number: "7932801610284",
            name_bank_interbank:"viettin bank"
        }

        request
            .post('/contact/create')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1105)
            })
            
    })

    it('POST /contact/create - Type contact is not defined', () => {
        const data = {
            nick_name: "manh_yellow",
            account_number: "7932801610284",
            name_bank_interbank:"viettin bank"
        }

        request
            .post('/contact/create')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
            
    })

    it('POST /contact/create - Nickname is not defined', () => {
        const data = {
            type_contact: "1",
            account_number: "7932801610284",
            name_bank_interbank:"viettin bank"
        }

        request
            .post('/contact/create')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
            
    })

    it('POST /contact/create - Account number is not defined', () => {
        const data = {
            type_contact: "1",
            nick_name: "manh_yellow",
            name_bank_interbank:"viettin bank"
        }

        request
            .post('/contact/create')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
            
    })

    it('POST /contact/create - Name bank interbank is not defined', () => {
        const data = {
            type_contact: "1",
            nick_name: "manh_yellow",
            account_number: "7932801610284"
        }

        request
            .post('/contact/create')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
            
    })


    // Test /contact/update
    it('POST /contact/update - All input are valid', () => {
        const id = '650674d2-7d0a-49a9-8eb8-4a5441f1132c'
        const data = {
            id: id,
            type_contact: "1",
            nick_name: "SOn"
        }

        request
            .post('/contact/update')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
                expect(res.body.data.id).to.eq(id)
            })
            
    })

    it('POST /contact/update - id is not exist', () => {
        const id = 1
        const data = {
            id: id,
            type_contact: "1",
            nick_name: "SOn"
        }

        request
            .post('/contact/update')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1106)
            })
            
    })

    // Test /contact/delete 
    it('POST /contact/delete - All input are valid', () => {
        const id = '683e361f-f218-498d-903c-06db76e887a2'
        const data = {
            id: id,
        }

        request
            .post('/contact/delete ')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
            
    })

    it('POST /contact/delete - id is not exist', () => {
        const id = '1'
        const data = {
            id: id,
        }

        request
            .post('/contact/delete ')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1106)
            })
            
    })

})