jest.mock("expo-constants", () => ({ __esModule: true, default: {} }));
import Constants from 'expo-constants';
import { generateAPIUrl } from '../utils';

describe('generateAPIUrl', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('uses Constants.experienceUrl in development', () => {
    process.env.NODE_ENV = 'development';
    (Constants as any).experienceUrl = 'exp://localhost:8081';
    expect(generateAPIUrl('/test')).toBe('http://localhost:8081/test');
  });

  it('throws when base url undefined in production', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.EXPO_PUBLIC_API_BASE_URL;
    expect(() => generateAPIUrl('/test')).toThrow();
  });

  it('combines base url with path in production', () => {
    process.env.NODE_ENV = 'production';
    process.env.EXPO_PUBLIC_API_BASE_URL = 'https://example.com';
    expect(generateAPIUrl('test')).toBe('https://example.com/test');
  });
});
