import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import app from '../../server/index';
import { user } from './user.test';

const { expect } = chai;
const request = supertest(app);
let categoryId = '';
let cheatId = '';
let userId = '';
let token = '';

describe('Cheat favorite server testing', () => {
  before((done) => {
    request
      .post('/api/v1/category')
      .send({ title: 'Installation' })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        categoryId = res.body.data.category._id;
      });

    request
      .post('/api/v1/user')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        token = res.body.data.token;
        const { _id } = jwt.decode(token);
        userId = _id;
        done();
      });
  });
  after((done) => {
    mongoose.connection.collections.cheats.drop(() => {});
    mongoose.connection.collections.categories.drop(() => {});
    mongoose.connection.collections.users.drop(() => {});
    done();
  });

  describe('Add Cheat', () => {
    it('should not add cheat without category', (done) => {
      request.post('/api/v1/cheat').end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.equal('Category does not exist.');
        done();
      });
    });

    it('should not add cheat without required data', (done) => {
      request
        .post('/api/v1/cheat')
        .send({ category: categoryId })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Description is required');
          done();
        });
    });

    it('should create cheat', (done) => {
      request
        .post('/api/v1/cheat')
        .send({
          description: 'Initialize a repository',
          line: 'git init',
          category: categoryId
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          const { line, _id } = res.body.data;

          expect(line).to.equal('git init');
          cheatId = _id;
          done();
        });
    });
  });

  describe('Get Cheats', () => {
    it('should add cheat as favorite', (done) => {
      request
        .post('/api/v1/cheat/favorite')
        .send({ cheatId, userId })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.category).to.equal(categoryId);
          done();
        });
    });

    it('should get all cheats', (done) => {
      request.get('/api/v1/category').end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.categories.length).to.equal(1);
        done();
      });
    });

    it('should add favorite option for authenticated user', (done) => {
      request
        .get('/api/v1/category')
        .set({ 'x-header-token': token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.categories[0].cheats[0].favorite).to.equal(true);
          done();
        });
    });
  });

  describe('Favorite Cheat', () => {
    it('should not add invalid cheat as favorite', (done) => {
      request.post('/api/v1/cheat/favorite').end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Cheat not found.');
        done();
      });
    });

    it('should get all user favorite', (done) => {
      request
        .get('/api/v1/cheat/favorite')
        .set({ 'x-header-token': token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should remove cheat as favorite', (done) => {
      request
        .post('/api/v1/cheat/favorite')
        .send({ cheatId, userId })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.category).to.equal(categoryId);
          done();
        });
    });
  });
});
