import { Test, TestingModule } from '@nestjs/testing'
import { NotificationController } from '../notification.controller'
import { NotificationService } from '../notification.service'
import { CreateNotificationDto } from '../dto/create-notification.dto'

// Aqui eu criei um "dublê" do serviço com métodos falsos
const mockNotificationService = {
  create: jest.fn(dto => ({ _id: 'some-id', ...dto })),
  findAll: jest.fn(() => []),
  findOne: jest.fn(id => ({ _id: id, titulo: 'Mock Notification' })),
}

describe('NotificationController', () => {
  let controller: NotificationController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [{
        provide: NotificationService,
        useValue: mockNotificationService
      }]
    }).compile()

    controller = module.get<NotificationController>(NotificationController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a notification', () => {
    const dto: CreateNotificationDto = {
      titulo: 'Teste',
      descricao: 'Teste desc',
      data_audiencia: '2025-01-01T00:00:00.000Z',
    }
    
    controller.create(dto)
    expect(mockNotificationService.create).toHaveBeenCalledWith(dto)
  })
})
