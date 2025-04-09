import BlurText from "@/components/BlurText";
import LightText from "@/components/LightText";

const IntroList = ({invert, listItem, videoUrl}) => {

  const introduction =
    "We operate our own printing and embroidery facility in Vietnam, allowing us to independently develop innovative techniques and surface effects. Additionally, we release a new lookbook twice a year to showcase our latest developments and seasonal inspirations.";

  return (
    <section className={`print-tech-container ${invert && invert} `}>
      <div className="left-aside  w-[40vw] flex ml-20 ">
        <video
          src={"/video/Colab2022.mp4"}
          autoPlay
          muted
          loop
          controls
          className={`w-full h-auto ${invert&& invert}`}
        />
      </div>
      <div className="right-aside">
        <div className="scroll-section light-text-container">
          <LightText words={introduction} />
        </div>
        {listItem.map((item, index) => (
          <div className="scroll-section print-tech-title" key={item}>
            <p>[0{index + 1}]</p>
            <BlurText words={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntroList;
