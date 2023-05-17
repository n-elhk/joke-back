import { Controller, Get, Param, Query } from '@nestjs/common';
import { JokeService } from './core/services/joke/joke.service';
import type { joke as JokeModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly jokeService: JokeService) {}

  @Get('jokes')
  async getJokes(): Promise<JokeModel[]> {
    return this.jokeService.getJokes();
  }

  @Get('joke/:slug')
  async getJokeBySlug(@Param('slug') slug: string): Promise<JokeModel> {
    return this.jokeService.getJokeBySlug(slug);
  }

  @Get('joke/page')
  async getJokesCursorBased(
    @Query('jokeId') jokeId: number,
    @Query('nbrJoke') nbrJoke: number,
  ): Promise<JokeModel[]> {
    return this.jokeService.getJokeCursorBased(Number(jokeId), Number(nbrJoke));
  }
}
