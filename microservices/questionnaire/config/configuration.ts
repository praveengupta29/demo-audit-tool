export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  secretKey: process.env.SECRET_KEY || 'my-secret-key',
  database: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/audit-tool',
  },
});
