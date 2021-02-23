const PROD_URL = 'http://limitless-earth-02935.herokuapp.com'
const DEV_URL = 'http://localhost:3000'

const API = DEV_URL
// const API = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;

export default API;