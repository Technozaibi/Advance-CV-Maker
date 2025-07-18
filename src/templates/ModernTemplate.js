import React from 'react';

const ModernTemplate = ({ data }) => {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8 pb-4 border-b border-gray-300">
        {data.photoPreview && (
          <img src={data.photoPreview} alt="Profile" className="w-28 h-28 rounded-full object-cover mr-0 md:mr-6 mb-4 md:mb-0 border-4 border-blue-400 shadow-md" />
        )}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-1">{data.fullName || 'Your Name'}</h1>
          <h2 className="text-xl text-blue-600 font-semibold mb-2">{data.professionalTitle || 'Professional Title'}</h2>
          <p className="text-gray-600 text-sm">
            {data.email && <span className="mr-4">{data.email}</span>}
            {data.phone && <span className="mr-4">{data.phone}</span>}
            {data.location && <span className="mr-4">{data.location}</span>}
            {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mr-4">LinkedIn</a>}
            {data.portfolio && <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Portfolio</a>}
          </p>
        </div>
      </div>
      {data.summary && (
        <section className="mb-6 pb-4 border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Summary</h3>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}
      {data.experience.length > 0 && (
        <section className="mb-6 pb-4 border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800">{exp.jobTitle || 'Job Title'} at {exp.company || 'Company Name'}</h4>
              <p className="text-sm text-gray-600 mb-1">{exp.startDate} - {exp.endDate} | {exp.location}</p>
              <p className="text-gray-700 text-sm">{exp.responsibilities}</p>
            </div>
          ))}
        </section>
      )}
      {data.education.length > 0 && (
        <section className="mb-6 pb-4 border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</h4>
              <p className="text-sm text-gray-600 mb-1">{edu.university || 'University Name'}, {edu.location || 'Location'} ({edu.gradYear || 'Year'})</p>
            </div>
          ))}
        </section>
      )}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {skill.name} {skill.proficiency && `(${skill.proficiency})`}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
