import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JokeService {
  constructor(private readonly prisma: PrismaService) {}

  public getJokes(skip: number) {
    return this.prisma.joke.findMany({
      skip,
      take: 3,
      orderBy: {
        id: 'desc',
      },
    });
  }

  public async pickRandomJoke() {
    const itemCount = await this.prisma.joke.count();

    const randomNumber = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return this.prisma.joke.findFirst({
      take: 1,
      skip: randomNumber(0, itemCount - 1),
    });
  }

  public getJokeBySlug(slug: string) {
    return this.prisma.joke.findFirst({ where: { slug } });
  }

  public getJokeById(id: number) {
    return this.prisma.joke.findFirst({ where: { id } });
  }
}
