import React from 'react';

const ProfessionalTemplate = ({ data }) => {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left Column - Contact & Skills */}
      <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
        {data.photoPreview && (
          <img src={data.photoPreview} alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border-4 border-gray-300 shadow-sm" />
        )}
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{data.fullName || 'Your Name'}</h2>
        <p className="text-center text-sm text-gray-600 mb-6">{data.professionalTitle || 'Professional Title'}</p>
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 border-b-2 border-gray-300 pb-1">Contact</h3>
          <p className="text-sm text-gray-700 mb-1">{data.email}</p>
          <p className="text-sm text-gray-700 mb-1">{data.phone}</p>
          <p className="text-sm text-gray-700 mb-1">{data.location}</p>
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm block mb-1">LinkedIn Profile</a>}
          {data.portfolio && <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm block">Portfolio</a>}
        </section>
        {data.skills.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 border-b-2 border-gray-300 pb-1">Skills</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {data.skills.map((skill, index) => (
                <li key={index}>{skill.name} {skill.proficiency && `(${skill.proficiency})`}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
      {/* Right Column - Summary, Experience, Education */}
      <div className="md:col-span-2 p-6">
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
                <h4 className="text-lg font-semibold text-gray-800">{exp.jobTitle || 'Job Title'}</h4>
                <p className="text-md text-gray-700">{exp.company || 'Company Name'}, {exp.location || 'Location'}</p>
                <p className="text-sm text-gray-600 mb-1">{exp.startDate} - {exp.endDate}</p>
                <p className="text-gray-700 text-sm">{exp.responsibilities}</p>
              </div>
            ))}
          </section>
        )}
        {data.education.length > 0 && (
          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">Education</h3>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</h4>
                <p className="text-md text-gray-700">{edu.university || 'University Name'}, {edu.location || 'Location'}</p>
                <p className="text-sm text-gray-600 mb-1">Graduation: {edu.gradYear || 'Year'}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
