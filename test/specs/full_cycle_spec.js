const ta = require('../utilities'),
      data = require('./acc_data')

describe('/api/project/', () => {
  context("When the user want to make whole process", () => {
    let access_toke, 
        project_id, 
        issue_id, 
        issue_2_id, 
        comment_id,
        comment_2_id

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

    it('should create new issue in project', () => {
      return ta.api.post('/api/issues/')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          "name": data.issues[0].name, 
          "description": data.issues[0].description, 
          "project": project_id
        })
        .expect(201)
        .then(res => {
          ta.expect(res.body).to.have.property('name')
          ta.expect(res.body.name).to.be.equal(data.issues[0].name)
          ta.expect(res.body).to.have.property('description')
          ta.expect(res.body.description).to.be.equal(data.issues[0].description)
          ta.expect(res.body).to.have.property('status')
          ta.expect(res.body.status).to.be.equal('Planed')
          return issue_id = res.body.id
        })
    })

    it('should add new issue in project', () => {
      return ta.api.post('/api/issues/')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          "name": data.issues[1].name, 
          "description": data.issues[1].description, 
          "project": project_id
        })
        .expect(201)
        .then(res => {
          ta.expect(res.body).to.have.property('name')
          ta.expect(res.body.name).to.be.equal(data.issues[1].name)
          ta.expect(res.body).to.have.property('description')
          ta.expect(res.body.description).to.be.equal(data.issues[1].description)
          ta.expect(res.body).to.have.property('status')
          ta.expect(res.body.status).to.be.equal('Planed')
          return issue_2_id = res.body.id
        })
    })

    it('should show last issue', () => {
      return ta.api.get(`/api/issues/${issue_2_id}/`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200)
        .then(res => {
          ta.expect(res.body).to.have.property('id')
          ta.expect(res.body.id).to.be.equal(issue_2_id)
          ta.expect(res.body).to.have.property('name')
          ta.expect(res.body.name).to.be.equal(data.issues[1].name)
          ta.expect(res.body).to.have.property('description')
          ta.expect(res.body.description).to.be.equal(data.issues[1].description)
          ta.expect(res.body).to.have.property('status')
          ta.expect(res.body.status).to.be.equal('Planed')
        })
    })

    it('should update last issue', () => {
      return ta.api.put(`/api/issues/${issue_2_id}/`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          "name": data.iss_update.name, 
          "description": data.iss_update.description, 
          "status": data.iss_update.status,
          "project": project_id
        })
        .expect(200)
        .then(res => {
          ta.expect(res.body).to.have.property('id')
          ta.expect(res.body.id).to.be.equal(issue_2_id)
          ta.expect(res.body).to.have.property('name')
          ta.expect(res.body.name).to.be.equal(data.iss_update.name)
          ta.expect(res.body).to.have.property('description')
          ta.expect(res.body.description).to.be.equal(data.iss_update.description)
          ta.expect(res.body).to.have.property('status')
          ta.expect(res.body.status).to.be.equal(data.iss_update.status)
        })
    })

    it('should remove last issue', () => {
      return ta.api.delete(`/api/issues/${issue_2_id}/`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(204)
        .then(() => {
          return ta.api.get(`/api/isses/${issue_2_id}`)
            .set('Authorization', 'Bearer ' + access_token)
            .expect(404)
        })
    })

    it('should create new comment in issue', () => {
      return ta.api.post('/api/comments/')
        .set('Authorization', 'Bearer ' + access_token)
        .send({"body": data.comments[0].body, "issue": issue_id})
        .expect(201)
        .then(res => {
          ta.expect(res.body).to.have.property('id')
          ta.expect(res.body).to.have.property('body')
          ta.expect(res.body.body).to.be.equal(data.comments[0].body)
          ta.expect(res.body).to.have.property('issue')
          ta.expect(res.body.issue).to.be.equal(issue_id)
          ta.expect(res.body).to.have.property('created_at')
          return comment_id = res.body.id
        })
    })

    it('should add new comment in issue', () => {
      return ta.api.post('/api/comments/')
        .set('Authorization', 'Bearer ' + access_token)
        .send({"body": data.comments[1].body, "issue": issue_id})
        .expect(201)
        .then(res => {
          ta.expect(res.body).to.have.property('id')
          ta.expect(res.body).to.have.property('body')
          ta.expect(res.body.body).to.be.equal(data.comments[1].body)
          ta.expect(res.body).to.have.property('issue')
          ta.expect(res.body.issue).to.be.equal(issue_id)
          ta.expect(res.body).to.have.property('created_at')
          return comment_2_id = res.body.id
        })
    })

    it('should show last comment', () => {
      return ta.api.get(`/api/comments/${comment_2_id}/`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200)
        .then(res => {
          ta.expect(res.body).to.have.property('id')
          ta.expect(res.body.id).to.be.equal(comment_2_id)
          ta.expect(res.body).to.have.property('body')
          ta.expect(res.body.body).to.be.equal(data.comments[1].body)
          ta.expect(res.body).to.have.property('issue')
          ta.expect(res.body.issue).to.be.equal(issue_id)
          ta.expect(res.body).to.have.property('created_at')
        })
    })

    it('should update last comment', () => {
      return ta.api.put(`/api/comments/${comment_2_id}/`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({"body": data.comm_update.body, "issue": issue_id})
        .expect(200)
        .then(res => {
          ta.expect(res.body).to.have.property('id')
          ta.expect(res.body.id).to.be.equal(comment_2_id)
          ta.expect(res.body).to.have.property('body')
          ta.expect(res.body.body).to.be.equal(data.comm_update.body)
          ta.expect(res.body).to.have.property('issue')
          ta.expect(res.body.issue).to.be.equal(issue_id)
        })
    })

    it('should remove last comment', () => {
      return ta.api.delete(`/api/comments/${comment_2_id}/`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(204)
        .then(() => {
          return ta.api.get(`/api/comments/${comment_2_id}/`)
            .set('Authorization', 'Bearer ' + access_token)
            .expect(404)
        })
    })

    it('should show whole project info', () => {
      return ta.api.get(`/api/project/${project_id}/`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200)
        .then(res => {
          ta.expect(res.body).to.have.property('id')
          ta.expect(res.body.id).to.be.equal(project_id)
          ta.expect(res.body).to.have.property('name')
          ta.expect(res.body.name).to.be.equal(data.project.name)
          ta.expect(res.body).to.have.property('issues')
          ta.expect(res.body.issues[0]).to.have.property('id')
          ta.expect(res.body.issues[0].id).to.be.equal(issue_id)
          ta.expect(res.body.issues[0]).to.have.property('project')
          ta.expect(res.body.issues[0].project).to.be.equal(project_id)
          ta.expect(res.body.issues[0]).to.have.property('url')
          ta.expect(res.body.issues[0].url).to.include(`/api/issues/${issue_id}`)
          ta.expect(res.body.issues[0]).to.have.property('name')
          ta.expect(res.body.issues[0].name).to.be.equal(data.issues[0].name)
          ta.expect(res.body.issues[0]).to.have.property('description')
          ta.expect(res.body.issues[0].description).to.be.equal(data.issues[0].description)
          ta.expect(res.body.issues[0]).to.have.property('status')
          ta.expect(res.body.issues[0].status).to.be.equal('Planed')
          ta.expect(res.body.issues[0]).to.have.property('comments')
          ta.expect(res.body.issues[0].comments[0]).to.have.property('id')
          ta.expect(res.body.issues[0].comments[0].id).to.be.equal(comment_id)
          ta.expect(res.body.issues[0].comments[0]).to.have.property('issue')
          ta.expect(res.body.issues[0].comments[0].issue).to.be.equal(issue_id)
          ta.expect(res.body.issues[0].comments[0]).to.have.property('body')
          ta.expect(res.body.issues[0].comments[0].body).to.be.equal(data.comments[0].body)
          ta.expect(res.body.issues[0].comments[0]).to.have.property('created_at')
        })
    })

    it('should remove project', () => {
      return ta.api.delete(`/api/projects/${project_id}/`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(204)
        .then(() => {
          return ta.api.get(`/api/projects/${project_id}/`)
            .set('Authorization', 'Bearer ' + access_token)
            .expect(404)
        })
    })
  })
})