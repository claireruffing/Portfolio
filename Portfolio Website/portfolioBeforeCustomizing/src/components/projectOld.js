import React, { useEffect, useState } from "react";
import project from "../studio/schemas/project.js";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";

export default function Project() {
  const [projectData, setProjectData] = useState(null);

  // Fetching all types that are equal to project
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{
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
      .then((data) => setProjectData(data))
      .catch(console.error);
    // then statement is getting the data and then setting the project data
  }, []); //we want it to run just once

  // title of project is h3, everything in div is about the project like type, date, etc
  return (
    <main className="bg-green-100 min-h-screen p-12">
      <section className="container mx-auto">
        <h1 className="text-5xl flex justify-center cursive">My Projects</h1>
        <h2 className="text-lg text-gray-600 flex justify-center mb-12">
          Welcome to my projects page!
        </h2>
        <section className="grid grid-cols-2 gap-8">
          {projectData &&
            projectData.map((project, index) => (
              <article className="relative rounded-lg shadow-xl bg-white p-16">
                <Link
                  to={"/project/" + project.slug.current}
                  key={project.slug.current}
                >
                  <span
                    className="block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-green-400"
                    key={index}
                  >
                    <h3 className="text-gray-800 text-3xl font-bold mb-2 hover:text-red-700">
                      {/* <a
                    href={"/project/" + project.slug.current}
                    key={project.slug.current}
                    alt={project.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </a> */}
                      {project.title}
                    </h3>
                    <div className="text-gray-500 text-xs space-x-4">
                      <span>
                        <strong className="font-bold">Finished on</strong>:{" "}
                        {new Date(project.date).toLocaleDateString()}
                      </span>
                      <span>
                        <strong className="font-bold">Company</strong>:{" "}
                        {project.place}
                      </span>
                      <span>
                        <strong className="font-bold">Type</strong>:{" "}
                        {project.projectType}
                      </span>
                      <p className="my-6 text-lg text-gray-700 leading-relax">
                        {project.description}
                      </p>
                      <a
                        href={project.link}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-red-500 font-bold hover:underline hover:text-red-400 text-xl"
                      >
                        View The Project{" "}
                        <span role="img" aria-label="right pointer"></span>
                      </a>
                    </div>
                  </span>
                </Link>
              </article>
            ))}
        </section>
      </section>
    </main>
  );
}
