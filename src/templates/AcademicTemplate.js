import React from 'react';

const AcademicTemplate = ({ data }) => {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg border border-gray-200 font-serif text-gray-900 max-w-[595px] mx-auto min-h-[842px]">
      <header className="text-center mb-8 pb-4 border-b-2 border-gray-600">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{data.fullName || 'Your Name'}</h1>
        <p className="text-xl text-gray-700 mb-3">{data.professionalTitle || 'Academic Researcher'}</p>
        <div className="text-sm text-gray-600">
          {data.email && <span className="mx-2">{data.email}</span>} |
          {data.phone && <span className="mx-2">{data.phone}</span>} |
          {data.location && <span className="mx-2">{data.location}</span>}
          {data.linkedin && <span className="mx-2">| <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a></span>}
          {data.portfolio && <span className="mx-2">| <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Website</a></span>}
        </div>
      </header>

      {data.summary && (
        <section className="mb-6">
          <h3 className="text-2xl font-bold text-gray-700 mb-3 border-b border-gray-400 pb-1">Research Interests</h3>
          <p className="text-gray-800 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-2xl font-bold text-gray-700 mb-3 border-b border-gray-400 pb-1">Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</h4>
              <p className="text-base text-gray-700">{edu.university || 'University Name'}, {edu.location || 'Location'}</p>
              <p className="text-sm text-gray-600">Graduation: {edu.gradYear || 'Year'}</p>
            </div>
          ))}
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-2xl font-bold text-gray-700 mb-3 border-b border-gray-400 pb-1">Academic / Research Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800">{exp.jobTitle || 'Research Assistant'} at {exp.company || 'University Department'}</h4>
              <p className="text-sm text-gray-600 mb-1">{exp.startDate} - {exp.endDate} | {exp.location}</p>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                <li>{exp.responsibilities}</li>
                {/* You might add specific fields for publications/projects here in your form data */}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Placeholder for Publications - would require a new formData section */}
      {/*
      <section className="mb-6">
        <h3 className="text-2xl font-bold text-gray-700 mb-3 border-b border-gray-400 pb-1">Publications</h3>
        <ul className="list-disc list-outside ml-4 text-gray-800 text-sm">
          <li>Author, A. B., & Author, C. D. (Year). Title of the publication. <i>Journal Name, Volume</i>(Issue), pages.</li>
        </ul>
      </section>
      */}

      {data.skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-2xl font-bold text-gray-700 mb-3 border-b border-gray-400 pb-1">Skills & Tools</h3>
          <p className="text-gray-700 text-sm">
            {data.skills.map(skill => skill.name).join(', ')}
          </p>
        </section>
      )}
    </div>
  );
};

export default AcademicTemplate;
