const ta = require('../utilities'),
      data = require('./acc_data')

describe('/api/projects/', () => {
  context("When the user want to work on project", () => {
    let access_token, project_id
    before(() => {
      return ta.api.post('/api/token/')
        .send({"username": data.user.username, "password": data.user.password})
        .then(res => access_token = res.body.access)
    })

    it('should create new project', () => {
      return ta.api.post('/api/projects/')
        .set('Authorization', 'Bearer ' + access_token)
        .send({"name": data.project.name, "description": data.project.description})
        .expect(201)
        .then(res => {
          ta.expect(res.body).to.have.property('name')
          ta.expect(res.body.name).to.be.equal(data.project.name)
          ta.expect(res.body).to.have.property('description')
          ta.expect(res.body.description).to.have.equal(data.project.description)
          return project_id = res.body.id
        })
    })

    it('should show project', () => {
      return ta.api.get(`/api/projects/${project_id}/`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200)
        .then(res => {
          ta.expect(res.body).to.have.property('id')
          ta.expect(res.body.id).to.be.equal(project_id)
          ta.expect(res.body).to.have.property('name')
          ta.expect(res.body.name).to.be.equal(data.project.name)
          ta.expect(res.body).to.have.property('description')
          ta.expect(res.body.description).to.have.equal(data.project.description)
        })
    })

    it('should update project', () => {
      return ta.api.put(`/api/projects/${project_id}/`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({"name": data.proj_update.name, "description": data.proj_update.description})
        .expect(200)
        .then(res => {
          ta.expect(res.body).to.have.property('name')
          ta.expect(res.body.name).to.be.equal(data.proj_update.name)
          ta.expect(res.body).to.have.property('description')
          ta.expect(res.body.description).to.have.equal(data.proj_update.description)
        })
    })

    it('should remove project', () => {
      return ta.api.delete(`/api/projects/${project_id}/`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(204)
    })
  })
})