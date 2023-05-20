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

  public getJokeBySlug(slug: string) {
    return this.prisma.joke.findFirst({ where: { slug } });
  }

  public getJokeById(id: number) {
    return this.prisma.joke.findFirst({ where: { id } });
  }
}
