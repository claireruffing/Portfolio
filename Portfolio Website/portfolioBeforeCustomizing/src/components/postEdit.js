import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";

export default function Post() {
  const [postData, setPost] = useState(null);

  // In the quotes in .fetch, we are writing SQL using Groc which is Sanity's SQL
  useEffect(() => {
    //   fetching all types that are post and grabbing the title, slug, mainImage, and alt of it
    // this post is the post that is on sanity
    sanityClient
      .fetch(
        `*[_type == "post"]{
                title,
                slug,
                date,
                place,
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
    <main className="midBlueBG min-h-screen p-12">
      <section className="container mx-auto">
        <h1 className="text-5xl flex justify-center cursive">My Projects</h1>
        <h2 className="text-lg text-gray-600 flex justify-center mb-12">
          Welcome to my projects page!
        </h2>
        <section className="grid grid-cols-2 gap-8">
          {postData &&
            postData.map((post, index) => (
              <article className="relative rounded-lg shadow-xl bg-white p-16">
                <Link to={"/post/" + post.slug.current} key={post.slug.current}>
                  <h3 className="text-gray-800 text-3xl font-bold mb-2 hover:text-red-700">
                    {post.title}
                  </h3>
                  <div className="text-gray-500 text-xs space-x-4">
                    <span>
                      <strong className="font-bold">Finished on</strong>:{" "}
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span>
                      <strong className="font-bold">Company</strong>:{" "}
                      {post.place}
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
                      className="text-red-500 font-bold hover:underline hover:text-red-400 text-xl"
                    >
                      View The Project{" "}
                      <span role="img" aria-label="right pointer"></span>
                    </a>
                  </div>
                </Link>
              </article>
            ))}
        </section>
      </section>
    </main>
  );
}
