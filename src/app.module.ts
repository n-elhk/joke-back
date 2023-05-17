import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { JokeService } from './core/services/joke/joke.service';
import { PrismaService } from './core/services/prisma/prisma.service';

@Module({
  controllers: [AppController],
  providers: [PrismaService, JokeService],
})
export class AppModule {}
