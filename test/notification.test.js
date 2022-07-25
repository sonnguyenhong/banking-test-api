import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:5000')
describe('Notification', function() {

    const loginData = {
        "phone": "0967780420",
        "password": "1234567"
    }
    
    let token = ""

    this.beforeEach(async function() {
        const response = await request.post('/auth/login').send(loginData)
        token = response.body.data.token
    }) 


    // Test /notification/create_noti_system
    it('POST /notification/create_noti_system - All input are valid', () => {
        const data = {
            title: "Title",
            content: "đây là thông báo hịn",
            image: "google.com.vn"
        }

        request
            .post('/notification/create_noti_system')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
                expect(res.body.data.title).to.eq(data.title)
                expect(res.body.data.content).to.eq(data.content)
            })
    })

    it('POST /notification/create_noti_system - Title is not defined', () => {
        const data = {
            content: "đây là thông báo hịn",
            image: "google.com.vn"
        }

        request
            .post('/notification/create_noti_system')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1005)
            })
    })


    it('POST /notification/create_noti_system - Content is not defined', () => {
        const data = {
            title: "Title",
            image: "google.com.vn"
        }

        request
            .post('/notification/create_noti_system')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
    })


    // Test /notification/get_list_notification
    it('POST /notification/get_list_notification - All input are valid', () => {
        const data = {
            type_notification: 0
        }

        request
            .post('/notification/get_list_notification')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    it('POST /notification/get_list_notification - type_notification is not defined', () => {
        const data = {
        
        }

        request
            .post('/notification/get_list_notification')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
    })


    // Test /notification/update_noti_system
    it('POST /notification/update_noti_system - All input are valid', () => {
        const data = {
            id:"6462d5ad-5cd6-47f0-bfc4-9723ad2010b7",
            content: "test notification",
            image: "google.com.vn"
        }

        request
            .post('/notification/update_noti_system')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
                expect(res.body.data.id).to.eq(data.id)
            })
    })  

    it('POST /notification/update_noti_system - id is not exist', () => {
        const data = {
            content: "test notification",
            image: "google.com.vn"
        }

        request
            .post('/notification/update_noti_system')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
    })

    // Test /notification/delete_noti_system
    it('POST /notification/delete_noti_system - All input are valid', () => {
        const id = "35b662f0-daae-4ff2-a8d1-e881fc2d4680"
        const data = {
            id: id
        }

        request
            .post('/notification/delete_noti_system')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    it('POST /notification/delete_noti_system - id is not exist', () => {
        const id = "1"
        const data = {
            id: id
        }

        request
            .post('/notification/delete_noti_system')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1116)
            })
    })

    it('POST /notification/delete_noti_system - id is not defined', () => {
        const data = {
            
        }

        request
            .post('/notification/delete_noti_system')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
    })
    
})