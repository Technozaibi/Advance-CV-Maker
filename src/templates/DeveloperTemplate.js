import React from 'react';

const DeveloperTemplate = ({ data }) => {
  return (
    <div className="p-8 bg-gray-900 text-gray-200 shadow-lg rounded-lg font-mono leading-relaxed max-w-[595px] mx-auto min-h-[842px]">
      <header className="mb-8 pb-6 border-b border-gray-700">
        <h1 className="text-4xl font-bold text-green-400 mb-1">{data.fullName || 'Dev Name'}</h1>
        <h2 className="text-xl text-blue-400 mb-3">{data.professionalTitle || 'Software Engineer'}</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400">
          {data.email && <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>{data.email}</span>}
          {data.phone && <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>{data.phone}</span>}
          {data.location && <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>{data.location}</span>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm flex items-center">LinkedIn</a>}
          {data.portfolio && <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm flex items-center">GitHub/Portfolio</a>}
        </div>
      </header>

      {data.summary && (
        <section className="mb-6 pb-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-green-400 mb-3">> Summary</h3>
          <p className="text-gray-300 text-sm">{data.summary}</p>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-6 pb-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-green-400 mb-3">> Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-gray-800 text-blue-300 text-xs px-3 py-1 rounded-full border border-gray-700">
                {skill.name} {skill.proficiency && `(${skill.proficiency})`}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-6 pb-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-green-400 mb-3">> Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4 p-3 bg-gray-800 rounded-md border border-gray-700">
              <h4 className="text-lg font-semibold text-white">{exp.jobTitle || 'Job Title'} at {exp.company || 'Company'}</h4>
              <p className="text-sm text-gray-400 mb-1">{exp.startDate} - {exp.endDate} | {exp.location}</p>
              <p className="text-gray-300 text-xs">{exp.responsibilities}</p>
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xl font-bold text-green-400 mb-3">> Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4 p-3 bg-gray-800 rounded-md border border-gray-700">
              <h4 className="text-lg font-semibold text-white">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</h4>
              <p className="text-sm text-gray-400">{edu.university || 'University'}, {edu.location || 'Location'} ({edu.gradYear || 'Year'})</p>
            </div>
          ))}
        </section>
      )}

      {/* Placeholder for Projects - would require a new formData section */}
      {/*
      <section className="mb-6">
        <h3 className="text-xl font-bold text-green-400 mb-3">> Projects</h3>
        <div className="mb-4 p-3 bg-gray-800 rounded-md border border-gray-700">
          <h4 className="text-lg font-semibold text-white">Project Name</h4>
          <p className="text-sm text-gray-400 mb-1">Technologies: React, Node.js, MongoDB</p>
          <p className="text-gray-300 text-xs">Description of the project and your role.</p>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-xs">View Project</a>
        </div>
      </section>
      */}
    </div>
  );
};

export default DeveloperTemplate;
