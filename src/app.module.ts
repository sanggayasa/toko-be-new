import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { PinoTypeOrmLogger } from './logger/typeorm-logger.middleware';
import { postgreSQLConfig } from './config/database.config';
import { pinoConfig } from './config/logger.config';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { PusherService } from './pusher/pusher.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './utils/interceptors/response.interceptor';
// import { ChatGateway } from './chat/chat.gateway';
// import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
// import { ProductImage } from './product-image/entities/product-image.entity';
// import { ProductImageModule } from './product-image/product-image.module';
// import { ProductFilesModule } from './product-files/product-files.module';
import { HashService } from './hash/hash.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (logger: PinoLogger): TypeOrmModuleOptions => {
        return {
          ...postgreSQLConfig,
          logger: new PinoTypeOrmLogger(logger),
        };
      },
      inject: [PinoLogger],
    }),
    LoggerModule.forRoot(pinoConfig),
    UsersModule,
    AuthModule,
    // ChatModule,
    // ProductModule,
    // CartModule,
    // CategoryModule,
    // PaymentModule,
    // ProductImageModule,
    // ProductFilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerMiddleware,
    // PusherService,
    // ChatGateway,
    // ChatService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    HashService,
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
