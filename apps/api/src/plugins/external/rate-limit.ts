import FastifyRateLimit, { type FastifyRateLimitOptions } from '@fastify/rate-limit';
import { type FastifyRequest } from 'fastify';

import { swaggerDocsRoutePrefix } from './swagger.js';

export const autoConfig: FastifyRateLimitOptions = {
  allowList: (request: FastifyRequest) =>
    request.url === swaggerDocsRoutePrefix || request.url.startsWith(`${swaggerDocsRoutePrefix}/`),
  max: 4,
  timeWindow: '1 minute'
};

export default FastifyRateLimit;
