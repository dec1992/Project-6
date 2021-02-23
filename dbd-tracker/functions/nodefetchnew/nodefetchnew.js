const fetch = require('node-fetch')

const API_KEY = process.env.REACT_APP_API_KEY;

const handler = async function (steamId) {
  try {
    const response = await fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=381210&key=${API_KEY}&steamid=${steamId}`, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
