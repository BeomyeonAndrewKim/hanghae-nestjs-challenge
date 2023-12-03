import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    HealthModule,
  ],
})
export class AppModule {}
