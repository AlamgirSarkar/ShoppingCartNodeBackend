import request from 'supertest';
import express, { Application } from 'express';
import { expect } from 'chai'; 
import userRoutes from '../src/routes/userRoutes'; 

const app: Application = express();
app.use('/users', userRoutes);

describe('User Routes', () => {
  it('GET /users should return 200 OK', (done:any) => {
    request(app)
      .get('/users')
      .expect(200)
      .end((err, _res) => {
        if (err) return done(err);
        done();
      });
  });

  it('GET /users/123 should return 500 Internal Server Error', (done:any) => {
    request(app)
      .get('/users/123')
      .expect(500)
      .end((err, _res) => {
        if (err) return done(err);
        done();
      });
  });
});