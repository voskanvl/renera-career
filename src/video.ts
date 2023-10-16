import YouTubePlayer from "youtube-player";

export default function video() {
    const player1 = YouTubePlayer("video1", {
        videoId: "we5lA3JH3vA",
        playerVars: {
            controls: 0,
            fs: 0,
            modestbranding: 1,
            rel: 0,
        },
    });

    const tizerVideo = document.querySelector<HTMLElement>(".tizer__video");
    const tizerRight = document.querySelector<HTMLElement>(".tizer__right");
    !!tizerVideo &&
        !!tizerRight &&
        tizerVideo.addEventListener("click", () => {
            const isStarted = tizerVideo.getAttribute("play");
            if (isStarted) {
                player1.pauseVideo();
                tizerVideo.removeAttribute("play");
                tizerRight.removeAttribute("play");
            } else {
                player1.playVideo();
                tizerVideo.setAttribute("play", "play");
                tizerRight.setAttribute("play", "play");
            }
        });

    const player2 = YouTubePlayer("video2", {
        videoId: "WO0f3yRFKbA",
        width: "100%",
        playerVars: {
            autoplay: 1,
            controls: 0,
            fs: 0,
            modestbranding: 1,
            rel: 0,
        },
    });

    // window.player2 = player2;

    const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
            isIntersecting
                ? setTimeout(() => player2.playVideo(), 0)
                : setTimeout(() => player2.pauseVideo(), 0);
        },
        {
            threshold: [0.2],
        },
    );
    const containerVideo2 = document.querySelector<HTMLElement>(".whatdoesitdo");
    if (!containerVideo2) throw Error("there isn't #video2");
    observer.observe(containerVideo2);

    const togglePlay = (player: typeof player1) => async () => {
        const state = await player.getPlayerState();
        state === 1 ? player.pauseVideo() : player.playVideo();
    };

    containerVideo2.addEventListener("click", togglePlay(player2));

    const player3 = YouTubePlayer("video3", {
        videoId: "WO0f3yRFKbA",
        width: "100%",
        playerVars: {
            autoplay: 1,
            controls: 0,
            fs: 0,
            modestbranding: 1,
            rel: 0,
        },
    });
    player3.playVideo();

    const containerVideo3 = document.querySelector<HTMLElement>(".whatdoesitdo__video");
    if (!containerVideo3) throw Error("there isn't .whatdoesitdo__video");
    containerVideo3.addEventListener("click", togglePlay(player3));
}
