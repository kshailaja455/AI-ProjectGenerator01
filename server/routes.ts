import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

// Initialize OpenAI only if API key is provided
const hasApiKey = !!(process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY);
const openai = hasApiKey ? new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
}) : null;

// Mock data generator for development without API key
function generateMockIdea(input: any) {
  const domainMap: Record<string, string> = {
    "Web Development": "Full-Stack Web",
    "Mobile Development": "Cross-Platform App",
    "Data Science": "Data Analysis",
    "Machine Learning": "ML Model",
    "Cloud Computing": "Cloud Infrastructure",
    "IoT": "Smart Device",
    "Blockchain": "Decentralized System",
    "AI/NLP": "AI Assistant",
  };

  const skillAdjustment = input.skillLevel === "Beginner" ? "Basic" : input.skillLevel === "Intermediate" ? "Advanced" : "Expert-Level";
  const domain = domainMap[input.domain] || input.domain;

  return {
    project_title: `${skillAdjustment} ${domain} System for ${input.domain}`,
    difficulty: input.complexity || "Medium",
    faculty_acceptance_chance: "High Chance of Approval",
    problem_statement: `Develop a practical ${domain} application that demonstrates core concepts of ${input.domain}. This project should be completable within ${input.timeLimit} and suitable for a team of ${input.teamSize} members.`,
    solution_overview: `Build a complete system with proper architecture, testing, and documentation. Focus on clean code, scalability, and production-ready practices suitable for faculty evaluation and student learning outcomes.`,
    key_features: [
      `Core ${domain} functionality`,
      `User authentication and authorization`,
      `Data persistence and management`,
      `Error handling and logging`,
      `Responsive UI/UX design`,
      `API documentation`,
    ],
    tools_required: [
      "Git/GitHub for version control",
      "Visual Studio Code",
      domain.includes("Web") ? "Node.js & React" : domain.includes("Mobile") ? "Flutter or React Native" : "Python",
      "Database (PostgreSQL/MongoDB)",
      "AWS/Azure/Google Cloud",
    ],
    architecture_flow: `Frontend → API Gateway → Business Logic → Database\n\n1. User submits request through UI\n2. Request validated by middleware\n3. Business logic processes data\n4. Results stored/retrieved from database\n5. Response returned to frontend`,
    future_enhancements: [
      `Real-time notifications using WebSockets`,
      `Advanced analytics dashboard`,
      `Mobile app version`,
      `AI/ML integration`,
      `Multi-language support`,
      `Advanced caching strategies`,
    ],
    viva_questions: [
      `Explain the architecture and design decisions you made in this project`,
      `How did you handle scalability and performance optimization?`,
      `Describe the testing strategy you implemented`,
      `What challenges did you face and how did you overcome them?`,
    ],
    interview_questions: [
      `Walk us through your development process and methodology`,
      `How would you deploy this application to production?`,
      `What improvements would you make with more time?`,
      `How does your solution compare to existing alternatives?`,
    ],
  };
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.post(api.ideas.generate.path, async (req, res) => {
    try {
      const input = api.ideas.generate.input.parse(req.body);
      
      let parsedResult;

      if (hasApiKey && openai) {
        // Use OpenAI API if key is available
        const prompt = `You are an expert full-stack developer and academic advisor.
Generate a student-level mini project idea based on the following preferences:
- Domain: ${input.domain}
- Skill Level: ${input.skillLevel}
- Team Size: ${input.teamSize}
- Time Limit: ${input.timeLimit}
- Faculty Strictness Level: ${input.strictnessLevel}
- Project Type: ${input.projectType}
- Complexity Preference: ${input.complexity}

Requirements:
- Suggest only student-level projects, avoid research-level topics
- Avoid copied common ideas, make it unique and innovative
- Make idea practical and doable within the time limit
- Keep explanation simple and ensure faculty-friendly explanation
- Must be appropriate for a ${input.teamSize} person team

Output strictly as a JSON object with this exact structure:
{
  "project_title": "String",
  "difficulty": "Easy, Medium, or Hard",
  "faculty_acceptance_chance": "High Chance of Approval, Moderate Chance, or Needs Improvement",
  "problem_statement": "String",
  "solution_overview": "String",
  "key_features": ["String"],
  "tools_required": ["String"],
  "architecture_flow": "String",
  "future_enhancements": ["String"],
  "viva_questions": ["String", "String"],
  "interview_questions": ["String", "String"]
}`;

        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" }
        });

        const resultContent = response.choices[0].message.content;
        if (!resultContent) {
          throw new Error("No content received from OpenAI");
        }

        parsedResult = JSON.parse(resultContent);
      } else {
        // Use mock data when API key is not available
        parsedResult = generateMockIdea(input);
      }

      const idea = await storage.saveIdea(input, parsedResult);
      res.status(201).json(idea);

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      if (process.env.DEBUG_LOGS !== "false") {
        console.error("Error generating idea:", err);
      }
      res.status(500).json({ message: "Failed to generate idea" });
    }
  });

  app.get(api.ideas.list.path, async (req, res) => {
    const ideas = await storage.getIdeas();
    res.json(ideas);
  });

  app.get(api.ideas.get.path, async (req, res) => {
    const idea = await storage.getIdea(Number(req.params.id));
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    res.json(idea);
  });

  return httpServer;
}
