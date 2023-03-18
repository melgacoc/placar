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
            email: 'trybe@trybe.com',
            senha: 'nescaumelhorquetoddy',
        });

        const result = chaiHttpResponse
        const token = result.body.token;

        expect(result.status).to.be.equal(200);
        expect(token).to.be('string');
    });

    it('Should return an error when an email is not provide', async function () {

        chaiHttpResponse = await chai.request(app).post('/login').send({
            email: '',
            senha: 'nescaumelhorquetoddy',
        });

        const result = chaiHttpResponse

        expect(result.status).to.be.equal(400);
        expect(result.body.message).to.be.equal('All fields must be filled');
    });

    it('Should return an error when a password is not provide', async function () {

        chaiHttpResponse = await chai.request(app).post('/login').send({
            email: 'trybe@trybe.com',
            senha: '',
        });

        const result = chaiHttpResponse

        expect(result.status).to.be.equal(400);
        expect(result.body.message).to.be.equal('All fields must be filled');
    });
});