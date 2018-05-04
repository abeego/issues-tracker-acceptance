const ta = require('../utilities')

describe('/api', () => {
  context("When the user doesn't have permissions", () => {
    it('shuld not have access to api', () => {
      return ta.api.get('/api/')
        .set('HTTP', '401 Unauthorized')
        .set('Content-Type', 'application/json')
        .set('Allow', 'GET, HEAD, OPTIONS')
        .expect(401)
        .then(res => {
          ta.expect(res.body).to.have.property('detail')
          ta.expect(res.body.detail).to.equal('Authentication credentials were not provided.')
        })
    })
  })
})