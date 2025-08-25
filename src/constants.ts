

export type Environment = 'development' | 'production' | 'preview';

export const NODE_ENV = (process.env.NODE_ENV ?? 'production') as Environment;
