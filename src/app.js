const express = require('express')

const app = express();

const cors = require('cors')



//settings
app.set('port', process.env.PORT || 3500)

//middlewares
app.use(cors())
app.use(express.json())
app.use('/public', express.static(`${__dirname}/storage/img`))


//routes
app.use('/api/users', require('./routes/users.js'))
app.use('/api/products', require('./routes/products'))

module.exports = app