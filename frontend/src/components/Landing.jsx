import React from "react";
import NavbarLanding from "./NavbarLanding";
import Footer from "./Footer";

// IMPORT DEVELOPER IMAGES
import chinmay from "../assets/devs/chinmay.jpeg";
import gagan from "../assets/devs/gagan.jpeg";
import odeyar from "../assets/devs/odeyar.jpeg";
import k0und1nya from "../assets/devs/k0und1nya.jpeg";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden scroll-smooth pt-28">
      
      {/* NAVBAR */}
      <NavbarLanding />

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] bg-indigo-200/40 rounded-full blur-3xl top-[-200px] left-[-200px]"></div>
        <div className="absolute w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-3xl bottom-[-250px] right-[-150px]"></div>
      </div>

      {/* HERO SECTION */}
      <section className="pt-20 md:pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
          
          <div></div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              A Modern Academic Portal
              <span className="block text-indigo-600">Built for KIT Students</span>
            </h1>

            <p className="text-gray-700 mt-5 text-lg sm:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
              KIT MATRIX helps students access notes, assignments, academic
              materials — all in one beautiful and organized platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-5 justify-center md:justify-start">
              <a href="/home" className="px-8 py-4 rounded-full text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-transform hover:scale-[1.05]">
                Get Started
              </a>

              <a href="#about" className="px-8 py-4 rounded-full text-lg font-semibold border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 shadow-sm transition-transform hover:scale-[1.05]">
                Learn More
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT KIT */}
      <section id="about" className="py-24 scroll-mt-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Kalpataru Institute of Technology</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            KIT, Tiptur, is committed to academic excellence and innovation. KIT MATRIX makes
            notes, assignments, and resources accessible anytime, anywhere.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 scroll-mt-32">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-14">Why Choose KIT MATRIX?</h2>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard title="Organized Notes" desc="Well-structured notes arranged by faculty, subjects, and modules." />
          <FeatureCard title="Fast Access" desc="Download materials instantly with our optimized interface." />
          <FeatureCard title="Assignments Section" desc="Stay updated with coursework, uploads, and deadlines in one place." />
        </div>
      </section>

      {/* ABOUT KIT MATRIX */}
      <section id="contact" className="py-24 scroll-mt-32 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About KIT MATRIX</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            KIT MATRIX is a student-focused platform that simplifies learning by providing a clean,
            fast and modern space for academic materials.
          </p>
        </div>
      </section>

      {/* DEVELOPERS */}
      <section id="developers" className="py-24 scroll-mt-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-4xl font-bold text-gray-900 mb-12">Meet the Developers</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <DeveloperCard image={chinmay} name="Chinmay L" role="Backend Developer" desc="Focused on backend logic, APIs, and data management." link="https://chinmay-l-portfolio.netlify.app/" />
            <DeveloperCard image={gagan} name="Gagan T P" role="Backend Developer" desc="Optimized backend performance and routing." link="https://portfolio-gagan-tp.netlify.app/" />
            <DeveloperCard image={odeyar} name="Renukaradhya Odeyar C G" role="UI/UX Designer" desc="Crafted UI layouts, color themes, and visual experience." link="https://github.com/odeyarrenukaradhya" />
            <DeveloperCard image={k0und1nya} name="Shrinidhi S Koundinya" role="Content & Testing" desc="Handled content structure, module testing, and QA." link="https://shrinidhi-s-koundinya.vercel.app/" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{desc}</p>
    </div>
  );
}

function DeveloperCard({ image, name, role, desc, link }) {
  return (
    <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center">
      
      <img src={image} alt={name} className="h-24 w-24 mx-auto rounded-full object-cover shadow-md border mb-4" />
      
      <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
      <p className="text-indigo-600 font-medium mt-1">{role}</p>
      <p className="text-gray-700 mt-4 leading-relaxed">{desc}</p>

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
