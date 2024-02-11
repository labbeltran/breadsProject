const express = require('express')
const breads = express.Router()
const Bread = require('../Model/bread.js')
const Baker = require(`../Model/baker.js`)

// // Index:
// breads.get('/', (req, res) => {
//   Baker.find()
//     .then(foundBakers => {
//       Bread.find()
//       .then(foundBreads => {
//           res.render('index', {
//               breads: foundBreads,
//               bakers: foundBakers,
//               title: 'Index Page'
//           })
//       })
//     })
// })

breads.get(`/`, async (req, res)=>{
  try{
    const foundBakers = await Baker.find()
    const foundBreads = await Bread.find()
    res.render(`index`, {
      breads: foundBreads,
      bakers: foundBakers,
      title: `Index Page`
    })
  }
  catch(error){
    console.error(`Error`, error)
    res.status(500).render(`error`, {error:error})
  }
})
 




// NEW
// breads.get('/new', (req, res) => {
//   Baker.find()
//     .then(foundBakers =>{
//       res.render(`new`, {
//         bakers: foundBakers
//       })
//     })
// })

breads.get(`/new`, async (req, res)=>{
  try{const foundBakers = await Baker.find()
    const foundbreads= await Bread.find()
    res.render(`new`, {
      bakers:foundBakers
    })}
  catch(error){
    console.error(`Error`, error)
    res.status().render(`error`, {error:error})
  }
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
})

// breads.get(`/:id/edit`, (req, res)=>{
//     const foundBakers = await Baker.find()
//     const foundBreads= await Bread.find()
//     res.render(`edit`, {
//       bread: foundBread,
//       bakers: foundBakers
//     })
// })

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .populate(`baker`)
      .then(foundBread => {
        const bakedBy = foundBread.getBakedBy() 
        console.log(bakedBy)
        res.render('show', {
            bread: foundBread
        })
      })
    })

// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})



// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})


 
module.exports = breads

