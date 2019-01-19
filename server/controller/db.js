import seedDatase from '../seeder';

export default {
  async seed(req, res) {
    try {
      await seedDatase();
      return res.status(200).json({});
    } catch (error) {
      return res.status(500).json({});
    }
  }
};
