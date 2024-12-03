import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);

describe('POST /', () => {
  it('Quick test', () => {
    expect(1).toBe(1);
  });

  it('return 404 ', async () => {
    const response = await request.post('/').send({});
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe('City is not found!');
  });

  it('return city temperature ', async () => {
    const response = await request.post('/').send({ cityName: 'London' });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain('The temperature in London');
  });
});
