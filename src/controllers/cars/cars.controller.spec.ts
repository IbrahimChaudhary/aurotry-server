import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from './cars.controller';
import { AppService } from '../../app.service';

describe('AppController', () => {
  let appController: CarController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [AppService],
    }).compile();

    appController = app.get<CarController>(CarController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
