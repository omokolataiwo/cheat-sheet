import jwt from 'jsonwebtoken';
import Category from '../model/category';
import Favorite from '../model/favorite';

const addFavorite = (categories, favorites) => {
  favorites = favorites.map(favorite => favorite.toString());

  return categories.map((category) => {
    category = category.toObject();
    category.cheats = category.cheats.map((cheat) => {
      cheat.favorite = favorites.includes(cheat._id.toString());
      return cheat;
    });
    return category;
  });
};

export default class {
  static async create(req, res) {
    const category = new Category(req.body);

    try {
      await category.save();
      return res.status(201).json({
        data: { category: category.toObject() }
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getCommands(req, res) {
    try {
      const token = req.headers['x-header-token'];
      let favorites = [];

      if (token) {
        const { _id: userId } = jwt.decode(token);
        favorites = await Favorite.find({ userId }, 'cheatId');
      }
      let categories = await Category.find().populate('cheats');

      if (categories && favorites.length) {
        favorites = favorites.map(favorite => favorite.cheatId);
        categories = addFavorite(categories, favorites);
      }

      return res.status(200).json({
        data: { categories: [...categories] }
      });
    } catch (e) {
      return res.status(500).json({ data: e.message });
    }
  }
}
