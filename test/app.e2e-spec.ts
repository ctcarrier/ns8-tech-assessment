import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users (POST)', () => {
    const user = {
      email: 'test@example.com',
      phoneNumber: '555-555-5555',
      password: 'wakka'
    };
    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201, '0');
  });

  it('/users (POST) works without phoneNumber', () => {
    const user = {
      email: 'test2@example.com',
      password: 'wakka'
    };
    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201, '1');
  });

  it('/users (POST) fails with invalid email', () => {
    const user = {
      email: 'test',
      phoneNumber: '555-555-5555',
      password: 'wakka'
    };
    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(400);
  });

  it('/users (POST) fails with duplicate email', () => {
    const user = {
      email: 'test@example.com',
      phoneNumber: '555-555-5555',
      password: 'wakka'
    };
    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(400);
  });

  it('/users (POST) fails with invalid phone number', () => {
    const user = {
      email: 'test',
      phoneNumber: '555',
      password: 'wakka'
    };
    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(400);
  });

  it('/users (POST) fails when missing password', () => {
    const user = {
      email: 'test',
      phoneNumber: '555'
    };
    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(400);
  });

  it('/users/0 (GET)', () => {
    const user = {
      id: 0,
      email: 'test@example.com',
      phoneNumber: '555-555-5555',
      password: 'wakka'
    };
    return request(app.getHttpServer())
      .get('/users/0')
      .expect(200, user);
  });

  it('/users/9999 (GET) - 404', () => {
    return request(app.getHttpServer())
      .get('/users/9999')
      .expect(404);
  });

  it('/users/0/events (POST)', () => {
    const event = {
      type: 'testType'
    };
    return request(app.getHttpServer())
      .post('/users/0/events')
      .send(event)
      .expect(201, '0');
  });

  it('/users/1/events (POST)', () => {
    const event = {
      type: 'testType2'
    };
    return request(app.getHttpServer())
      .post('/users/1/events')
      .send(event)
      .expect(201, '1');
  });

  it('/users/0/events (POST) fails with an empty type', () => {
    const event = {
      type: ''
    };
    return request(app.getHttpServer())
      .post('/users/0/events')
      .send(event)
      .expect(400);
  });

  it('/users/0/events (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/0/events')
      .expect(200)
      .then(response => {
          expect(response.body.length).toBe(1)
          expect(response.body[0].type).toBe('testType')
      });
  });

  it('/users/9999/events (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/9999/events')
      .expect(200, []);
  });

  it('/events (GET)', () => {
    return request(app.getHttpServer())
      .get('/events')
      .expect(200)
      .then(response => {
          expect(response.body.length).toBe(2)
          expect(response.body[0].type).toBe('testType')
          expect(response.body[1].type).toBe('testType2')
      });
  });
});
