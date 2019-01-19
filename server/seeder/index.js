import Category from '../model/category';
import Cheat from '../model/cheat';
import cheats from './cheats';

const groupByCategories = (cheats) => {
  const collection = {};
  cheats.forEach((currentCheat) => {
    const { category, keywords, ...cheat } = currentCheat;
    const catCollection = collection[category] || [];
    catCollection.push(cheat);
    collection[category] = catCollection;
  });
  return collection;
};

const seedCheat = categoryId => async (cheat) => {
  const mCheat = new Cheat({ ...cheat, category: categoryId });
  await mCheat.save();
  const newCat = await Category.findById(categoryId);
  newCat.cheats.push(mCheat._id);
  await newCat.save();
};

const seedDatabase = () => {
  const categories = groupByCategories(cheats);
  Object.keys(categories).forEach(async (title) => {
    const category = categories[title];
    let mCategory = new Category({ title });
    mCategory = await mCategory.save();
    category.forEach(seedCheat(mCategory._id));
  });
};

export default seedDatabase;
