import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FunctionalityService } from './functionality.service';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { UpdateFunctionalityDto } from './dto/update-functionality.dto';

@Controller('api/functionality')
export class FunctionalityController {
  constructor(private readonly functionalityService: FunctionalityService) {}

  @Post()
  create(@Body() createFunctionalityDto: CreateFunctionalityDto) {
    return this.functionalityService.create(createFunctionalityDto);
  }

  @Get()
  findAll() {
    return this.functionalityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.functionalityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFunctionalityDto: UpdateFunctionalityDto,
  ) {
    return this.functionalityService.update(+id, updateFunctionalityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.functionalityService.remove(+id);
  }
}
