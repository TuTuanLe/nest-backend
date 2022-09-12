import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TYPEORM_CONFIG } from './config/constant';
import databaseConfig from './config/database.config';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { UserController } from './user/controller/user/user.controller';
import { UserService } from './user/services/user/user.service';
import { BusinessNewsModule } from './business-news/business-news.module';
import { BusinessNewsController } from './controller/business-news/business-news/business-news.controller';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) =>
    //     configService.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest-data',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    BusinessNewsModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [databaseConfig],
    //   envFilePath: '.env',
    // }),
  ],
  controllers: [AppController, BusinessNewsController],
  providers: [AppService],
})
export class AppModule {}
