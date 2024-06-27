import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createAppEnvironmentModule } from './module/environment';

@Module({
  imports: [createAppEnvironmentModule()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
