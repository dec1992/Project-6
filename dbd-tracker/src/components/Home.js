import React, { useState } from "react"
import { Link } from 'react-router-dom'

const Home = () => {
  // Capturing inout from Steam Id search

  const [steamId, updateSteamId] = useState("")



  return (
    <div>
      <form>
        <div className="field has-addons is-justify-content-center">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Enter your Steam ID"
              onChange={(event) => updateSteamId(event.target.value)}
              value={steamId}
            />
          </div>
          <div className="control">
            <Link to={`/user/${steamId}`} className="button is-link">Search</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Home
