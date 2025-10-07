import { useState } from 'react';
import { Sparkles, FileText, Loader2, TrendingUp, Image as ImageIcon, Download, Copy, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AnimatedBackground from '../components/AnimatedBackground';

interface GeneratedContent {
  content: string;
  suggestedTopics: string[];
}

export default function AI4s() {
  const [topic, setTopic] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [previousBlog, setPreviousBlog] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportHTML = () => {
    if (!generatedContent) return;
    const blob = new Blob([generatedContent.content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportMarkdown = () => {
    if (!generatedContent) return;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = generatedContent.content;

    let markdown = '';
    tempDiv.querySelectorAll('*').forEach((el) => {
      const tag = el.tagName.toLowerCase();
      const text = el.textContent || '';

      if (tag === 'h1') markdown += `# ${text}\n\n`;
      else if (tag === 'h2') markdown += `## ${text}\n\n`;
      else if (tag === 'h3') markdown += `### ${text}\n\n`;
      else if (tag === 'p' && !el.parentElement?.tagName.match(/LI|UL|OL/)) markdown += `${text}\n\n`;
      else if (tag === 'li') markdown += `- ${text}\n`;
      else if (tag === 'strong') markdown += `**${text}**`;
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerate = async () => {
    if (!topic.trim() || !creatorName.trim()) {
      alert('Please fill in at least the topic and creator name.');
      return;
    }

    setLoading(true);
    setGeneratedContent(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-article`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topic,
            creatorName,
            previousBlog: previousBlog.trim() || null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate article');
      }

      const data = await response.json();
      setGeneratedContent(data);

      await supabase.from('articles').insert({
        topic,
        creator_name: creatorName,
        content: data.content,
        previous_blog: previousBlog.trim() || null,
      });
    } catch (error) {
      console.error('Error generating article:', error);
      alert('Failed to generate article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 relative">
      <AnimatedBackground />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles size={40} className="text-cyan-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Article Generator
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Create humanized, SEO-optimized articles with AI-powered insights
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText size={24} className="text-cyan-400" />
                Article Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Topic / Title *
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., How AI is Reshaping Education"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Creator Name *
                  </label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder="Ashish Sharma"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Previous Blog URL or Content (Optional)
                  </label>
                  <textarea
                    value={previousBlog}
                    onChange={(e) => setPreviousBlog(e.target.value)}
                    placeholder="Paste a URL or content from a previous blog to maintain writing style..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 rounded-lg font-medium transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Generating Article...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Article
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2 text-cyan-400">
                <ImageIcon size={20} />
                What You'll Get
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Fully written, human-like blog article</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>SEO-optimized with proper structure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Formatted with headings and sections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Suggested topics for future articles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Consistent writing tone based on previous content</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText size={24} className="text-blue-400" />
                Generated Article
              </h2>

              {loading && (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <Loader2 size={48} className="animate-spin text-cyan-400 mb-4" />
                  <p>Creating your article...</p>
                </div>
              )}

              {!loading && !generatedContent && (
                <div className="text-center py-12 text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Your generated article will appear here</p>
                </div>
              )}

              {generatedContent && (
                <div className="space-y-6">
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={handleCopyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy HTML'}
                    </button>
                    <button
                      onClick={handleExportHTML}
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-sm font-medium transition-colors text-cyan-400"
                    >
                      <Download size={16} />
                      Export HTML
                    </button>
                    <button
                      onClick={handleExportMarkdown}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-sm font-medium transition-colors text-blue-400"
                    >
                      <Download size={16} />
                      Export MD
                    </button>
                  </div>
                  <div className="prose prose-invert max-w-none overflow-auto max-h-[600px]">
                    <div
                      className="text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: generatedContent.content }}
                    />
                  </div>

                  {generatedContent.suggestedTopics && generatedContent.suggestedTopics.length > 0 && (
                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="font-bold mb-3 flex items-center gap-2 text-cyan-400">
                        <TrendingUp size={20} />
                        Suggested Next Topics
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {generatedContent.suggestedTopics.map((suggestedTopic, index) => (
                          <button
                            key={index}
                            onClick={() => setTopic(suggestedTopic)}
                            className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
                          >
                            {suggestedTopic}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
