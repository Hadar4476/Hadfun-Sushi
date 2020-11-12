const express = require('express');
const { DishTypes } = require('../models/dish_types');
const router = express.Router();

router.get('/get-dish-types', async (req, res) => {
  const dish_types = await DishTypes.find();
  res.send(dish_types[0]);
});

router.get('/get-single-dish/:dishes', async (req, res) => {
  const data = await DishTypes.find();
  const { sushi_arr, vegan_sushi_arr, wok_arr } = data[0];
  const { dishes } = req.params;
  let dishes_to_send = [];
  let dishes_arr = dishes.split(', ');
  for (let i = 0; i < dishes_arr.length; i++) {
    for (let x = 0; x < sushi_arr.length; x++) {
      if (sushi_arr[x].dish_id.toString() === dishes_arr[i].toString())
        dishes_to_send.push(sushi_arr[x]);
      else continue;
    }
    for (let y = 0; y < vegan_sushi_arr.length; y++) {
      if (vegan_sushi_arr[y].dish_id.toString() === dishes_arr[i].toString())
        dishes_to_send.push(vegan_sushi_arr[y]);
      else continue;
    }
    for (let z = 0; z < wok_arr.length; z++) {
      if (wok_arr[z].dish_id.toString() === dishes_arr[i].toString())
        dishes_to_send.push(wok_arr[z]);
      else continue;
    }
  }
  res.send(dishes_to_send);
});

module.exports = router;
