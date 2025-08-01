'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/Header';

const ContactPage = () => {
    const { theme, toggleTheme } = useTheme(); // Using the hook here
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
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

    const contactInfo = {
        email: "hello@rameshupadhaya.com",
        phone: "+1 (123) 456-7890",
        location: "San Francisco, CA",
        availability: "Available for new projects",
        socials: [
            { name: "LinkedIn", icon: "👔", url: "#" },
            { name: "GitHub", icon: "💻", url: "#" },
            { name: "Twitter", icon: "🐦", url: "#" }
        ]
    };

    return (
        <>
            <Head>
                <title>Contact Ramesh Upadhaya | Senior Full-Stack Engineer</title>
            </Head>

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="pt-24 pb-12">
                    <div className="container mx-auto px-4">
                        {/* Hero Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                                Have a project in mind or want to discuss opportunities? I'm currently available for select freelance work.
                            </p>
                        </motion.section>

                        {/* Contact Content */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                            >
                                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                            <span>📧</span> Email
                                        </h3>
                                        <a
                                            href={`mailto:${contactInfo.email}`}
                                            className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                        >
                                            {contactInfo.email}
                                        </a>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                            <span>📱</span> Phone
                                        </h3>
                                        <a
                                            href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            {contactInfo.phone}
                                        </a>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                            <span>📍</span> Location
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">{contactInfo.location}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                            <span>🕒</span> Availability
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">{contactInfo.availability}</p>
                                    </div>

                                    <div className="pt-4">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <span>🔗</span> Connect
                                        </h3>
                                        <div className="flex gap-4">
                                            {contactInfo.socials.map((social) => (
                                                <motion.a
                                                    key={social.name}
                                                    href={social.url}
                                                    whileHover={{ y: -3 }}
                                                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                                >
                                                    <span>{social.icon}</span>
                                                    <span>{social.name}</span>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                            >
                                <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>

                                {submitMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`mb-6 p-4 rounded-md ${submitMessage.includes('success')
                                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100'
                                            : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100'
                                            }`}
                                    >
                                        {submitMessage}
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2">
                                                Subject <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                                                placeholder="What's this about?"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                                                Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows="5"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                                                placeholder="Tell me about your project..."
                                            />
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full px-6 py-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                                    </svg>
                                                    Send Message
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Ramesh Upadhaya. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    );
};

export default ContactPage;