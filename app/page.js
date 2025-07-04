'use client'

import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const Portfolio = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const clientInfo = {
    name: "Ramesh Upadhaya",
    title: "Senior Full-Stack Engineer",
    intro: "I architect and build high-performance applications using modern web technologies, delivering scalable solutions for startups and enterprises.",
    specialization: "Web Applications & Cloud Infrastructure",
    experience: "6+ years",
    location: "San Francisco, CA",
    email: "ramesh.upadhaya@example.com",
    website: "ramesh-dev.com"
  };

  const coreSkills = [
    'React', 'Next.js', 'TypeScript', 'Node.js',
    'GraphQL', 'AWS', 'Docker'
  ];

  return (
    <>
      <Head>
        <title>{clientInfo.name} | {clientInfo.title}</title>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
                const savedTheme = localStorage.getItem('theme');
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const initialTheme = savedTheme || (systemPrefersDark ? 'light' : 'light');
                document.documentElement.classList.add(initialTheme);
            })();
        `
        }} />
      </Head>

      <div className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        {/* Header with Navigation */}
        <header className="fixed w-full z-50 bg-white/90 dark:bg-gray-900/90 border-b border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ x: -5 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
                  <span className="text-sm font-medium text-white">RU</span>
                </div>
                <span className="text-lg font-medium">Ramesh Upadhaya</span>
              </motion.div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                About
              </Link>
              <Link href="/projects" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Work
              </Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Contact
              </Link>
            </nav>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-base">
              ☰
            </button>
          </div>

          {/* Mobile Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
              >
                <div className="flex flex-col space-y-2 p-4">
                  <Link
                    href="/about"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/projects"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Work
                  </Link>
                  <Link
                    href="/contact"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        {/* Banner Section with Design Element */}
        <section className="min-h-screen pt-24 pb-12 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h1 className="text-4xl md:text-5xl font-bold">
                    {clientInfo.name}
                  </h1>

                  <div className="space-y-4">
                    <h2 className="text-2xl text-indigo-600 dark:text-indigo-400 font-medium">
                      {clientInfo.title}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      {clientInfo.specialization} • {clientInfo.experience} experience
                    </p>
                    <p className="text-base leading-relaxed">
                      {clientInfo.intro}
                    </p>
                  </div>
                </motion.div>

                {/* Contact CTA */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Contact Me
                  </Link>
                  <Link
                    href="/projects"
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-lg rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    See My Work
                  </Link>
                </div>

                {/* Core Skills */}
                <div className="space-y-4 pt-4">
                  <h3 className="font-semibold text-xl">Technical Expertise</h3>
                  <div className="flex flex-wrap gap-3">
                    {coreSkills.map(skill => (
                      <span
                        key={skill}
                        className="px-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Design Element */}
              <div className="hidden md:block relative">
                <div className="relative w-full h-96">
                  {/* Abstract design element */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl"></div>

                  {/* Floating code blocks or design elements */}
                  <div className="absolute top-1/4 left-1/4 w-36 h-32 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
                    <div className="text-xs font-mono dark:text-gray-400">
                      <div className="text-indigo-600 dark:text-indigo-400">function</div>
                      <div className="pl-4">buildPortfolio() {'{'}</div>
                      <div className="pl-8">return {'<'}Success{'/>'}</div>
                      <div className="pl-4">{'}'}</div>
                    </div>
                  </div>

                  <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center">
                    <div className="text-2xl">🚀</div>
                  </div>

                  <div className="absolute top-1/3 right-1/3 w-40 h-28 bg-white dark:bg-gray-800 shadow-lg rounded-lg rotate-12 flex items-center justify-center">
                    <div className="text-xs font-mono text-center">
                      <span className="text-indigo-600 dark:text-indigo-400">const</span> dev = {'{'}
                      <div className="pl-4">skills: &quot;full-stack&quot;,</div>
                      <div className="pl-4">experience: &quot;6+ years&quot;</div>
                      {'}'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 text-center text-base text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} {clientInfo.name} • {clientInfo.website}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Portfolio;