import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp= require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

import { app } from '../app';
import { Response } from 'superagent';
import MatchesModel from '../database/models/MacthesModel';
import { allMatches, newMatch } from './mocks/matches';
import { IMatch } from '../interface/IMatch';
import { token } from './mocks/login';


describe('Test /matches', () => {
   describe('/GET /matches', () => {
     describe('Test if return all matches', () => {
       
        beforeEach(() => {
            sinon.stub(MatchesModel, 'findAll').resolves(allMatches as unknown as MatchesModel[]);
        });
    
        afterEach(() => {
          (MatchesModel.findAll as sinon.SinonStub).restore();
        });  
     

       it('Test if return all matches with status code 200', async () => {
          const matches = await chai.request(app).get('/matches');

          expect(matches.status).to.be.equal(200);
          expect(matches.body).to.be.deep.equal(allMatches);
       });

      
    describe('Test create newmatch', () => {
        beforeEach(async () => {
            let response: Response
            response = await chai.request(app).post('/matches').set('authorization', token).send(newMatch);
            sinon.stub(MatchesModel, 'findOne').resolves(newMatch as MatchesModel);
            sinon.stub(jwt, 'verify').resolves(true);
        });
    
        afterEach(() => {
          (MatchesModel.findOne as sinon.SinonStub).restore();
          (jwt.verify as sinon.SinonStub).restore();
        });

        it("Test if it's can create a new match and status code ", async () => {
            const newMatch = await chai.request(app).post('/matches').send({
              "homeTeam": 16,
              "awayTeam": 8,
              "homeTeamGoals": 2,
              "awayTeamGoals": 2,
              "inProgress": true
            });
  
            expect(newMatch.status).to.be.equal(201);
            expect(newMatch.body).to.be.deep.equal(newMatch.body);
          });
      });

    describe('Test if changeStatus', () => {
      it('Test if return status code 200 and  change status of match', async () => {
        const newStatusToMatch = await chai.request(app).patch('/matches/3/finish');

        expect(newStatusToMatch.body).to.be.deep.equal({ message: 'finished'});
        expect(newStatusToMatch.status).to.be.deep.equal(200);
      });
    });
    });         
   });
});