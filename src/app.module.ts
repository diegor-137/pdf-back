import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } from './config/constants';
import { PdfModule } from './pdf/pdf.module';
import { FacturaModule } from './factura/factura.module';
import { ClientesModule } from './clientes/clientes.module';
import { FacturaDetalleModule } from './factura-detalle/factura-detalle.module';
import { RolesGuard } from './Guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>({
        type: 'postgres',
        host:config.get<string>(DATABASE_HOST),
        port: parseInt(config.get<string>(DATABASE_PORT),10),
        username:config.get<string>(DATABASE_USERNAME),
        password:config.get<string>(DATABASE_PASSWORD),
        database:config.get<string>(DATABASE_NAME),
        entities: [__dirname + '../**/**/*entity{.ts,.js'],
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }), 

    PdfModule, FacturaModule, ClientesModule, FacturaDetalleModule
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
})
export class AppModule {}
