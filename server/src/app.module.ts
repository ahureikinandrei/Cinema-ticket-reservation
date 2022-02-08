import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppConfigurationModule } from './infrastructure/configuration/app-configuration.module';
import { AppConfigurationService } from './infrastructure/configuration/app-configuration.service';

@Module({
  controllers: [],
  providers: [],
  imports: [
    AppConfigurationModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigurationModule],
      inject: [AppConfigurationService],
      useFactory: (appConfigService: AppConfigurationService) => {
        const options: MongooseModuleOptions = {
          uri: appConfigService.connectionString,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
        return options;
      },
    }),
  ],
})
export class AppModule {}
