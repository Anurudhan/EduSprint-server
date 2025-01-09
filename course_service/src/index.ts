import { startConsumer } from './_boot/consumer';
import database from './_boot/database';
import server from './presentation/server'


(async () => {
    try {
      server.start();

      await Promise.all([database(),startConsumer()])

    } catch (error: unknown) {
      if(error instanceof Error){
        console.error(error?.message || 'An error occurred');
        process.exit(1);
      }
      else{
        console.error('An error occurred');
        process.exit(1);

      }
    }
})()