export default function video2() {
    const videoElement = document.querySelector<HTMLVideoElement>(".about1055__video > video")
    const triggerElement = document.querySelector<SVGAElement>(".about1055__video > svg")

    const play = async () => {
        if (!videoElement || !triggerElement) return
        // --- check screen resolution
        const mq = matchMedia("(max-width: 768px)").matches

        if (mq) {
            await videoElement.requestFullscreen()
        }
        await videoElement.play()
        triggerElement.classList.add("hidden")
    }
    const pause = async () => {
        if (!videoElement || !triggerElement) return
        await videoElement.pause()
        triggerElement.classList.remove("hidden")
    }

    videoElement?.addEventListener("click", () => {
        videoElement?.paused ? play() : pause()
    })
}
