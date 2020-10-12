const express = require("express");
const redis = require("redis");
const api = require("../src/services/api");

const routes = express.Router();

const cache = redis.createClient({
  host: "redis-server",
  port: 6379,
});

cache.on("connect", () => {
  console.log("REDIS READY");
});

cache.on("error", (e) => {
  console.log("REDIS ERROR", e);
});

function getCache(key) {
  return new Promise((resolve, reject) => {
    cache.get(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}

const setCache = (key, value) => {
  console.log("Salvando no cache");
  cache.set(key, JSON.stringify(value));
  // redisClient.expire(key, 10);
};

const getUrlAll = async () => {
  console.log("Buscando da API(https://restcountries.eu/rest/v2/all)");
  try {
    const { data } = await api.get("all");
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getUrlName = async (name) => {
  console.log(
    "Buscando da API(https://restcountries.eu/rest/v2/name/{name}?fullText=true)"
  );
  try {
    const { data } = await api.get(`name/${name}?fullText=true`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

routes.get("/all", async (req, res) => {
  let dataCache = await getCache("all");
  if (dataCache == null) {
    const dataURL = await getUrlAll();
    console.log("From url rota /all");
    await setCache("all", dataURL);
    res.json(dataURL);
  } else {
    console.log("From cache do Redis rota /all");
    res.json(JSON.parse(dataCache));
  }
});

routes.get("/name/:name", async (req, res) => {
  const name = req.params.name;
  let dataCache = await getCache(name);
  if (dataCache == null) {
    const dataURL = await getUrlName(name);
    console.log("From url rota /name");
    await setCache(name, dataURL);
    res.json(dataURL);
  } else {
    console.log("From cache do Redis rota /name");
    res.json(JSON.parse(dataCache));
  }
});

module.exports = routes;
