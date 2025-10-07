import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Groq from "https://esm.sh/groq-sdk";

// Define the CORS headers for your Vercel app
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://article-forge-ai.vercel.app",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface ArticleRequest {
  topic: string;
  creatorName: string;
  previousBlog?: string;
}

// This is our new, detailed style guide for the AI.
const systemPrompt = `
You are an expert content creator and web designer. Your task is to generate a visually appealing, well-structured, and SEO-optimized article.

**Output Requirements:**
- The entire output must be a single block of clean HTML, ready to be inserted into a div.
- Style the HTML exclusively with Tailwind CSS classes that match a modern, dark-themed website aesthetic.
- Use colors like 'text-white', 'text-gray-300', 'text-cyan-400', and 'text-blue-400'. Use backgrounds like 'bg-gray-800' or 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10'.
- Structure the article with a main title (h1), an author byline, and logical sections using h2 and h3 tags.
- Use Tailwind's typography classes (e.g., 'text-4xl', 'font-bold', 'leading-relaxed', 'mb-4').
- Incorporate engaging elements like styled lists ('ul'/'ol') and at least one visually distinct blockquote to highlight a key point (e.g., using 'border-l-4 border-cyan-500 p-6').
- The tone must be engaging, authoritative, and human-like.
`;

serve(async (req: Request) => {
  // Handle the OPTIONS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { topic, creatorName, previousBlog }: ArticleRequest = await req.json();

    if (!topic || !creatorName) {
      return new Response(
        JSON.stringify({ error: "Topic and creator name are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const groq = new Groq({ apiKey: Deno.env.get("GROQ_API_KEY") });

    const stylePrompt = previousBlog
      ? `Critically analyze the following blog content and perfectly adopt its writing style, tone, and formatting for the new article. Previous blog content for style matching: "${previousBlog}"`
      : "Write in a clear, engaging, and informative style suitable for a tech-savvy audience.";

    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // Generate the main article content
    const articleCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt, // Using the new detailed prompt
        },
        {
          role: "user",
          content: `Generate a comprehensive article on the topic: "${topic}". The author is ${creatorName}, and the publication date is ${date}. ${stylePrompt}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const articleContent = articleCompletion.choices[0]?.message?.content || "";

    // Generate suggested topics
    const suggestedTopicsCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Based on an article topic, suggest 5 creative and relevant titles for future blog posts.",
        },
        {
          role: "user",
          content: `Based on the article topic "${topic}", suggest 5 titles.`,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    const suggestedTopicsText = suggestedTopicsCompletion.choices[0]?.message?.content || "";
    const suggestedTopics = suggestedTopicsText
      .split("\n")
      .filter(t => t.trim() !== "")
      .map(t => t.replace(/^\d+\.\s*/, '').trim());

    // Send the successful response
    return new Response(
      JSON.stringify({ content: articleContent, suggestedTopics }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error generating article:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate article" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});