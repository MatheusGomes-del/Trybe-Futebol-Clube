import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import LoginController from '../controller/loginController';
import exp from 'constants';
import IUser from '../interface/User';
import Users from '../database/models/UserModel';
// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjY1NDQ0NDg3LCJleHAiOjE2NjU5NjI4ODd9._eHb9_ZIc7FEAW-Ah9erSkoqiKM21mp6CSG4kyJsafQ`

chai.use(chaiHttp);

const { expect } = chai;

describe('POST on /login', () => {

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
    })
    
    it('Verify if login is validate', async () => {
       const validate = await chai.request(app).get('/login/validate').send()
       expect(validate.status).to.be.equal(200); 
    });
});
