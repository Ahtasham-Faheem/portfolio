'use client'

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import * as THREE from 'three';
import Link from 'next/link';
import { database } from './lib/firebase';
import { ref, onValue } from 'firebase/database';

const Portfolio = () => {
  // Refs for sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);
  const canvasRef = useRef(null);

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Scroll function
  const scrollToSection = (ref) => {
    if (ref.current) {
      const headerHeight = 80;
      const elementPosition = ref.current.offsetTop;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual form submission logic
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  // Skills data - using chip style
  const skills = [
    'React.js', 'Next.js', 'Node.js', 'Express', 'MongoDB',
    'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS',
    'Redux', 'GraphQL', 'REST API', 'AWS', 'Docker',
    'Git', 'GitHub', 'CI/CD', 'Jest', 'Cypress'
  ];

  // Work experience data
  const experiences = [
    {
      role: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      duration: '2020 - Present',
      description: 'Led a team of developers to build scalable web applications using React and Node.js. Implemented CI/CD pipelines reducing deployment time by 40%.'
    },
    {
      role: 'Software Engineer',
      company: 'Digital Innovations LLC',
      duration: '2018 - 2020',
      description: 'Developed and maintained e-commerce platforms. Optimized performance leading to 30% faster page loads.'
    },
    {
      role: 'Junior Developer',
      company: 'WebStart',
      duration: '2016 - 2018',
      description: 'Built responsive UIs and contributed to backend development. Learned modern web development practices.'
    }
  ];

  // Resume download function with options
  const handleResumeAction = (type) => {
    const link = document.createElement('a');
    link.href = `/resume.${type}`;
    link.download = `Ramesh_Upadhaya_Resume.${type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Three.js animation setup (same as before)
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
    const circleTexture = loader.load('/circle.png');

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
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const projectsRef = ref(database, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedProjects = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setProjects(loadedProjects);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>Ramesh Upadhaya - Senior Software Engineer</title>
        <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
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
            <div className='cursor-pointer' onClick={() => scrollToSection(homeRef)}>
              <img src="/avatar.png" alt="Ramesh Avatar" className="w-24" />
            </div>

            {/* Desktop Navigation */}
            <motion.ul className="hidden md:flex space-x-10">
              {[
                { name: 'Home', ref: homeRef },
                { name: 'About', ref: aboutRef },
                { name: 'Work', ref: workRef },
                { name: 'Experience', ref: experienceRef },
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
                { name: 'Experience', ref: experienceRef },
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
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center text-center md:text-left relative z-10">
            {/* Avatar Image */}
            <div className="md:mr-12 mb-8 md:mb-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-white overflow-hidden border-4 border-white shadow-xl mx-auto md:mx-0 flex items-center justify-center"
              >
                <img src="/avatar.png" alt="Ramesh Avatar" className="w-40" />
              </motion.div>
            </div>

            <div>
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
                className="max-w-2xl mx-auto md:mx-0"
              >
                <p className="text-xl md:text-2xl text-gray-600 font-light mb-8">
                  Crafting exceptional digital experiences with <span className="font-medium text-black">React, Node.js, and modern web technologies</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap justify-center md:justify-start gap-4 mt-8"
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
                  onClick={() => scrollToSection(experienceRef)}
                  className="px-8 py-3.5 bg-white text-black border border-black rounded-full font-medium text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Resume
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center justify-center md:justify-start space-x-6 pt-16"
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
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="py-28 bg-gray-50 relative overflow-hidden">
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
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 text-sm font-medium"
                    >
                      {skill}
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
                  As a seasoned MERN stack developer with 6+ years of experience, I&apos;ve architected and delivered over 30 web applications for clients across various industries. My expertise spans the entire development lifecycle - from conceptualization to deployment.
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

        <section ref={workRef} className="py-28 relative">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0,3).map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
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
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Link href="/projects">
                <button className="px-8 py-3.5 border border-gray-300 hover:border-black rounded-full font-medium text-sm uppercase tracking-wider transition-all flex items-center mx-auto space-x-2">
                  <span>View All Projects</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Link>

            </motion.div>
          </div>
        </section>

        <section ref={experienceRef} className="py-28 bg-gray-50 relative overflow-hidden">
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
                My Journey
              </motion.div>
              <motion.h2
                whileHover={{ scale: 1.02 }}
                className="text-4xl font-bold mb-6"
              >
                Work Experience
              </motion.h2>
              <motion.div
                whileHover={{ width: 100 }}
                className="w-20 h-0.5 bg-black mx-auto"
              />
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:border-black transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <span className="text-gray-500 text-sm">{exp.duration}</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-700 mb-4">{exp.company}</h4>
                  <p className="text-gray-600">{exp.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <div className="inline-block relative group">
                <button
                  className="px-8 py-3.5 bg-black text-white rounded-full font-medium text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center mx-auto space-x-2"
                  onClick={() => {
                    window.open('/resume.pdf', '_blank');
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>View Full Resume</span>
                </button>

                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="py-1">
                    <button
                      onClick={() => handleResumeAction('pdf')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Download as PDF
                    </button>
                    <button
                      onClick={() => handleResumeAction('docx')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Download as Word
                    </button>
                  </div>
                </div>
              </div>
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
                Let&apos;s Build Something
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
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-md ${submitMessage.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {submitMessage}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-3 text-sm uppercase tracking-widest">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-3 text-sm uppercase tracking-widest">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
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
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400 transition-all"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-3 text-sm uppercase tracking-widest">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400 transition-all"
                    placeholder="Your message"
                  />
                </div>
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-5 bg-black text-white rounded-lg font-medium text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </motion.button>
              </form>
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