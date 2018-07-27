import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import authentication from '../../middleware/authentication';

chai.use(sinonChai);

describe('Test User Authentication', () => {
  it('should return next function if the user is a caterer', () => {
    const request = {
      decoded: {
        userType: 'caterer',
      }
    };
    const next = sinon.spy();
    const req = mockReq(request);
    const res = mockRes();
    authentication.isCaterer(req, res, next);
    expect(next.called).to.equal(true);
  });
  it('should return message if the user is not caterer', () => {
    const request = {
      decoded: {
        userType: 'customer',
      },
    };
    const next = sinon.spy();
    const req = mockReq(request);
    const res = mockRes();
    authentication.isCaterer(req, res, next);
    expect(res.json).to.be
      .calledWith({ 
        message: 'You must be caterer to perform this operation' 
      });
  });
  it('should return next function if the user is a caterer', () => {
    const request = {
      decoded: {
        userType: 'customer',
      }
    };
    const next = sinon.spy();
    const req = mockReq(request);
    const res = mockRes();
    authentication.isCustomer(req, res, next);
    expect(next.called).to.equal(true);
  });
  it('should return message if the user is not customer', () => {
    const request = {
      decoded: {
        userType: 'caterer',
      },
    };
    const next = sinon.spy();
    const req = mockReq(request);
    const res = mockRes();
    authentication.isCustomer(req, res, next);
    expect(res.json).to.be
      .calledWith({ 
        message: 'You must be registered to perform this operation' 
      });
  });
});