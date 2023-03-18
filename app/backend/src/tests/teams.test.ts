import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import teams from "./mocks/teamsMock";
import TeamModel from "../database/models/TeamModel";
import { app } from '../app'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for teams route', function (){

    let chaiHttpResponse: Response;

    before (async function (){ //executa antes de todos os testes
        sinon.stub(TeamModel, 'findAll').resolves(teams);
        sinon.stub(TeamModel, 'findOne').resolves(teams[0]);
    });

    afterEach(function (){ //restaura o mock a cada teste
        sinon.restore();
    });

    it('Should return all teams', async function () {

        chaiHttpResponse = await chai.request(app).get('/teams');
        const result = chaiHttpResponse
        
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.deep.equal(teams);
    });

    it('Should return a team by id', async function () {

        chaiHttpResponse = await chai.request(app).get('/teams/1');
        const result = chaiHttpResponse

        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.deep.equal(teams[0]);
    });
});