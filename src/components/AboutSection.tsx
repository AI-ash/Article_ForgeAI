export default function AboutSection() {
  const skills = [
    'AI',
    'LLMs',
    'FastAPI',
    'LangChain',
    'Python',
    'Full-stack Development',
    'Voice-based Interfaces',
    'Web Automation',
    'Prompt Engineering',
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Expertise
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full text-cyan-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Currently pursuing B.Sc. Physical Science with Computer Science at ARSD College,
            I specialize in building intelligent systems that bridge the gap between humans and technology.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            My work focuses on AI assistant systems, with Jarvis being my flagship project — a
            modular voice-based assistant designed for real-time conversations and task automation.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            I experiment with modular AI architectures, voice-based automation, and web integration
            to create experiences that feel natural and intuitive. My approach combines deep technical
            knowledge with a passion for human-centered design.
          </p>
        </div>
      </div>
    </section>
  );
}
