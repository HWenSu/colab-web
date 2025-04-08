import BlurText from "@/components/BlurText";
import LightText from "@/components/LightText";

const IntroList = () => {
  const printTech = [
    "Create Volume with Print",
    "Soft Texture",
    "Special Techniques",
  ];

  const introduction =
    "We operate our own printing and embroidery facility in Vietnam, allowing us to independently develop innovative techniques and surface effects. Additionally, we release a new lookbook twice a year to showcase our latest developments and seasonal inspirations.";

  return (
    <section className="print-tech-container">
      <div className="left-aside">left</div>
      <div className="right-aside">
        <div className="scroll-section light-text-container">
          <LightText words={introduction} />
        </div>
        {printTech.map((tech, index) => (
          <div className="scroll-section print-tech-title" key={tech}>
            <p>[0{index + 1}]</p>
            <BlurText words={tech} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntroList;
