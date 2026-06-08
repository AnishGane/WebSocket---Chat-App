const requireEnvVars = ["VITE_BACKEND_URL"];

requireEnvVars.forEach((envVar) => {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing environment variable: ${envVar}`);
  }
});

export const ENV_VAR = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
};
