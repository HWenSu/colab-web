import Image from "next/image"

const Login = () => {
  return (
    <div className="bg-black text-white w-full h-screen flex justify-center sm:items-center pt-[20vh] sm:pt-10">
      <div className="w-[70vw] sm:w-[50vw] flex flex-col sm:flex-row ">
        <Image
          src="/svg/decorationSlash.svg"
          alt="decorationSlash.svg"
          width={70}
          height={30}
          className="place-self-start mr-8"
        />
        <div className="w-full">
          <div className=" login-white-border h-[4rem]"></div>
          <div className="flex py-4 flex-col sm:flex-row">
            <Image
              src="/svg/decorationArrow.svg"
              alt="deco arrow"
              width={20}
              height={10}
              className="mx-8 rotate-270 place-self-start mt-6"
            />
            <div className="flex flex-col gap-16 sm:gap-8 grow">
              <h2 className="text-[4rem]">LOGIN</h2>
              <div>
                <p className="sm:text-xl">ACCOUNT</p>
                <input type="text" className="login-input" />
              </div>
              <div>
                <p className="sm:text-xl">PASSWORD</p>
                <input type="text" className="login-input" />
              </div>
            </div>
          </div>
          <div className=" login-white-border h-[12rem] sm:h-[5rem]"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;