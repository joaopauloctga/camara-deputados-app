const redis = require('redis');
const querystring = require('querystring');

export default async function handler(req, res) {
  const { query } = req;
  let params = querystring.stringify(query)

  const client = redis.createClient({
    host: '127.0.1',
    port: 6379,
  });

  await client.connect();
  const keyData = `deputados-${params}`;
  let data = await client.get('test')
  console.log(keyData, data)
  if (data == null) {
    const queryParams = params !== '' ? `?${params}` : ''
    const deputados = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados${queryParams}`)
    const data = await deputados.json();
    client.set(keyData, JSON.stringify(data))
  }
  else {
    data = JSON.parse(data)
  }
  
  res.status(200).json(data);
}
