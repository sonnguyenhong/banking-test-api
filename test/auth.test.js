import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:5000')

describe('Auth Login and Auth Register', function() {
    // Test /auth/register
    it('POST /auth/register - All input are valid', function () {
        const data = {
            name: "Son",
            phone: "0967874928",
            password: "123456"
        }
        request
            .post('/auth/register')
            .send(data)
            .then(function(res) {
                expect(res.body.success).to.eq(true)
                expect(res.body.data.name).to.eq(data.name)
                expect(res.body.data.phone).to.eq(data.phone)
            })
    })

    it('POST /auth/register - Phone number is already registed', function() {
        const data = {
            name: "Son",
            phone: "0967780420",
            password: "123456"
        }
        request
            .post('/auth/register')
            .send(data)
            .then(function(res) {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(9996)
            })
    })

    
    // Test /auth/login
    it('POST /auth/login - All inputs are valid', function() {
        const data = {
            phone: "0967780420",
            password: "123456"
        }
        request
            .post('/auth/login')
            .send(data)
            .then(function(res) {
                token = res.body.data.token
                expect(res.body.success).to.eq(true)
                expect(res.body.data.user.phone).to.eq(data.phone)
            })
    })

    it('POST /auth/login - Password is incorrect', function() {
        const data = {
            phone: "0967780420",
            password: "123454"
        }
        request
            .post('/auth/login')
            .send(data)
            .then(function(res) {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1100)
            })
    })
      
})

