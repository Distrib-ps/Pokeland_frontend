import { useState, useEffect } from "react";
import axios from "axios";

const getVideos = async (cb, cbError) => {
  try {
    const responseYoutube = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=3&playlistId=UUcoFJANjdm4u8ibMHEo94Fw&key=${process.env.REACT_APP_YOUTUBEKEY}`
    );
    cb(responseYoutube.data.items);
    cbError({ value: "", error: false });
  } catch (err) {
    cb();
    cbError({ value: "Nous n'avons pas pu charger les videos", error: true });
  }
};

function Videos() {
  const [videos, setVideos] = useState();
  const [error, setError] = useState({ value: "", error: false });

  useEffect(() => {
    getVideos(setVideos, setError);
  }, [setVideos, setError]);

  return (
    <div className={`home_page_video`}>
      <h2>Dernières videos</h2>
      {videos &&
        videos.map((video, index) => {
          return (
            <div className="" key={index}>
              <a
                href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt="couverture de la video"
                />
                <p>{video.snippet.title}</p>
              </a>
            </div>
          );
        })}
      {error.error && <p>{error.value}</p>}
    </div>
  );
}

export default Videos;
