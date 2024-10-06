import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { MongoSchemaModule } from './mongo-database/mongo-schema.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true, // Make the config globally available
    // }),
    ControllersModule,
    MongoSchemaModule,
  ],
  controllers: [],
  providers: [JwtAuthGuard],
  exports: [],
})
export class AppModule {}
