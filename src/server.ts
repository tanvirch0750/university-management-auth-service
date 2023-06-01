import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`✅ database connected successfully`);

    app.listen(config.port, () => {
      logger.info(`🟢 Application listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`🛑 Failed to connect database`, error);
  }
}

bootstrap();
