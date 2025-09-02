import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { NotificationDocument } from '../src/notification/notification.schema'

describe('NotificationController (e2e)', () => {
  let app: INestApplication
  let notificationModel: Model<NotificationDocument>

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()

    // Pega o model para poder limpar o banco antes de cada teste
    notificationModel = moduleFixture.get<Model<NotificationDocument>>(
      getModelToken('Notification'),
    )
  })
  
  // Limpa o banco de dados de teste antes de cada execução
  beforeEach(async () => {
    await notificationModel.deleteMany({})
  })

  afterAll(async () => {
    await app.close()
  })

  it('/notifications (POST) -> should create a notification', () => {
    return request(app.getHttpServer())
      .post('/notifications')
      .send({
        titulo: 'E2E Test Notification',
        descricao: 'This is a test from an e2e test.',
        data_audiencia: '2026-01-01T12:00:00.000Z',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          _id: expect.any(String),
          titulo: 'E2E Test Notification',
          descricao: 'This is a test from an e2e test.',
          data_audiencia: '2026-01-01T12:00:00.000Z',
          status: 'EM_ANDAMENTO',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        })
      })
  })

  it('/notifications (GET) -> should return an array of notifications', async () => {
    // Primeiro, cria um dado para garantir que o banco não está vazio
    await new notificationModel({
      titulo: 'GET Test',
      descricao: 'Testing GET endpoint',
      data_audiencia: '2026-01-01T12:00:00.000Z',
    }).save()

    return request(app.getHttpServer())
      .get('/notifications')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBe(1)
        expect(response.body[0].titulo).toBe('GET Test')
      })
  })
})