import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './Guards/roles.guard';
import { Role } from './role.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(RolesGuard)
  @Get()
  @Roles(Role.Admin)
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(RolesGuard)
  @Post()
  //@Roles(Role.Admin)
  getHello1(): string {
    return this.appService.getHello();
  }
}

