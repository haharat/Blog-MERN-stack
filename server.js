const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')

const app = express()

connectDB()

app.use(cors())

app.use(express.json())

app.use("/api/users", userRouter) //
app.use("/api/posts", postRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in port ${PORT}`))