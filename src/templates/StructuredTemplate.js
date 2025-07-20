import React from 'react';

const StructuredTemplate = ({ data }) => {
  return (
    <div className="p-0 bg-gray-100 shadow-lg rounded-lg border border-gray-300 font-sans text-gray-800 overflow-hidden max-w-[595px] mx-auto min-h-[842px]">
      {/* Header Section */}
      <div className="bg-gray-800 text-white p-6 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {data.photoPreview && (
            <img src={data.photoPreview} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-gray-600 shadow-md" />
          )}
          <div>
            <h1 className="text-4xl font-bold mb-1">{data.fullName || 'Your Name'}</h1>
            <h2 className="text-xl text-gray-300 font-light">{data.professionalTitle || 'Professional Title'}</h2>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-400 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {data.email && <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>{data.email}</span>}
          {data.phone && <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>{data.phone}</span>}
          {data.location && <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>{data.location}</span>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>}
          {data.portfolio && <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Portfolio</a>}
        </div>
      </div>

      <div className="p-6">
        {data.summary && (
          <section className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">Summary</h3>
            <p className="text-gray-700 leading-relaxed text-base">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                <h4 className="text-lg font-semibold text-gray-800">{exp.jobTitle || 'Job Title'} at {exp.company || 'Company Name'}</h4>
                <p className="text-sm text-gray-600 mb-1">{exp.startDate} - {exp.endDate} | {exp.location}</p>
                <p className="text-gray-700 text-sm">{exp.responsibilities}</p>
              </div>
            ))}
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">Education</h3>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                <h4 className="text-lg font-semibold text-gray-800">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</h4>
                <p className="text-sm text-gray-600 mb-1">{edu.university || 'University Name'}, {edu.location || 'Location'} ({edu.gradYear || 'Year'})</p>
              </div>
            ))}
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-md">
                  {skill.name} {skill.proficiency && `(${skill.proficiency})`}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default StructuredTemplate;
