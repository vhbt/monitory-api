export default class ServiceError extends Error {
  constructor(status, ...args) {
    super(...args);
    this.status = status;
  }
}
