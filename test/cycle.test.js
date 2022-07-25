import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:5000')

describe('Cycle', function() {

    const loginData = {
        "phone": "0967780420",
        "password": "1234567"
    }
    
    let token = ""

    this.beforeEach(async function() {
        const response = await request.post('/auth/login').send(loginData)
        token = response.body.data.token
    }) 
    
    
    // Test /cycle/get_list
    it('POST /cycle/get_list - All input are valid', () => {
        request
            .post('/cycle/get_list')
            .set({ Authorization: `Bearer ${token}` })
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })
    

    // Test /cycle/:id
    it('POST /cycle/:id - All input are valid', () => {
        const id = '2f8e5010-3bb4-4846-8310-536bdd6fb684'
        request
            .post('/cycle/' + id)
            .set({ Authorization: `Bearer ${token}` })
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    it('POST /cycle/:id - Id is not exist', () => {
        const id = 1;
        request
            .post('/cycle/' + id)
            .set({ Authorization: `Bearer ${token}` })
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1108)
            })
    })

    // Test /cycle/create
    it('POST /cycle/create - All input are valid', () => {
        const data = {
            title: "2 tháng",
            month: 6,
            interest_rate: 3
        }
        request
            .post('/cycle/create')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
                expect(res.body.data.month).to.eq(data.month)
            })
    })

    it('POST /cycle/create - Cycle exist in db', () => {
        const data = {
            title: "2 tháng",
            month: 3,
            interest_rate: 3
        }
        request
            .post('/cycle/create')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1107)
            })
    })

    it('POST /cycle/create - Title is not defined', () => {
        const data = {
            month: 3,
            interest_rate: 3
        }
        request
            .post('/cycle/create')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
    })

    it('POST /cycle/create - Month is not defined', () => {
        const data = {
            title: "2 tháng",
            interest_rate: 3
        }
        request
            .post('/cycle/create')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
    })

    it('POST /cycle/create - Interest rate is not defined', () => {
        const data = {
            title: "2 tháng",
            month: 3
        }
        request
            .post('/cycle/create')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
    })


    // Test /cycle/update
    it('POST /cycle/update - All input are valid', () => {
        const data = {
            id:"2f8e5010-3bb4-4846-8310-536bdd6fb684",
            interest_rate: 3.5
        }
        request
            .post('/cycle/update')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
                expect(res.body.data.id).to.eq(data.id)
            })
    })

    it('POST /cycle/update - id is not exist', () => {
        const data = {
            id:"1",
            interest_rate: 3.5
        }
        request
            .post('/cycle/update')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1108)
            })
    })

    // Test /cycle/delete
    it('POST /cycle/delete - All input are valid', () => {
        const data = {
            id: "777fda6f-6dbf-46d5-8966-90b15295e23f"
        }

        request
            .post('/cycle/delete')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    it('POST /cycle/delete - id not exists', () => {
        const data = {
            id: "1"
        }

        request
            .post('/cycle/delete')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1108)
            })
    })
      
})

