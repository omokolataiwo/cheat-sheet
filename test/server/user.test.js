import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../server/index';

const { expect } = chai;
const request = supertest(app);
export const user = {
  firstName: 'Kokolet',
  lastName: 'Balogun',
  username: 'kb@naija.com',
  password: 'sldslfslfsfslsldl'
};
describe('user server testing', () => {
  before((done) => {
    mongoose.connection.collections.users.insertMany(
      [
        {
          firstName: 'Kokolet',
          lastName: 'Shakushaku',
          username: 'shakushaku',
          password: 'ksdlsflsfskl'
        }
      ],
      () => done()
    );
  });

  after((done) => {
    mongoose.connection.collections.users.drop(() => {});
    done();
  });

  describe('Sign up User', () => {
    it('should not sign up without valid credential', (done) => {
      request.post('/api/v1/user/').end((err, res) => {
        expect(res.statusCode).equals(401);
        const {
          body: {
            error: { signup: signupError }
          }
        } = res;
        expect(signupError.username[0]).to.equal("Username can't be blank");
        expect(signupError.password[0]).to.equal("Password can't be blank");
        done();
      });
    });
    it('should sign up successfully', (done) => {
      request
        .post('/api/v1/user/')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equals(201);
          expect(res.body.message).to.equal('New user created');
          done();
        });
    });

    it('should not sign up with same credentials', (done) => {
      request
        .post('/api/v1/user/')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equals(400);
          expect(res.body.error).to.equal('username has already been used.');
          done();
        });
    });
  });

  describe('Sign in User', () => {
    it('should not sign in with invalid data', (done) => {
      request.post('/api/v1/user/signin').end((err, res) => {
        expect(res.statusCode).equals(404);
        const {
          body: {
            error: { signin: signupError }
          }
        } = res;
        expect(signupError[0]).to.equal('User does not exist.');
        done();
      });
    });
  });
});
