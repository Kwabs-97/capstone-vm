import client from "../config/db";
import { ChatbotDataInterface } from "@/app/types";

// Get a chatbot by its ID
export const getChatbotById = async (id: string) => {
  const { data, error } = await client
    .from("details")
    .select(
      `
      name, last_trained, isVisible, isLive, welcome_message, fallback_message, website_url, color, offline_fallback_notification_email
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching chatbot by ID:", error);
    return null;
  }
  return data;
  console.log(data)
};

// Get all chatbots
export const getAllChatbots = async () => {
  const { data, error } = await client.from("details").select("*");

  if (error) {
    console.error("Error fetching all chatbots:", error);
    throw new Error("Failed to fetch all chatbots");
  }
  return data;
};

// Create a new chatbot
export const createChatbot = async (chatbotData: ChatbotDataInterface) => {
  if (!chatbotData) {
    throw new Error("Chatbot data is missing");
  }

  try {
    const {
      name,
      fallback_message,
      welcome_message,
      website_url,
      color,
      offline_fallback_notification_email,
    } = chatbotData;

    // Insert into details table
    const { data: detailsData, error: detailsError } = await client
      .from("details")
      .insert([{ name, welcome_message, fallback_message }])
      .select()
      .single();

    if (detailsError) throw detailsError;

    const id = detailsData.id;

    // Insert into data_source table
    const { error: dataSourceError } = await client
      .from("data_source")
      .insert([{ chatbot_id: id, website_url }]);

    if (dataSourceError) throw dataSourceError;

    // Insert into settings table
    const { error: settingsError } = await client
      .from("settings")
      .insert([{ chatbot_id: id, color, offline_fallback_notification_email }]);

    if (settingsError) throw settingsError;

    return {
      details: detailsData,
    };
  } catch (error) {
    console.error("Error creating chatbot:", error);
    throw new Error("Failed to create chatbot");
  }
};

// Update an existing chatbot
export const updateChatbot = async (chatbotData: ChatbotDataInterface) => {
  const {
    color,
    offline_fallback_notification_email,
    fallback_message,
    website_url,
    welcome_message,
    name,
    id,
  } = chatbotData;

  if (!id) {
    throw new Error("Chatbot ID is missing");
  }

  try {
    // Update details table
    if (name || welcome_message || fallback_message) {
      const updates: any = {};
      if (name) updates.name = name;
      if (welcome_message) updates.welcome_message = welcome_message;
      if (fallback_message) updates.fallback_message = fallback_message;

      const { error: detailsError } = await client
        .from("details")
        .update(updates)
        .eq("id", id);

      if (detailsError) throw detailsError;
    }

    // Update data_source table
    if (website_url !== undefined) {
      const { error: dataSourceError } = await client
        .from("data_source")
        .update({ website_url })
        .eq("chatbot_id", id);

      if (dataSourceError) throw dataSourceError;
    }

    // Update settings table
    if (color !== undefined || offline_fallback_notification_email !== undefined) {
      const updates: any = {};
      if (color !== undefined) updates.color = color;
      if (offline_fallback_notification_email !== undefined) {
        updates.offline_fallback_notification_email = offline_fallback_notification_email.trim();
      }

      const { error: settingsError } = await client
        .from("settings")
        .update(updates)
        .eq("chatbot_id", id);

      if (settingsError) throw settingsError;
    }

    // Return updated data
    return await getChatbotById(id);
  } catch (error) {
    console.error("Error updating chatbot:", error);
    throw new Error("Failed to update chatbot");
  }
};