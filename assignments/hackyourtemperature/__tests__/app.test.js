import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);

describe('POST /weather', () => {
  it('Quick test', () => {
    expect(1).toBe(1);
  });

  it('return 400 ', async () => {
    const response = await request.post('/weather').send({});
    expect(response.status).toBe(400);
    expect(response.body.weatherText).toBe('City is missing in input');
  });

  it('return city temperature ', async () => {
    const response = await request.post('/weather').send({ cityName: 'London' });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain('The temperature in London');
  });
  it('should return 404 if cityName is invalid', async () => {
    const response = await request.post('/weather').send({ cityName: 'abcd' });
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe('City is not found!');
  });
});
