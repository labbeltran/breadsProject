//Dependencies
const express = require('express')

//Configuration
require(`dotenv`).config()
const PORT= process.env.PORT 
console.log(PORT)
const app= express()

//Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(methodOverride('_method'))

//Routes
app.get(`/`, (req, res)=>{
    res.send(`Welcome to an Awesome App and Breads!`)
})

app.get(`*`, (req, res)=>{
    res.send(`404`)
})

//Breads
const breadsController = require(`./Controller/bread_controller.js`)
app.use(`/breads`, breadsController)

//Listen
app.listen(PORT, ()=>{
    console.log(`listening on port`, PORT);
})
