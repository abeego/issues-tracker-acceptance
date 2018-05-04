const uuidv1 = require('uuid/v1')

username = uuidv1()

let user = {
  "username": username,
  "password": "Passw0rd12345",
  "email": "test@example.com"
}

let project = {
  "name": "Test Project ###",
  "description": "Test project description"
}

let proj_update = {
  "name": "Updated Project ###",
  "description": "Updated project description"
}

let issues = [
  {
    "name": "Issue #1",
    "description": "Issue description #1"
  },
  {
    "name": "Issue #2",
    "description": "Issue description #2"
  }
]

let iss_update =   {
  "name": "Updated issue",
  "description": "Updated issue description",
  "status": "In Progress"
}

let comments = [
  {
    "body": "Comment #1"
  },
  {
    "body": "Comment #2"
  }
]

let comm_update = {
  "body": "Updated comment"
}

module.exports = { 
  user, 
  project, 
  issues, 
  comments, 
  proj_update, 
  iss_update, 
  comm_update }