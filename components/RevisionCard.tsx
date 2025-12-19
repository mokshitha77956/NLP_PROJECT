
import React from 'react';
import { SummaryResult } from '../types';

interface RevisionCardProps {
  summary: SummaryResult;
}

const RevisionCard: React.FC<RevisionCardProps> = ({ summary }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Overview Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
          <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </span>
          Lesson Overview
        </h3>
        <p className="text-slate-600 leading-relaxed text-lg">
          {summary.overview}
        </p>
      </section>

      {/* Key Points Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <span className="bg-emerald-100 text-emerald-600 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </span>
          Essential Revision Points
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summary.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                {index + 1}
              </span>
              <span className="text-slate-700 font-medium">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Vocabulary Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <span className="bg-amber-100 text-amber-600 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10.392c1.057-.514 2.245-.804 3.5-.804 1.333 0 2.594.33 3.71.917A7.966 7.966 0 0114.5 14.5c1.255 0 2.443.29 3.5.804V4.804A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </span>
          Key Concepts & Definitions
        </h3>
        <div className="space-y-4">
          {summary.definitions.map((def, index) => (
            <div key={index} className="border-l-4 border-amber-400 pl-4 py-2">
              <dt className="text-lg font-bold text-slate-900">{def.term}</dt>
              <dd className="text-slate-600 mt-1 italic">{def.meaning}</dd>
            </div>
          ))}
        </div>
      </section>

      {/* Takeaway Section */}
      <section className="bg-indigo-600 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Exam Ready: Final Takeaway
          </h3>
          <p className="text-indigo-100 text-xl font-medium leading-relaxed italic">
            "{summary.examTakeaway}"
          </p>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

export default RevisionCard;
