import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { user } from "./mocks/userMock";
import UserModel from "../database/models/UserModel";
import { app } from '../app'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe ('Tests for user route', function () {
    let chaiHttpResponse: Response;

    before (async function () {
        sinon.stub(UserModel, 'findOne').resolves(user as unknown as UserModel); 
    });

    afterEach(function (){
        sinon.restore();
    });

    it('Should return a token with valid email and password', async function () {

        chaiHttpResponse = await chai.request(app).post('/login').send({
            email: user.email,
            senha: user.password,
        });

        const result = chaiHttpResponse
        const token = result.body.token;

        expect(result.status).to.be.equal(200);
        expect(token).to.be('string');
    });

    it('Should return an error when an email is not provide', async function () {

        chaiHttpResponse = await chai.request(app).post('/login').send({
            email: '',
            senha: user.password,
        });

        const result = chaiHttpResponse

        expect(result.status).to.be.equal(400);
        expect(result.body.message).to.be.equal('All fields must be filled');
    });

    it('Should return an error when a password is not provide', async function () {

        chaiHttpResponse = await chai.request(app).post('/login').send({
            email: user.email,
            senha: '',
        });

        const result = chaiHttpResponse

        expect(result.status).to.be.equal(400);
        expect(result.body.message).to.be.equal('All fields must be filled');
    });

    it('Should return an error with a not valid email type', async function() {

        chaiHttpResponse = await chai.request(app).post('/login').send({
            email: 'admin',
            senha: user.password,
        });

        const result = chaiHttpResponse

        expect(result.status).to.be.equal(400);
        expect(result.body.message).to.be.equal('Invalid email or password');
    });

    it('Should return an error with a not valid password type', async function() {
            
        chaiHttpResponse = await chai.request(app).post('/login').send({
            email: user.email,
            senha: 'alou',
        });

        const result = chaiHttpResponse

        expect(result.status).to.be.equal(400);
        expect(result.body.message).to.be.equal('Invalid email or password');
    });

    it('Should return a role with a valid token', async function () {
            
            chaiHttpResponse = await chai.request(app).post('/login').send({
                email: user.email,
                password: user.password,
            });

            const { body: {
                token
            } } = chaiHttpResponse;

            chaiHttpResponse = await chai.request(app).get('/role')
            .set('Authorization', token)
            .send({
                email: user.email,
                password: user.password,
            });

            const result = chaiHttpResponse;

            expect(result.status).to.be.equal(200);
            expect(result.body.role).to.be.equal('admin');
    });
});