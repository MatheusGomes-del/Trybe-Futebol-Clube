import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

import { app } from '../app';

import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';
import { allTeams, oneTeam } from './mocks/teams';


describe('Test /teams', () => {
   describe('GET /teams', () => {
     describe('Test return of all teams', () => {

        beforeEach(() => {
            sinon.stub(TeamsModel, 'findAll').resolves(allTeams as TeamsModel[])
          });
    
          afterEach(() => {
            (TeamsModel.findAll as sinon.SinonStub).restore();
          });
        
        it('Test if return all teams with status code 200', async () => {
          const teams = await chai.request(app).get('/teams');

          expect(teams.body).to.be.deep.equal(allTeams);
          expect(teams.status).to.be.equals(200);
        });
     });

     describe('Test /teams/:id', () => {
        beforeEach(() => {
            sinon.stub(TeamsModel, 'findOne').resolves(oneTeam as unknown as TeamsModel)
          });
    
          afterEach(() => {
            (TeamsModel.findOne as sinon.SinonStub).restore();
          });

        it('Test if return one team choosed by id', async () => {
           const team = await chai.request(app).get('/teams/3');

           expect(team.status).to.be.equal(200);
           expect(team.body).to.be.deep.equal(oneTeam);
        });
     });
   });
});