import { HttpExceptionFilter } from './exceptions/http-exception.filer';
import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import axios from 'axios';
import { AppService } from './app.service';

@UseFilters(HttpExceptionFilter)
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get(':id')
  // async getPoint(@Param() id) {
  //   console.log(id);
  //   const data = await changeAddressToCoordinate(id);
  //   const { geometry } = data.results[0];

  //   const { location } = geometry;
  //   const { lat, lng } = location;
  //   return location;
  // }
}
