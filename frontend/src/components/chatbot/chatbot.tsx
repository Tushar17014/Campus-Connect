import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import "../scrollbar.css"
import { ChatbotHistory } from "@/types";
import { generateBotResponse } from "@/apis/chatbot";
import { academicSystemData } from "@/constants/academicSystemData";
import ChatbotIcon from "./chatbotIcon";

export default function Chatbot() {
    const [chatHistory, setChatHistory] = useState<ChatbotHistory[]>([
        { role: "model", text: academicSystemData, hide: true },
        { role: "model", text: "Hello! How can I help you today?" }
    ]);
    const [loading, setLoading] = useState<boolean>(false);


    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputRef?.current?.value.trim()) return;

        const userMessage = inputRef?.current?.value.trim();

        inputRef.current.value = "";

        setChatHistory((history: ChatbotHistory[]) => [...history, { role: "user", text: userMessage }]);

        setLoading(true);

        setTimeout(async () => {
            const ChatbotResponse = await generateBotResponse([...chatHistory, { role: "user", text: `Using the details provided above, please address this query in not more than 60 words and if you cannot find the answer then reply Sorry I do not have information regarding this, : ${userMessage}` }]);

            setChatHistory((history: ChatbotHistory[]) => [...history, { role: "model", text: ChatbotResponse }]);

            setLoading(false);
        }, 600)
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    return (
        <div className="fixed bottom-4 right-4 z-[9999]">
            <Popover>
                <PopoverTrigger asChild>
                    <div className="rounded-full h-16 w-16 p-0 shadow-lg shadow-white/10 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center cursor-pointer">
                        <ChatbotIcon classes="fill-white w-10" />
                    </div>
                </PopoverTrigger>

                <PopoverContent
                    side="top"
                    align="end"
                    className="w-[28rem] h-[36rem] rounded-2xl shadow-xl p-0 flex flex-col overflow-hidden bg-[#121212] border border-neutral-800 custom-scrollbar"
                >

                    <div className="bg-[#121212] text-white px-4 py-2 font-semibold text-lg border-b border-neutral-800">
                        Campus Helper
                    </div>

                    <div className="flex-1 pt-4 overflow-y-auto bg-[#1E1E1E] space-y-2 text-sm text-white custom-scrollbar">
                        {chatHistory.map((msg, idx) => {
                            if (!msg.hide) {
                                return (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.role === "model" ? "flex-row" : "flex-row-reverse"} p-2 rounded-lg items-center gap-2`}
                                    >
                                        {msg.role === "model" && (
                                            <div className="rounded-full h-8 w-8 p-0 shadow-lg bg-black text-white flex items-center justify-center flex-shrink-0">
                                                <ChatbotIcon classes="w-6 fill-white" />
                                            </div>
                                        )}
                                        <div
                                            className={`${msg.role === "model"
                                                ? "bg-black text-white"
                                                : "bg-blue-600 text-white"
                                                } p-2 rounded-lg max-w-[70%]`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        {loading && (
                            <div className="flex flex-row p-2 rounded-lg items-center gap-2">
                                <div className="rounded-full h-8 w-8 p-0 shadow-lg bg-black text-white flex items-center justify-center flex-shrink-0">
                                    <ChatbotIcon classes="w-6 fill-white" />
                                </div>
                                <div className="bg-black text-white p-2 rounded-lg max-w-[70%]">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-1 h-1 bg-gray-300 rounded-full animate-pulse"></div>
                                        <div className="w-1 h-1 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: '0.25s' }}></div>
                                        <div className="w-1 h-1 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSend} className="flex items-center border-t border-neutral-800 p-2 bg-[#1E1E1E]">
                        <input
                            type="text"
                            ref={inputRef}
                            placeholder={`${!loading ? "Type a message..." : "Please wait"}`}
                            className="flex-1 p-2 rounded-lg border border-neutral-700 bg-[#121212] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            Send
                        </button>
                    </form>
                </PopoverContent>
            </Popover>
        </div>
    );
}
