import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from './pipes/validation.pipes';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get('APP_PORT') || 5001;
  const database = app.get(ConfigService).get('TYPEORM_DATABASE') || 5001;

  //app.useGlobalGuards(RolesGuard);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () =>
    console.log(`Database = "${database}"  App is running on port “${port}”`),
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
