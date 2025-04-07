
import { ChatbotDataInterface } from "@/app/types";

// Get a chatbot by its ID
export const getChatbotById = async (id: string) => {
  const res = await client.query(
    `SELECT name, last_trained, isvisible, islive, welcome_message, fallback_message, website_url, color, offline_fallback_notification_email
     FROM details
     LEFT JOIN data_source ON details.id = data_source.chatbot_id
     LEFT JOIN settings ON details.id = settings.chatbot_id
     WHERE details.id = $1`,
    [id]
  );

  if (!res.rows) return null;
  return res.rows[0];
};

// Get all chatbots
export const getAllChatbots = async () => {
  try {
    const res = await client.query("SELECT * FROM details");
    const chatbots = res.rows;
    if (!chatbots) return null;
    return chatbots;
  } catch (error) {
    console.error("Error fetching all chatbots:", error);
    throw new Error("Failed to fetch all chatbots");
  }
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
    const result1 = await client.query(
      "INSERT INTO details (name, welcome_message, fallback_message) VALUES ($1, $2, $3) RETURNING *",
      [name, welcome_message, fallback_message]
    );

    const id: string = result1.rows[0].id;
    console.log("Created chatbot ID:", id);

    // Insert into data_source table
    const result2 = await client.query(
      "INSERT INTO data_source (chatbot_id, website_url) VALUES ($1, $2) RETURNING *",
      [id, website_url]
    );

    // Insert into settings table
    const result3 = await client.query(
      "INSERT INTO settings (chatbot_id, color, offline_fallback_notification_email) VALUES ($1, $2, $3) RETURNING *",
      [id, color, offline_fallback_notification_email]
    );

    return {
      details: result1.rows[0],
      data_source: result2.rows[0],
      settings: result3.rows[0],
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
    // Only update details if relevant fields are provided
    if (name || welcome_message || fallback_message) {
      const detailsFields = [];
      const values = [];
      let valueCount = 1;

      if (name) {
        detailsFields.push(`name = $${valueCount}`);
        values.push(name);
        valueCount++;
      }
      if (welcome_message) {
        detailsFields.push(`welcome_message = $${valueCount}`);
        values.push(welcome_message);
        valueCount++;
      }
      if (fallback_message) {
        detailsFields.push(`fallback_message = $${valueCount}`);
        values.push(fallback_message);
        valueCount++;
      }

      if (detailsFields.length > 0) {
        values.push(id);
        await client.query(
          `UPDATE details SET ${detailsFields.join(', ')} WHERE id = $${valueCount} RETURNING *`,
          values
        );
      }
    }

    // Only update data_source if website_url is provided
    if (website_url !== undefined) {
      await client.query(
        "UPDATE data_source SET website_url = $1 WHERE chatbot_id = $2 RETURNING *",
        [website_url, id]
      );
    }

    // Only update settings if relevant fields are provided
    if (color !== undefined || offline_fallback_notification_email !== undefined) {
      const settingsFields = [];
      const values = [];
      let valueCount = 1;

      if (color !== undefined) {
        settingsFields.push(`color = $${valueCount}`);
        values.push(color);
        valueCount++;
      }
      if (offline_fallback_notification_email !== undefined) {
        settingsFields.push(`offline_fallback_notification_email = $${valueCount}`);
        values.push(offline_fallback_notification_email?.trim());
        valueCount++;
      }

      if (settingsFields.length > 0) {
        values.push(id);
        await client.query(
          `UPDATE settings SET ${settingsFields.join(', ')} WHERE chatbot_id = $${valueCount} RETURNING *`,
          values
        );
      }
    }

    // Return updated data
    return await getChatbotById(id);
  } catch (error) {
    console.error("Error updating chatbot:", error);
    throw new Error("Failed to update chatbot");
  }
};