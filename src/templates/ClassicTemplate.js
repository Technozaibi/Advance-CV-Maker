import React from 'react';

const ClassicTemplate = ({ data }) => {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg font-serif text-gray-800 border border-gray-200">
      <header className="text-center mb-8 pb-4 border-b border-gray-300">
        <h1 className="text-4xl font-bold mb-2">{data.fullName || 'Your Name'}</h1>
        <p className="text-lg text-gray-700">{data.professionalTitle || 'Professional Title'}</p>
        <p className="text-sm text-gray-600 mt-2">
          {data.email && <span className="mx-2">{data.email}</span>} | {data.phone && <span className="mx-2">{data.phone}</span>} | {data.location && <span className="mx-2">{data.location}</span>}
          {data.linkedin && <span className="mx-2">| <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn</a></span>}
          {data.portfolio && <span className="mx-2">| <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Portfolio</a></span>}
        </p>
      </header>
      {data.summary && (
        <section className="mb-6">
          <h3 className="text-xl font-bold text-blue-700 mb-2 border-b-2 border-blue-700 pb-1">Summary</h3>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xl font-bold text-blue-700 mb-2 border-b-2 border-blue-700 pb-1">Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold">{exp.jobTitle || 'Job Title'}</h4>
              <p className="text-gray-700">{exp.company || 'Company Name'}, {exp.location || 'Location'} | {exp.startDate} - {exp.endDate}</p>
              <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                <li>{exp.responsibilities}</li>
              </ul>
            </div>
          ))}
        </section>
      )}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xl font-bold text-blue-700 mb-2 border-b-2 border-blue-700 pb-1">Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</h4>
              <p className="text-gray-700">{edu.university || 'University Name'}, {edu.location || 'Location'} ({edu.gradYear || 'Year'})</p>
            </div>
          ))}
        </section>
      )}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xl font-bold text-blue-700 mb-2 border-b-2 border-blue-700 pb-1">Skills</h3>
          <p className="text-gray-700">
            {data.skills.map(skill => skill.name).join(', ')}
          </p>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
