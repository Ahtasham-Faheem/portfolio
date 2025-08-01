'use client'

import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { database } from '../lib/firebase';
import { ref, onValue } from 'firebase/database';
import Header from '../components/Header';

const About = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        name: "Ramesh Upadhaya",
        title: "Senior Full-Stack Engineer",
        about: [
            "I'm a passionate developer with 6+ years of experience building scalable web applications.",
            "My journey in tech began when I built my first website at 16, and I've been hooked ever since.",
            "I specialize in creating efficient, user-friendly solutions that bridge business needs with technical excellence.",
            "When I'm not coding, you'll find me hiking, reading sci-fi, or experimenting with new cooking recipes."
        ],
        experience: [],
        education: {},
        hobbies: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch experience data
        const experienceRef = ref(database, 'experience');
        onValue(experienceRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const experienceArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setPersonalInfo(prev => ({
                    ...prev,
                    experience: experienceArray
                }));
            }
        });

        // Fetch education data
        const educationRef = ref(database, 'education');
        onValue(educationRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const educationArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // Assuming we want the most recent education entry
                if (educationArray.length > 0) {
                    setPersonalInfo(prev => ({
                        ...prev,
                        education: {
                            degree: educationArray[0].degree,
                            university: educationArray[0].institution,
                            year: educationArray[0].endDate || educationArray[0].startDate,
                            achievements: educationArray[0].description ? [educationArray[0].description] : []
                        }
                    }));
                }
            }
        });

        // Fetch hobbies data
        const hobbiesRef = ref(database, 'hobbies');
        onValue(hobbiesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const hobbiesArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setPersonalInfo(prev => ({
                    ...prev,
                    hobbies: hobbiesArray.map(hobby => hobby.title)
                }));
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex items-center justify-center`}>
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-lg">Loading profile data...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>About {personalInfo.name} | {personalInfo.title}</title>
            </Head>
            <div className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
                {/* Header */}
                <Header />

                {/* Main Content */}
                <div className="h-16"></div>
                <main className="container mx-auto px-4 py-12 max-w-5xl">
                    {/* Hero Section */}
                    <section className="mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                About Me
                            </h1>
                            <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed">
                                {personalInfo.about.map((paragraph, index) => (
                                    <motion.p
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 + 0.3 }}
                                    >
                                        {paragraph}
                                    </motion.p>
                                ))}
                            </div>
                        </motion.div>
                    </section>

                    {/* Experience Section */}
                    <section className="mb-28">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="flex items-center mb-12">
                                <h2 className="text-4xl font-bold">Professional Journey</h2>
                                <div className="ml-4 h-px flex-1 bg-gradient-to-r from-indigo-500 to-transparent"></div>
                            </div>

                            {personalInfo.experience.length > 0 ? (
                                <div className="space-y-12">
                                    {personalInfo.experience.map((exp, index) => (
                                        <motion.div
                                            key={exp.id}
                                            whileHover={{ y: -5 }}
                                            className="relative group"
                                        >
                                            <div className="absolute -left-14 top-0 hidden md:block">
                                                <div className="w-3 h-3 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform"></div>
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-semibold">{exp.title}</h3>
                                                        <p className="text-indigo-600 dark:text-indigo-400">{exp.company}</p>
                                                    </div>
                                                    <span className="px-4 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium">
                                                        {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : exp.current ? '- Present' : ''}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300 mb-6">{exp.description}</p>
                                                {exp.skills && exp.skills.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {exp.skills.map((skill, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-3 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No experience data available yet.</p>
                                </div>
                            )}
                        </motion.div>
                    </section>

                    {/* Education & Hobbies Section */}
                    <section>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="grid md:grid-cols-2 gap-12"
                        >
                            {/* Education Column */}
                            <div>
                                <div className="flex items-center mb-8">
                                    <h2 className="text-4xl font-bold">Education</h2>
                                    <div className="ml-4 h-px flex-1 bg-gradient-to-r from-indigo-500 to-transparent"></div>
                                </div>
                                {personalInfo.education.degree ? (
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                                    >
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-semibold mb-1">{personalInfo.education.degree}</h3>
                                            <p className="text-indigo-600 dark:text-indigo-400">
                                                {personalInfo.education.university} • {personalInfo.education.year}
                                            </p>
                                        </div>
                                        {personalInfo.education.achievements && personalInfo.education.achievements.length > 0 && (
                                            <ul className="space-y-4">
                                                {personalInfo.education.achievements.map((achievement, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <div className="flex-shrink-0 mt-1 mr-3">
                                                            <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                                                                <svg className="w-3 h-3 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </motion.div>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500">No education data available yet.</p>
                                    </div>
                                )}
                            </div>

                            {/* Hobbies Column */}
                            <div>
                                <div className="flex items-center mb-8">
                                    <h2 className="text-4xl font-bold">Hobbies & Interests</h2>
                                    <div className="ml-4 h-px flex-1 bg-gradient-to-r from-indigo-500 to-transparent"></div>
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                                >
                                    {personalInfo.hobbies.length > 0 ? (
                                        <>
                                            <div className="flex flex-wrap gap-3 mb-8">
                                                {personalInfo.hobbies.map((hobby, index) => (
                                                    <motion.span
                                                        key={index}
                                                        whileHover={{ scale: 1.1 }}
                                                        className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow-sm text-sm font-medium border border-gray-200 dark:border-gray-600"
                                                    >
                                                        {hobby}
                                                    </motion.span>
                                                ))}
                                            </div>
                                            <div className="text-gray-700 dark:text-gray-300">
                                                <p>
                                                    Outside of work, I'm passionate about continuous learning and outdoor activities.
                                                    These hobbies help me maintain creativity and problem-solving skills that I bring to my professional work.
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">No hobbies data available yet.</p>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="py-8 border-t border-gray-200 dark:border-gray-700 mt-20">
                    <div className="container mx-auto px-4 text-center">
                        <div className="flex justify-center space-x-6 mb-6">
                            <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                                <span className="sr-only">GitHub</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                                </svg>
                            </a>
                        </div>
                        <p className="text-base text-gray-500 dark:text-gray-400">
                            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default About;