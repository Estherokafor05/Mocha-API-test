import { expect } from 'chai';
import request from 'supertest';

const apiBaseUrl = 'https://swapi.dev/api';

describe("GET /planets/3", function () {
    it("Verify response headers", async function() {
        const response = await request(apiBaseUrl)
            .get("/planets/3");

        expect(response.headers['content-type']).to.equal('application/json');
        expect(response.header["vary"]).to.contain("Accept");
        expect(response.header["vary"]).to.contain("Cookie");
    });

    it ('Verify JSON Schema Validation - type and actual values', async function() {
        const response = await request(apiBaseUrl)
            .get("/planets/3")
            .set('Content-Type', 'application/json');

        expect(response.body).to.have.property('name').that.is.a('string');
        expect(response.body).to.have.property('rotation_period').that.is.a('string');
        expect(response.body).to.have.property('orbital_period').that.is.a('string');
        expect(response.body).to.have.property('population').that.is.a('string');
        expect(response.body).to.have.property('diameter').that.is.a('string');
        expect(response.body).to.have.property('climate').that.is.a('string');
        expect(response.body).to.have.property('terrain').that.is.a('string');
        expect(response.body).to.have.property('surface_water').that.is.a('string');
        expect(response.body).to.have.property('residents').that.is.an('array');
        expect(response.body).to.have.property('films').that.is.an('array');
        expect(response.body).to.have.property('created').that.is.a('string');
        expect(response.body).to.have.property('edited').that.is.a('string');
        expect(response.body).to.have.property('url').that.is.a('string');
    });

    it("Verify does not exceed 3ms", function(done) {
        request(apiBaseUrl)
            .get('/planets/3')
            .timeout(3000)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done(); 
            });
    });

    it ('Verify unable to post request', function(done) {
        const message = {
            "name": "Automated testing",
            "Completed": true
        
    
        request(apiBaseUrl)
            .post('/planets/3')
            .send(message)
            .set('Accept', 'application/json')
            .expect(405)
            .end((err, res) => {
                expect(res.body).to.eql({ "detail": "Method 'POST' not allowed." });
                done();
            });
    });

    it("Verifies the response data", async function () {
        const response = await request(apiBaseUrl)
            .get('/planets/3')
            .set('Content-Type', 'application/json');
    
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("url");
        expect(response.body).to.have.property("climate");
    });
    
    describe("GET /planets/3", function () {
        it("Create a test that mocks out the response and returns a different value for the name object", async function () {
            const response = await request(apiBaseUrl).get("/planets/3");
            const newName = "Esther Okafor";
            response.body.name = newName;
            expect(response.body.name).to.equal(newName);
        });
    });
});
