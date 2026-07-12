import React, { useState, useRef } from 'react';
import { Upload, Cpu, Sparkles, Tag, Star, BarChart2, CheckCircle, Image, RefreshCw, Zap } from 'lucide-react';

const MOCK_RESULTS = [
  {
    category: 'Electronics – Wearables',
    rating: 4.6,
    quality: 89,
    confidence: 94,
    tags: ['smartwatch', 'wearable', 'fitness-tracker', 'bluetooth', 'health-monitor', 'premium'],
    insights: [
      'High-quality product image with clean background detected',
      'Premium build quality inferred from visual cues',
      'Target audience: Tech-savvy fitness enthusiasts aged 25–40',
      'Competitive pricing range: ₹8,000–₹45,000',
    ]
  },
  {
    category: 'Fashion – Accessories',
    rating: 4.2,
    quality: 77,
    confidence: 87,
    tags: ['bag', 'fashion', 'accessories', 'casual', 'eco-friendly', 'canvas'],
    insights: [
      'Casual lifestyle product with broad appeal',
      'Sustainable material detected — eco positioning recommended',
      'Target audience: Young adults aged 18–35',
      'Competitive pricing range: ₹500–₹3,000',
    ]
  },
];

export default function AIProductAnalyzer() {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file?.type.startsWith('image/')) return;
    setImage(file);
    setImageURL(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const analyze = async () => {
    setAnalyzing(true);
    setStep(0);
    const steps = ['Preprocessing image…', 'Running visual classification…', 'Scoring quality metrics…', 'Generating tags…', 'Finalizing analysis…'];
    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise(r => setTimeout(r, 500));
    }
    setResult(MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)]);
    setAnalyzing(false);
  };

  const reset = () => { setImage(null); setImageURL(''); setResult(null); setStep(0); };

  const steps = ['Preprocessing image…', 'Running visual classification…', 'Scoring quality metrics…', 'Generating tags…', 'Finalizing analysis…'];

  return (
    <div className="p-6 lg:p-8">
      <div className="page-header">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-violet-600 rounded-xl flex items-center justify-center">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <h1 className="section-title">AI Product Analyzer</h1>
        </div>
        <p className="text-slate-500">Upload a product image and let AI predict category, rating, quality score, and suggested tags.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Panel */}
        <div className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => !image && fileRef.current?.click()}
            className={`relative border-2 border-dashed rounded-3xl transition-all duration-200 ${image ? 'border-primary-300 bg-primary-50/30 cursor-default' : 'border-slate-200 bg-surface-50 hover:border-primary-400 hover:bg-primary-50/20 cursor-pointer'}`}
            style={{ minHeight: 320 }}>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files[0])} />

            {!image ? (
              <div className="flex flex-col items-center justify-center h-80 gap-4 select-none">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary-500" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-slate-700">Drop image here or click to upload</p>
                  <p className="text-sm text-slate-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <img src={imageURL} alt="Product preview" className="w-full rounded-3xl object-contain max-h-80" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button onClick={reset} className="btn-secondary text-xs py-1.5 px-3 bg-white/90 backdrop-blur">
                    <RefreshCw className="w-3.5 h-3.5" /> Replace
                  </button>
                </div>
                {result && (
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-success bg-emerald-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" /> Analyzed
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {image && !result && (
            <button onClick={analyze} disabled={analyzing} className="btn-primary w-full py-3.5 text-base">
              {analyzing ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  {steps[step]}
                </div>
              ) : (
                <><Sparkles className="w-5 h-5" /> Analyze with AI</>
              )}
            </button>
          )}

          {analyzing && (
            <div className="card p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Analysis Progress</p>
              <div className="space-y-2">
                {steps.map((s, i) => (
                  <div key={s} className={`flex items-center gap-2 text-sm transition-all ${i < step ? 'text-emerald-600' : i === step ? 'text-primary-600 font-semibold' : 'text-slate-300'}`}>
                    {i < step ? <CheckCircle className="w-4 h-4" /> : i === step ? <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-200" />}
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!image && (
            <div className="card p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Try a sample image</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80',
                  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
                  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&q=80',
                  'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&q=80',
                ].map((url, i) => (
                  <button key={i} onClick={() => { setImageURL(url); setImage({ name: 'sample.jpg' }); }}
                    className="aspect-square rounded-xl overflow-hidden border-2 border-slate-100 hover:border-primary-400 transition-colors">
                    <img src={url} alt={`Sample ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div>
          {!result && !analyzing && (
            <div className="card p-8 h-full flex flex-col items-center justify-center text-center gap-4">
              <div className="w-16 h-16 bg-surface-100 rounded-2xl flex items-center justify-center">
                <Image className="w-8 h-8 text-slate-300" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-600 mb-1">No analysis yet</h3>
                <p className="text-sm text-slate-400">Upload a product image and click Analyze to see AI-powered insights.</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {/* Confidence Banner */}
              <div className="bg-gradient-to-r from-primary-600 to-violet-600 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-semibold text-primary-100">AI Confidence Score</span>
                </div>
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-black">{result.confidence}%</span>
                  <span className="text-primary-200 mb-1.5">High Confidence</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${result.confidence}%` }} />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-primary-500" />
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Predicted Category</p>
                  </div>
                  <p className="font-bold text-slate-900">{result.category}</p>
                </div>

                <div className="card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-amber-400" />
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Predicted Rating</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-slate-900 text-2xl">{result.rating}</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(result.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Score */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart2 className="w-4 h-4 text-emerald-500" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Quality Score</p>
                  <span className="ml-auto font-black text-slate-900 text-xl">{result.quality}/100</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ${result.quality >= 80 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : result.quality >= 60 ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`}
                    style={{ width: `${result.quality}%` }} />
                </div>
                <p className="text-xs text-slate-400 mt-1.5">{result.quality >= 80 ? 'Excellent quality — ready to list' : result.quality >= 60 ? 'Good quality — minor improvements suggested' : 'Needs improvement before listing'}</p>
              </div>

              {/* Tags */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-violet-500" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Suggested Tags</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-primary-50 text-primary-700 border border-primary-200 rounded-full text-xs font-semibold">#{tag}</span>
                  ))}
                </div>
              </div>

              {/* Insights */}
              <div className="card p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">AI Insights</p>
                <div className="space-y-2">
                  {result.insights.map((insight, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-slate-700">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={analyze} className="btn-secondary w-full text-sm">
                <RefreshCw className="w-4 h-4" /> Re-analyze
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
