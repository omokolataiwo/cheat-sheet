import seedDatase from '../seeder';

export default {
  async seed(req, res) {
    try {
      await seedDatase();
      return res.status(200);
    } catch (error) {
      console.log('========================> ', error.message);
      return res.status(500);
    }
  }
};
