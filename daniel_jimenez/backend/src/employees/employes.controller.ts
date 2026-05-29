// src/app.controller.ts
import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/nestjs';
import { CreateTimecardDto } from './dto/create-employee.dto';
import { Employee, Timecard } from './interfaces/employee.interface';

@Controller('api') // Prefijo global para cumplir con el formato /api/...
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 1. GET /api/employees
  @Get('employees')
  getAllEmployees(): Employee[] {
    return this.appService.findAllEmployees();
  }

  // 2. GET /api/employees/:id/timecards
  @Get('employees/:id/timecards')
  getTimecardsByEmployee(@Param('id', ParseIntPipe) id: number): Timecard[] {
    return this.appService.findTimecardsByEmployee(id);
  }

  // 3. POST /api/timecards
  @Post('timecards')
  createTimecard(@Body() createTimecardDto: CreateTimecardDto): Timecard {
    return this.appService.createTimecard(createTimecardDto);
  }
}