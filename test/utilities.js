const should = require('chai').should(),
      expect = require('chai').expect,
      supertest = require('supertest'),
      api = supertest('http://localhost:8000'),
      jwt_decode = require('jwt-decode')


module.exports = { should, expect, api, jwt_decode }