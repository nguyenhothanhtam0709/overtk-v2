import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { CoreEnvironment } from '@overtk/core/environment';
import { readFile } from 'node:fs/promises';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { getCoreEnvironment } from '@overtk/core/environment';
import { AppModule } from './app.module';

async function main(): Promise<void> {
  const coreEnv: Readonly<CoreEnvironment> = getCoreEnvironment();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      http2: true,
      https: {
        cert: await readFile(coreEnv.HTTPS_CERT_FILE_PATH),
        key: await readFile(coreEnv.HTTPS_KEY_FILE_PATH),
        allowHTTP1: true,
      },
    }),
  );

  await app.listen(coreEnv.API_PORT, coreEnv.API_HOST, () => {
    console.log(`Server is listening on port ${coreEnv.API_PORT}`);
  });
}

main();
