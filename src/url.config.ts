const devBaseURL = '';
const proBaseURL = '';

export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;