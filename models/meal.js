class Meal {
  constructor(id, category, title, affordability, complexity, imgUrl, duration, ingrediants, steps, isGlutenFree, isVegan, isVegitarian, isLactoseFree){
    this.id = id;
    this.category = category;
    this.title = title;
    this.affordability = affordability;
    this.complexity = complexity;
    this.imgUrl = imgUrl;
    this.duration = duration;
    this.ingrediants = ingrediants;
    this.steps = steps;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegitarian = isVegitarian;
    this.isLactoseFree = isLactoseFree;
  }
}

export default Meal;