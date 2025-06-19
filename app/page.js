'use client'

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import * as THREE from 'three';
import Circle from "../public/circle.png"

const Portfolio = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);
  const canvasRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (ref) => {
    if (ref.current) {
      const headerHeight = 80;
      const elementPosition = ref.current.offsetTop;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Delay closing the mobile menu until after scroll starts
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 500); // 0.5s delay
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Mock images
  const mockImages = {
    project1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    project2: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    project3: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  };

  // Three.js animation setup
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;

    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const loader = new THREE.TextureLoader();
    const circleTexture = loader.load('/circle.png'); // See note below

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x000000,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      map: circleTexture,
      alphaTest: 0.01,
      depthWrite: false
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Resume download function
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Ramesh_Upadhaya_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-white text-gray-900 font-montserrat antialiased">
        {/* Three.js Canvas */}
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        />

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
        >
          <div className="container mx-auto px-6 py-5 flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold tracking-tighter text-black cursor-pointer"
              onClick={() => scrollToSection(homeRef)}
            >
              Ramesh Upadhaya
            </motion.div>

            {/* Desktop Navigation */}
            <motion.ul className="hidden md:flex space-x-10">
              {[
                { name: 'Home', ref: homeRef },
                { name: 'About', ref: aboutRef },
                { name: 'Work', ref: workRef },
                { name: 'Contact', ref: contactRef }
              ].map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 hover:text-black transition-all font-medium text-sm uppercase tracking-wider cursor-pointer"
                  onClick={() => scrollToSection(item.ref)}
                >
                  {item.name}
                </motion.li>
              ))}
            </motion.ul>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden text-gray-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </motion.button>
          </div>

          {/* Mobile Dropdown Menu */}
          <motion.div
            initial={false}
            animate={{
              height: isMenuOpen ? 'auto' : 0,
              opacity: isMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
          >
            <motion.ul className="px-6 pb-4 space-y-4">
              {[
                { name: 'Home', ref: homeRef },
                { name: 'About', ref: aboutRef },
                { name: 'Work', ref: workRef },
                { name: 'Contact', ref: contactRef }
              ].map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{
                    x: isMenuOpen ? 0 : -20,
                    opacity: isMenuOpen ? 1 : 0
                  }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-600 hover:text-black transition-all font-medium text-sm uppercase tracking-wider cursor-pointer border-b border-gray-100 pb-2"
                  onClick={() => scrollToSection(item.ref)}
                >
                  {item.name}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.nav>

        {/* Hero Section */}
        <section ref={homeRef} className="min-h-screen flex items-center justify-center pt-24 pb-20 relative overflow-hidden">
          <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm uppercase tracking-widest text-gray-500 font-medium mb-4"
            >
              Senior Software Engineer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-8xl font-bold leading-tight tracking-tighter mb-6"
            >
              RAMESH <span className="text-black">UPADHAYA</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-xl md:text-2xl text-gray-600 font-light mb-8">
                Crafting exceptional digital experiences with <span className="font-medium text-black">React, Node.js, and modern web technologies</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(workRef)}
                className="px-8 py-3.5 bg-black text-white rounded-full font-medium text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
              >
                View My Work
              </motion.button>

              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadResume}
                className="px-8 py-3.5 bg-white text-black border border-black rounded-full font-medium text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center justify-center space-x-6 pt-16"
            >
              <div className="text-xs uppercase tracking-widest text-gray-400 font-medium">Connect With Me</div>
              <div className="flex space-x-4">
                {['LinkedIn', 'GitHub', 'Twitter'].map((social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ y: -3 }}
                    className="text-gray-500 hover:text-black transition-colors text-sm"
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gray-400"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="py-28 bg-gray-50 relative overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-lg bg-gray-100 opacity-10"
          />

          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-sm uppercase tracking-widest text-gray-500 font-medium mb-4 inline-block"
              >
                About Me
              </motion.div>
              <motion.h2
                whileHover={{ scale: 1.02 }}
                className="text-4xl font-bold mb-6"
              >
                Technical Expertise
              </motion.h2>
              <motion.div
                whileHover={{ width: 100 }}
                className="w-20 h-0.5 bg-black mx-auto"
              />
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/2 mb-16 lg:mb-0 lg:pr-16 w-full"
              >
                <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
                <div className="space-y-6">
                  {[
                    { skill: 'React.js / Next.js', level: 95 },
                    { skill: 'Node.js / Express', level: 90 },
                    { skill: 'MongoDB / Mongoose', level: 85 },
                    { skill: 'RESTful APIs', level: 90 },
                    { skill: 'TypeScript', level: 80 },
                    { skill: 'AWS / DevOps', level: 75 }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between">
                        <span className="text-gray-700 font-medium">{item.skill}</span>
                        <span className="text-gray-500 text-sm">{item.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="h-full rounded-full bg-black"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <h3 className="text-2xl font-semibold mb-6">Professional Journey</h3>
                <motion.p
                  whileHover={{ x: 5 }}
                  className="text-gray-600 mb-6 leading-relaxed"
                >
                  As a seasoned MERN stack developer with 6+ years of experience, I've architected and delivered over 30 web applications for clients across various industries. My expertise spans the entire development lifecycle - from conceptualization to deployment.
                </motion.p>
                <motion.p
                  whileHover={{ x: 5 }}
                  className="text-gray-600 mb-8 leading-relaxed"
                >
                  I specialize in building performant, scalable applications with clean, maintainable code. My approach combines technical excellence with business acumen to deliver solutions that drive real value.
                </motion.p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { title: 'Projects', value: '30+' },
                    { title: 'Clients', value: '25+' },
                    { title: 'Experience', value: '6 Years' },
                    { title: 'Certifications', value: '5' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl p-6 border border-gray-200 hover:border-black transition-all shadow-sm hover:shadow-md"
                    >
                      <div className="text-3xl font-bold text-black mb-2">{item.value}</div>
                      <div className="text-sm uppercase tracking-widest text-gray-500">{item.title}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={workRef} className="lg:py-28 relative pb-28 pt-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-sm uppercase tracking-widest text-gray-500 font-medium mb-4 inline-block"
              >
                My Work
              </motion.div>
              <motion.h2
                whileHover={{ scale: 1.02 }}
                className="text-4xl font-bold mb-6"
              >
                Featured Projects
              </motion.h2>
              <motion.div
                whileHover={{ width: 100 }}
                className="w-20 h-0.5 bg-black mx-auto"
              />
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: 'E-commerce Platform',
                  description: 'Full-featured online store with cart, payment integration, and admin dashboard.',
                  tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                  image: mockImages.project1
                },
                {
                  title: 'Project Management Tool',
                  description: 'Collaborative platform with real-time updates and task management.',
                  tags: ['Next.js', 'TypeScript', 'Firebase'],
                  image: mockImages.project2
                },
                {
                  title: 'Healthcare Analytics Dashboard',
                  description: 'Data visualization platform for healthcare metrics and reporting.',
                  tags: ['React', 'D3.js', 'Express', 'MongoDB'],
                  image: mockImages.project3
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all bg-white border border-gray-100"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-xs uppercase tracking-widest text-gray-300 mb-2">{project.tags.join(' • ')}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                    <button className="text-white text-sm font-medium flex items-center space-x-1">
                      <span>View Details</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <button className="px-8 py-3.5 border border-gray-300 hover:border-black rounded-full font-medium text-sm uppercase tracking-wider transition-all flex items-center mx-auto space-x-2">
                <span>View All Projects</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="py-28 bg-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-sm uppercase tracking-widest text-gray-500 font-medium mb-4 inline-block"
              >
                Get In Touch
              </motion.div>
              <motion.h2
                whileHover={{ scale: 1.02 }}
                className="text-4xl font-bold mb-6"
              >
                Let's Build Something
              </motion.h2>
              <motion.div
                whileHover={{ width: 100 }}
                className="w-20 h-0.5 bg-black mx-auto"
              />
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-3 text-sm uppercase tracking-widest">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-3 text-sm uppercase tracking-widest">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400 transition-all"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-3 text-sm uppercase tracking-widest">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400 transition-all"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-3 text-sm uppercase tracking-widest">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400 transition-all"
                    placeholder="Your message"
                  />
                </div>
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-8 py-5 bg-black text-white rounded-lg font-medium text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                >
                  Send Message
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-2xl font-bold tracking-tighter mb-6 md:mb-0 text-black"
              >
                Ramesh Upadhaya
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex space-x-6"
              >
                {['LinkedIn', 'GitHub', 'Twitter'].map((social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ y: -3 }}
                    className="text-gray-500 hover:text-black transition-colors text-sm uppercase tracking-wider"
                  >
                    {social}
                  </motion.a>
                ))}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm"
            >
              © {new Date().getFullYear()} Ramesh Upadhaya. All rights reserved.
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Portfolio;