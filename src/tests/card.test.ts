import { app } from '../index';
import supertest from 'supertest';

const api = supertest(app)

describe.skip('/token', () => {
  test('guardar los datos de la tarjeta y que devuelva el token generado', async () => {
    const card = {
        card_number:1006000290866666,
        cvv:105,
        expiration_month:"10",
        expiration_year:"2023",
        email:"cralosrams08@yahoo.es"
    }

    const { body } = await api
    .post('/token')
    .send(card)
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8')

  expect(body.data.token).toContain('pk_test_')
  expect(body.data.token).toHaveLength(24)
  })

  test('crear cuenta con datos incorrectos', async () => {
    const card = {
        card_number:100600029086,
        cvv:105,
        expiration_month:"10",
        expiration_year:"2023",
        email:"cralosrams08@yahoo.es"
    }

    await api
      .post('/token')
      .send(card)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })
  test('crear cuenta sin enviar datos', async () => {
    await api
      .post('/token')
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })
})

describe.skip('/charges', () => {
  test('pagando con token correcto', async () => {
    const card = {
        token:"pk_test_AR8H9a9Wu1Mbk2s0"
    }
    const { body } = await api
      .get('/charges')
      .set(card)
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.message).toContain('successful payment')
  })
  test('pagando con token invalido', async () => {
    const card = {
        token:"pk_test_AR8H9a9Wu1Mbk2s9"
    }
    await api
      .get('/charges')
      .set(card)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })
  test('pagando sin token', async () => {
    await api
      .get('/charges')
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })
})
