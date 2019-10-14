module.exports = function(menuTypes, item, price) {
  let veg = [];
  let desserts = [];
  let nonVeg = [];

  menuTypes.forEach((type, index) => {
    if (type === 'Veg' || type === 'Vegetables') {
      veg.push({ item: item[index], price: price[index] });
    } else if (type === 'NonVeg' || type === 'Non-Veg') {
      nonVeg.push({ item: item[index], price: price[index] });
    } else if (type === 'Desserts') {
      desserts.push({ item: item[index], price: price[index] });
    }
  });

  return { veg, desserts, nonVeg };
};
