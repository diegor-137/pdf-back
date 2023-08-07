import { Test, TestingModule } from '@nestjs/testing';
import { FacturaDetalleService } from './factura-detalle.service';

describe('FacturaDetalleService', () => {
  let service: FacturaDetalleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacturaDetalleService],
    }).compile();

    service = module.get<FacturaDetalleService>(FacturaDetalleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
