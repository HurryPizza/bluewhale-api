import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import { User } from '../../../user/entity/user.entity';
import {
  Accommodation,
  Attraction,
  Restaurant,
  Toilet,
} from '../../../tour/entity/tour.entity';

@Injectable()
export class MariaDBConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      username: this.configService.get<string>('MYSQL_DATABASE_USER'),
      password: this.configService.get<string>('MYSQL_DATABASE_PASSWORD'),
      port: this.configService.get<number>('MYSQL_DATABASE_PORT'),
      host: this.configService.get<string>('MYSQL_DATABASE_HOST'),
      database: this.configService.get<string>('MYSQL_DATABASE_NAME'),
      entities: [User, Attraction, Toilet, Restaurant, Accommodation],
      synchronize: false,
    };
  }
}
