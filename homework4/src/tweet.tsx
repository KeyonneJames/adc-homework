// Tweet.js
import React, { useState } from 'react';

function Tweet ({ tweet }: any) {
    // on mount, set the likes to the number of likes in the tweet data
    // also created a useState that tracks if the user has has like the tweet or not
    const [likes, setLikes] = useState(tweet.likes);
    const [liked, setLiked] = useState(false);

    return(
        <div className="tweet">
        <h3>@{tweet.username}</h3>
        <p>{tweet.content}</p>
        <p>{tweet.timestamp} ago</p>
        <button onClick={() => {
            if (liked) {
                setLikes(likes - 1);
            } else {
                setLikes(likes + 1);
            }
            setLiked(!liked);
        }}> ❤️ {likes} Likes
            </button>
        </div>
    );
}

export default Tweet;