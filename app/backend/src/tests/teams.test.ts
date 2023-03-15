import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../database/models/TeamModel';
import TeamsService from '../api/services/teamsService';

import teamsMock from './mocks/teamsMock';

import { Response } from 'superagent';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endopoint /teams: Testando a camada Service', () => {
  it('Verifica se retorna a lista de todos os times', async () => {
    sinon.stub(Model, "findAll").resolves(teamsMock as  TeamModel[]);

    const chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock);
  });

  afterEach(()=>{
    (Model.findAll as sinon.SinonStub).restore();
  })
});
