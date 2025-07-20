import React from 'react';

const VibrantTemplate = ({ data }) => {
  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg rounded-lg border border-purple-200 text-gray-800 font-sans max-w-[595px] mx-auto min-h-[842px]">
      <header className="text-center mb-8 pb-6 border-b-2 border-purple-300">
        {data.photoPreview && (
          <img src={data.photoPreview} alt="Profile" className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-purple-500 shadow-xl" />
        )}
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-2 tracking-tight">{data.fullName || 'Your Name'}</h1>
        <h2 className="text-2xl text-purple-600 font-light mb-3">{data.professionalTitle || 'Passionate Professional'}</h2>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          {data.email && <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>{data.email}</span>}
          {data.phone && <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>{data.phone}</span>}
          {data.location && <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>{data.location}</span>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">LinkedIn</a>}
          {data.portfolio && <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">Portfolio</a>}
        </div>
      </header>

      {data.summary && (
        <section className="mb-6">
          <h3 className="text-2xl font-bold text-indigo-700 mb-3 border-b border-purple-200 pb-1">About Me</h3>
          <p className="text-gray-700 leading-relaxed text-base">{data.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.experience.length > 0 && (
          <section className="mb-6">
            <h3 className="text-2xl font-bold text-indigo-700 mb-3 border-b border-purple-200 pb-1">Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4 p-4 bg-white rounded-md shadow-sm border border-purple-100">
                <h4 className="text-xl font-semibold text-gray-800">{exp.jobTitle || 'Job Title'}</h4>
                <p className="text-md text-gray-700">{exp.company || 'Company Name'}, {exp.location || 'Location'}</p>
                <p className="text-sm text-gray-600 mb-1">{exp.startDate} - {exp.endDate}</p>
                <p className="text-gray-700 text-sm">{exp.responsibilities}</p>
              </div>
            ))}
          </section>
        )}

        <div>
          {data.education.length > 0 && (
            <section className="mb-6">
              <h3 className="text-2xl font-bold text-indigo-700 mb-3 border-b border-purple-200 pb-1">Education</h3>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4 p-4 bg-white rounded-md shadow-sm border border-purple-100">
                  <h4 className="text-xl font-semibold text-gray-800">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</h4>
                  <p className="text-md text-gray-700">{edu.university || 'University Name'}, {edu.location || 'Location'}</p>
                  <p className="text-sm text-gray-600 mb-1">Graduation: {edu.gradYear || 'Year'}</p>
                </div>
              ))}
            </section>
          )}

          {data.skills.length > 0 && (
            <section className="mb-6">
              <h3 className="text-2xl font-bold text-indigo-700 mb-3 border-b border-purple-200 pb-1">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill, index) => (
                  <span key={index} className="bg-purple-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default VibrantTemplate;
