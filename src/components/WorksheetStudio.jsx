import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  Sparkles, 
  QrCode, 
  FileText, 
  Layers, 
  Check, 
  RefreshCw,
  Plus
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { WORKSHEET_TEMPLATES } from '../data/flnWorksheets';

export default function WorksheetStudio({ customWorksheetItems }) {
  const [selectedTemplate, setSelectedTemplate] = useState('tracing_olchiki');
  const [schoolName, setSchoolName] = useState('राजकीय प्राथमिक विद्यालय, दुमका (झारखंड)');
  const [gradeLevel, setGradeLevel] = useState('कक्षा 1 (Grade 1)');
  const [worksheetDate, setWorksheetDate] = useState(new Date().toLocaleDateString('hi-IN'));
  const [isPrinting, setIsPrinting] = useState(false);

  const currentTemplate = WORKSHEET_TEMPLATES.find(t => t.id === selectedTemplate) || WORKSHEET_TEMPLATES[0];

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Studio Header & Controls (Hidden in Print) */}
      <div className="bg-[#fffdf5] border border-[#d2ccc6] rounded-3xl p-6 shadow-xl no-print space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e8e6e3] pb-4">
          <div>
            <span className="text-[#6a9c30] text-xs font-bold uppercase tracking-wider">
              PALASH Smart Worksheet Studio
            </span>
            <h2 className="text-2xl font-bold text-[#141b1f]">
              प्रिंट-रेडी संताली वर्कशीट जेनरेटर (A4 Printable Worksheets)
            </h2>
            <p className="text-[#516c7b] text-xs mt-1">
              एक टैबलेट की सीमा को पार करें — पूरी कक्षा (30 बच्चों) के लिए 45 सेकंड में हस्तलिखित गतिविधि पत्र तैयार करें।
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#e1ec13] hover:bg-[#edf471] text-[#141b1f] font-bold text-sm shadow-lg shadow-[#b4bd0f]/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-950" />
            <span>वर्कशीट प्रिंट करें (Print A4 PDF)</span>
          </button>
        </div>

        {/* Template Selector */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-[#3c515d] uppercase tracking-wider">
            वर्कशीट प्रकार चुनें (Select Activity Template):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {WORKSHEET_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedTemplate === tmpl.id
                    ? 'bg-[#fcfde7] border-[#b4bd0f] text-[#141b1f] shadow-md'
                    : 'bg-white border-[#e0e7eb] text-[#3c515d] hover:border-[#a2b7c3]'
                }`}
              >
                <div className="font-bold text-sm">{tmpl.title}</div>
                <div className="text-[11px] text-[#65889a] mt-1">{tmpl.theme} • {tmpl.grade}</div>
              </button>
            ))}
          </div>
        </div>

        {/* School & Header Customizer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="text-[11px] font-semibold text-[#516c7b] block mb-1">विद्यालय का नाम (School Name):</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full bg-white border border-[#c1cfd7] rounded-lg px-3 py-2 text-xs text-[#141b1f] focus:outline-none focus:border-[#4f72dc]"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-[#516c7b] block mb-1">कक्षा / स्तर (Grade Level):</label>
            <input
              type="text"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full bg-white border border-[#c1cfd7] rounded-lg px-3 py-2 text-xs text-[#141b1f] focus:outline-none focus:border-[#4f72dc]"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-[#516c7b] block mb-1">दिनांक (Date):</label>
            <input
              type="text"
              value={worksheetDate}
              onChange={(e) => setWorksheetDate(e.target.value)}
              className="w-full bg-white border border-[#c1cfd7] rounded-lg px-3 py-2 text-xs text-[#141b1f] focus:outline-none focus:border-[#4f72dc]"
            />
          </div>
        </div>

      </div>

      {/* THE PRINTABLE A4 WORKSHEET SHEET (What physically gets printed) */}
      <div className="worksheet-a4 bg-white text-slate-900 border-2 border-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl mx-auto max-w-3xl font-sans relative">
        
        {/* Header Ribbon */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xs uppercase bg-slate-900 text-white px-2 py-0.5 rounded">
                PALASH FLN
              </span>
              <span className="text-xs font-bold text-slate-700">
                झारखंड प्राथमिक शिक्षा परियोजना (JEPC)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              {schoolName}
            </h1>
            <div className="text-xs font-semibold text-slate-600 flex space-x-4 pt-1">
              <span>स्तर: <strong>{gradeLevel}</strong></span>
              <span>•</span>
              <span>दिनांक: <strong>{worksheetDate}</strong></span>
              <span>•</span>
              <span>विषय: <strong>संताली मातृभाषा (Ol Chiki)</strong></span>
            </div>
          </div>

          {/* Scannable Offline QR Code with Explanatory Tag */}
          <div className="flex flex-col items-center bg-slate-50 border border-slate-300 p-2 rounded-lg text-center">
            <QRCodeSVG
              value={`https://vaanisaathi.jepc.jharkhand.gov.in/lesson/${selectedTemplate}`}
              size={68}
              level="M"
            />
            <span className="text-[9px] font-black text-slate-800 uppercase tracking-tighter mt-1 flex items-center">
              <QrCode className="w-2.5 h-2.5 mr-0.5" />
              ऑडियो सुनें (QR)
            </span>
          </div>
        </div>

        {/* Student Name Box */}
        <div className="grid grid-cols-2 gap-4 border border-slate-300 p-2.5 rounded-lg mb-6 text-xs font-medium text-slate-700 bg-slate-50/50">
          <div>विद्यार्थी का नाम (Student Name): ________________________</div>
          <div>रोल नंबर (Roll No.): _________</div>
        </div>

        {/* Template Title & Instructions */}
        <div className="mb-6 space-y-1 bg-amber-50/60 border border-amber-200/80 p-3.5 rounded-xl">
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <span>अभ्यास: {currentTemplate.title}</span>
          </h2>
          <p className="text-xs text-slate-700 font-medium">
            <strong>निर्देश:</strong> {currentTemplate.exerciseText}
          </p>
        </div>

        {/* DYNAMIC CONTENT DEPENDING ON TEMPLATE */}
        
        {/* Template 1: Ol Chiki Tracing */}
        {selectedTemplate === 'tracing_olchiki' && (
          <div className="space-y-6">
            
            {/* Visual Header Box */}
            <div className="flex items-center justify-around border-2 border-dashed border-slate-300 p-4 rounded-2xl text-center">
              <div>
                <div className="text-6xl font-olchiki font-bold text-slate-900">ᱪ</div>
                <div className="text-xs font-bold text-slate-600 mt-1">अक्षर: UCH (ᱪ)</div>
              </div>
              <div className="text-4xl">🐦</div>
              <div>
                <div className="text-3xl font-olchiki font-extrabold text-slate-900">ᱪᱮᱬᱮ</div>
                <div className="text-xs font-bold text-slate-600">Chenre / चिड़िया</div>
              </div>
            </div>

            {/* Tracing Rows */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700">
                पेंसिल चलाकर अक्षर पूरा करो (Trace over dotted lines):
              </div>

              {currentTemplate.traceGrid.map((row, rIdx) => (
                <div key={rIdx} className="grid grid-cols-5 gap-3">
                  {row.map((ch, cIdx) => (
                    <div 
                      key={cIdx} 
                      className="h-16 border-2 border-dotted border-slate-400 rounded-xl flex items-center justify-center text-3xl font-olchiki text-slate-300 font-bold select-none hover:text-slate-400 transition-colors"
                    >
                      {ch}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Coloring / Drawing Space */}
            <div className="border border-slate-300 rounded-xl p-4 text-center h-28 flex flex-col items-center justify-center bg-slate-50/40">
              <span className="text-xs text-slate-500">
                [ खाली जगह: अपनी पसंदीदा चिड़िया का चित्र बनाओ और रंग भरो ]
              </span>
            </div>

          </div>
        )}

        {/* Template 2: Counting & Matching */}
        {selectedTemplate === 'counting_fln' && (
          <div className="space-y-4">
            <div className="space-y-3">
              {currentTemplate.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border border-slate-300 p-3.5 rounded-xl">
                  <div className="text-2xl tracking-widest">{item.icons}</div>
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-10 border-2 border-slate-400 border-dashed rounded-lg flex items-center justify-center font-olchiki font-bold text-lg text-slate-800">
                      {item.sa_num}
                    </div>
                    <div className="text-xs font-bold text-slate-600">
                      {item.hi_num}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Template 3: Bilingual Match */}
        {selectedTemplate === 'bilingual_match' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center border-b border-slate-300 pb-2 text-xs font-bold text-slate-600">
              <div>चित्र (Picture)</div>
              <div>हिंदी नाम (Hindi)</div>
              <div>संताली ओल चिकी (Santali)</div>
            </div>

            <div className="space-y-3">
              {currentTemplate.pairs.map((pair, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-4 items-center p-2.5 border border-slate-200 rounded-xl text-center">
                  <div className="text-3xl">{pair.icon}</div>
                  <div className="text-sm font-bold text-slate-800 border-x border-slate-200 py-1">
                    {pair.hindi}
                  </div>
                  <div className="text-base font-extrabold font-olchiki text-slate-900">
                    {pair.santali} <span className="text-[10px] font-sans font-normal text-slate-500">({pair.roman})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Notes for Parents / Teachers */}
        <div className="mt-8 pt-4 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500">
          <div>
            झारखंड पलाश कार्यक्रम (PALASH) • निपुण भारत मातृभाषा मिशन
          </div>
          <div>
            फोन से QR कोड स्कैन करें और घर पर संताली में सही उच्चारण सुनें।
          </div>
        </div>

      </div>

    </div>
  );
}
