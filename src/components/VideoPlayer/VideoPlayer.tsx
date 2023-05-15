import YouTube, { YouTubePlayer, YouTubeEvent } from "react-youtube";
import { END_STATE, PAUSED_STATE, PLAYING_STATE } from "utils/constants";
import { useState } from "react";
import styles from "./VideoPlayer.module.scss";
import { useRouter } from "next/router";

let timer: NodeJS.Timer;

const VideoPlayer = ({ onEnd }: { onEnd: () => void }) => {
  const router = useRouter();
  const { query } = router;
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const endVideo = () => {
    localStorage.setItem((query.id as string) + "_done", JSON.stringify(true));
    onEnd();
  };

  const handleStateChange = (state: number) => {
    switch (state) {
      case PLAYING_STATE:
        timer = setInterval(() => {
          localStorage.setItem(
            (query.id as string) + "_progress",
            JSON.stringify(player.getCurrentTime())
          );
        }, 2000);
        break;
      case PAUSED_STATE:
        clearInterval(timer);
        break;
      case END_STATE:
        clearInterval(timer);
        endVideo();
        break;
      default:
        return;
    }
  };
  if(!query.id) return null;
  return (
    <div>
      <YouTube
        videoId={query.id as string}
        onReady={(e) => setPlayer(e.target)}
        onStateChange={(e) => handleStateChange(e.data)}
      />
    </div>
  );
};

export default VideoPlayer;
