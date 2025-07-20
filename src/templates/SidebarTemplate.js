import React from 'react';

const SidebarTemplate = ({ data }) => {
  return (
    <div className="p-0 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[842px] max-w-[595px] mx-auto border border-gray-200"> {/* A4 dimensions for preview */}
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 bg-gray-800 text-white p-6 flex flex-col items-center text-center">
        {data.photoPreview && (
          <img src={data.photoPreview} alt="Profile" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-gray-600 shadow-md" />
        )}
        <h1 className="text-3xl font-bold mb-1">{data.fullName || 'Your Name'}</h1>
        <h2 className="text-xl font-light text-blue-300 mb-4">{data.professionalTitle || 'Professional Title'}</h2>

        <div className="w-full border-t border-gray-700 pt-4 mb-4">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Contact</h3>
          <p className="text-sm">{data.email}</p>
          <p className="text-sm">{data.phone}</p>
          <p className="text-sm mb-2">{data.location}</p>
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline text-sm block">LinkedIn</a>}
          {data.portfolio && <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline text-sm block">Portfolio</a>}
        </div>

        {data.skills.length > 0 && (
          <div className="w-full border-t border-gray-700 pt-4 mt-auto"> {/* mt-auto pushes skills to bottom if content is short */}
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Skills</h3>
            <ul className="list-none p-0">
              {data.skills.map((skill, index) => (
                <li key={index} className="text-sm mb-1">
                  {skill.name} {skill.proficiency && `(${skill.proficiency})`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Content Area */}
      <div className="w-full md:w-2/3 p-6 bg-white text-gray-800">
        {data.summary && (
          <section className="mb-6 pb-4 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-700 mb-3">Summary</h3>
            <p className="text-gray-700 leading-relaxed text-sm">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-6 pb-4 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-700 mb-3">Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800">{exp.jobTitle || 'Job Title'}</h4>
                <p className="text-sm text-gray-600">{exp.company || 'Company Name'}, {exp.location || 'Location'}</p>
                <p className="text-xs text-gray-500 mb-1">{exp.startDate} - {exp.endDate}</p>
                <p className="text-gray-700 text-sm">{exp.responsibilities}</p>
              </div>
            ))}
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-6">
            <h3 className="text-2xl font-bold text-gray-700 mb-3">Education</h3>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</h4>
                <p className="text-sm text-gray-600">{edu.university || 'University Name'}, {edu.location || 'Location'}</p>
                <p className="text-xs text-gray-500">Graduation: {edu.gradYear || 'Year'}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default SidebarTemplate;
