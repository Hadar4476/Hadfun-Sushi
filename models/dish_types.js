const mongoose = require('mongoose');

const dishTypesSchema = new mongoose.Schema({
  sushi_arr: Array,
  vegan_sushi_arr: Array,
  wok_arr: Array,
});

const DishTypes = mongoose.model('Dish_types', dishTypesSchema);

exports.DishTypes = DishTypes;
