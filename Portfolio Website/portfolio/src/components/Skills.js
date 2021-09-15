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
              <h4 className="relative flex justify-center pr-24">
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
              <p className="relative flex justify-center pr-24">Python</p>
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
              <p className="relative flex justify-center pr-24">JavaScript</p>
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
              <p className="relative flex justify-center pr-24">Java</p>
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
            <div>
              <p className="relative flex justify-center pr-24">PHP</p>
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
                  30%
                </text>
              </svg>
            </div>
            <div>
              <p className="relative flex justify-center pr-24">C</p>
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
                  40%
                </text>
              </svg>
            </div>
            <div>
              <p className="relative flex justify-center pr-24">Git</p>
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
              <p className="relative flex justify-center pr-24">PostgreSQL</p>
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
                  65%
                </text>
              </svg>
            </div>
            <div>
              <p className="relative flex justify-center pr-24">React</p>
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
                  65%
                </text>
              </svg>
            </div>
            <div>
              <p className="relative flex justify-center pr-24">Node.js</p>
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
                  65%
                </text>
              </svg>
            </div>
            <div>
              <p className="relative flex justify-center pr-24">Trello</p>
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
                  90%
                </text>
              </svg>
            </div>
            <div>
              <p className="relative flex justify-center pr-24">Jira</p>
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
                  40%
                </text>
              </svg>
            </div>
            <div>
              <p className="relative flex justify-center pr-24">Drupal</p>
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
                  40%
                </text>
              </svg>
            </div>
            <div>
              <p className="relative flex justify-center pr-24">ServiceNow</p>
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
              <p className="relative flex justify-center pr-24">Tailwind CSS</p>
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
            <div>
              <p className="relative flex justify-center pr-24">Jenkins</p>
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
                  35%
                </text>
              </svg>
            </div>
            <div>
              <p className="relative flex justify-center pr-24">MaterialUI</p>
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
              <p className="relative flex justify-center pr-24">
                Sanity Studio
              </p>
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
