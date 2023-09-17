/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import subscribeToEvents from './app/events';
import config from './config';
import { errorLogger, logger } from './shared/logger';
import { RedisClient } from './shared/redis';

process.on('uncaughtException', err => {
  errorLogger.error(err);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await RedisClient.connect().then(() => {
      subscribeToEvents();
    });

    await mongoose.connect(config.database_url as string);
    logger.info(`✅ database connected successfully`);

    server = app.listen(config.port, () => {
      logger.info(`🟢 Application listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`🛑 Failed to connect database`, error);
  }

  process.on('unhandledRejection', (err: any) => {
    if (server) {
      server.close(() => {
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
