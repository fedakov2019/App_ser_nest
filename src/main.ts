import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const Port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const conf = new DocumentBuilder().setTitle('APP list').build();
  const docum = SwaggerModule.createDocument(app, conf);
  SwaggerModule.setup('api', app, docum);
  await app.listen(Port, () => console.log(`Server started on port= ${Port}`));
}
bootstrap();
