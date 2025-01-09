import { startConsumer } from './_boot/consumer';
import database from './_boot/database';
import server from './presentation/server'

(async () => {
    try {
      server.start();

      // await database()
      //check any mistake
      await Promise.all([database(),startConsumer()])

    } catch (error: any) {
        console.error(error?.message || 'An error occurred');
        process.exit(1);
    }
})()