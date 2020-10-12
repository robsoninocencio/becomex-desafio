const axios = require('axios');

const api = axios.create({
  baseURL: 'https://restcountries.eu/rest/v2'
})

module.exports = api;