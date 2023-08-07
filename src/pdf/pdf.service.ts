import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import { Pdf } from './entities/pdf.entity';

@Injectable()
export class PdfService {

  constructor(
    @InjectRepository(Pdf)
    private readonly repository: Repository<Pdf>,
  ) {}


  async create(createPdfDto: CreatePdfDto) {
    const data = this.repository.create(createPdfDto);
    return await this.repository.save(data);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const data = await this.repository.findOne(id);
    if(!data) throw new NotFoundException('El contenido no existe deberas');
    return data;
  }

   async update(id: number, updatePdfDto: UpdatePdfDto) {
   const data = await this.repository.findOne(id);
   if(!data) throw new NotFoundException('El contenido no existe');

   const edit = Object.assign(data, updatePdfDto);
   return await this.repository.save(edit);

  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
