export default class ErrorApi extends Error {
  constructor(message: string) {
      super(message);
      this.name = 'ErrorApi';
  }
};