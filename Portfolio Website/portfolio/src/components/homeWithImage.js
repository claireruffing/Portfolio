import React, { useEffect, useState } from "react";
import image from "../homepage.jpg";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../client.js";

// building blocks for our urlFor for our image
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Home() {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
            name,
            bio,
            "authorImage": image.asset->url
        }`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  // If there is no author, we will return a div that says Loading...
  if (!author) return <div>Loading...</div>;

  return (
    <main>
      <img
        src={image}
        alt="background photo"
        className="absolute object-cover w-full h-full"
      ></img>
      {/* <div style="background-image: url('../../images/image.png')"></div> */}
      <section className="relative flex justify-center min-h-screen pt-1 px-8">
        <div className="text-lg flex flex-col justify-center">
          <h1 className="text-4xl midBlue font-bold cursive leading-none lg:leading-snug home-name">
            I'm Claire
          </h1>
          <h4 className="text-4xl darkBlue font-bold cursive leading-none lg:leading-snug">
            I am a <i>Fullstack Software Developer. </i>
          </h4>
          <h4 className="text-4xl darkBlue font-bold cursive leading-none lg:leading-snug">
            I design and develop software to meet user's needs.
          </h4>
          {/* <img
            src={urlFor(author.authorImage).url()}
            className="rounded w-48 h-48 mr-8"
            alt={author.name}
          ></img> */}
        </div>
      </section>
    </main>
  );
}
