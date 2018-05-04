const ta = require('../utilities'),
      data = require('./acc_data')

describe('/api/registration/', () => {
  context("When the user want signup", () => {
    it('should have possibility to register', () => {
      return ta.api.post('/api/registration/')
        .send(data.user)
        .expect(201)
        .then(res => {
          ta.expect(res.body).to.have.property('message')
          ta.expect(res.body.message).to.include("User has been created.")
        })
    })
  })
})