const ta = require('../utilities'),
      data = require('./acc_data')

describe('/api/token/', () => {
  context("When the user want login must have token", () => {
    it('should return token for exising user', () => {
      return ta.api.post('/api/token/')
        .set('Content-Type', 'application/json')
        .send({ "username": data.user.username, "password": data.user.password})
        .expect(200)
        .then(res => {
          ta.expect(res.body).to.have.property('refresh')
          ta.expect(res.body.refresh).to.not.equal(null)
          ta.expect(res.body).to.have.property('access')
          ta.expect(res.body.access).to.not.equal(null)
        })
    })
  })
})