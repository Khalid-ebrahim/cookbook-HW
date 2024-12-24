const express = require('express');
const router = express.Router();

const user = require('../models/user.js');
const recipe = require('../models/recipe.js');
const ingredient = require('../models/ingredient.js');

router.get('/', async (req, res) => {
  const recipes = await recipe.find().populate('owner')
  res.render('recipes/index.ejs',{recipes})
})

router.get('/', async (req, res) => {
  res.render('recipes/index.ejs');
});

router.post('/', async (req, res) => {
  req.body.owner = req.session.user._id
  await recipe.create(req.body)
  res.redirect('/recipes')
})


router.get('/new', async (req, res) => {
  const ingredient = await ingredient.find()
  res.render('recipes/new.ejs',{ingredient})
})

router.post('/', async (req, res) => {
  try {
    const newRecipe = new recipe(req.body);
    newRecipe.owner = req.session.user._id
    await newRecipe.save()
    res.redirect('/recipes')
    
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
});

router.post('/', async (req, res) => {
  req.body.owner = req.session.user._id;
  await recipe.create(req.body);
  res.render('/recipes/index.ejs');
});

router.get('/:recipeId', async(req, res)=> {
  const recipe = await recipe.findById(req.params.recipeId).populate('owner');
  
  res.render('recipes/show.ejs', { recipe })
})

router.delete('/:recipeId', async (req,res) => {
  const recipe = await recipe.findById(req.params.recipeId)
  if (recipe.owner.equals(req.session.user._id)) {
    await recipe.deleteOne();
    res.redirect('/recipes');
  } else {
    res.send("You don't have permission to do that.");
  } 
})

router.get('/:recipeId/edit', async (req,res) => {
  const recipe = await recipe.findById(req.params.recipeId)
  res.render('recipes/edit.ejs',{recipe})
})

router.put('/:recipeId', async (req,res) => {
  const recipe= await recipe.findById(req.params.recipeId);
    if (recipe.owner.equals(req.session.user._id)) {
      await recipe.updateOne(req.body);
      res.redirect('/recipes');
    } else {
      res.send("You don't have permission to do that.");
    }
})


module.exports= router;