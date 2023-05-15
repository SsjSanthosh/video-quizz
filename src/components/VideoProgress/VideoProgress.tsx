import { Progress } from "@chakra-ui/react";
import styles from "./VideoProgress.module.scss";
import { AiOutlineTrophy } from "react-icons/ai";

const VideoProgress = () => {
  return (
    <div className={styles["container"]}>
      <AiOutlineTrophy size="20" />
      <span>0 / 5 lessons completed.</span>
      <Progress value={20} />
    </div>
  );
};

export default VideoProgress;
