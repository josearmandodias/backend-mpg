/**
 * @swagger
 * @typedef {object} ErrorApi
 * @property {string} message - Error message
 * @property {string} name - Error name
 */

export default class ErrorApi extends Error {
  constructor(message: string) {
      super(message);
      this.name = 'ErrorApi';
  }
};