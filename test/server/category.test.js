import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../server/index';

const { expect } = chai;
const request = supertest(app);

describe('Category server testing', () => {
  after((done) => {
    mongoose.connection.collections.categories.drop(() => {});
    done();
  });

  describe('Create category', () => {
    it('should not create category without title', (done) => {
      request.post('/api/v1/category').end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Category title is required');
        done();
      });
    });

    it('should create category title', (done) => {
      request.post('/api/v1/category').send({ title: 'Installation' }).end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data.category.title).to.equal('Installation');
        done();
      });
    });
  });
});
