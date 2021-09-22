import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import image from "../expage.jpg";
import BlockContent from "@sanity/block-content-to-react";

export default function Experience() {
  const [experienceData, setExperienceData] = useState(null);

  // In the quotes in .fetch, we are writing SQL using Groc which is Sanity's SQL
  // Cheatsheet for Groc SQL at https://www.sanity.io/docs/query-cheat-sheet
  // Fetching all types that are equal to experience
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "experience"]{
            title,
            date,
            company,
            location,
            body,
            tags
        }`
      )
      .then((data) => setExperienceData(data))
      .catch(console.error);
    // then statement is getting the data and then setting the project data
  }, []); //we want it to run just once

  // title of work experience is h3, everything in div is about the work experience like type, date, etc
  return (
    <main className="min-h-screen">
      <img
        src={image}
        alt="background"
        className="absolute object-cover"
      ></img>
      <section className="container mx-auto p-12">
        <section className="relative flex justify-center min-h-screen">
          <div className="text-lg flex flex-col justify-center">
            <h1 className="text-5xl flex justify-center cursive leading-none lg:leading-snug">
              My Experience
            </h1>
            <h2 className="text-lg text-gray-800 flex justify-center mb-12 leading-none lg:leading-snug">
              Education and Work Experience
            </h2>
            <section className="grid grid-cols-1 gap-12">
              {experienceData &&
                experienceData.map((experience, index) => (
                  <article className="relative rounded-lg shadow-xl bg-white p-10">
                    <h3 className="text-gray-800 text-3xl font-bold mb-2">
                      {experience.title}
                    </h3>
                    <div className="text-gray-500 text-xs space-x-4">
                      <span>
                        <strong className="font-bold">Date</strong>:{" "}
                        {experience.date}
                      </span>
                      <span>
                        <strong className="font-bold">Company</strong>:{" "}
                        {experience.company}
                      </span>
                      <span>
                        <strong className="font-bold">Location</strong>:{" "}
                        {experience.location}
                      </span>
                      <p className="my-6 text-lg text-gray-700 leading-relax">
                        <BlockContent
                          blocks={experience.body}
                          projectId="ku6c6foa"
                          dataset="production"
                        ></BlockContent>
                      </p>
                    </div>
                  </article>
                ))}
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}
