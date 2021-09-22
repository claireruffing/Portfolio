import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";
import image from "../projectpage.jpg";

export default function Post() {
  const [postData, setPost] = useState(null);

  // In the quotes in .fetch, we are writing SQL using Groc which is Sanity's SQL
  // Cheatsheet for Groc SQL at https://www.sanity.io/docs/query-cheat-sheet
  useEffect(() => {
    //   fetching all types that are post and grabbing the title, slug, mainImage, and alt of it
    // this post is the post that is on sanity
    sanityClient
      .fetch(
        `*[_type == "post"]{
                title,
                slug,
                date,
                description,
                projectType,
                link,
                tags
            }`
      )
      .then((data) => setPost(data))
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen">
      <img src={image} alt="background" className="absolute object-cover"></img>
      <section className="container mx-auto p-12">
        <section className="relative flex justify-center min-h-screen">
          <div className="text-lg flex flex-col justify-center">
            <h1 className="text-5xl flex justify-center cursive leading-none lg:leading-snug">
              My Projects
            </h1>
            <h2 className="text-lg text-gray-800 flex justify-center mb-12 leading-none lg:leading-snug">
              Fullstack Web Applications
            </h2>
            <section className="grid grid-cols-2 gap-8">
              {postData &&
                postData.map((post, index) => (
                  <article className="relative rounded-lg shadow-xl creamBG p-10">
                    <Link
                      to={"/post/" + post.slug.current}
                      key={post.slug.current}
                    >
                      <h3 className="text-gray-800 text-3xl font-bold mb-2 hover:text-red-700">
                        {post.title}
                      </h3>
                      <div className="text-gray-500 text-xs space-x-4">
                        <span>
                          <strong className="font-bold">Finished on</strong>:{" "}
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span>
                          <strong className="font-bold">Type</strong>:{" "}
                          {post.projectType}
                        </span>
                        <p className="my-6 text-lg text-gray-700 leading-relax">
                          {post.description}
                        </p>
                        <a
                          href={post.link}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="darkBlue font-bold hover:underline hover:lightBlue text-xl"
                        >
                          View The Project{" "}
                          <span role="img" aria-label="right pointer"></span>
                        </a>
                      </div>
                    </Link>
                  </article>
                ))}
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}
