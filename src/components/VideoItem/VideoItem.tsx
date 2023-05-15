import { VideoType } from "utils/types";
import styles from "./VideoItem.module.scss";
import Image from "next/image";

const VideoItem = ({ video }: { video: VideoType }) => {
  const { title, thumbnail } = video;
  return (
    <div className={styles["container"]}>
      <h5>{title}</h5>
      <div className={styles["thumbnail-container"]}>
        <Image src={thumbnail} alt="title" fill />
      </div>
    </div>
  );
};

export default VideoItem;
