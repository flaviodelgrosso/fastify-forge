import { strictEqual } from 'node:assert';
import { test } from 'node:test';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../src/errors/http-error.ts';

test('should create NotFoundError correctly', () => {
  const error = new NotFoundError('Resource not found');
  strictEqual(error.statusCode, 404);
  strictEqual(error.message, 'Resource not found');
  strictEqual(error.error, 'Not Found');
  strictEqual(error.name, 'HttpError');
});

test('should create ForbiddenError correctly', () => {
  const error = new ForbiddenError('Access denied');
  strictEqual(error.statusCode, 403);
  strictEqual(error.message, 'Access denied');
  strictEqual(error.error, 'Forbidden');
  strictEqual(error.name, 'HttpError');
});

test('should create UnauthorizedError correctly', () => {
  const error = new UnauthorizedError('Authentication required');
  strictEqual(error.statusCode, 401);
  strictEqual(error.message, 'Authentication required');
  strictEqual(error.error, 'Unauthorized');
  strictEqual(error.name, 'HttpError');
});

test('should create BadRequestError correctly', () => {
  const error = new BadRequestError('Invalid request');
  strictEqual(error.statusCode, 400);
  strictEqual(error.message, 'Invalid request');
  strictEqual(error.error, 'Bad Request');
  strictEqual(error.name, 'HttpError');
});

test('should create InternalServerError correctly', () => {
  const error = new InternalServerError('Server error');
  strictEqual(error.statusCode, 500);
  strictEqual(error.message, 'Server error');
  strictEqual(error.error, 'Internal Server Error');
  strictEqual(error.name, 'HttpError');
});
