import React from "react";
import image from "../backgroundimg.jpg";

export default function Home() {
  return (
    <main>
      <img
        src={image}
        alt="background photo"
        className="absolute object-cover w-full h-full"
      ></img>
      {/* <div style="background-image: url('../../images/image.png')"></div> */}
      <section className="relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8">
        <h1 className="text-4xl text-green-100 font-bold cursive leading-none lg:leading-snug home-name">
          Aloha. I'm Claire.
        </h1>
      </section>
    </main>
  );
}
