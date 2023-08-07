import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {


  constructor(
    @InjectRepository(Cliente)
    private readonly repository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const data = this.repository.create(createClienteDto);
    return await this.repository.save(data);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const data = await this.repository.findOne(id);
    if(!data) throw new NotFoundException('Cliente no existe');
    return data;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
