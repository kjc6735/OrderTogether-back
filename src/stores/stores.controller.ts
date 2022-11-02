import {
  StoreUpdateReponseDto,
  StoreUpdateRequestDto,
} from './dtos/store.update.dto';
import { Store } from './../entities/store.entity';
import { CreateStoreRequestDto } from './dtos/create.store.dto';
import { StoresService } from './stores.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get('/')
  getStores() {
    return this.storesService.getAll();
  }

  @Get('/:id/posts')
  getPostsByStoreId(@Param('id') id: number) {
    return this.storesService.getPostsByStoreId(id);
  }

  @Post('/')
  create(@Body() createStoreRequestDto: CreateStoreRequestDto) {
    return this.storesService.create(createStoreRequestDto);
  }

  @Put('/:id')
  update(
    @Param('id') id,
    @Body() storeUpdateRequestDto: StoreUpdateRequestDto,
  ) {
    return this.storesService.update(id, storeUpdateRequestDto);
  }

  @Delete('/:id')
  delete(@Param('id') id) {
    return this.storesService.remove(id);
  }
}
