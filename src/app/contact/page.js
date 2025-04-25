import Image from "next/image";

export default function Contact() {
  return (
    <div>
      <section className="h-screen">
        <div className="w-full h-full grid grid-row-5 ">
          <div className="contact-grid-items h-[15rem]"></div>
          {/* CON */}
          <div className="contact-grid-items flex justify-around items-center ">
            <Image
              src="/image/CONTACT 2-02.png"
              alt="con"
              width={400}
              height={200}
              className="w-[25vw]"
            />
            <p className="w-[30rem] font-bold">
              IF YOU ARE INTERESTED IN ANY OF THE PRODUCTS PLEASE CONTACT THE
              FOLLOWING REPRESENTATIVE OUR TEAM WILL GET IN TOUCH WITH YOU
            </p>
          </div>
          <div className="contact-grid-items flex justify-around font-bold items-center h-[10rem]">
            <div>
              <h3 className="pb-8">FENC</h3>
              <h3>FAR EASTERN NEW CENTURY</h3>
            </div>
            <div className="flex w-[30rem] justify-between items-center ">
              <h3 className="text-xl pr-2">NIKE GSM</h3>
              <Image
                className="rotate-270"
                src="/decorationArrow.svg"
                alt="decorationArrow.svg"
                width={20}
                height={10}
              />
              <div>
                <h3 className="text-4xl pb-8">Charlie Tsai</h3>
                <h2 className="text-xl">charlietsai@fenc.com</h2>
              </div>
              <Image
                src="/image/CONTACT-arrow.png"
                alt="CONTACT-arrow.png"
                width={90}
                height={80}
              />
            </div>
          </div>
          <div className="contact-grid-items pr-[20rem]  ">
            <Image
              src="/image/CONTACT-tact.png"
              alt="CONTACT-tact.png"
              width={400}
              height={200}
              className="place-self-end w-[32vw] translate-y-[4rem] "
            />
          </div>
          <div className="contact-grid-items bg-black"></div>
        </div>
      </section>
    </div>
  );
}
