import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test for leaderboard route', () => {

  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('Testa a rota GET Classificação', async () => {
    chaiHttpResponse = await chai
    .request(app).get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Testa a rota GET Classificação times da casa', async () => {
    chaiHttpResponse = await chai
    .request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Testa a rota GET Classificação times visitantes', async () => {
    chaiHttpResponse = await chai
    .request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});