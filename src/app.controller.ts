import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { JokeService } from './core/services/joke/joke.service';
import type { joke as JokeModel } from '@prisma/client';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly jokeService: JokeService) {}

  @Get('jokes')
  async getJokes(
    @Res() res: Response,
    @Query('skip') skip: number,
  ): Promise<void> {
    try {
      const jokes = await this.jokeService.getJokes(Number(skip));
      res.status(200).json(jokes);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json([]);
    }
  }

  @Get('joke/:slug')
  async getJokeBySlug(@Param('slug') slug: string): Promise<JokeModel> {
    return this.jokeService.getJokeBySlug(slug);
  }

  @Get('joke/:jokeId')
  async getJokeById(@Param('jokeId') jokeId: number): Promise<JokeModel> {
    return this.jokeService.getJokeById(Number(jokeId));
  }
}
