import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Groq from "https://deno.land/x/groq_sdk/mod.ts";

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

serve(async (req: Request) => {
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
          content:
            "You are an expert content writer who specializes in creating high-quality, SEO-optimized articles. Your responses should be in HTML format, ready to be displayed on a webpage.",
        },
        {
          role: "user",
          content: `Generate a comprehensive and well-structured article on the topic: "${topic}". The author's name is ${creatorName}. ${stylePrompt}`,
        },
      ],
      model: "llama3-8b-8192", // Or another model like "mixtral-8x7b-32768"
    });

    const articleContent = articleCompletion.choices[0]?.message?.content || "";

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

    return new Response(
      JSON.stringify({
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
});
