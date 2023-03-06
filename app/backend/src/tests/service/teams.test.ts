import Sinon from "sinon";
import teams from "../mocks/teamsMock";
import TeamModel from "../../database/models/TeamModel";
import { Model } from 'sequelize';
//import * as chai from 'chai';
import { app } from '../../app';

let chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Tests for teams service', function (){

    before (async function (){ //executa antes de todos os testes
        Sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);
    });

    afterEach(function (){ //restaura o mock a cada teste
        Sinon.restore();
    });

    it('Should return all teams', async function () {
        const result = await chai.request(app).get('/teams');
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.deep.equal(teams);
    });

    it('Should return a team by id', async function () {
        const result = await chai.request(app).get('/teams/1');
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.deep.equal(teams[0]);
    });
});