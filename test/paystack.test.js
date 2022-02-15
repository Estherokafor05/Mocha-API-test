const request = require("supertest")("https://swapi.dev/api");
const chai = require("chai");
const expect = require('chai').expect;
const should = require("chai").should();


describe("GET /planets/3", function () {
it("Verify response headers", async function() {
        const response = await request.get("/");
	    expect(response.headers['content-type']).to.equal('application/json');
        expect(response.header["vary"]).to.contain("Accept");
        expect(response.header["vary"]).to.contain("Cookie");
    });
});


it ('Verify JSON Schema Validation - type and actual values', function(){
    request
    .get('/')
    .set('Content-Type', 'application/json')
    .expect(function(res) {
    //Verify type of values for needed keys in response
    chai.assert.jsonSchema(res.body.name, {"type": 'string'})
    chai.assert.jsonSchema(res.body.rotation_period, {"type": 'number'})
    chai.assert.jsonSchema(res.body.orbital_period, {"type": 'number'})
    chai.assert.jsonSchema(res.body.population, {"type": 'number'})
    chai.assert.jsonSchema(res.body.diameter, {"type": 'number'})
    chai.assert.jsonSchema(res.body.climate, {"type": 'string'})
    chai.assert.jsonSchema(res.body.terrain, {"type": 'string'})
    chai.assert.jsonSchema(res.body.surface_water, {"type": 'number'})
    chai.assert.jsonSchema(res.body.population, {"type": 'number'})
    chai.assert.jsonSchema(res.body.residents, {"type": 'array'})
    chai.assert.jsonSchema(res.body.films, {"type": 'string'})
    chai.assert.jsonSchema(res.body.created, {"type": 'string'})
    chai.assert.jsonSchema(res.body.edited, {"type": 'string'})
    chai.assert.jsonSchema(res.body.url, {"type": 'string'})
    })

})

it("Verify timeout", async function() {
    request
    .get('/')
    this.timeout(3000);
})

it ('Verify unabe to post request', function() {
    let message = {
        
            "name": "Automated testing",
            "Completed": true
    }
    request
    .post('/')
    .send(message)
    .set('Accept', 'application.json')
    .then( function (res) {
        expect(res.statusCode).to.eql(405)
        expect(res.body).to.eql("Method 'POST' not allowed.")
    })
    })
   
    it("Verifies the response data", function () {
        request
        .get('/')
        .set('Content-Type', 'application/json')
        .expect(function(response) {
        should.exist(response.body);
        response.body.should.be.a("object");
        expect(response.body.should.have.property("url"));
        expect(response.body.should.have.property("climate"));
        expect(response.body.should.have.property("population"));
        expect(response.body.should.have.property("diameter"));
        expect(response.body.should.have.property("orbital_period"));
        expect(response.body.should.have.property("rotation_period"));
      });
    });


    describe("GET /planets/3", function () {
        it("Create a test that mocks out the response and returns a different value for the name object", async function () {
          const response = await request.get("/planets/3");
          should.exist(response.body);
          const newName = "Esther Okafor";
          response.body.name = newName;
          expect(response.body.name.should.be.equal(`${newName}`));
        });
      });

      it("Verifies response time does not exceed 3s", async () => {
        // Arrange
        const startTime = performance.now();
        
        // Act
        await request.get("/planets/3");
        if (performance.now() - startTime > 3000) {
          console.log("response time exceeded 3ms");
        }
    
        // Assert
        expect(performance.now() - startTime).to.be.lessThan(3000);
      });
    