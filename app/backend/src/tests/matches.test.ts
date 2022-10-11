import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp= require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

import { app } from '../app';
import { Response } from 'superagent';
import MatchesModel from '../database/models/MacthesModel';
import { allMatches, newMatch } from './mocks/matches';
import { IMatch } from '../interface/IMatch';


describe('Test /matches', () => {
   describe('/GET /matches', () => {
     describe('Test if return all matches', () => {
       
      
        beforeEach(() => {
            sinon.stub(MatchesModel, 'findAll').resolves(allMatches as unknown as MatchesModel[])
        });
    
        afterEach(() => {
          (MatchesModel.findAll as sinon.SinonStub).restore();
        });  
     

       it('Test if return all matches with status code 200', async () => {
          const matches = await chai.request(app).get('/matches');

          expect(matches.status).to.be.equal(200);
          expect(matches.body).to.be.deep.equal(allMatches);
       });


      describe('Test if return all matches in progess', () => {
        beforeEach(() => {
            sinon.stub(MatchesModel, 'findAll').resolves(allMatches as unknown as MatchesModel[]);
        });
    
        afterEach(() => {
          (MatchesModel.findAll as sinon.SinonStub).restore();
        });

      
      describe('Test create newmatch', () => {
        beforeEach(() => {
            sinon.stub(MatchesModel, 'create').resolves(newMatch as MatchesModel);
        });
    
        afterEach(() => {
          (MatchesModel.findAll as sinon.SinonStub).restore();
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
            expect(newMatch.body).to.be.equal({})
          });
      });
      });
     });         
   });
})