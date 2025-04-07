import * as z from "zod";

export const chatbotSchema = z.object({
  chatbot_name: z.string().min(1, { message: "Name is required" }),
  welcome_message: z
    .string()
    .min(1, { message: "Welcome message is required" }),
  fallback_message: z.string().optional(),
  website_url: z.string().url().optional(),
  file: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        if (!file) return true; // Optional, so it can be undefined
        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ];
        return allowedTypes.includes(file.type);
      },
      { message: "Invalid file type. Only PDF, DOC, DOCX, and TXT are allowed" }
    ),
});
