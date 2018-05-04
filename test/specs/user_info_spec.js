const ta = require('../utilities'),
      data = require('./acc_data')

describe('/api/user-info/', () => {
  context("When it want to show username", () => {
  let access_token
  before(() => {
    return ta.api.post('/api/token/')
      .send({"username": data.user.username, "password": data.user.password})
      .then(res => access_token = res.body.access)
  })

  it('should exist user with ID', () => {
    let decoded = ta.jwt_decode(access_token);
    return ta.api.post('/api/user-info/')
      .set('Authorization', 'Bearer ' + access_token)
      .send({ "user_id": decoded['user_id'] })
      .expect(200)
      .then(res => {
        ta.expect(res.body).to.have.property('username')
        ta.expect(res.body.username).to.be.equal(data.user.username)
      })
    })
  })
})