import React, { useState, useEffect } from "react";
import { Card } from "../";
import {
  getInitialTweets,
  getLatestTweetsAfterTimestamp
} from "../../services/Tweets";
import config from "../../config";

import "./Tweets.css";

function Tweets() {
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [lastTimestamp, setLastTimestamp] = useState();

  useEffect(() => {
    const beginFetch = async () => {
      try {
        const data = await getInitialTweets();
        setTweets(data);
        setLastTimestamp(data[0].timeStamp);
      } catch (e) {} // in the real world we may handle this depending on the circumstances or at least log it
    };

    const fetchTweets = async () => {
      if (!lastTimestamp) {
        beginFetch();
      } else {
        try {
          const data = await getLatestTweetsAfterTimestamp(
            lastTimestamp,
            config.MAX_TWEETS
          );
          if (data.length) {
            setTweets([...data, ...tweets]);
            setLastTimestamp(data[0].timeStamp);
          }
        } catch (e) {} // in the real world we may handle this depending on the circumstances or at least log it
      }
    };

    if (!initialFetchComplete) {
      setInitialFetchComplete(true);
      beginFetch();
    }

    const interval = setInterval(fetchTweets, config.FETCH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [initialFetchComplete, lastTimestamp, tweets]);

  return (
    <div className="tweets">
      <h1> Latest Tweets </h1>
      {tweets.map((tweet, i) => (
        <Card
          key={i}
          username={tweet.username}
          text={tweet.text}
          image={tweet.image}
        />
      ))}
    </div>
  );
}

export default Tweets;
