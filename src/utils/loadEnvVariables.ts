const loadEnvVariables = (keyname: string): string => {
  const envVar = process.env[keyname];

  if (!envVar) throw new Error(`Environment variables must include ${keyname}`);

  return envVar;
};

export const environmentVariables = {
  NODE_ENV: loadEnvVariables('NODE_ENV'),
  JWT_SECRET: loadEnvVariables('JWT_SECRET'),
  PORT: loadEnvVariables('PORT'),
  LOCAL_MONGODB_URI: loadEnvVariables('LOCAL_MONGODB_URI'),
  STAG_MONGODB_URI: loadEnvVariables('STAG_MONGODB_URI'),
  PROD_MONGODB_URI: loadEnvVariables('PROD_MONGODB_URI'),
};
