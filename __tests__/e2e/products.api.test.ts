import request from 'supertest'
import {app} from "../../src";



describe('/products', () => {

    beforeAll(async () => {
        await request(app).delete('products/__test__/data')
    })


    it('should return 200 and empty array', async () => {
        await request(app).get('/products')
            .expect(200, [])
    });
    it('should return 404 for not existing course', async () => {
        await request(app).get('/products/999999999')
            .expect(404)
    });
    it(`should'nt create course with incorrect input data`, async () => {

        await request(app)
            .post('/products')
            .send({title: ''})
            .expect(404)

        await request(app).get('/products')
            .expect(200, [])

    });


    let createdCourse: any = null


    it(`should create course with  input data`, async () => {

        const createResponse = await request(app)
            .post('/products')
            .send({title: 'sergei'})
            .expect(201)

        createdCourse = createResponse.body

        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: 'sergei'
        })

        await request(app)
            .get('/products')
            .expect(200, [createdCourse])
    });
    it(`should'nt update with incorrect input data`, async () => {
        await request(app)
            .put('/products/' + createdCourse.id )
            .send({title:''})
            .expect(400)

        await request(app)
            .get('/products/' + createdCourse.id)
            .expect(200,createdCourse)
    });
    it(`should'nt update course that not exist`, async () => {
        await request(app)
            .put('/products/' + 2 )
            .send({title:'eeeeeee'})
            .expect(404)

    });
    it(`should update course with  correct input data`, async () => {

        await request(app)
            .put('/products/' + createdCourse.id )
            .send({title:'yea'})
            .expect(201,{
                ...createdCourse,
                title:'yea'
            })
    });
    it(`should delete both courses`, async () => {

        await request(app)
            .delete('/products/' + createdCourse.id)
            .expect(204)

        await request(app)
            .get('/products/' + createdCourse.id)
            .expect(404)

        await request(app)
            .get('/products' )
            .expect(200,[])
    })


})