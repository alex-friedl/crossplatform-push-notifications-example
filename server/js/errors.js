class DuplicateKeyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicateKeyError';
  }
}

module.exports = {
  DuplicateKeyError,
};
