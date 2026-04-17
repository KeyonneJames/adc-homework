// App.js
import React from 'react';
import Tweet from './tweet';
import { tweetsData } from './data';

/* Do not write your tweet component here, write it in the tweet.tsx file */

function App() {
  return (
    <div className="app">
      <h1>Twitter Clone</h1>
      <div className="feed">
        {/* for each tweet, make a component using the function Tweet */}
        {tweetsData.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} /> 
        ))}
      </div>
    </div>
  );
}

export default App;
