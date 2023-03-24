import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { matches, finished } from './mocks/matchesMock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for matches route', function () {
    let chaiHttpResponse: Response;
    let token: string;
    
    before(async function () {
        //executa antes de todos os testes
        sinon.stub(MatchModel, 'findAll').resolves(matches);
        sinon.stub(MatchModel, 'findOne').resolves(matches[0]);
    });
    
    afterEach(function () {
        //restaura o mock a cada teste
        sinon.restore();
    });
    
    it('Should return all matches', async function () {
        chaiHttpResponse = await chai.request(app).get('/matches');
        const result = chaiHttpResponse;
    
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.deep.equal(matches);
    });
    
    it('Should return a match by id', async function () {
        chaiHttpResponse = await chai.request(app).get('/matches/:1');
        const result = chaiHttpResponse;
    
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.deep.equal(matches[0]);
    });

    it('Should return only finished matchs', async function () {
        chaiHttpResponse = await chai.request(app).get('/matches')
        .query({ inProgress: false});
        const result = chaiHttpResponse;
    
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.deep.equal(finished);
    });

    it('Should be able to finish a match', async function () {
        chaiHttpResponse = await chai.request(app).post('/login').send({
            email: 'admin@admin.com',
            senha: 'secret_admin',
        });

        const {
            body: { token },
        } = chaiHttpResponse

        chaiHttpResponse = await chai.request(app).patch('/matches/1')
        .set('Authorization', token);

        const { status,
        body: { message } } = chaiHttpResponse;

        expect(status).to.be.equal(200);
        expect(message).to.be.deep.equal('Finished');

        });
    });
