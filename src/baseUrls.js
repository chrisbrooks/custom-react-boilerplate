export function getBaseUrl() {
  return process.env.APP_URL || 'http://localhost:8000';
}

export function getGraphqlEndpoint() {
  return `${getBaseUrl()}/graphql`;
}

export function setBaseRedirect() {
  return `${getBaseUrl()}/account/login`;
}
