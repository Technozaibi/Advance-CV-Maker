import React from 'react';

const CreativeTemplate = ({ data }) => {
  return (
    <div className="p-8 bg-blue-50 shadow-lg rounded-lg border border-blue-200 text-gray-800">
      <header className="text-center mb-8 pb-6 border-b-2 border-blue-300">
        {data.photoPreview && (
          <img src={data.photoPreview} alt="Profile" className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-500 shadow-lg" />
        )}
        <h1 className="text-5xl font-extrabold text-blue-700 mb-2 tracking-wide">{data.fullName || 'Your Name'}</h1>
        <h2 className="text-2xl text-blue-600 font-light mb-3">{data.professionalTitle || 'Professional Title'}</h2>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          {data.email && <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>{data.email}</span>}
          {data.phone && <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>{data.phone}</span>}
          {data.location && <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>{data.location}</span>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>LinkedIn</a>}
          {data.portfolio && <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1-3a1 1 0 00-1 1v.01H6V7a1 1 0 001-1h6a1 1 0 100-2H7a1 1 0 00-1 1zm0 7a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>Portfolio</a>}
        </div>
      </header>
      {data.summary && (
        <section className="mb-6">
          <h3 className="text-2xl font-bold text-blue-700 mb-3">About Me</h3>
          <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
        </section>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.experience.length > 0 && (
          <section className="mb-6">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4 p-3 border-l-4 border-blue-400 pl-4 bg-white rounded-md shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800">{exp.jobTitle || 'Job Title'}</h4>
                <p className="text-lg text-gray-700">{exp.company || 'Company Name'}, {exp.location || 'Location'}</p>
                <p className="text-sm text-gray-600 mb-1">{exp.startDate} - {exp.endDate}</p>
                <p className="text-gray-700 text-sm">{exp.responsibilities}</p>
              </div>
            ))}
          </section>
        )}
        <div>
          {data.education.length > 0 && (
            <section className="mb-6">
              <h3 className="text-2xl font-bold text-blue-700 mb-3">Education</h3>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4 p-3 border-l-4 border-blue-400 pl-4 bg-white rounded-md shadow-sm">
                  <h4 className="text-xl font-semibold text-gray-800">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</h4>
                  <p className="text-lg text-gray-700">{edu.university || 'University Name'}, {edu.location || 'Location'}</p>
                  <p className="text-sm text-gray-600 mb-1">Graduation: {edu.gradYear || 'Year'}</p>
                </div>
              ))}
            </section>
          )}
          {data.skills.length > 0 && (
            <section className="mb-6">
              <h3 className="text-2xl font-bold text-blue-700 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md">
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

export default CreativeTemplate;
