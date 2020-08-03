import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export default () => {
  return MongooseModule.forRootAsync({
    useFactory: async () => {
      const mongod = new MongoMemoryServer();
      const uri = await mongod.getConnectionString();
      return { uri };
    },
  });
};
