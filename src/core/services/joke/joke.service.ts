import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JokeService {
  constructor(private readonly prisma: PrismaService) {}

  public getJokes() {
    return this.prisma.joke.findMany({
      take: 10,
      orderBy: {
        id: 'desc',
      },
    });
  }

  public getJokeBySlug(slug: string) {
    return this.prisma.joke.findFirst({ where: { slug } });
  }

  public getJokeById(id: number) {
    return this.prisma.joke.findFirst({ where: { id } });
  }

  public getJokeCursorBased(id: number, numberOfJoke = 4) {
    return this.prisma.joke.findMany({
      take: numberOfJoke,
      skip: 1, // Skip the cursor
      cursor: {
        id, // The cursor
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
}
