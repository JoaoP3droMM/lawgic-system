import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { NotificationService } from '../notification.service'
import { Notification, NotificationDocument } from '../notification.schema'
import { CreateNotificationDto } from '../dto/create-notification.dto'
import { NotFoundException } from '@nestjs/common'

// Mock do Mongoose Model que uso para simular o comportamento do banco
const mockNotificationModel = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
}


describe('NotificationService', () => {
  let service: NotificationService
  let model: Model<NotificationDocument>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: getModelToken(Notification.name),
          useValue: mockNotificationModel,
        },
      ],
    }).compile()

    service = module.get<NotificationService>(NotificationService)
    model = module.get<Model<NotificationDocument>>(getModelToken(Notification.name))
  })

  // Limpa os mocks após cada teste
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  
  // Simula a criação de uma nova instância e o save
  describe('create', () => {
    it('should call notificationModel.create and return the result', async () => {
      const createDto: CreateNotificationDto = {
        titulo: 'Nova Notificação',
        descricao: 'Detalhes...',
        data_audiencia: '2025-10-10T10:00:00.000Z',
      }

      const expectedResult = { _id: 'some-id', ...createDto }

      mockNotificationModel.create.mockResolvedValue(expectedResult)
      
      const result = await service.create(createDto)

      expect(mockNotificationModel.create).toHaveBeenCalledWith(createDto)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('findOne', () => {
    it('should find and return a notification by ID', async () => {
      const id = 'some-id'
      const expectedResult = { _id: id, titulo: 'Teste' }

      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(expectedResult),
      } as any)

      const result = await service.findOne(id)

      expect(model.findById).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })

    it('should throw NotFoundException if notification is not found', async () => {
      const id = 'non-existent-id'
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any)

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException)
    })
  })
})

