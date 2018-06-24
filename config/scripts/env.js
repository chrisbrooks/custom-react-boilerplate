function getClientEnvironment(publicUrl) {
  const raw = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PUBLIC_URL: publicUrl,
    APP_URL: process.env.APP_URL
  };
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return {
    raw,
    stringified
  };
}

module.exports = getClientEnvironment;
