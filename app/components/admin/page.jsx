'use client';
import { useState, useRef } from 'react';
import { database } from '../../lib/firebase';
import { ref, set, push } from 'firebase/database';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import Link from 'next/link';

// Predefined options for dropdowns
const TECHNOLOGY_OPTIONS = [
    'React', 'Next.js', 'Node.js', 'Express', 'MongoDB',
    'Firebase', 'Tailwind CSS', 'TypeScript', 'JavaScript',
    'Python', 'Django', 'Flask', 'GraphQL', 'REST API',
    'AWS', 'Docker', 'Kubernetes', 'Git', 'GitHub'
];

const CATEGORY_OPTIONS = [
    'Web Application', 'Mobile App', 'SaaS', 'Dashboard',
    'E-commerce', 'Portfolio', 'Blog', 'API', 'CMS'
];

const EXPERIENCE_TYPE = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];

export default function AdminDashboard() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const [activeTab, setActiveTab] = useState('basic');
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [imageUploadMethod, setImageUploadMethod] = useState(null);
    const fileInputRef = useRef(null);

    // Form data for different sections
    const [projectData, setProjectData] = useState({
        id: '',
        title: '',
        description: '',
        image: '',
        tags: [],
        overview: '',
        features: [],
        challenges: '',
        client: '',
        date: '',
        category: '',
        url: '',
        github: '',
        gallery: []
    });

    const [experienceData, setExperienceData] = useState({
        id: '',
        title: '',
        company: '',
        type: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        skills: []
    });

    const [educationData, setEducationData] = useState({
        id: '',
        degree: '',
        institution: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        grade: ''
    });

    const [hobbyData, setHobbyData] = useState({
        id: '',
        title: '',
        description: '',
        icon: '',
        category: ''
    });

    const [message, setMessage] = useState({ text: '', type: '' });

    // Common handlers
    const handleChange = (e, setter) => {
        const { name, value, type, checked } = e.target;
        setter(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayChange = (name, value, setter) => {
        setter(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e, setter, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setter(prev => ({
                ...prev,
                [fieldName]: URL.createObjectURL(file)
            }));
            setImageModalOpen(false);
        }
    };

    // Submit handlers for each section
    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        const { id, title, description, image, tags } = projectData;

        if (!id || !title || !description || !image || tags.length === 0) {
            setMessage({ text: 'Please fill in all required fields.', type: 'error' });
            return;
        }

        setIsSubmitting(true);

        try {
            await set(ref(database, `projects/${id}`), {
                title,
                description,
                image,
                tags,
                createdAt: new Date().toISOString(),
                details: {
                    overview: projectData.overview,
                    features: projectData.features,
                    challenges: projectData.challenges.split('|').map(pair => {
                        const [problem, solution] = pair.split('=>');
                        return { problem: problem.trim(), solution: solution?.trim() || '' };
                    }),
                    client: projectData.client,
                    date: projectData.date,
                    category: projectData.category,
                    url: projectData.url,
                    github: projectData.github,
                    gallery: projectData.gallery,
                }
            });
            setMessage({ text: 'Project added successfully!', type: 'success' });
            setActiveTab('basic');
            setProjectData({
                id: '', title: '', description: '', image: '', tags: [],
                overview: '', features: [], challenges: '', client: '',
                date: '', category: '', url: '', github: '', gallery: []
            });
        } catch (error) {
            console.error('Error adding project:', error);
            setMessage({ text: 'Error adding project. Please try again.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleExperienceSubmit = async (e) => {
        e.preventDefault();
        const { title, company, startDate, description } = experienceData;

        if (!title || !company || !startDate || !description) {
            setMessage({ text: 'Please fill in all required fields.', type: 'error' });
            return;
        }

        setIsSubmitting(true);

        try {
            const newExperienceRef = push(ref(database, 'experience'));
            await set(newExperienceRef, {
                ...experienceData,
                createdAt: new Date().toISOString()
            });
            setMessage({ text: 'Experience added successfully!', type: 'success' });
            setExperienceData({
                id: '',
                title: '',
                company: '',
                type: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                skills: []
            });
        } catch (error) {
            console.error('Error adding experience:', error);
            setMessage({ text: 'Error adding experience. Please try again.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEducationSubmit = async (e) => {
        e.preventDefault();
        const { degree, institution, startDate } = educationData;

        if (!degree || !institution || !startDate) {
            setMessage({ text: 'Please fill in all required fields.', type: 'error' });
            return;
        }

        setIsSubmitting(true);

        try {
            const newEducationRef = push(ref(database, 'education'));
            await set(newEducationRef, {
                ...educationData,
                createdAt: new Date().toISOString()
            });
            setMessage({ text: 'Education added successfully!', type: 'success' });
            setEducationData({
                id: '',
                degree: '',
                institution: '',
                fieldOfStudy: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                grade: ''
            });
        } catch (error) {
            console.error('Error adding education:', error);
            setMessage({ text: 'Error adding education. Please try again.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleHobbySubmit = async (e) => {
        e.preventDefault();
        const { title, description } = hobbyData;

        if (!title || !description) {
            setMessage({ text: 'Please fill in all required fields.', type: 'error' });
            return;
        }

        setIsSubmitting(true);

        try {
            const newHobbyRef = push(ref(database, 'hobbies'));
            await set(newHobbyRef, {
                ...hobbyData,
                createdAt: new Date().toISOString()
            });
            setMessage({ text: 'Hobby added successfully!', type: 'success' });
            setHobbyData({
                id: '',
                title: '',
                description: '',
                icon: '',
                category: ''
            });
        } catch (error) {
            console.error('Error adding hobby:', error);
            setMessage({ text: 'Error adding hobby. Please try again.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Field configurations for each section
    const projectFields = {
        basic: [
            { label: 'Unique ID (kebab-case)', name: 'id', placeholder: 'ecommerce-platform', type: 'text' },
            { label: 'Project Title', name: 'title', placeholder: 'E-commerce Platform', type: 'text' },
            { label: 'Description', name: 'description', placeholder: 'Short summary of the project', type: 'textarea' },
            { label: 'Main Image', name: 'image', type: 'image' },
            { label: 'Technologies', name: 'tags', type: 'multiselect', options: TECHNOLOGY_OPTIONS },
            { label: 'Overview', name: 'overview', type: 'textarea', placeholder: 'Detailed overview of the project' },
            { label: 'Key Features', name: 'features', type: 'multiline-tags', placeholder: 'Add key features' },
            { label: 'Challenges (problem=>solution, separate by |)', name: 'challenges', type: 'textarea', placeholder: 'API scaling issue=>Used caching\nSEO=>Used SSR' },
            { label: 'Client', name: 'client', type: 'text', placeholder: 'Confidential / Company Name' },
            { label: 'Date', name: 'date', type: 'date', placeholder: '' },
            { label: 'Category', name: 'category', type: 'select', options: CATEGORY_OPTIONS },
            { label: 'Live Demo URL', name: 'url', type: 'url', placeholder: 'https://yourproject.com' },
            { label: 'GitHub Repo URL', name: 'github', type: 'url', placeholder: 'https://github.com/...' },
            { label: 'Gallery Images', name: 'gallery', type: 'gallery' }
        ]
    };

    const experienceFields = [
        { label: 'Job Title', name: 'title', placeholder: 'Frontend Developer', type: 'text' },
        { label: 'Company', name: 'company', placeholder: 'Tech Corp Inc.', type: 'text' },
        { label: 'Employment Type', name: 'type', type: 'select', options: EXPERIENCE_TYPE },
        { label: 'Location', name: 'location', placeholder: 'New York, NY', type: 'text' },
        { label: 'Start Date', name: 'startDate', type: 'date' },
        { label: 'End Date', name: 'endDate', type: 'date' },
        { label: 'Currently Working Here', name: 'current', type: 'checkbox' },
        { label: 'Job Description', name: 'description', type: 'textarea', placeholder: 'Describe your responsibilities and achievements' },
        { label: 'Skills Used', name: 'skills', type: 'multiselect', options: TECHNOLOGY_OPTIONS }
    ];

    const educationFields = [
        { label: 'Degree', name: 'degree', placeholder: 'Bachelor of Science', type: 'text' },
        { label: 'Institution', name: 'institution', placeholder: 'University of Technology', type: 'text' },
        { label: 'Field of Study', name: 'fieldOfStudy', placeholder: 'Computer Science', type: 'text' },
        { label: 'Start Date', name: 'startDate', type: 'date' },
        { label: 'End Date', name: 'endDate', type: 'date' },
        { label: 'Currently Studying Here', name: 'current', type: 'checkbox' },
        { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Notable achievements or coursework' },
        { label: 'Grade', name: 'grade', placeholder: '3.8 GPA', type: 'text' }
    ];

    const hobbyFields = [
        { label: 'Title', name: 'title', placeholder: 'Photography', type: 'text' },
        { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Describe your hobby' },
        { label: 'Icon (FontAwesome class)', name: 'icon', placeholder: 'fa-camera', type: 'text' },
        { label: 'Category', name: 'category', placeholder: 'Creative', type: 'text' }
    ];

    // Render field based on type
    const renderField = (field, data, setData) => {
        const { label, name, placeholder, type, options } = field;
        const value = data[name];

        return (
            <div key={name} className={type === 'textarea' || type === 'gallery' || type === 'multiline-tags' ? 'md:col-span-2' : ''}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                    {label} {['id', 'title', 'description'].includes(name) && <span className="text-red-500">*</span>}
                </label>

                {type === 'textarea' ? (
                    <textarea
                        id={name}
                        name={name}
                        value={value}
                        onChange={(e) => handleChange(e, setData)}
                        placeholder={placeholder}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        required={['title', 'description'].includes(name)}
                    />
                ) : type === 'multiselect' ? (
                    <div className="relative">
                        <Select
                            isMulti
                            name={name}
                            styles={{ borderRadius: '12px' }}
                            options={options.map(option => ({ value: option, label: option }))}
                            value={value?.map(item => ({ value: item, label: item })) || []}
                            onChange={(selectedOptions) => {
                                const selectedValues = selectedOptions.map(option => option.value);
                                handleArrayChange(name, selectedValues, setData);
                            }}
                            className="react-select-container text-black"
                            classNamePrefix="react-select text-black"
                            placeholder={`Select ${label.toLowerCase()}...`}
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {value?.map((item, index) => (
                                <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : type === 'image' ? (
                    <div>
                        {value ? (
                            <div className="relative group">
                                <img
                                    src={value}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => setImageModalOpen(true)}
                                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                                >
                                    <span className="text-white font-medium">Change Image</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setImageModalOpen(true)}
                                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors"
                            >
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span className="mt-2 text-sm font-medium text-gray-600">Upload Image</span>
                            </button>
                        )}
                    </div>
                ) : type === 'select' ? (
                    <select
                        id={name}
                        name={name}
                        value={value}
                        onChange={(e) => handleChange(e, setData)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                        <option value="">Select {label.toLowerCase()}</option>
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                ) : type === 'checkbox' ? (
                    <div className="flex items-center">
                        <input
                            id={name}
                            name={name}
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleChange(e, setData)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
                            {placeholder || label}
                        </label>
                    </div>
                ) : type === 'multiline-tags' ? (
                    <div>
                        <textarea
                            id={name}
                            name={name}
                            value={value.join('\n')}
                            onChange={(e) => {
                                const items = e.target.value.split('\n').filter(f => f.trim());
                                handleArrayChange(name, items, setData);
                            }}
                            placeholder="Add one item per line"
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {value?.map((item, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : type === 'gallery' ? (
                    <div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {value?.map((url, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={url}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-lg border border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...value];
                                            updated.splice(index, 1);
                                            handleArrayChange(name, updated, setData);
                                        }}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <input
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.target.value) {
                                        handleArrayChange(name, [...value, e.target.value], setData);
                                        e.target.value = '';
                                        e.preventDefault();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const input = document.querySelector('input[type="url"][placeholder="https://example.com/image.jpg"]');
                                    if (input.value) {
                                        handleArrayChange(name, [...value, input.value], setData);
                                        input.value = '';
                                    }
                                }}
                                className="px-4 py-3 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                ) : (
                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={(e) => handleChange(e, setData)}
                        placeholder={placeholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-black"
                        required={['title', 'description'].includes(name)}
                    />
                )}
            </div>
        );
    };

    // Render form based on active section
    const renderForm = () => {
        switch (activeSection) {
            case 'projects':
                return (
                    <form onSubmit={handleProjectSubmit} className="space-y-6">
                        {activeTab === 'basic' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {projectFields.basic.map(field => renderField(field, projectData, setProjectData))}
                            </motion.div>
                        )}

                        <div className="flex justify-between pt-4">
                            <div className="ml-auto">
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)' }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting}
                                    className={`px-8 py-3 rounded-lg font-semibold text-white shadow-md transition-all ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Processing...</span>
                                        </div>
                                    ) : (
                                        'Submit Project'
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </form>
                );
            case 'experience':
                return (
                    <form onSubmit={handleExperienceSubmit} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {experienceFields.map(field => renderField(field, experienceData, setExperienceData))}
                        </motion.div>
                        <div className="flex justify-end pt-4">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)' }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                                className={`px-8 py-3 rounded-lg font-semibold text-white shadow-md transition-all ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    'Submit Experience'
                                )}
                            </motion.button>
                        </div>
                    </form>
                );
            case 'education':
                return (
                    <form onSubmit={handleEducationSubmit} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {educationFields.map(field => renderField(field, educationData, setEducationData))}
                        </motion.div>
                        <div className="flex justify-end pt-4">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)' }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                                className={`px-8 py-3 rounded-lg font-semibold text-white shadow-md transition-all ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    'Submit Education'
                                )}
                            </motion.button>
                        </div>
                    </form>
                );
            case 'hobbies':
                return (
                    <form onSubmit={handleHobbySubmit} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {hobbyFields.map(field => renderField(field, hobbyData, setHobbyData))}
                        </motion.div>
                        <div className="flex justify-end pt-4">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)' }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                                className={`px-8 py-3 rounded-lg font-semibold text-white shadow-md transition-all ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    'Submit Hobby'
                                )}
                            </motion.button>
                        </div>
                    </form>
                );
            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                                setActiveSection('projects');
                                setActiveTab('basic');
                            }}
                            className="p-8 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-12 h-12 text-indigo-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-800">Update Projects</h3>
                            <p className="text-gray-500 mt-2 text-center">Add, edit, or remove projects from your portfolio</p>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveSection('experience')}
                            className="p-8 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-12 h-12 text-indigo-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-800">Update Experience</h3>
                            <p className="text-gray-500 mt-2 text-center">Manage your professional work experience</p>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveSection('education')}
                            className="p-8 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-12 h-12 text-indigo-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-800">Update Education</h3>
                            <p className="text-gray-500 mt-2 text-center">Manage your educational background</p>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveSection('hobbies')}
                            className="p-8 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-12 h-12 text-indigo-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-800">Update Hobbies</h3>
                            <p className="text-gray-500 mt-2 text-center">Add or edit your personal hobbies</p>
                        </motion.button>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-10 text-black">
            <div
                onClick={() => {
                    if (activeSection == null) {
                        router.push('/')
                    }
                    setActiveSection(null)
                }
                }
                className="inline-flex items-center text-black hover:text-gray-800 mb-4 transition-colors cursor-pointer"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
            {message.text && (
                <div
                    className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                >
                    {message.text}
                </div>
            )}

            {renderForm()}
        </div>
    );
}
