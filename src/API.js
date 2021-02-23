const PROD_URL = 'https://shielded-harbor-32849.herokuapp.com'
const DEV_URL = 'http://localhost:3000'

const API = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;

export default API;