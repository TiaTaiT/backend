import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PimService } from './pim.service';
import { CreatePimDto } from './dto/create-pim.dto';
import { UpdatePimDto } from './dto/update-pim.dto';

@Controller('device/pim')
export class PimController {
  constructor(private readonly pimService: PimService) {}

  @Post()
  create(@Body() createPimDto: CreatePimDto) {
    return this.pimService.create(createPimDto);
  }

  @Get()
  findAll() {
    return this.pimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pimService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePimDto: UpdatePimDto) {
    return this.pimService.update(+id, updatePimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pimService.remove(+id);
  }
}
