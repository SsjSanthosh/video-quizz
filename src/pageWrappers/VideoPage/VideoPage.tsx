import AppLayout from "components/AppLayout";
import styles from "./VideoPage.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Skeleton, useToast } from "@chakra-ui/react";
import { VideoType } from "utils/types";
import { getFromStorage, raxios } from "utils/functions";
import Link from "next/link";
import VideoItem from "components/VideoItem";
import VideoPlayer from "components/VideoPlayer";
import QuizController from "components/QuizController";
import Head from "next/head";

const VideoPage = () => {
  const router = useRouter();
  const { query } = router;
  const [status, setStatus] = useState({ loading: true, error: false });
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoType | null>(null);
  const toast = useToast();

  const [isQuizVisible, setIsQuizVisible] = useState(false);

  const endVideo = () => {
    setIsQuizVisible(true);
  };

  useEffect(() => {
    const fetchVideos = async () => {
      setStatus({ loading: false, error: false });
      try {
        const data = await raxios.get("/data/videos.json");
        setVideos(data.data);
      } catch (err) {
        setStatus({ loading: false, error: true });
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    setIsQuizVisible(false);
    if (router.isReady) {
      if (!query.id) router.push("/");
      else if (query.id && videos.length) {
        const vid = videos.find((vid) => vid.id === query.id);
        if (vid) setCurrentVideo(vid);
        else router.push("/");
      }
    }
  }, [query, router, videos]);

  const isPreviousVideoDone = () => {
    if (currentVideo) {
      const prevPosition = currentVideo.position - 1;
      // first video
      if (prevPosition === 0) return true;
      // check if previous video has been completed
      const prev = videos.find(
        (vid) => vid.position === prevPosition
      ) as VideoType;
      if (localStorage.getItem(`${prev.id as string}_done`)) {
        return true;
      }
      return false;
    }
  };

  if (!currentVideo) {
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

  const redirectToNextVideo = () => {
    if (currentVideo.position === videos.length) {
      toast({ description: "You've completed the course!" });
      router.push("/");
    } else {
      const next = videos.find(
        (vid) => vid.position === currentVideo.position + 1
      ) as VideoType;
      router.push(`/watch/${next.id}`);
    }
  };

  const Content = () => {
    return !isQuizVisible ? (
      <VideoPlayer onEnd={endVideo} />
    ) : (
      <QuizController
        questions={currentVideo.questions}
        onSuccess={redirectToNextVideo}
      />
    );
  };

  if (currentVideo) {
    return (
      <AppLayout>
        <div className={styles["container"]}>
          <Head>
            <title>{currentVideo.title}</title>
          </Head>
          <div className={styles["content-container"]}>
            <h1>{currentVideo.title}</h1>
            {isPreviousVideoDone() ? (
              <Content />
            ) : (
              <h1>Please complete the previous video to access this lesson</h1>
            )}
          </div>

          <div className={styles["playlist-container"]}>
            <h2>All videos</h2>
            <div className={styles["playlist-items"]}>
              {videos.map((vid) => (
                <Link
                  href={`/watch/${vid.id}`}
                  key={vid.id}
                  className={vid.id === query.id ? styles["now-playing"] : ""}
                >
                  {" "}
                  {vid.id === query.id && <h3>Now playing - </h3>}
                  <VideoItem video={vid} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }
};

export default VideoPage;
