import Constants from 'expo-constants';

export const generateAPIUrl = (relativePath: string) => {
  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

  if (process.env.NODE_ENV === 'development') {
    // Constants.experienceUrl isn't available on all platforms (e.g. web).
    // Fallback to the current location when it isn't defined.
    const devOrigin =
      Constants.experienceUrl?.replace('exp://', 'http://') ??
      (typeof location !== 'undefined' ? location.origin : '');

    return devOrigin.concat(path);
  }

  if (!process.env.EXPO_PUBLIC_API_BASE_URL) {
    throw new Error(
      'EXPO_PUBLIC_API_BASE_URL environment variable is not defined',
    );
  }

  return process.env.EXPO_PUBLIC_API_BASE_URL.concat(path);
};
