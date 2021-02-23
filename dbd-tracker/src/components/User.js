import React, { useState, useEffect } from "react";
import axios from "axios";

// import rank images

import k1 from "../images/k1.png";
import k2 from "../images/k2.png";
import k3 from "../images/k3.png";
import k4 from "../images/k4.png";
import k5 from "../images/k5.png";
import k6 from "../images/k6.png";
import k7 from "../images/k7.png";
import k8 from "../images/k8.png";
import k9 from "../images/k9.png";
import k10 from "../images/k10.png";
import k11 from "../images/k11.png";
import k12 from "../images/k12.png";
import k13 from "../images/k13.png";
import k14 from "../images/k14.png";
import k15 from "../images/k15.png";
import k16 from "../images/k16.png";
import k17 from "../images/k17.png";
import k18 from "../images/k18.png";
import k19 from "../images/k19.png";
import k20 from "../images/k20.png";

import s1 from "../images/s1.png";
import s2 from "../images/s2.png";
import s3 from "../images/s3.png";
import s4 from "../images/s4.png";
import s5 from "../images/s5.png";
import s6 from "../images/s6.png";
import s7 from "../images/s7.png";
import s8 from "../images/s8.png";
import s9 from "../images/s9.png";
import s10 from "../images/s10.png";
import s11 from "../images/s11.png";
import s12 from "../images/s12.png";
import s13 from "../images/s13.png";
import s14 from "../images/s14.png";
import s15 from "../images/s15.png";
import s16 from "../images/s16.png";
import s17 from "../images/s17.png";
import s18 from "../images/s18.png";
import s19 from "../images/s19.png";
import s20 from "../images/s20.png";

const User = (props) => {
  // Get Steam Id from Props
  const steamId = props.match.params.steamId;

  // API Key

  const API_KEY = process.env.REACT_APP_API_KEY;

  //  Store DBD stats from Axios request

  const [stats, updateStats] = useState([]);

  //  Store User Info from Steam ID

  const [userInfo, updateUserInfo] = useState([]);

  //  Store current page

  const [currentPage, updateCurrentPage] = useState("killer");

  //  Fetch DBD Stats

  useEffect(() => {
    axios
      .get(
        `https://decproxyserver.herokuapp.com/https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=381210&key=${API_KEY}&steamid=${steamId}`
      )
      .then((resp) => {
        updateStats(resp.data);
      });
  }, []);

  //  Get User Info from Steam ID

  useEffect(() => {
    axios
      .get(
        `https://decproxyserver.herokuapp.com/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamId}`
      )
      .then((resp) => {
        updateUserInfo(resp.data);
      });
  }, []);

  //  Handle page change

  function handleKiller() {
    updateCurrentPage("killer");
  }

  function handleSurvivor() {
    updateCurrentPage("survivor");
  }

  // Return the value of the correct stat

  function returnObject(name) {
    const object = stats.playerstats.stats.filter(obj => {
      return obj.name === name
    })
    
    if (object[0]) {
      return object[0].value
    } else {
      return 0
    }

     
  }

  //   console logs

  
  console.log(stats);

  // Loading / Invalid Id screen

  if (!stats.playerstats) {
    return (
      <div className="section">
        <div className="container is-fluid" id="loading">
          <div className="title">Loading ...</div>
          <progress className="progress is-large is-success" max="100">
            60%
          </progress>
        </div>
        <p className="has-text-link has-text-centered pt-6">This Should only take a few seconds, if it takes longer: <br></br> 
        1. Check you have entered the correct Steam ID, help <a href="https://www.google.com/search?q=find+your+steam+id&rlz=1C1CHBF_en-GBGB923GB923&oq=find+your+steam+id&aqs=chrome..69i57j0i22i30l3j0i10i22i30j0i22i30l2j69i60.4190j1j7&sourceid=chrome&ie=UTF-8" target="_blank" rel="noopener noreferrer" id="link">Here</a> <br></br>
        2. Make Sure You Have Set Your Steam Profile To Public, help <a href="https://www.google.com/search?q=how+to+make+steam+profile+public&rlz=1C1CHBF_en-GBGB923GB923&oq=how+to+make+steam+profile+&aqs=chrome.0.0l4j69i57j0l3.5402j1j4&sourceid=chrome&ie=UTF-8" target="_blank" rel="noopener noreferrer" id="link">Here</a>
        </p>
      </div>
    );
  }

  if (!userInfo.response) {
    return (
      <div className="section">
        <div className="container is-fluid">
          <div className="title">Loading ...</div>
          <progress className="progress is-large is-success" max="100">
            60%
          </progress>
        </div>
      </div>
    );
  }

  return (
    <section className="container has-background-dark">
      {/*  User Info */}
      <div className="container is-fluid">
        <article className="media pt-4">
          <figure className="media-left">
            <p className="image is-64x64">
              <img className="is-rounded" src={userInfo.response.players[0].avatar} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p className="has-text-link">
                <strong className="title has-text-link">
                  {userInfo.response.players[0].personaname}
                </strong>
                <br></br>
                Steam ID: {userInfo.response.players[0].steamid}
              </p>
            </div>
          </div>
        </article>
      </div>


      {/* Bloodpoints */}

      <div className="container is-fluid has-text-centered" id="bloodpointbuttoncontainer">
        <div id="bloodpointbutton">
          <div id="bpstatline"></div>
          <p className="has-text-link is-6">{returnObject("DBD_BloodwebPoints")} Bloodpoints Earned</p>
        </div>
      </div>

      {/* Killer & Survivor Ranks */}
      <div className="container">
        <div className="columns is-mobile mt-4 pb-6" id="ranks">
          <div className="column has-text-centered mt-2">
            <p className="has-text-link has-text-center">Killer Rank</p>
            <figure className="image is-64x64 is-inline-block pt-3">
              {stats.playerstats.stats[0].value < 3 && <img src={k20} />}
              {stats.playerstats.stats[0].value > 2 &&
                stats.playerstats.stats[0].value < 6 && <img src={k19} />}
              {stats.playerstats.stats[0].value > 5 &&
                stats.playerstats.stats[0].value < 10 && <img src={k18} />}
              {stats.playerstats.stats[0].value > 9 &&
                stats.playerstats.stats[0].value < 14 && <img src={k17} />}
              {stats.playerstats.stats[0].value > 13 &&
                stats.playerstats.stats[0].value < 18 && <img src={k16} />}
              {stats.playerstats.stats[0].value > 17 &&
                stats.playerstats.stats[0].value < 22 && <img src={k15} />}
              {stats.playerstats.stats[0].value > 21 &&
                stats.playerstats.stats[0].value < 26 && <img src={k14} />}
              {stats.playerstats.stats[0].value > 25 &&
                stats.playerstats.stats[0].value < 30 && <img src={k13} />}
              {stats.playerstats.stats[0].value > 29 &&
                stats.playerstats.stats[0].value < 35 && <img src={k12} />}
              {stats.playerstats.stats[0].value > 34 &&
                stats.playerstats.stats[0].value < 40 && <img src={k11} />}
              {stats.playerstats.stats[0].value > 39 &&
                stats.playerstats.stats[0].value < 45 && <img src={k10} />}
              {stats.playerstats.stats[0].value > 44 &&
                stats.playerstats.stats[0].value < 50 && <img src={k9} />}
              {stats.playerstats.stats[0].value > 49 &&
                stats.playerstats.stats[0].value < 55 && <img src={k8} />}
              {stats.playerstats.stats[0].value > 54 &&
                stats.playerstats.stats[0].value < 60 && <img src={k7} />}
              {stats.playerstats.stats[0].value > 59 &&
                stats.playerstats.stats[0].value < 65 && <img src={k6} />}
              {stats.playerstats.stats[0].value > 64 &&
                stats.playerstats.stats[0].value < 70 && <img src={k5} />}
              {stats.playerstats.stats[0].value > 69 &&
                stats.playerstats.stats[0].value < 75 && <img src={k4} />}
              {stats.playerstats.stats[0].value > 74 &&
                stats.playerstats.stats[0].value < 80 && <img src={k3} />}
              {stats.playerstats.stats[0].value > 79 &&
                stats.playerstats.stats[0].value < 85 && <img src={k2} />}
              {stats.playerstats.stats[0].value > 84 && <img src={k1} />}
            </figure>
          </div>
          <div className="column has-text-centered mt-2">
            <p className="has-text-link has-text-centered">Survivor Rank</p>
            <figure className="image is-64x64 is-inline-block pt-3">
              {stats.playerstats.stats[1].value < 3 && <img src={k20} />}
              {stats.playerstats.stats[1].value > 2 &&
                stats.playerstats.stats[1].value < 6 && <img src={s19} />}
              {stats.playerstats.stats[1].value > 5 &&
                stats.playerstats.stats[1].value < 10 && <img src={s18} />}
              {stats.playerstats.stats[1].value > 9 &&
                stats.playerstats.stats[1].value < 14 && <img src={s17} />}
              {stats.playerstats.stats[1].value > 13 &&
                stats.playerstats.stats[1].value < 18 && <img src={s16} />}
              {stats.playerstats.stats[1].value > 17 &&
                stats.playerstats.stats[1].value < 22 && <img src={s15} />}
              {stats.playerstats.stats[1].value > 21 &&
                stats.playerstats.stats[1].value < 26 && <img src={s14} />}
              {stats.playerstats.stats[1].value > 25 &&
                stats.playerstats.stats[1].value < 30 && <img src={s13} />}
              {stats.playerstats.stats[1].value > 29 &&
                stats.playerstats.stats[1].value < 35 && <img src={s12} />}
              {stats.playerstats.stats[1].value > 34 &&
                stats.playerstats.stats[1].value < 40 && <img src={s11} />}
              {stats.playerstats.stats[1].value > 39 &&
                stats.playerstats.stats[1].value < 45 && <img src={s10} />}
              {stats.playerstats.stats[1].value > 44 &&
                stats.playerstats.stats[1].value < 50 && <img src={s9} />}
              {stats.playerstats.stats[1].value > 49 &&
                stats.playerstats.stats[1].value < 55 && <img src={s8} />}
              {stats.playerstats.stats[1].value > 54 &&
                stats.playerstats.stats[1].value < 60 && <img src={s7} />}
              {stats.playerstats.stats[1].value > 59 &&
                stats.playerstats.stats[1].value < 65 && <img src={s6} />}
              {stats.playerstats.stats[1].value > 64 &&
                stats.playerstats.stats[1].value < 70 && <img src={s5} />}
              {stats.playerstats.stats[1].value > 69 &&
                stats.playerstats.stats[1].value < 75 && <img src={s4} />}
              {stats.playerstats.stats[1].value > 74 &&
                stats.playerstats.stats[1].value < 80 && <img src={s3} />}
              {stats.playerstats.stats[1].value > 79 &&
                stats.playerstats.stats[1].value < 85 && <img src={s2} />}
              {stats.playerstats.stats[1].value > 84 && <img src={s1} />}
            </figure>
          </div>
        </div>
      </div>

      {/*  Page Selector */}

      <div className="columns is-mobile mt-3">
        <div className="column has-text-centered pb-0" id="contact-link">
          <p className="has-text-link" onClick={handleKiller}>
            Killer Stats
          </p>
        </div>
        <div className="column has-text-centered" id="contact-link">
          <p className="has-text-link" onClick={handleSurvivor}>
            Survivor Stats
          </p>
        </div>
      </div>

      {/* Pages */}
      {/* Killer Page */}

      {currentPage === "killer" && (
        <div className="container is-fluid has-text-centered" id="bloodpointbuttoncontainer">

        <div id="statbutton">
          <div id="killerstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Games Played</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_SlasherFullLoadout")}
          </p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="killerstatline"></div>
          <div id="statbox">
            <p className="has-text-link is-7" id="stattitle">Survivors Sacrificed</p>
            <p className="has-text-link is-3" id="statnumber">{returnObject("DBD_SacrificedCampers")}</p>
          </div> 
        </div>
        
        <div id="statbutton">
          <div id="killerstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Survivors Killed</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_KilledCampers")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="killerstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Perfect Games</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_SlasherMaxScoreByCategory")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="killerstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Survivors Hooked in Basement</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_DLC6_Slasher_Stat2")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="killerstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Wins With Generators Remaining</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_Chapter11_Slasher_Stat1")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="killerstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Survivors Grabbed While Repairing</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_Chapter12_Slasher_Stat1")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="killerstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Hatches Closed</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_Chapter13_Slasher_Stat1")}</p>
          </div> 
        </div>



      </div>

      
      )}
      {/*  Survivor Page */}
      {currentPage === "survivor" && (
        <div className="container is-fluid has-text-centered" id="bloodpointbuttoncontainer">

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Games Played</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_CamperFullLoadout")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Perfect Games</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_CamperMaxScoreByCategory")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Escapes</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_Escape")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Crawling Escapes</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_EscapeKO")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Hatch Escapes</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_EscapeThroughHatch")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Exit Gates Opened</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_DLC7_Camper_Stat2")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Generators Repaired</p>
            <p className="has-text-link" id="statnumber">{Math.round(returnObject("DBD_GeneratorPct_float"))}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Survivors Healed</p>
            <p className="has-text-link" id="statnumber">{Math.round(returnObject("DBD_HealPct_float"))}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Survivors Unhooked</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_UnhookOrHeal") - returnObject("DBD_Chapter15_Camper_Stat1")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Survivors Picked Up</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_Chapter15_Camper_Stat1")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Successful Skillchecks</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_SkillCheckSuccess")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Hex Totems Cleansed</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_DLC3_Camper_Stat1")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Vaults In Chase</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_Camper8_Stat2")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Hits Evaded by Vaulting</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_DLC9_Camper_Stat1")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Chests Searched</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_DLC7_Camper_Stat1")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Escaped With Loot</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_CamperNewItem")}</p>
          </div> 
        </div>

        <div id="statbutton">
          <div id="survivorstatline"></div>
          <div id="statbox">
            <p className="has-text-link" id="stattitle">Escaped With Teammate's Item</p>
            <p className="has-text-link" id="statnumber">{returnObject("DBD_CamperEscapeWithItemFrom")}</p>
          </div> 
        </div>



        </div>
      )}

    </section>
  );
};

export default User;
