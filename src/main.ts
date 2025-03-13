import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  console.log("SUPABASE_URL:", process.env.SUPABASE_URL); // Debugging
  console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY);
  const app = await NestFactory.create(AppModule,{cors:true});
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
