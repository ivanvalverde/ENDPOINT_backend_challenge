import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { mockedOperateDirectoriesResponse } from './../src/mocks/serviceMocks';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/directories (POST)', () => {
    return request(app.getHttpServer())
      .post('/directories')
      .expect(201)
      .expect(mockedOperateDirectoriesResponse);
  });
});
