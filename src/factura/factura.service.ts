import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacturaService {

  constructor(
    @InjectRepository(Factura)
    private readonly repository: Repository<Factura>,
  ) {}

  async create(createFacturaDto: CreateFacturaDto) {
    const data = this.repository.create(createFacturaDto);
    return await this.repository.save(data);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const data = await this.repository.findOne(id, {relations:  ["cliente", "facturaDetalle"]});
    if(!data) throw new NotFoundException('Factura no existe');
    return data;
  }

  update(id: number, updateFacturaDto: UpdateFacturaDto) {
    return `This action updates a #${id} factura`;
  }

  remove(id: number) {
    return `This action removes a #${id} factura`;
  }
}
