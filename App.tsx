
import React, { useState, useRef } from 'react';
import { summarizeText } from './services/geminiService';
import { SummaryResult, RevisionMode } from './types';
import RevisionCard from './components/RevisionCard';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<RevisionMode>('concise');
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSummarize = async () => {
    if (!inputText.trim() || inputText.length < 50) {
      setError("Please provide at least 50 characters of text to summarize.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const summary = await summarizeText(inputText, mode);
      setResult(summary);
      
      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError("Failed to generate summary. Please try again with different content.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setInputText(text);
      };
      reader.readAsText(file);
    }
  };

  const reset = () => {
    setInputText('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <header className="pt-12 pb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          Smart Study <span className="text-indigo-600">Assistant</span>
        </h1>
        <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
          Transform lengthy lessons into concise, meaningful revision notes designed for exam success.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="space-y-8">
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 p-6 md:p-8">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Mode:</label>
              <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50">
                {(['concise', 'detailed', 'bullet-points'] as RevisionMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                      mode === m 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Text File
              </label>
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your long lesson, chapter summary or lecture notes here..."
            className="w-full min-h-[320px] p-6 text-slate-700 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all resize-none text-lg leading-relaxed shadow-inner placeholder:text-slate-400"
          />

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-center border border-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={handleSummarize}
              disabled={loading || !inputText}
              className={`w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center text-lg ${
                loading ? 'animate-pulse' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Notes...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Revision Summary
                </>
              )}
            </button>
            
            {result && (
              <button 
                onClick={reset}
                className="w-full sm:w-auto px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div ref={resultsRef} className="pt-8">
          {result && <RevisionCard summary={result} />}
        </div>
      </main>

      <footer className="mt-20 pt-10 border-t border-slate-200 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Smart Study Assistant. Built for efficient exam preparation.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <span className="hover:text-indigo-600 cursor-pointer transition-colors">Documentation</span>
          <span className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-indigo-600 cursor-pointer transition-colors">Support</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
