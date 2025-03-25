import Image from "next/image";

const page = () => {
  return (
    <div className="about-page-container">
      <section className="about-design-section">
        <Image
          className="about-design-bg-img bg-position"
          src="/image/about-bg.png"
          alt="colab garment"
          width={1200}
          height={400}
          priority
        />
        <Image
          className="about-design-bg-img"
          src="/image/about.png"
          alt="background image"
          width={700}
          height={400}
          priority
        />
        <div className="about-items-container">
          <div className="about-item">
            <Image
              src="/decorationArrow.svg"
              alt="deco arrow"
              width={20}
              height={10}
            />
            <div className="about-large-w">
              <h3>MATERIAL</h3>
              <p>INHOUSE 70% KNIT 30% WOVEN</p>
            </div>
            <Image
              className="col-start-4 rotate-270"
              src="/decorationArrow.svg"
              alt="deco arrow"
              width={20}
              height={10}
            />
            <h3 className="about-large-w about-item-right text-secondary">WHAT WE CAN DO ?</h3>
          </div>
          <div className="about-item">
            <h2 className="about-item-center">FENC</h2>
            <div className="about-large-w about-item-right">
              <h3>CREATE</h3>
              <p>
                2 SEASON IN 1 YEAR OVER 100 STYLES NEW SEASONAL SAMPLES
                SHOWCASE DESIGN CONCEPT SHARING
              </p>
            </div>
          </div>
          <div className="about-item">
            <Image
              className="about-item-center"
              src="/decorationSlash.svg"
              alt="decoration slash"
              width={60}
              height={40}
            />
            <h3 className="about-item-right">CO-CREATION</h3>
          </div>
          <div className="about-item">
            <div className="col-start-2">
              <h3 className="about-large-w ">DESIGN </h3>
              <h3>MEN’S WOMEN’S</h3>
              <h3>GRAPHIC</h3>
            </div>
            <h2 className="about-item-center">COLAB</h2>
            <h3 className="about-large-w about-item-right">
              UPDATE THE EXISTING STYLE TO 2.0
            </h3>
          </div>
        </div>
      </section>
      <section className="h-screen"></section>
    </div>
  );
}

export default page