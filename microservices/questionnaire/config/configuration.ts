export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  secretKey: process.env.SECRET_KEY || 'my-secret-key',
  database: {
    uri:
      process.env.DB_URI ||
      'mongodb+srv://pragupta19:test@123@gql-doyxq.mongodb.net/audit-tool?retryWrites=true&w=majority',
  },
});
