import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import IUser from '../interface/User';
import Users from '../database/models/UserModel';
import { send } from 'process';
import { invalidUser, MESSAGE_ERROR_INVALID_USER, MESSAGE_ERROR_LESS_INFORMATION, role, userToken, userWithouEmail, userWithouPassword } from './mocks/login';
import { response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test /login', () => {
    
    describe('POST /login', () => {
        describe('Test valid user', () => {
            before(() => sinon.stub(Users, "findOne").resolves({role:'admin'} as Users))
    
            after(() => {
                (Users.findOne as sinon.SinonStub).restore();
            })
            
    
            const loginBody = {
                "email": "admin@admin.com",
                "password": "secret_admin"
            }
        
            it('Login must be succefully', async () => {
                const login = await chai.request(app).post('/login').send({
                    email: 'admin@admin.com',
                    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
                  });
                  expect(login.status).to.be.equal(200);
                  expect(login.body).to.be.equal(loginBody);
                  expect(login.body).to.have.property('token');
            });
        });
    });

    describe('Test return with invalid infos of User', () => {
        beforeEach(() => {
            sinon.stub(Users, 'findOne').resolves(null as unknown as Users);
          });

          afterEach(() => {
            (Users.findOne as sinon.SinonStub).restore();
          });
          
        it('Should return error message with status 401', async () => {
           const loginError = await chai.request(app).post('/login').send(invalidUser);
           expect(loginError.status).to.be.equal(401);
           expect(loginError.body).to.be.equal(MESSAGE_ERROR_INVALID_USER);    
        }); 
    });

    describe('Test return without password', () => {
        it('Should return error message with status 400', async () => {
          const response = await chai.request(app).post('/login').send(userWithouPassword);
  
          expect(response.body).to.be.deep.equal(MESSAGE_ERROR_LESS_INFORMATION);
          expect(response.status).to.be.equal(400);
        });
      });


    describe('Test return without email', () => {
        it('Should return error message with status 400', async () => {
            const response = await chai.request(app).post('/login').send(userWithouEmail);

            expect(response.body).to.be.deep.equal(MESSAGE_ERROR_LESS_INFORMATION);
            expect(response.status).to.be.equal(400);
        });
    });

    describe('GET /login/validate', () => {
        describe('Test valdid validate', () => {
            beforeEach(() => {
                sinon.stub(Users, 'findOne').resolves(role as Users)
            });

            afterEach(() => {
                (Users.findOne as sinon.SinonStub).restore();
            });

            it('Verify if return status 200 with valid user', async () => {
                const validate = await chai.request(app).get('/login/validate').set('authorization', userToken)
                expect(validate.status).to.be.equal(200);
                expect(validate.body).to.be.deep.equal({ role })
             });
        });

        describe('Return error when dont receive token', () => {
            it('Test if returns error with status 401', async () => {
               const error = await chai.request(app).get('/login/validate');

               expect(error.body).to.be.deep.equal({ message: 'You need a token to access this route' });
               expect(error.status).to.be.equal(401);
            });
        })
    })
});
