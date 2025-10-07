import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Groq from "https://esm.sh/groq-sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface ArticleRequest {
  topic: string;
  creatorName: string;
  previousBlog?: string;
}

const formatMarkdown = (content: string) => {
  return content.replace(/\n/g, '\n\n')  // Double line breaks for paragraphs
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
                .replace(/\*(.*?)\*/g, '<em>$1</em>')  // Italic
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')  // Links
                .replace(/#{3}\s*(.*?)\s*$/gm, '<h3>$1</h3>')  // H3
                .replace(/#{2}\s*(.*?)\s*$/gm, '<h2>$1</h2>')  // H2
                .replace(/#{1}\s*(.*?)\s*$/gm, '<h1>$1</h1>'); // H1
};

// 🧭 Dynamic project route handler
const handleRequest = async (req: Request, project?: string) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
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

    const groq = new Groq({
      apiKey: Deno.env.get("GROQ_API_KEY"),
    });

    const stylePrompt = previousBlog
      ? `Analyze the following blog content and adopt its writing style, tone, and formatting for the new article. Previous blog content: "${previousBlog}"`
      : "Write in a clear, engaging, and informative style.";

    // Generate the main article content
    const articleCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert content writer who specializes in creating high-quality, SEO-optimized articles. Use Markdown formatting for structure and emphasis. Use ## for headings, * for emphasis, ** for strong emphasis, and proper link formatting [text](url).",
        },
        {
          role: "user",
          content: `Generate a comprehensive and well-structured article on the topic: "${topic}". The author's name is ${creatorName}. ${stylePrompt}`,
        },
      ],
      model: "mixtral-8x7b-32768",
    });

    const articleContent = formatMarkdown(articleCompletion.choices[0]?.message?.content || "");

    // Generate suggested topics
    const suggestedTopicsCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates related blog post topics. Provide a numbered list of 5 suggestions.",
        },
        {
          role: "user",
          content: `Based on the article topic "${topic}", suggest 5 engaging and relevant titles for future blog posts.`,
        },
      ],
      model: "llama3-8b-8192",
    });

    const suggestedTopicsText = suggestedTopicsCompletion.choices[0]?.message?.content || "";
    const suggestedTopics = suggestedTopicsText
      .split("\n")
      .filter(topic => topic.trim() !== "")
      .map(topic => topic.replace(/^\d+\.\s*/, '').trim());

    // 🧾 Response (includes project name if provided)
    return new Response(
      JSON.stringify({
        project: project || "default",
        content: articleContent,
        suggestedTopics: suggestedTopics,
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
};

// 🚀 Serve with dynamic routing
serve(async (req: Request) => {
  const url = new URL(req.url);
  const path = url.pathname;

  // Match routes like /api/article or /api/{project}/article
  const projectMatch = path.match(/^\/api\/([^/]+)\/article$/);

  if (path === "/api/article") {
    return await handleRequest(req);
  } else if (projectMatch) {
    const project = projectMatch[1];
    return await handleRequest(req, project);
  }

  return new Response("Not Found", {
    status: 404,
    headers: corsHeaders,
  });
});
