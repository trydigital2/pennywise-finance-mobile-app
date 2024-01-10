let store = {};

const AsyncStorage = {
  getItem: jest.fn(async (key) => store[key] || null),
  setItem: jest.fn(async (key, value) => {
    store[key] = String(value);
    return null;
  }),
  removeItem: jest.fn(async (key) => {
    delete store[key];
    return null;
  }),
  clear: jest.fn(async () => {
    store = {};
    return null;
  }),
  getAllKeys: jest.fn(async () => Object.keys(store)),
  multiGet: jest.fn(async (keys) => keys.map((key) => [key, store[key] || null])),
  multiSet: jest.fn(async (keyValuePairs) => {
    keyValuePairs.forEach(([key, value]) => {
      store[key] = String(value);
    });
    return null;
  }),
  __clearStore: () => {
    store = {};
  }
};

module.exports = AsyncStorage;
module.exports.default = AsyncStorage;
