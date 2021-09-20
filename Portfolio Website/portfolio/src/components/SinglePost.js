import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

// building blocks for our urlFor for our image
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function SinglePost() {
  // initial state is null
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();

  // In the quotes in .fetch, we are writing SQL using Groc which is Sanity's SQL
  // Cheatsheet for Groc SQL at https://www.sanity.io/docs/query-cheat-sheet
  // name and authorImage are alias names for the image
  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                }
            },
            body,
            "name":author->name,
            "authorImage": author->image
        }`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  // if there is no slug (single post) return a div that says Loading...
  if (!singlePost) return <div>Loading...</div>;

  return (
    <main className="midBlueBG min-h-screen p-12">
      <article className="container shadow-lg mx-auto creamBG rounded-lg">
        <header className="relative">
          <div className="absolute h-full w-full flex items-center justify-center p-8">
            <div className="bg-white bg-opacity-75 rounded p-12">
              <h1 className="cursive text-3xl lg:text-6xl mb-4">
                {singlePost.title}
              </h1>
              <div className="flex justify-center text-gray-800">
                <img
                  src={urlFor(singlePost.authorImage).url()} //grabbing the url from the image
                  alt={singlePost.name}
                  className="w-10 h-10 rounded-full"
                ></img>
                <p className="cursive flex items-center pl-2 text-2xl">
                  {singlePost.name}
                </p>
              </div>
            </div>
          </div>
          <img
            src={singlePost.mainImage.asset.url}
            alt={singlePost.title}
            className="w-full object-cover rounded-t"
            style={{ height: "400px" }}
          ></img>
        </header>
        <div className="px-16 lg:px-36 py-12 lg:py-10 prose lg:prose-xl max-w-full">
          <BlockContent
            blocks={singlePost.body}
            projectId="ku6c6foa"
            dataset="production"
          ></BlockContent>
        </div>
      </article>
    </main>
  );
}
