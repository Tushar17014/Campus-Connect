import { ChatbotHistory } from "@/types";

export const generateBotResponse = async (history: ChatbotHistory[]) => {
    const FormatHistory = history.map(({role, text}) => ({role, parts: [{text}]}));

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({contents: FormatHistory})
    };

    try{
        const response = await fetch(import.meta.env.VITE_GEMINI_API_URL, requestOptions);
        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message || "ChatBot Response not working");

        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        
        return apiResponseText;

    } catch (error) {
        console.error(error);
    }
};