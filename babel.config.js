module.exports = {
  plugins: [
    // 'recharts',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};
