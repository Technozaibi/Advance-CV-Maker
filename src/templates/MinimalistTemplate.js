import React from 'react';

const MinimalistTemplate = ({ data }) => {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg font-sans text-gray-800 border border-gray-100 max-w-[595px] mx-auto min-h-[842px]"> {/* A4 dimensions for preview */}
      {/* Header - Name and Title */}
      <header className="mb-8 pb-4 border-b border-gray-300">
        <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-1">{data.fullName || 'Your Name'}</h1>
        <h2 className="text-xl text-gray-700 font-normal">{data.professionalTitle || 'Professional Title'}</h2>
      </header>

      {/* Contact Information & Photo (optional, small) */}
      <section className="mb-8 flex flex-col md:flex-row md:items-center gap-4 border-b border-gray-200 pb-4">
        <div className="flex-grow">
          <p className="text-sm mb-1">{data.email}</p>
          <p className="text-sm mb-1">{data.phone}</p>
          <p className="text-sm mb-1">{data.location}</p>
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm block">LinkedIn</a>}
          {data.portfolio && <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm block">Portfolio</a>}
        </div>
        {data.photoPreview && (
          <img src={data.photoPreview} alt="Profile" className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm flex-shrink-0" />
        )}
      </section>

      {/* Summary */}
      {data.summary && (
        <section className="mb-8 pb-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Summary</h3>
          <p className="text-gray-700 leading-relaxed text-base">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8 pb-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-5">
              <h4 className="text-lg font-semibold text-gray-800">{exp.jobTitle || 'Job Title'}</h4>
              <p className="text-base text-gray-700">{exp.company || 'Company Name'} | {exp.location || 'Location'}</p>
              <p className="text-sm text-gray-500 mb-2">{exp.startDate} - {exp.endDate}</p>
              <p className="text-gray-700 text-sm leading-snug">{exp.responsibilities}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8 pb-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-5">
              <h4 className="text-lg font-semibold text-gray-800">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</h4>
              <p className="text-base text-gray-700">{edu.university || 'University Name'} | {edu.location || 'Location'}</p>
              <p className="text-sm text-gray-500">Graduation: {edu.gradYear || 'Year'}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-700">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 rounded-md border border-gray-200">
                {skill.name} {skill.proficiency && `(${skill.proficiency})`}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalistTemplate;
