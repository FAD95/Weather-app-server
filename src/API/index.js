const fetch = require('node-fetch')
async function requestActualWeather(data) {
  const URI = `https://api.openweathermap.org/data/2.5/weather?q=${data.city},${data.countryCode}&appid=${process.env.API_KEY}&units=metric`
  let jsonData = {}
  await fetch(URI)
    .then(async (response) => {
      jsonData = await response.json()
    })
    .catch(handleFatalError)
  return jsonData
}

function handleFatalError(err) {
  console.error(err)
}

module.exports = requestActualWeather
