const loadEnvVariables = (keyname: string): string => {
  const envVar = process.env[keyname];

  if (!envVar) throw new Error(`Environment variables must include ${keyname}`);

  return envVar;
};

export const environmentVariables = {
  NODE_ENV: loadEnvVariables('NODE_ENV'),
  JWT_SECRET: loadEnvVariables('JWT_SECRET'),
  PORT: loadEnvVariables('PORT'),
  MONGODB_URI: loadEnvVariables('MONGODB_URI'),
};
