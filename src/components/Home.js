import React from "react";
import image from "../homepage.jpg";

export default function Home() {
  return (
    <main>
      <img
        src={image}
        alt="background"
        className="absolute object-cover w-full h-full"
      ></img>
      {/* <div style="background-image: url('../../images/image.png')"></div> */}
      <section className="relative flex justify-center min-h-screen pt-1 px-8">
        <div className="text-lg flex flex-col justify-center">
          <h1 className="text-4xl midBlue font-bold cursive leading-none lg:leading-snug home-name">
            I'm Claire
          </h1>
          <h4 className="text-4xl darkBlue font-bold cursive leading-none lg:leading-snug">
            I am a <i>Software Developer. </i>
          </h4>
          <h4 className="text-4xl darkBlue font-bold cursive leading-none lg:leading-snug">
            I design and develop software to meet user's needs.
          </h4>
        </div>
      </section>
    </main>
  );
}
