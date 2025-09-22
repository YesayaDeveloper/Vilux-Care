import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import type { ChatMessage } from '../types';
import { searchDatabase } from './diseaseDatabase';

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

/**
 * Resets the chat session, clearing its memory.
 * This should be called when the user navigates away from the chat UI.
 */
export const resetChat = () => {
    chat = null;
};

const getAI = () => {
    if (!ai) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};

const getChat = () => {
    if(!chat) {
        const genAI = getAI();
        chat = genAI.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are a friendly and helpful health assistant for Vilux Care. Your goal is to be helpful and informative.

**Conversation Rules:**
1.  **Interaction Flow:** If a user's message is vague (e.g., "I feel sick"), ask for specific symptoms to provide a more helpful response. If the query is already specific (e.g., "I have a cough and a sore throat"), provide relevant information directly.
2.  **Maintain Context:** Always consider the previous messages in the conversation to answer follow-up questions. For example, if you ask for symptoms and the user lists them, use those symptoms to inform your answer.
3.  **Language:** You MUST respond *only* in the language used by the user in their last message. For example, if the user asks in Indonesian, your entire response must be in Indonesian.
4.  **Conciseness:** Keep your answers concise and to the point. Use paragraphs and **bold text** for clarity.

**Safety & Scope Rules:**
1.  **No Medical Advice:** If you are asked for a medical diagnosis, treatment for a serious condition, to interpret a medical test, or to evaluate a specific medication, you **must decline**. Gently advise the user to consult a qualified healthcare provider, without explicitly stating "I am not a doctor."
2.  **Image Analysis:** When a user uploads an image, provide a general, non-medical description based on the conversational context. **DO NOT identify pills, diagnose rashes, or give any medical opinions on images.** Your response must strictly be a visual description that is helpful within the conversation's context.`,
            },
        });
    }
    return chat;
}

// Function to simulate a delay for the database search animation
const simulateFreeze = () => new Promise(resolve => setTimeout(resolve, 2500));

export const sendMessage = async (message: string, image?: { b64: string; mimeType: string }): Promise<string> => {
    // 1. If no image, check local database first for a fast, verified answer.
    if (!image) {
        const dbResponse = await searchDatabase(message);
        if (dbResponse) {
            await simulateFreeze(); // Simulate the "freeze" while searching the database
            // Note: This prioritizes the DB response. The AI's internal history isn't updated for this turn
            // to ensure speed and accuracy for common queries. The context will be picked up on the next AI call.
            return dbResponse;
        }
    }

    // 2. If not in DB, or if an image is present, call the conversational AI
    try {
        const chatSession = getChat();
        let response: GenerateContentResponse;

        if (image) {
            const imagePart = {
              inlineData: {
                mimeType: image.mimeType,
                data: image.b64,
              },
            };
            const textPart = { text: message };
            const parts = [imagePart, textPart];
            
            response = await chatSession.sendMessage({ message: parts });
        } else {
            response = await chatSession.sendMessage({ message });
        }
        
        return response.text;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Sorry, I encountered an error while trying to respond. Please try again.";
    }
};