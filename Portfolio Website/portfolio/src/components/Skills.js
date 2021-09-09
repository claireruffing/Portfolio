import React from "react";
import image from "../skillspage.jpg";

export default function Skills() {
  // return <h3>Skills page!</h3>
  return (
    <main className="min-h-screen">
      <img
        src={image}
        alt="background photo"
        className="absolute object-cover"
      ></img>
      <section className="relative justify-center min-h-screen p-12">
        <div className="text-lg flex flex-col justify-center">
          <h1 className="text-5xl flex justify-center cursive">My Skills</h1>
          <h2 className="text-lg flex justify-center mb-12">
            Intermediate Level Range
          </h2>
          <section className="grid grid-cols-4 gap-4">
            <div>
              <h4 className="relative flex justify-center pr-10">
                HTML and CSS
              </h4>
              <svg width="200" height="200">
                <g transform="rotate(-90 100 100)">
                  <circle className="circleBG"></circle>
                  <circle className="circleInside"></circle>
                </g>
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="central"
                  text-anchor="middle"
                >
                  85%
                </text>
              </svg>
            </div>
            <div>
              <p className="relative flex justify-center pr-10">JavaScript</p>
              <svg width="200" height="200">
                <g transform="rotate(-90 100 100)">
                  <circle className="circleBG"></circle>
                  <circle className="circleInside"></circle>
                </g>
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="central"
                  text-anchor="middle"
                >
                  60%
                </text>
              </svg>
            </div>
            <div>
              <p className="relative flex justify-center pr-10">Python</p>
              <svg width="200" height="200">
                <g transform="rotate(-90 100 100)">
                  <circle className="circleBG"></circle>
                  <circle className="circleInside"></circle>
                </g>
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="central"
                  text-anchor="middle"
                >
                  70%
                </text>
              </svg>
            </div>
            <div>
              <p className="relative flex justify-center pr-10">Git</p>
              <svg width="200" height="200">
                <g transform="rotate(-90 100 100)">
                  <circle className="circleBG"></circle>
                  <circle className="circleInside"></circle>
                </g>
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="central"
                  text-anchor="middle"
                >
                  80%
                </text>
              </svg>
            </div>
            <div>
              <p className="relative flex justify-center pr-10">Java</p>
              <svg width="200" height="200">
                <g transform="rotate(-90 100 100)">
                  <circle className="circleBG"></circle>
                  <circle className="circleInside"></circle>
                </g>
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="central"
                  text-anchor="middle"
                >
                  55%
                </text>
              </svg>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
