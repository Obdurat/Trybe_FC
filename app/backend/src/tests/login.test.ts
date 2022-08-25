import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
    it('Login with the right credentials', async () => {
      const response = await chai.request(app).post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' })

      expect(response.status).to.equal(200)
    });

    it('Login with the wrong credentials', async () => {
      const response = await chai.request(app).post('/login')
        .send({ email: 'xablau@admin.com', password: 'secret_wrong' });

      expect(response.status).to.equal(401);
    });

    it('Login without Email', async () => {
      const response = await chai.request(app).post('/login')
        .send({ mail: 'admin@admin.com', password: 'secret_admin' });

      expect(response.status).to.equal(400);
    });

    it('Login without password', async () => {
      const response = await chai.request(app).post('/login')
        .send({ email: 'admin@admin.com', pass: 'secret_admin' });

      expect(response.status).to.equal(400);
    });
});