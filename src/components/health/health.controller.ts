import { Controller, Get } from "@nestjs/common";

// handle /api/healthcheck
@Controller('api')
export class HealthController {
  @Get('healthcheck')
  healthcheck() {
    return { status: 'OK' };
  }
}