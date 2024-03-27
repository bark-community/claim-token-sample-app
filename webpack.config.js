const path = require('path');

module.exports = {
  experiments: {
    asyncWebAssembly: true, // Enable async WebAssembly loading
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // Define an alias for the 'src' directory
    }
  }
};
