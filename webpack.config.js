const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  // ... other config options
  plugins: [new BundleAnalyzerPlugin()],
}
