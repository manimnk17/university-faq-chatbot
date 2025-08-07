import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { faqData, FAQ } from '../data/faqData';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const formatFAQData = (data: FAQ[]): string => {
    return data.map(item => {
        let entry = `Q: ${item.question}\nA: ${item.answer}`;
        if (item.source_url) {
            entry += `\nSource: ${item.source_url}`;
        }
        return entry;
    }).join('\n\n');
};

const faqKnowledgeBase = formatFAQData(faqData);

const systemInstruction = `You are a friendly and helpful university admissions chatbot.
Your goal is to answer user questions based ONLY on the provided Frequently Asked Questions (FAQ) list.
Do not use any external knowledge.
If a source URL is provided with an answer, you MUST cite it.
If the answer to the question is not found in the FAQ list, you must politely state that you don't have the information and suggest they contact the admissions office directly for the most accurate information.
Do not make up answers or URLs.`;

export const getChatbotResponseStream = async (userQuestion: string, chatHistory: { role: string, parts: { text: string }[] }[]) => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `${systemInstruction}\n\nHere is the FAQ list:\n${faqKnowledgeBase}`,
            },
            history: chatHistory,
        });

        const response = await chat.sendMessageStream({
            message: userQuestion
        });
        
        return response;

    } catch (error) {
        console.error("Error getting chatbot response:", error);
        throw new Error("Failed to get response from the chatbot.");
    }
};

export const getGroundedResponse = async (userQuestion: string) => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Answer the following question about current university-related news or recent events: "${userQuestion}"`,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const text = response.text;
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        
        const sources = groundingChunks
            ?.map((chunk: any) => ({
                title: chunk.web?.title || 'Untitled',
                url: chunk.web?.uri || '#',
            }))
            .filter((source: { title: string, url: string }) => source.url !== '#') || [];

        // Simple deduplication
        const uniqueSources = Array.from(new Map(sources.map(s => [s.url, s])).values());

        return { text, sources: uniqueSources };
    } catch (error) {
        console.error("Error getting grounded response:", error);
        throw new Error("Failed to get a grounded response.");
    }
};