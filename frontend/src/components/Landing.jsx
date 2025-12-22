import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// IMPORT DEVELOPER IMAGES
import chinmay from "../assets/devs/chinmay.jpeg";
import gagan from "../assets/devs/gagan.jpeg";
import odeyar from "../assets/devs/odeyar.jpeg";
import k0und1nya from "../assets/devs/k0und1nya.jpeg";

// IMPORT SLIDER IMAGES
import slide1 from "../assets/college/slide1.jpg";
import slide2 from "../assets/college/slide2.jpg";
import slide3 from "../assets/college/slide3.jpeg";
import slide4 from "../assets/college/slide4.jpg";
import slide5 from "../assets/college/slide5.jpg";

const sliderImages = [slide1, slide2, slide3, slide4,slide5];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden scroll-smooth transition-colors duration-200">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full blur-3xl top-[-200px] left-[-200px]"></div>
        <div className="absolute w-[600px] h-[600px] bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl bottom-[-250px] right-[-150px]"></div>
      </div>

      {/* HERO SECTION */}
      <section className="pt-20 md:pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">

          {/* LEFT: SLIDING IMAGE */}
          <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-3xl shadow-xl bg-gray-200 dark:bg-gray-800">
            <ImageSlider />
          </div>

          {/* RIGHT: TEXT CONTENT */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              A Modern Academic Portal
              <span className="block text-indigo-600 dark:text-indigo-400">
                Built for KIT Students
              </span>
            </h1>

            <p className="text-gray-700 dark:text-gray-300 mt-5 text-lg sm:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
              KIT MATRIX helps students access notes, assignments, academic
              materials — all in one beautiful and organized platform.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-5 justify-center md:justify-start">
              <button
                onClick={() => navigate("/home")}
                className="px-8 py-4 rounded-full text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-lg transition-transform hover:scale-[1.05]"
              >
                Get Started
              </button>

              <a
                href="#about"
                className="px-8 py-4 rounded-full text-lg font-semibold border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm transition-transform hover:scale-[1.05]"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

     {/* ABOUT KIT */}
<section id="about" className="py-24 scroll-mt-32 bg-white dark:bg-gray-900 transition-colors duration-200">
  <div className="max-w-5xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
      About Kalpataru Institute of Technology
    </h2>

    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
      KIT, Tiptur, is committed to academic excellence and innovation. KIT MATRIX makes
      notes, assignments, and resources accessible anytime, anywhere.
    </p>

    {/* ⭐ VIEW MORE BUTTON */}
    <button
      onClick={() => navigate("/about-college")}
      className="mt-8 px-6 py-3 rounded-full text-lg font-semibold 
      bg-indigo-600 hover:bg-indigo-700 
      dark:bg-indigo-500 dark:hover:bg-indigo-600 
      text-white shadow-md transition-transform hover:scale-105"
    >
      View More
    </button>
  </div>
</section>


      {/* FEATURES */}
      <section id="features" className="py-24 scroll-mt-32 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <h2 className="text-center text-4xl font-bold text-gray-900 dark:text-white mb-14">
          Why Choose KIT MATRIX?
        </h2>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard title="Organized Notes" desc="Well-structured notes arranged by faculty, subjects, and modules." />
          <FeatureCard title="Fast Access" desc="Download materials instantly with our optimized interface." />
          <FeatureCard title="Assignments Section" desc="Stay updated with coursework, uploads, and deadlines in one place." />
        </div>
      </section>

      {/* ABOUT KIT MATRIX */}
      <section id="contact" className="py-24 scroll-mt-32 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About KIT MATRIX
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            KIT MATRIX is a student-focused platform that simplifies learning by providing a clean,
            fast and modern space for academic materials.
          </p>
        </div>
      </section>

      {/* DEVELOPERS */}
      <section id="developers" className="py-24 scroll-mt-32 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-4xl font-bold text-gray-900 dark:text-white mb-12">
            Meet the Developers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <DeveloperCard image={chinmay} name="Chinmay L" role="Backend Developer" desc="Focused on backend logic, APIs, and data management." link="https://chinmay-l-portfolio.netlify.app/" />
            <DeveloperCard image={gagan} name="Gagan T P" role="Backend Developer" desc="Optimized backend performance and routing." link="https://portfolio-gagan-tp.netlify.app/" />
            <DeveloperCard image={odeyar} name="Renukaradhya Odeyar C G" role="UI/UX Designer" desc="Crafted UI layouts, color themes, and visual experience." link="https://github.com/odeyarrenukaradhya" />
            <DeveloperCard image={k0und1nya} name="Shrinidhi S Koundinya" role="Content & Testing" desc="Handled content structure, module testing, and QA." link="https://shrinidhi-s-koundinya.vercel.app/" />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------- IMAGE SLIDER COMPONENT ------------------- */
function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {sliderImages.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="slide"
          className={`absolute inset-0 w-full h-full object-cover rounded-3xl transition-opacity duration-700 ${
            index === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

/* ------------------- FEATURE CARD ------------------- */
function FeatureCard({ title, desc }) {
  return (
    <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ------------------- DEVELOPER CARD ------------------- */
function DeveloperCard({ image, name, role, desc, link }) {
  return (
    <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center">
      <img src={image} alt={name} className="h-24 w-24 mx-auto rounded-full object-cover shadow-md border border-gray-200 dark:border-gray-600 mb-4" />

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
      <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">{role}</p>
      <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">{desc}</p>

      {link && (
        <div className="mt-6 flex justify-center">
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-2xl hover:scale-110 transition-transform">
            🔗
          </a>
        </div>
      )}
    </div>
  );
}
