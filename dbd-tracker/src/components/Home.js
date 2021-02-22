import React, { useState } from "react"
import { Link } from 'react-router-dom'
import logo from "../images/logo.png";

const Home = () => {
  // Capturing inout from Steam Id search

  const [steamId, updateSteamId] = useState("")



  return (
    <div id="homepage">
      <img id="homelogo" src={logo}></img>
      <form>
        <label className="has-text-link">Enter Your Steam ID</label>
        <div className="field has-addons is-justify-content-center">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Steam ID eg: 12345678987654321"
              onChange={(event) => updateSteamId(event.target.value)}
              value={steamId}
            />
          </div>
          <div className="control">
            <Link to={`/user/${steamId}`} className="button is-success">Search</Link>
          </div>
          
        </div>
      </form>
      <p className="help is-link">Can't Find Your ID? Click <a href="https://www.google.com/search?q=find+your+steam+id&rlz=1C1CHBF_en-GBGB923GB923&oq=find+your+steam+id&aqs=chrome..69i57j0i22i30l3j0i10i22i30j0i22i30l2j69i60.4190j1j7&sourceid=chrome&ie=UTF-8" target="_blank" rel="noopener noreferrer" id="link">Here</a></p>
    </div>
  )
}

export default Home
