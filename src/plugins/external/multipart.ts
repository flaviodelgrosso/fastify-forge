import FastifyMultipart, { type FastifyMultipartOptions } from '@fastify/multipart';

export const autoConfig: FastifyMultipartOptions = {
  limits: {
    fieldNameSize: 100,
    fieldSize: 100,
    fields: 10,
    fileSize: 1 * 1024 * 1024,
    files: 1,
    parts: 1000,
  },
};

export default FastifyMultipart;
