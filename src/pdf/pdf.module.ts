import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pdf } from './entities/pdf.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pdf])
  ],
  controllers: [PdfController],
  providers: [PdfService],
  exports: [PdfService]
})
export class PdfModule {}
