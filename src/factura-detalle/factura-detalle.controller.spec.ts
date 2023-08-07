import { Test, TestingModule } from '@nestjs/testing';
import { FacturaDetalleController } from './factura-detalle.controller';
import { FacturaDetalleService } from './factura-detalle.service';

describe('FacturaDetalleController', () => {
  let controller: FacturaDetalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacturaDetalleController],
      providers: [FacturaDetalleService],
    }).compile();

    controller = module.get<FacturaDetalleController>(FacturaDetalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
