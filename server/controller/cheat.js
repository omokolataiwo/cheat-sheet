import jwt from 'jsonwebtoken';
import Cheat from '../model/cheat';
import Category from '../model/category';
import Favorite from '../model/favorite';
import { handleException, CustomError } from '../util/CustomError';

export default class {
  static async create(req, res) {
    try {
      const category = await Category.findById(req.body.category);

      if (!category) {
        return res.status(404).json('Category does not exist.');
      }
      const command = new Cheat(req.body);
      await command.save();

      category.cheats.push(command._id);
      category.save();

      return res.status(201).json({ data: { ...command.toObject() } });
    } catch (error) {
      return handleException(res, error);
    }
  }

  static async getCommands(req, res) {
    try {
      const command = await Cheat.find();
      return res.status(200).json(command);
    } catch (error) {
      return handleException(res, error);
    }
  }

  static async addFavoriteCheat(req, res) {
    try {
      const { cheatId, userId } = req.body;
      // Getting category on purpose for optimisation on client side
      const { category: cheatCategory } = await Cheat.findOne({ _id: cheatId }, ['category']);

      if (!cheatCategory) {
        throw new CustomError(404, 'Cheat not found.');
      }
      let favorite = await Favorite.findOne({ userId, cheatId });

      if (favorite) {
        favorite.remove();
      } else {
        favorite = new Favorite(req.body);
        await favorite.save();
      }

      return res.status(201).json({ data: { category: cheatCategory } });
    } catch (error) {
      return handleException(res, error);
    }
  }

  static async getFavoriteCheats(req, res) {
    const token = req.headers['x-header-token'];
    try {
      const { _id: userId } = jwt.decode(token);
      let cheats = await Favorite.find({ userId }).populate('cheatId');

      if (cheats.length) {
        cheats = cheats.map(cheat => cheat.cheatId);
      }
      return res.status(200).json({ data: cheats });
    } catch (error) {
      return handleException(res, error);
    }
  }
}
