const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ArticleRequest {
  topic: string;
  creatorName: string;
  previousBlog?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { topic, creatorName, previousBlog }: ArticleRequest = await req.json();

    if (!topic || !creatorName) {
      return new Response(
        JSON.stringify({ error: "Topic and creator name are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const styleAnalysis = previousBlog
      ? `\n\nStyle Reference: Analyze and match the writing style from this previous content: ${previousBlog.substring(0, 1000)}`
      : "";

    const mockContent = `<div class="article-content">
  <div class="mb-8">
    <h1 class="text-4xl font-bold mb-2 text-white">${topic}</h1>
    <p class="text-gray-400 text-sm">By ${creatorName} • ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
  </div>
  
  <div class="prose prose-lg max-w-none">
    <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-500 p-6 rounded-r-lg mb-8">
      <p class="text-lg leading-relaxed text-gray-200">
        In today's rapidly evolving digital landscape, understanding <strong>${topic.toLowerCase()}</strong> has become more crucial than ever. This comprehensive guide will explore the key aspects, benefits, and practical applications that are shaping the future of this exciting field.
      </p>
    </div>
    
    <h2 class="text-3xl font-bold mt-12 mb-4 text-cyan-400">Understanding the Fundamentals</h2>
    <p class="text-gray-300 leading-relaxed mb-6">
      Before diving deep into the specifics, it's essential to grasp the foundational concepts that drive this domain. The core principles are rooted in innovation, accessibility, and real-world impact. These elements work together to create solutions that not only solve problems but transform entire industries.
    </p>
    <p class="text-gray-300 leading-relaxed mb-6">
      The evolution of this field has been remarkable. What started as a niche area has now become a cornerstone of modern technology and innovation. Understanding these fundamentals will give you the foundation needed to excel in this space.
    </p>
    
    <h3 class="text-2xl font-semibold mt-8 mb-4 text-blue-400">Key Components to Consider</h3>
    <ul class="space-y-3 mb-8">
      <li class="flex items-start gap-3">
        <span class="text-cyan-400 mt-1.5">→</span>
        <span class="text-gray-300"><strong>Strategic Implementation:</strong> A well-planned approach ensures smooth adoption and long-term success</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-cyan-400 mt-1.5">→</span>
        <span class="text-gray-300"><strong>Best Practices:</strong> Following proven methodologies reduces risk and accelerates results</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-cyan-400 mt-1.5">→</span>
        <span class="text-gray-300"><strong>Challenge Management:</strong> Anticipating obstacles helps teams stay agile and responsive</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-cyan-400 mt-1.5">→</span>
        <span class="text-gray-300"><strong>Future Readiness:</strong> Staying ahead of trends positions you for continued innovation</span>
      </li>
    </ul>
    
    <h2 class="text-3xl font-bold mt-12 mb-4 text-cyan-400">Practical Applications in the Real World</h2>
    <p class="text-gray-300 leading-relaxed mb-6">
      Real-world implementation requires careful planning, execution, and continuous refinement. Organizations across industries have demonstrated that success comes from combining theoretical knowledge with practical application.
    </p>
    
    <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6 my-8">
      <h3 class="text-xl font-semibold mb-4 text-blue-400">💡 Case Study Insight</h3>
      <p class="text-gray-300 leading-relaxed">
        Organizations worldwide have leveraged these principles to achieve remarkable results. From innovative startups disrupting traditional markets to established enterprises transforming their operations, the applications are both diverse and impactful. Success stories share common threads: clear vision, adaptable execution, and commitment to continuous improvement.
      </p>
    </div>
    
    <h2 class="text-3xl font-bold mt-12 mb-4 text-cyan-400">Best Practices and Expert Recommendations</h2>
    <p class="text-gray-300 leading-relaxed mb-6">
      Drawing from extensive industry experience and research, here are the most effective approaches that consistently deliver results:
    </p>
    
    <ol class="space-y-4 mb-8">
      <li class="flex items-start gap-4">
        <span class="flex-shrink-0 w-8 h-8 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center font-bold">1</span>
        <div>
          <strong class="text-white block mb-1">Start with Clear Objectives</strong>
          <span class="text-gray-300">Define what success looks like before implementation. Clear goals provide direction and enable meaningful progress tracking.</span>
        </div>
      </li>
      <li class="flex items-start gap-4">
        <span class="flex-shrink-0 w-8 h-8 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center font-bold">2</span>
        <div>
          <strong class="text-white block mb-1">Embrace Iterative Improvement</strong>
          <span class="text-gray-300">Continuous refinement and adaptation lead to optimal results. Build feedback loops into your process.</span>
        </div>
      </li>
      <li class="flex items-start gap-4">
        <span class="flex-shrink-0 w-8 h-8 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center font-bold">3</span>
        <div>
          <strong class="text-white block mb-1">Measure and Analyze</strong>
          <span class="text-gray-300">Data-driven decisions create sustainable outcomes. Track key metrics and adjust based on insights.</span>
        </div>
      </li>
      <li class="flex items-start gap-4">
        <span class="flex-shrink-0 w-8 h-8 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center font-bold">4</span>
        <div>
          <strong class="text-white block mb-1">Stay Adaptable</strong>
          <span class="text-gray-300">Flexibility is key in dynamic environments. Be ready to pivot when circumstances change.</span>
        </div>
      </li>
    </ol>
    
    <h2 class="text-3xl font-bold mt-12 mb-4 text-cyan-400">Overcoming Common Challenges</h2>
    <p class="text-gray-300 leading-relaxed mb-6">
      Every implementation journey faces obstacles. Understanding these challenges in advance helps teams prepare effective mitigation strategies and avoid common pitfalls.
    </p>
    <p class="text-gray-300 leading-relaxed mb-6">
      The most successful teams are those that view challenges as learning opportunities. They build resilience through preparation, maintain open communication channels, and foster a culture of problem-solving. When issues arise, they address them quickly and extract valuable lessons for future improvements.
    </p>
    
    <h2 class="text-3xl font-bold mt-12 mb-4 text-cyan-400">Future Outlook and Emerging Trends</h2>
    <p class="text-gray-300 leading-relaxed mb-6">
      The landscape continues to evolve at an unprecedented pace. Emerging technologies, new methodologies, and shifting market dynamics promise even greater possibilities for innovation and growth. Those who stay informed and adaptable will be best positioned to capitalize on these opportunities.
    </p>
    <p class="text-gray-300 leading-relaxed mb-6">
      Looking ahead, we can expect continued advancement in capabilities, broader adoption across industries, and increasingly sophisticated applications. The key is to remain curious, continue learning, and be willing to experiment with new approaches.
    </p>
    
    <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-8 my-12">
      <h2 class="text-3xl font-bold mb-4 text-white">Conclusion</h2>
      <p class="text-gray-300 leading-relaxed mb-6">
        As we've explored throughout this comprehensive guide, <strong>${topic.toLowerCase()}</strong> represents a significant opportunity for those willing to embrace change and innovation. By following the strategies, best practices, and recommendations outlined here, you'll be well-positioned to achieve meaningful success.
      </p>
      <p class="text-gray-300 leading-relaxed mb-6">
        The journey may present challenges, but with the right mindset, tools, and approach, you can navigate them successfully. Remember that continuous learning and adaptation are your greatest assets in this dynamic field.
      </p>
      <p class="text-lg font-semibold text-cyan-400">
        ✨ Ready to take the next step? Start implementing these insights today and join the growing community of forward-thinking professionals making a real difference.
      </p>
    </div>
  </div>
</div>`;

    const suggestedTopics = [
      `Advanced Techniques in ${topic}`,
      `${topic}: A Beginner's Complete Guide`,
      `The Future of ${topic} in 2025`,
      `Common Mistakes to Avoid in ${topic}`,
      `${topic} vs Traditional Approaches: A Comparison`,
    ];

    return new Response(
      JSON.stringify({
        content: mockContent,
        suggestedTopics,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating article:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate article" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});