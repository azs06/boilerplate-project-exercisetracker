const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const { createUser, getUser, getUsers } = require('./controllers/user_controller')
const { createExercise } = require('./controllers/exercise_controller')
const { log } = require('./controllers/log_controller')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/exercise-track' )
const db = mongoose.connection;

db.on('error', error => console.error(`connection error: ${error}`));
db.on('open', () => console.log(`db connection successful`));

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/exercise/new-user', createUser)
app.post('/api/exercise/add', createExercise)
app.get('/api/exercise/log', log)
app.get('/api/exercise/users', getUsers)

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
