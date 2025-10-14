// src/pages/LandingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import Testimonial from '../components/Testimonial';
import PricingCard from '../components/PricingCard';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white text-slate-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center flex-1 px-6 pt-32 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold max-w-3xl leading-tight"
        >
          AI that matches top talent to your job description instantly.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl"
        >
          Post your job, upload resumes, and let our AI instantly rank and match candidates for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-indigo-600 text-white rounded-xl text-lg shadow hover:bg-indigo-700"
          >
            Try it now
          </button>
          <button className="px-8 py-4 border border-slate-300 rounded-xl text-lg hover:bg-slate-50">
            Get started
          </button>
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="py-24 bg-white" id="features">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-10">Why TalentMatch?</h3>
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              title="Instant AI Matching"
              description="Paste a job description and instantly get top candidates ranked by relevance."
              icon="⚡"
            />
            <FeatureCard
              title="Smart Resume Parsing"
              description="Upload resumes or LinkedIn URLs – our AI extracts key skills, experience, and more."
              icon="📄"
            />
            <FeatureCard
              title="Interview Ready"
              description="Generate interview questions tailored to your job and candidates in one click."
              icon="🎯"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-indigo-50" id="testimonials">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-10">What our users say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial quote="TalentMatch saved us countless hours in our hiring process!" name="Sarah, Tech Recruiter" />
            <Testimonial quote="Our team found better candidates faster than ever before." name="James, Hiring Manager" />
            <Testimonial quote="Incredible tool – we got interview-ready shortlists in minutes." name="Priya, HR Lead" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white" id="pricing">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-10">Simple, transparent pricing</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              tier="Starter"
              price="$0"
              features={['1 job post / month', 'AI JD analysis', 'Basic candidate ranking']}
            />
            <PricingCard
              tier="Pro"
              price="$49/mo"
              features={['Unlimited jobs', 'Resume upload', 'Full AI matching', 'Interview question generator']}
              highlight
            />
            <PricingCard
              tier="Enterprise"
              price="Custom"
              features={['Dedicated support', 'Team dashboards', 'Custom integrations']}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-indigo-100" id="contact">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">Get in touch or sign up</h3>
          <p className="text-slate-600 mb-8">
            Join our early access list to try TalentMatch before public launch. We'll notify you as soon as it's ready.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-2/3 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
            >
              Join waitlist
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
