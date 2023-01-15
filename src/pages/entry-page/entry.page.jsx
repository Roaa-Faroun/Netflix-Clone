import logoVideo from "../../assets/imgs/logo/videoplayback.mp4";
const NetflixAnimation = () => {
  return (
    <section className="Netflix-Animation">
      <video src={logoVideo} muted autoPlay></video>
    </section>
  );
};
export default NetflixAnimation;
