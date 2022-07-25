import { expect } from "chai";
import supertest from "supertest";

const request = supertest('http://localhost:5000')

describe('FAQ', function() {

    const loginData = {
        "phone": "0967780420",
        "password": "1234567"
    }
    
    let token = ""

    this.beforeEach(async function() {
        const response = await request.post('/auth/login').send(loginData)
        token = response.body.data.token
    }) 
    
    
    // Test /faq/get_list
    it('POST /faq/get_list - All input are valid', () => {
        request
            .post('/faq/get_list')
            .set({ Authorization: `Bearer ${token}` })
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    // Test /faq/get_list_category
    it('POST /faq/get_list_category - All input are valid', () => {
        request
            .post('/faq/get_list_category')
            .set({ Authorization: `Bearer ${token}` })
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    // Test /faq/add
    it('POST /faq/add - All input are valid', () => {
        const data = {
            question: "Bạn đăng ký sử dụng dịch vụ Agribank E-mobile Banking ở đâu?",
            answer: "Quý khách có thể đến bất cứ Chi nhánh hoặc Phòng giao dịch nào của Agribank để đăng ký sử dụng dịch vụ.",
            category: "other_questions"
        }
        
        request
            .post('/faq/add')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
                expect(res.body.data.question).to.eq(data.question)
                expect(res.body.data.answer).to.eq(data.answer)
                expect(res.body.data.category).to.eq(data.answer)
            })
    })
    
    it('POST /faq/add - question is not defined', () => {
        const data = {
            answer: "Quý khách có thể đến bất cứ Chi nhánh hoặc Phòng giao dịch nào của Agribank để đăng ký sử dụng dịch vụ.",
            category: "other_questions"
        }
        
        request
            .post('/faq/add')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
    })

    it('POST /faq/add - answer is not defined', () => {
        const data = {
            question: "Bạn đăng ký sử dụng dịch vụ Agribank E-mobile Banking ở đâu?",
            category: "other_questions"
        }
        
        request
            .post('/faq/add')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
    })

    it('POST /faq/add - category is not defined', () => {
        const data = {
            question: "Bạn đăng ký sử dụng dịch vụ Agribank E-mobile Banking ở đâu?",
            answer: "Quý khách có thể đến bất cứ Chi nhánh hoặc Phòng giao dịch nào của Agribank để đăng ký sử dụng dịch vụ."
        }
        
        request
            .post('/faq/add')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
                expect(res.body.data.question).to.eq(data.question)
                expect(res.body.data.answer).to.eq(data.answer)
                expect(res.body.data.category).to.eq('other_questions')
            })
    })


    // Test /faq/edit
    it('POST /faq/edit - All input are valid', () => {
        const id = "6b1ece25-ce15-4485-9c31-7470f6d70954"
        const data = {
            id: id,
            question: "Bạn đăng ký sử dụng dịch vụ Agribank E-mobile Banking ở đâu? - editted",
            answer: "Quý khách có thể đến bất cứ Chi nhánh hoặc Phòng giao dịch nào của Agribank để đăng ký sử dụng dịch vụ. - editted",
            category: "other_questions"
        }
        
        request
            .post('/faq/edit')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    it('POST /faq/edit - question is not defined', () => {
        const id = "6b1ece25-ce15-4485-9c31-7470f6d70954"
        const data = {
            id: id,
            answer: "Quý khách có thể đến bất cứ Chi nhánh hoặc Phòng giao dịch nào của Agribank để đăng ký sử dụng dịch vụ. - editted",
            category: "other_questions"
        }
        
        request
            .post('/faq/edit')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
    })

    it('POST /faq/edit - answer is not defined', () => {
        const id = "6b1ece25-ce15-4485-9c31-7470f6d70954"
        const data = {
            id: id,
            question: "Bạn đăng ký sử dụng dịch vụ Agribank E-mobile Banking ở đâu? - editted",
            category: "other_questions"
        }
        
        request
            .post('/faq/edit')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1004)
            })
    })

    it('POST /faq/edit - id is not exist', () => {
        const id = "1"
        const data = {
            id: id,
            question: "Bạn đăng ký sử dụng dịch vụ Agribank E-mobile Banking ở đâu? - editted",
            answer: "Quý khách có thể đến bất cứ Chi nhánh hoặc Phòng giao dịch nào của Agribank để đăng ký sử dụng dịch vụ. - editted",
            category: "other_questions"
        }
        
        request
            .post('/faq/edit')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1138)
            })
    })

    // Test /faq/delete
    it('POST /faq/delete - All input are valid', () => {
        const id = "cd30a41d-ebdb-4824-8454-873fe2e87d64"
        const data = {
            id: id
        }
        
        request
            .post('/faq/delete')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(true)
                expect(res.body.code).to.eq(1000)
            })
    })

    it('POST /faq/delete - id is not exist', () => {
        const id = "1"
        const data = {
            id: id
        }
        
        request
            .post('/faq/delete')
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .then((res) => {
                expect(res.body.success).to.eq(false)
                expect(res.body.code).to.eq(1138)
            })
    })

})

