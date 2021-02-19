import React, { useState, useEffect } from 'react'
import axios from 'axios'

const User = (props) => {

    // Get Steam Id from Props
    const steamId = props.match.params.steamId

    // API Key

    const API_KEY = process.env.REACT_APP_API_KEY

    //  Store DBD stats from Axios request

    const [stats, updateStats] = useState([])
    
    //  Fetch DBD Stats

    useEffect(() => {
        axios.get(`https://thingproxy.freeboard.io/fetch/http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=381210&key=${API_KEY}&steamid=76561197982217180`)
            .then(resp => {
                updateStats(resp.data)
            })
    }, [])
    
    console.log(API_KEY)
    console.log(props)
    console.log(stats)
    return <h1>{steamId}</h1>
}

export default User