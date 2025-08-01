'use client'

import { motion, useDragControls } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Header from './components/Header';
import { useState } from 'react';
const DraggableComponent = ({ children, initialPosition, constraintsRef }) => {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragControls={dragControls}
      dragElastic={0.1}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileDrag={{ scale: 1.05, zIndex: 10 }}
      style={{
        position: 'absolute',
        top: initialPosition.top,
        left: initialPosition.left,
      }}
      className="cursor-move touch-none"
    >
      {children}
    </motion.div>
  );
};

const Portfolio = () => {
  const [constraintsRef, setConstraintsRef] = useState(null);

  const visualElements = [
    {
      id: 1,
      content: (
        <div className="w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
          <div className="text-sm font-mono">
            <div className="text-indigo-600 dark:text-indigo-400 font-semibold">function</div>
            <div className="pl-3">buildPortfolio() {'{'}</div>
            <div className="pl-6">return {'<'}Success{'/>'}</div>
            <div className="pl-3">{'}'}</div>
          </div>
        </div>
      ),
      initialPosition: { top: '8%', left: '8%' }
    },
    {
      id: 2,
      content: (
        <div className="w-36 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
          <div className="text-sm font-mono">
            {/* <div className="text-green-600 text-xs">// 6+ years experience</div> */}
            <div className="text-blue-600 mt-1">const developer</div>
            <div className="text-purple-600">= &quot;full-stack&quot;</div>
            <div className="text-orange-600 mt-1">skills.length</div>
            <div className="text-red-600">{'>'} 15</div>
          </div>
        </div>
      ),
      initialPosition: { top: '12%', right: '8%' }
    },
    {
      id: 3,
      content: (
        <div className="w-28 h-28 bg-white dark:bg-gray-800 shadow-lg rounded-full flex flex-col items-center justify-center">
          <div className="text-3xl mb-1">🚀</div>
          <div className="text-xs font-semibold">Deploy</div>
        </div>
      ),
      initialPosition: { bottom: '32%', left: '16%' }
    },
    {
      id: 4,
      content: (
        <div className="w-32 h-24 bg-white dark:bg-gray-800 shadow-lg rounded-lg rotate-12 p-3">
          <div className="text-sm font-mono text-center">
            <div className="text-indigo-600 font-semibold">React.js</div>
            <div className="text-purple-600">Node.js</div>
            <div className="text-blue-600">TypeScript</div>
            <div className="text-green-600">AWS</div>
          </div>
        </div>
      ),
      initialPosition: { bottom: '20%', right: '12%' }
    },
    {
      id: 5,
      content: (
        <div className="w-24 h-24 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col items-center justify-center -rotate-12">
          <div className="text-2xl mb-1">⚡</div>
          <div className="text-xs font-semibold">Fast</div>
        </div>
      ),
      initialPosition: { top: '48%', left: '24%' }
    },
    {
      id: 6,
      content: (
        <div className="w-20 h-20 bg-white dark:bg-gray-800 shadow-lg rounded-full flex flex-col items-center justify-center rotate-45">
          <div className="text-xl -rotate-45">📊</div>
        </div>
      ),
      initialPosition: { top: '32%', right: '20%' }
    },
    {
      id: 7,
      content: (
        <div className="w-28 h-20 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3">
          <div className="text-xs font-mono">
            <div className="text-indigo-600">if (client.happy)</div>
            <div className="pl-2 text-green-600">success = true</div>
          </div>
        </div>
      ),
      initialPosition: { bottom: '8%', left: '8%' }
    },
    {
      id: 8,
      content: (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Tech Stack</div>
            <div className="flex flex-wrap gap-1 justify-center max-w-32">
              {['React', 'AWS', 'Node', 'Docker', 'GraphQL'].map(tech => (
                <span key={tech} className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
      initialPosition: { bottom: '60%', right: '4%' }
    }
  ];
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

  const quickStats = [
    { number: "50+", label: "Projects" },
    { number: "6+", label: "Years Exp" },
    { number: "15+", label: "Technologies" }
  ];

  const recentWork = [
    { company: "TechCorp", role: "Senior Engineer", period: "2021-Present" },
    { company: "StartupXYZ", role: "Full-Stack Dev", period: "2019-2021" }
  ];

  return (
    <>
      <Head>
        <title>{clientInfo.name} | {clientInfo.title}</title>
      </Head>

      <div className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        {/* Header with Navigation */}
        <Header />

        {/* Single Banner Section - Everything in viewport */}
        <section className="min-h-screen pt-20 pb-8 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            {/* Main Grid Layout */}
            <div className="grid lg:grid-cols-5 gap-8 h-full">

              {/* Left Column - Main Info */}
              <div className="lg:col-span-3 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h1 className="text-4xl md:text-5xl font-bold">
                    {clientInfo.name}
                  </h1>
                  <h2 className="text-2xl text-indigo-600 dark:text-indigo-400 font-medium">
                    {clientInfo.title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {clientInfo.specialization} • {clientInfo.experience} experience • {clientInfo.location}
                  </p>
                  <p className="text-base leading-relaxed max-w-2xl">
                    {clientInfo.intro}
                  </p>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-8 py-4"
                >
                  {quickStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Two Column Layout for Additional Content */}
                <div className="grid md:grid-cols-2 gap-8">

                  {/* Left Sub-column */}
                  <div className="space-y-6">
                    {/* Core Skills */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      <h3 className="font-semibold text-lg">Technical Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {coreSkills.map(skill => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Recent Experience */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-3"
                    >
                      <h3 className="font-semibold text-lg">Recent Experience</h3>
                      <div className="space-y-3">
                        {recentWork.map((work, index) => (
                          <div key={index} className="text-sm">
                            <div className="font-medium">{work.role}</div>
                            <div className="text-indigo-600 dark:text-indigo-400">{work.company}</div>
                            <div className="text-gray-500 text-xs">{work.period}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Sub-column */}
                  <div className="space-y-6">
                    {/* About Preview */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      <h3 className="font-semibold text-lg">About Me</h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <p>
                          Passionate developer who started coding at 16. I specialize in creating efficient,
                          scalable solutions that bridge business needs with technical excellence.
                        </p>
                        <p>
                          Outside work, I enjoy hiking, reading sci-fi, and experimenting with new cooking recipes.
                        </p>
                      </div>
                    </motion.div>

                    {/* Key Strengths */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-3"
                    >
                      <h3 className="font-semibold text-lg">Key Strengths</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                          <span>Scalable Architecture Design</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                          <span>Performance Optimization</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                          <span>Team Leadership & Mentoring</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                          <span>Cloud Infrastructure (AWS)</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Contact CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4 pt-2"
                >
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
                  <Link
                    href="/about"
                    className="px-6 py-3 text-indigo-600 dark:text-indigo-400 text-lg rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>

              {/* Right Column - Visual Elements */}
              <div className="lg:col-span-2 lg:block relative">
                <div
                  ref={setConstraintsRef}
                  className="relative w-full h-full min-h-96 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl overflow-hidden"
                >
                  {/* Draggable elements */}
                  {constraintsRef && visualElements.map((element) => (
                    <DraggableComponent
                      key={element.id}
                      initialPosition={element.initialPosition}
                      constraintsRef={constraintsRef}
                    >
                      {element.content}
                    </DraggableComponent>
                  ))}

                  {/* Hint text (only shows on hover) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute bottom-4 left-0 right-0 text-center text-sm text-indigo-600 dark:text-indigo-300 pointer-events-none"
                  >
                    Drag the elements around!
                  </motion.div>
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