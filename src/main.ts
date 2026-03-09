import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Uso de pipes de forma global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
    }),
  );

  //Configuracion de SWAGGER
  const config = new DocumentBuilder()
    .setTitle('API con vulnerabilidades')
    .setDescription('Documentación de la API para pruebas de seguridad')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//? MYSQL
//!npm i mysql2
//!npm i @types/mysql2 -D

//? POSTGRESQL
//!npm i pg
//!npm i @types/pg -D

//? SWAGGER
//!npm i @nestjs/swagger

//?
//!npm install prisma --save-dev

//? BCRYPT
//!npm i bcrypt
//!npm i -D @types/bcrypt
//!nest g service common/services/util
