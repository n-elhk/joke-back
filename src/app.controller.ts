import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
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

  @Get('joke')
  async getJoke(
    @Res() res: Response,
    @Query('slug') slug?: string,
    @Query('id') jokeId?: number,
  ): Promise<void> {
    try {
      let joke: JokeModel | undefined = undefined;
      if (slug) {
        joke = await this.jokeService.getJokeBySlug(slug);
      } else if (jokeId !== undefined) {
        joke = await this.jokeService.getJokeById(Number(jokeId));
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Id or slug must be send' });
      }
      res.status(200).json(joke);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(undefined);
    }
  }
}
