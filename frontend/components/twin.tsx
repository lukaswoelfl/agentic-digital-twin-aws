'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Terminal } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function Twin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    session_id: sessionId || undefined,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();

            if (!sessionId) {
                setSessionId(data.session_id);
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please make sure the backend is running and try again.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl shadow-slate-950/50 overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10">
                            <Bot className="w-6 h-6 text-white animate-pulse" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-base font-semibold text-slate-100 leading-tight">Lukas Wölfl</h2>
                            <span className="text-[10px] uppercase tracking-wider font-bold bg-indigo-500/15 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/20">Digital Twin</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Online & Ready to chat
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-900/60 border border-slate-800/80 rounded-lg px-2.5 py-1">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>v1.0.0</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto py-12">
                        <div className="w-16 h-16 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 to-indigo-500/25 rounded-2xl blur-lg group-hover:opacity-100 transition-opacity opacity-50" />
                            <Sparkles className="w-8 h-8 text-cyan-400 relative z-10" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-200">Connect with Lukas&apos;s Twin</h3>
                        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                            Hello! I&apos;m the AI representation of Lukas Wölfl. Ask me about my experience in Python, AWS, PydanticAI, ETL pipelines, or my passion for building production-ready systems!
                        </p>
                        <div className="grid grid-cols-2 gap-2 mt-6 w-full text-left">
                            {[
                                "Tell me about your background",
                                "What technologies do you use?",
                                "What projects are you passionate about?",
                                "Tell me about your IIoT experience"
                            ].map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setInput(suggestion)}
                                    className="p-2.5 text-xs text-slate-400 bg-slate-900/50 hover:bg-slate-900 hover:text-slate-200 border border-slate-800/60 rounded-xl transition-all duration-200 text-left hover:border-slate-700/80"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-4 animate-fade-in ${message.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        {message.role === 'assistant' && (
                            <div className="flex-shrink-0 self-end">
                                <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center shadow-lg">
                                    <Bot className="w-4.5 h-4.5 text-cyan-400" />
                                </div>
                            </div>
                        )}

                        <div
                            className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md ${message.role === 'user'
                                ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-br-none'
                                : 'bg-slate-900/95 border border-slate-800/85 text-slate-200 rounded-bl-none'
                                }`}
                        >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            <p
                                className={`text-[10px] mt-1.5 flex justify-end font-medium tracking-wide ${message.role === 'user' ? 'text-indigo-200' : 'text-slate-500'
                                    }`}
                            >
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>

                        {message.role === 'user' && (
                            <div className="flex-shrink-0 self-end">
                                <div className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center shadow-md">
                                    <User className="w-4.5 h-4.5 text-slate-300" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-4 justify-start animate-fade-in">
                        <div className="flex-shrink-0 self-end">
                            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                                <Bot className="w-4.5 h-4.5 text-cyan-400" />
                            </div>
                        </div>
                        <div className="bg-slate-900/95 border border-slate-800/85 rounded-2xl rounded-bl-none px-4 py-3">
                            <div className="flex space-x-1.5 py-1">
                                <div className="w-2.5 h-2.5 bg-cyan-500/80 rounded-full animate-bounce" />
                                <div className="w-2.5 h-2.5 bg-cyan-500/80 rounded-full animate-bounce delay-100" />
                                <div className="w-2.5 h-2.5 bg-cyan-500/80 rounded-full animate-bounce delay-200" />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="border-t border-slate-800/80 p-4 bg-slate-900/20">
                <div className="flex gap-3 items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask Lukas's digital twin something..."
                        className="flex-1 px-4 py-3 bg-slate-900/90 hover:bg-slate-900 border border-slate-800/90 focus:border-cyan-500/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-500/50 text-slate-100 placeholder-slate-500 text-sm transition-all duration-200"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading}
                        className="p-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/35 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-650/10 flex items-center justify-center"
                    >
                        <Send className="w-4.5 h-4.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
