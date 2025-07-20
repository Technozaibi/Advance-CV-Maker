import React, { useState, useEffect, useRef } from 'react';

/* global html2canvas, jspdf */

// Import your template components
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import SidebarTemplate from './templates/SidebarTemplate';

// Define your CV templates using the imported components
const templates = {
  modern: {
    name: 'Modern',
    render: (data) => <ModernTemplate data={data} />,
  },
  classic: {
    name: 'Classic',
    render: (data) => <ClassicTemplate data={data} />,
  },
  professional: {
    name: 'Professional',
    render: (data) => <ProfessionalTemplate data={data} />,
  },
  creative: {
    name: 'Creative',
    render: (data) => <CreativeTemplate data={data} />,
  },
  sidebar: {
    name: 'Sidebar',
    render: (data) => <SidebarTemplate data={data} />,
  },
};

// Main App Component
const App = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: '',
    professionalTitle: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    location: '',
    summary: '',
    photo: null,
    education: [],
    experience: [],
    skills: [],
    projects: [],
    awards: [],
  });

  // State for photo preview URL
  const [photoPreview, setPhotoPreview] = useState(null);

  // State for desktop view notification visibility
  const [showDesktopNotification, setShowDesktopNotification] = useState(false);

  // State to control which view is active: 'form' or 'preview'
  const [currentView, setCurrentView] = useState('form'); // 'form' or 'preview'

  // State to hold the currently selected template
  const [selectedTemplate, setSelectedTemplate] = useState('modern'); // Default template

  // State for PDF generation loading
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // State for compression level (1-100, maps to html2canvas scale)
  const [compressionLevel, setCompressionLevel] = useState(80); // Default to 80% quality

  // Ref for the CV preview content div to capture for PDF
  const cvPreviewRef = useRef(null);

  // State to track if PDF libraries are loaded
  const [arePdfLibsLoaded, setArePdfLibsLoaded] = useState(false);

  // Effect to load html2canvas and jspdf scripts dynamically
  useEffect(() => {
    let html2canvasLoaded = false;
    let jspdfLoaded = false;

    const checkAllLoaded = () => {
      if (html2canvasLoaded && jspdfLoaded) {
        setArePdfLibsLoaded(true);
      }
    };

    // Load html2canvas
    const scriptHtml2canvas = document.createElement('script');
    scriptHtml2canvas.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    scriptHtml2canvas.onload = () => {
      html2canvasLoaded = true;
      checkAllLoaded();
    };
    scriptHtml2canvas.onerror = () => console.error('Failed to load html2canvas.js');
    document.body.appendChild(scriptHtml2canvas);

    // Load jspdf
    const scriptJsPdf = document.createElement('script');
    scriptJsPdf.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    scriptJsPdf.onload = () => {
      jspdfLoaded = true;
      checkAllLoaded();
    };
    scriptJsPdf.onerror = () => console.error('Failed to load jspdf.umd.min.js');
    document.body.appendChild(scriptJsPdf);

    // Cleanup function to remove scripts if component unmounts (optional, but good practice)
    return () => {
      if (document.body.contains(scriptHtml2canvas)) {
        document.body.removeChild(scriptHtml2canvas);
      }
      if (document.body.contains(scriptJsPdf)) {
        document.body.removeChild(scriptJsPdf);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to check screen width for desktop notification
  useEffect(() => {
    const handleResize = () => {
      // Show notification if screen width is less than 768px (md breakpoint in Tailwind)
      if (window.innerWidth < 768) {
        setShowDesktopNotification(true);
      } else {
        setShowDesktopNotification(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle photo file upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        photo: file,
      }));
      // Create a URL for photo preview
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Handle adding new items to arrays (e.g., education, experience)
  const handleAddItem = (section) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], {}], // Add an empty object for a new entry
    }));
  };

  // Handle changes for nested array items (e.g., education details)
  const handleNestedChange = (section, index, e) => {
    const { name, value } = e.target;
    const updatedSection = formData[section].map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormData((prevData) => ({
      ...prevData,
      [section]: updatedSection,
    }));
  };

  // Handle "Next" button click to show preview
  const handleNextClick = () => {
    setCurrentView('preview');
  };

  // Handle "Back to Edit" button click
  const handleBackToEdit = () => {
    setCurrentView('form');
  };

  // Handle PDF Download
  const handleDownloadPdf = async () => {
    if (!cvPreviewRef.current) {
      console.error('CV preview element not found.');
      alert('Error: Could not find CV content to generate PDF.');
      return;
    }
    if (!arePdfLibsLoaded) {
      console.error('PDF libraries not yet loaded.');
      alert('PDF generation libraries are still loading. Please wait a moment and try again.');
      return;
    }

    setIsGeneratingPdf(true); // Show loading indicator
    try {
      // html2canvas options: scale for resolution/quality
      // Scale from 0.01 to 2.0, 100% quality = 2x resolution
      const scale = compressionLevel / 100 * 2;
      const canvas = await html2canvas(cvPreviewRef.current, {
        scale: scale,
        useCORS: true, // Important for images loaded from external URLs (like photoPreview)
        logging: false, // Disable logging for cleaner console
      });

      // Image quality for JPEG (0.0 to 1.0)
      const imgData = canvas.toDataURL('image/jpeg', compressionLevel / 100);

      // Initialize jsPDF
      const { jsPDF } = window.jspdf; // Access jsPDF from window object
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4', // A4 size in pixels (approx 794x1123 at 96 DPI)
      });

      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, '', 'FAST'); // 'FAST' compression for image
      pdf.save('your-cv.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again. Error: ' + error.message);
    } finally {
      setIsGeneratingPdf(false); // Hide loading indicator
    }
  };

  // Handle compression seekbar change
  const handleCompressionChange = (e) => {
    setCompressionLevel(parseInt(e.target.value, 10));
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      {/* Desktop View Notification */}
      {showDesktopNotification && (
        <div className="bg-blue-500 text-white p-3 text-center text-sm md:hidden flex items-center justify-between">
          <span>For a better experience, please open this app in <strong className="font-bold">Desktop View</strong>.</span>
          <button onClick={() => setShowDesktopNotification(false)} className="ml-4 p-1 rounded-full hover:bg-blue-600 focus:outline-none" aria-label="Dismiss notification"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">Advanced CV Maker</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {currentView === 'form' ? (
          // CV Input Form
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Create Your CV</h2>

            {/* Personal Information Section */}
            <section className="mb-8 p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-medium text-gray-800 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="professionalTitle" className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                  <input type="text" id="professionalTitle" name="professionalTitle" value={formData.professionalTitle} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Software Engineer" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="john.doe@example.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="+1 (555) 123-4567" />
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL</label>
                  <input type="url" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="https://linkedin.com/in/johndoe" />
                </div>
                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">Portfolio/Website URL (Optional)</label>
                  <input type="url" id="portfolio" name="portfolio" value={formData.portfolio} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="https://johndoe.com" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="New York, USA" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">Professional Summary/Objective</label>
                  <textarea id="summary" name="summary" value={formData.summary} onChange={handleChange} rows="4" className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="A highly motivated and results-oriented professional with X years of experience..."
                  ></textarea>
                </div>
                {/* Photo Upload */}
                <div className="md:col-span-2 flex flex-col items-center">
                  <label htmlFor="photo-upload" className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-blue-300 shadow-md mb-3">
                    {photoPreview ? (
                      <img src={photoPreview} alt="CV Photo Preview" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </div>
                  <input type="file" id="photo-upload" name="photo" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <label htmlFor="photo-upload" className="cursor-pointer bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
                  >
                    Choose Photo
                  </label>
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section className="mb-8 p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-medium text-gray-800 mb-4">Education</h3>
              {formData.education.map((edu, index) => (
                <div key={index} className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Degree/Qualification</label>
                      <input type="text" id={`degree-${index}`} name="degree" value={edu.degree || ''} onChange={(e) => handleNestedChange('education', index, e)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Bachelor of Science" />
                    </div>
                    <div>
                      <label htmlFor={`field-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                      <input type="text" id={`field-${index}`} name="field" value={edu.field || ''} onChange={(e) => handleNestedChange('education', index, e)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Computer Science" />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor={`university-${index}`} className="block text-sm font-medium text-gray-700 mb-1">University/Institution</label>
                      <input type="text" id={`university-${index}`} name="university" value={edu.university || ''} onChange={(e) => handleNestedChange('education', index, e)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="University of Example" />
                    </div>
                    <div>
                      <label htmlFor={`eduLocation-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input type="text" id={`eduLocation-${index}`} name="location" value={edu.location || ''} onChange={(e) => handleNestedChange('education', index, e)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="City, Country" />
                    </div>
                    <div>
                      <label htmlFor={`gradYear-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                      <input type="number" id={`gradYear-${index}`} name="gradYear" value={edu.gradYear || ''} onChange={(e) => handleNestedChange('education', index, e)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="2023" />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => handleAddItem('education')} className="mt-4 bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out shadow-md"
              >
                Add Education
              </button>
            </section>

            {/* Work Experience Section */}
            <section className="mb-8 p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-medium text-gray-800 mb-4">Work Experience</h3>
              {formData.experience.map((exp, index) => (
                <div key={index} className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`jobTitle-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                      <input type="text" id={`jobTitle-${index}`} name="jobTitle" value={exp.jobTitle || ''} onChange={(e) => handleNestedChange('experience', index, e)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Senior Developer" />
                    </div>
                    <div>
                      <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input type="text" id={`company-${index}`} name="company" value={exp.company || ''} onChange={(e) => handleNestedChange('experience', index, e)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Tech Solutions Inc." />
                    </div>
                    <div>
                      <label htmlFor={`expLocation-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input type="text" id={`expLocation-${index}`} name="location" value={exp.location || ''} onChange={(e) => handleNestedChange('experience', index, e)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="City, Country" />
                    </div>
                    <div>
                      <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Start Date (Month/Year)</label>
                      <input type="text" // Using text for simplicity, can be date picker
                        id={`startDate-${index}`} name="startDate" value={exp.startDate || ''} onChange={(e) => handleNestedChange('experience', index, e)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Jan 2020" />
                    </div>
                    <div>
                      <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">End Date (Month/Year or 'Present')</label>
                      <input type="text" // Using text for simplicity, can be date picker
                        id={`endDate-${index}`} name="endDate" value={exp.endDate || ''} onChange={(e) => handleNestedChange('experience', index, e)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Dec 2023 or Present" />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor={`responsibilities-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Responsibilities/Achievements</label>
                      <textarea id={`responsibilities-${index}`} name="responsibilities" value={exp.responsibilities || ''} onChange={(e) => handleNestedChange('experience', index, e)} rows="3" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Developed and maintained web applications..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => handleAddItem('experience')} className="mt-4 bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out shadow-md"
              >
                Add Experience
              </button>
            </section>

            {/* Skills Section */}
            <section className="mb-8 p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-medium text-gray-800 mb-4">Skills</h3>
              {formData.skills.map((skill, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`skillName-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                      <input type="text" id={`skillName-${index}`} name="name" value={skill.name || ''} onChange={(e) => handleNestedChange('skills', index, e)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="JavaScript, React, Python" />
                    </div>
                    <div>
                      <label htmlFor={`skillProficiency-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Proficiency (Optional)</label>
                      <select id={`skillProficiency-${index}`} name="proficiency" value={skill.proficiency || ''} onChange={(e) => handleNestedChange('skills', index, e)} className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Proficiency</option>
                        <option value="Novice">Novice</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => handleAddItem('skills')} className="mt-4 bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out shadow-md"
              >
                Add Skill
              </button>
            </section>

            {/* Next Button */}
            <div className="text-center mt-8">
              <button onClick={handleNextClick} className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
              >
                Next: Preview CV
              </button>
            </div>
          </div>
        ) : (
          // CV Preview Section
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Preview Your CV</h2>

            {/* Template Selection */}
            <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="template-select" className="block text-base font-medium text-gray-700">Select Template:</label>
                <select id="template-select" value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.keys(templates).map((key) => (
                    <option key={key} value={key}>
                      {templates[key].name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <button onClick={handleBackToEdit} className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out shadow-md"
                >
                  Back to Edit
                </button>
                <button onClick={handleDownloadPdf} className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-md relative" disabled={isGeneratingPdf || !arePdfLibsLoaded} // Disable button while generating or if libs not loaded
                >
                  {isGeneratingPdf ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating PDF...
                    </span>
                  ) : (
                    arePdfLibsLoaded ? 'Download PDF' : 'Loading PDF tools...'
                  )}
                </button>
              </div>
            </div>

            {/* Compression Seekbar */}
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <label htmlFor="compression-seekbar" className="block text-sm font-medium text-gray-700 mb-2">PDF Quality / File Size: {compressionLevel}%</label>
              <input type="range" id="compression-seekbar" min="1" max="100" value={compressionLevel} onChange={handleCompressionChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700" />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Smaller File (Lower Quality)</span>
                <span>Larger File (Higher Quality)</span>
              </div>
            </div>

            {/* Render Selected CV Template */}
            <div className="mt-8">
              {selectedTemplate && templates[selectedTemplate] ? (
                // The ref is crucial here for html2canvas to capture this specific div
                <div ref={cvPreviewRef} className="cv-preview-content">
                  {templates[selectedTemplate].render({ ...formData, photoPreview })}
                </div>
              ) : (
                <p className="text-center text-gray-600">Please select a template to preview your CV.</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p className="mb-4">&copy; {new Date().getFullYear()} CV Maker App. All Rights Reserved.</p>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
            <a href="#" className="hover:text-blue-400 transition-colors duration-300">About Us</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-300">Contact Us</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-300">Cookie Policy</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default App;
