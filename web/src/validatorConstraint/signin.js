export default {
  username: {
    presence: true,
    length: {
      minimum: 3,
      tooShort: 'is too short'
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 3,
      tooShort: 'is too short'
    }
  }
};
