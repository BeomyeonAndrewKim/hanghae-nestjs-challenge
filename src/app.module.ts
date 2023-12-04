import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const EXTERNAL_DB_ENVS = new Set(['production', 'development']);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const config: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [__dirname + '../**/*.entity{.ts,.js}'],
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
          ...(EXTERNAL_DB_ENVS.has(process.env.NODE_ENV) && {
            ssl: true,
            extra: {
              ssl: {
                rejectUnauthorized: false,
              },
            },
          }),
        };

        return config;
      },
      inject: [ConfigService],
    }),
    HealthModule,
  ],
})
export class AppModule {}
