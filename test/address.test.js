import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:5000')

describe('Address', function() {

    const loginData = {
        "phone": "0967780420",
        "password": "1234567"
    }
    
    let token = ""

    this.beforeEach(async function() {
        const response = await request.post('/auth/login').send(loginData)
        token = response.body.data.token
    }) 
    
    
    // Test /address/get_list
    it('POST /address/get_list - All input are valid', () => {
        const data = {
            
        }

        request
            .post('/address/get_list')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    // Test /address/add
    it('POST /address/add - All input are valid', () => {
        const data = {
            district: "Huyện Thường Tín",
            province: "Thành Phố Hà Nội",
            ward: "xã Dũng Tiến",
            type: "transaction_room"
        }

        request
            .post('/address/add')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    it('POST /address/add - Address is not exist', () => {
        const data = {
            district: "Huyện Tam Dương",
            province: "Thành Phố Hà Nội",
            ward: "xã Dũng Tiến",
            type: "transaction_room"
        }

        request
            .post('/address/add')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1134)
            })
    })


    // Test /address/edit
    it('POST /address/edit - All input are valid', () => {
        const data = {
            id: "e6922172-997e-4216-bfa8-4faabd7e9122",
            district: "Huyện Tam Dương",
            province: "Tỉnh Vĩnh Phúc",
            ward: "xã Duy Phiên",
            type: "transaction_room"
        }

        request
            .post('/address/edit')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    it('POST /address/edit - Address is not exist', () => {
        const data = {
            id: "e6922172-997e-4216-bfa8-4faabd7e9122",
            district: "Huyện Tam",
            province: "Thành Phố Hà Nội",
            ward: "xã Dũng Tiến",
            type: "transaction_room"
        }

        request
            .post('/address/edit')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1005)
            })
    })
    
    
    // Test  /address/delete
    it('POST /address/delete - All input are valid', () => {
        const id = "8f4e7b8b-1851-44c6-ac21-bc22c55d2c7b"
        const data = {
            id: id
        }

        request
            .post('/address/delete')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    it('POST /address/delete - id is not exist', () => {
        const id = "1"
        const data = {
            id: id
        }

        request
            .post('/address/delete')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1134)
            })
    })


})

