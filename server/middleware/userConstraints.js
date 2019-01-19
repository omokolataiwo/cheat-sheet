export const signUpConstraints = {
  firstName: {
    presence: true,
    length: {
      minimum: 3,
      tooShort: 'is too short'
    }
  },
  lastName: {
    presence: true,
    length: {
      minimum: 3,
      tooShort: 'is too short'
    }
  },
  username: {
    presence: true,
    email: true,
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
