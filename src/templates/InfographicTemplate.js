import React from 'react';

const InfographicTemplate = ({ data }) => {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg border border-gray-200 text-gray-800 font-sans max-w-[595px] mx-auto min-h-[842px]">
      <div className="flex flex-col md:flex-row items-center md:justify-between mb-8 pb-4 border-b-2 border-indigo-400">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-1">{data.fullName || 'Your Name'}</h1>
          <h2 className="text-xl text-indigo-700 font-semibold">{data.professionalTitle || 'Professional Title'}</h2>
        </div>
        {data.photoPreview && (
          <img src={data.photoPreview} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-indigo-300 shadow-md" />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column for Contact & Skills */}
        <div className="md:col-span-1">
          <section className="mb-6 p-4 bg-indigo-50 rounded-lg">
            <h3 className="text-lg font-bold text-indigo-800 mb-3 border-b border-indigo-200 pb-2">Contact</h3>
            <p className="text-sm mb-1">{data.email}</p>
            <p className="text-sm mb-1">{data.phone}</p>
            <p className="text-sm mb-1">{data.location}</p>
            {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm block">LinkedIn Profile</a>}
            {data.portfolio && <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm block">Portfolio</a>}
          </section>

          {data.skills.length > 0 && (
            <section className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-lg font-bold text-indigo-800 mb-3 border-b border-indigo-200 pb-2">Skills</h3>
              <div className="flex flex-col gap-2">
                {data.skills.map((skill, index) => (
                  <div key={index}>
                    <p className="text-sm font-medium text-gray-700">{skill.name}</p>
                    {skill.proficiency && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${skill.proficiency === 'Expert' ? 100 : skill.proficiency === 'Advanced' ? 75 : skill.proficiency === 'Intermediate' ? 50 : 25}%` }}></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Columns for Summary, Experience, Education */}
        <div className="md:col-span-2">
          {data.summary && (
            <section className="mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-700 mb-3">Summary</h3>
              <p className="text-gray-700 leading-relaxed text-sm">{data.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section className="mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-700 mb-3">Experience</h3>
              <div className="relative border-l-2 border-indigo-400 pl-4">
                {data.experience.map((exp, index) => (
                  <div key={index} className="mb-6 relative">
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white"></div>
                    <h4 className="text-lg font-semibold text-gray-800">{exp.jobTitle || 'Job Title'} at {exp.company || 'Company Name'}</h4>
                    <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate} | {exp.location}</p>
                    <p className="text-gray-700 text-sm mt-1">{exp.responsibilities}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section className="mb-6">
              <h3 className="text-2xl font-bold text-gray-700 mb-3">Education</h3>
              <div className="relative border-l-2 border-indigo-400 pl-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="mb-4 relative">
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white"></div>
                    <h4 className="text-lg font-semibold text-gray-800">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</h4>
                    <p className="text-sm text-gray-600">{edu.university || 'University Name'}, {edu.location || 'Location'} ({edu.gradYear || 'Year'})</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfographicTemplate;
