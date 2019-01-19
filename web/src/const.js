export const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:7000/api/v1'
  : 'https://rc-git-sheet-cheat.herokuapp.com/api/v1';
