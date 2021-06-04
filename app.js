require('dotenv').config()

const express = require('express')
const schema = require('./shema/shema')
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

const PORT = 4000
const mongoURI = process.env.ATLAS_URI

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongoURI)

const conn = mongoose.connection
conn.once('open',()=>{
    console.log('MongoDB connection established successfully')
})
app.use(cors())

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(PORT,(req,res)=>{
    console.log(`Server started on ${PORT}`)
})