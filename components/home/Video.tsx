const Video = () => {
  return (
    <div className="relative flex h-screen w-full snap-center flex-col items-center justify-center">
      <video
        controls
        autoPlay
        muted
        loop
        src="/nft1.mp4"
        className="my-10 rounded-xl"
        width="960"
        height="720"
      ></video>
    </div>
  )
}

export default Video
