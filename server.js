const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' })

//connect ot database
connectDB()

//Route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')

const app = express()


//Body parser
app.use(express.json())
// app.use(express.urlencoded({extended : true}))

//Cookie parser
app.use(cookieParser())

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//File upload
app.use(fileupload())

app.use(express.static(path.join(__dirname, 'public')))

//Mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)


app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `sever running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error : ${err.message}`.red)
  //Close server and exit process
  server.close(() => process.exit(1))
})
