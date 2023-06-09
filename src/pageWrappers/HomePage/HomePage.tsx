import AppLayout from "components/AppLayout";
import { Stack, Skeleton } from "@chakra-ui/react";
import styles from "./HomePage.module.scss";
import { useState, useEffect } from "react";
import { VideoType } from "utils/types";
import { raxios } from "utils/functions";
import Link from "next/link";
import VideoItem from "components/VideoItem";

const HomePage = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [status, setStatus] = useState({ loading: false, error: false });
  useEffect(() => {
    const fetchVideos = async () => {
      setStatus({ loading: true, error: false });
      try {
        const data = await raxios.get("/data/videos.json");
        setVideos(data.data);
        setStatus({ loading: false, error: false });
      } catch (err) {
        setStatus({ loading: false, error: true });
      }
    };
    fetchVideos();
  }, []);

  if (!videos.length && !status.error) {
    return (
      <AppLayout>
        <div className={styles["skeleton-container"]}>
          {[1, 2, 3, 4, 5].map((a) => {
            return <Skeleton key={a} className={styles["skeleton"]} />;
          })}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className={styles["container"]}>
        <h1>Your course videos</h1>
        <div className={styles["videos-container"]}>
          {videos.map((vid) => {
            return (
              <Link key={vid.id} href={`/watch/${vid.id}`}>
                <VideoItem video={vid} />
              </Link>
            );
          })}
        </div>
      </main>
    </AppLayout>
  );
};

export default HomePage;
