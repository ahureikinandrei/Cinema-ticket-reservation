import { Module } from '@nestjs/common';
import { HallController } from './hall.controller';
import { HallService } from './hall.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hall, HallSchema } from './schemas/hall.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Hall.name,
        schema: HallSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [HallController],
  providers: [HallService],
})
export class HallModule {}
