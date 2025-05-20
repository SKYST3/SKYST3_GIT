"use client";

import RotatingKnob from "@/app/[locale]/main/rotating"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl"
import { useSearchParams } from "next/navigation";
import Story from "../story/page";

import cassetteFlat1 from "@/assets/cassette/CassetteFlat1.svg";
import cassetteFlat2 from "@/assets/cassette/CassetteFlat2.svg";
import cassetteFlat3 from "@/assets/cassette/CassetteFlat3.svg";
import cassetteFlat4 from "@/assets/cassette/CassetteFlat4.svg";
import cassetteFlat5 from "@/assets/cassette/CassetteFlat5.svg";
import cassetteFlat6 from "@/assets/cassette/CassetteFlat6.svg";
import cassetteFlat7 from "@/assets/cassette/CassetteFlat7svg.svg";

const flat = [cassetteFlat1, cassetteFlat2, cassetteFlat3, cassetteFlat4, cassetteFlat5, cassetteFlat6, cassetteFlat7];

interface Story {
    ID: number;
    UserID: number;
    ChannelID: number;
    LanguageCode: string;
    Title: string;
    Content: string;
    GeneratedContent: string | null;
    CreatedAt: string;
}

interface Reply {
    ID: number;
    StoryID: number;
    UserID: number;
    Content: string;
    CreatedAt: string;
}

export default function Radio() {
    const router = useRouter();
    const locale = useLocale();
    const [radioText, setRadioText] = useState("");
    const [volume, setVolume] = useState(0);
    const [channel, setChannel] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [isExitingUnder, setIsExitingUnder] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [showStory, setShowStory] = useState(false);
    const [currentStory, setCurrentStory] = useState<Story | null>(null);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showStoryWriting, setShowStoryWriting] = useState(false);
    const [firstID, setFirstID] = useState<number | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const params = useSearchParams();
    const droppedParam = params.get("cassette");
    const storyId = params.get("story");
    const droppedIdx = droppedParam ? +droppedParam : null;
    const [showArrival, setShowArrival] = useState<boolean>(droppedIdx !== null);

    useEffect(() => {
        if (storyId) {
            const fetchStoryAndReplies = async () => {
                try {
                    setIsLoading(true);
                    // Fetch story
                    const storyResponse = await fetch(`https://api-starrynight.luidium.com/v1/story/${storyId}`);
                    if (!storyResponse.ok) {
                        throw new Error('Failed to fetch story');
                    }
                    const storyData = await storyResponse.json();
                    setCurrentStory(storyData);

                    // Fetch replies
                    const repliesResponse = await fetch(`https://api-starrynight.luidium.com/v1/story/${storyId}/replies`);
                    if (!repliesResponse.ok) {
                        throw new Error('Failed to fetch replies');
                    }
                    const repliesData = await repliesResponse.json();
                    console.log('Replies data:', repliesData);
                    setReplies(repliesData);
                    
                    setShowStory(true);
                } catch (error) {
                    console.error('Error fetching story or replies:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchStoryAndReplies();
        }
    }, [storyId]);

    const handleNavigationUnder = () => {
        setIsExitingUnder(true);
        setTimeout(() => {
            setShowStoryWriting(true);
        }, 1000);
    };

    const handleBackToRadio = () => {
        setIsExitingUnder(false);
        setShowStory(false);
        setShowStoryWriting(false);
        setCurrentStory(null);
        router.push(`/${locale}`);
    };

    useEffect(() => {
        const handleBackToRadioEvent = () => {
            handleBackToRadio();
        };

        window.addEventListener('backToRadio', handleBackToRadioEvent);
        return () => {
            window.removeEventListener('backToRadio', handleBackToRadioEvent);
        };
    }, []);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    
    const handleNavigation = () => {
        setIsExiting(true);
        setTimeout(() => {
            router.push(`/${locale}/cassette`);
        }, 500);
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-[#FDF3D0]">
                <div className="text-2xl">Loading story...</div>
            </div>
        );
    }

    const handleFetchAndSubmit = async () => {
        if (isProcessing) return;
        setIsProcessing(true);

        try {
            const response = await fetch(`https://api-starrynight.luidium.com/v1/story/channel/4`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API Response:", data);

            if (Array.isArray(data) && data.length > 0) {
                const id = data[0].ID;
                console.log("First ID:", id);
                setFirstID(id);

                if (!inputRef.current) {
                    console.error("Reply input not found.");
                    alert("Reply input not found.");
                    return;
                }

                const reply = inputRef.current.value.trim();

                if (!reply) {
                    alert("Reply must be filled out.");
                    return;
                }

                const requestData = {
                    content: reply,
                    story_id: id,
                };

                console.log("Request Data:", requestData);

                const replyResponse = await fetch(`https://api-starrynight.luidium.com/v1/story/${id}/reply`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(requestData),
                });

                if (!replyResponse.ok) {
                    throw new Error(`HTTP error! status: ${replyResponse.status}`);
                }

                const replyData = await replyResponse.json();
                console.log("Reply API Response:", replyData);
                alert("Your reply has been submitted successfully!");
                inputRef.current.value = "";
            } else {
                console.error("No data available or data is not an array.");
                alert("No stories found.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            {showStory && currentStory ? (
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF3D0] p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 mb-8"
                    >
                        <h1 className="text-3xl font-bold mb-4">{currentStory.Title}</h1>
                        <p className="text-lg whitespace-pre-wrap mb-8">{currentStory.Content}</p>
                        
                        {/* Replies Section */}
                        <div className="mt-8 border-t pt-8">
                            <h2 className="text-2xl font-bold mb-4">Replies</h2>
                            {replies && replies.length > 0 ? (
                                <div className="space-y-4">
                                    {replies.map((reply, index) => (
                                        <div key={`${reply.ID}-${reply.StoryID}-${index}`} 
                                            className="bg-[#FFE6DE] p-6 rounded-lg shadow-md">
                                            <div className="flex flex-col gap-2">
                                                <p className="text-gray-800 whitespace-pre-wrap text-lg leading-relaxed">
                                                    {reply.Content}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-2 self-end">
                                                    {new Date(reply.CreatedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No replies yet.</p>
                            )}
                        </div>

                        <button
                            onClick={handleBackToRadio}
                            className="mt-8 px-6 py-2 bg-[#784B3C] text-white rounded hover:bg-[#784B3C]/90 transition-colors"
                        >
                            Back to Radio
                        </button>
                    </motion.div>
                </div>
            ) : showStoryWriting ? (
                <Story />
            ) : (
                <AnimatePresence>
                    <motion.div 
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '90vh',
                            position: 'relative',
                            backgroundColor: "#FDF3D0"
                        }}
                        onClick={() => inputRef.current?.focus()}
                        initial={{ y: 0 }}
                        animate={{ y: isExiting ? '100vh' : isExitingUnder ? '-100vh' : 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                        <button
                            className="bg-[#784B3C] hover:bg-[#5A3228] text-white font-bold py-2 px-6 rounded absolute top-[-5%]"
                            onClick={handleFetchAndSubmit}
                        >
                            답신 보내기!
                        </button>
                        <div className="absolute top-[-10%] left-1/2 transform -translate-x-1/2">
                            <motion.div
                                className="cursor-pointer"
                                style={{ transformOrigin: 'center center'}}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNavigation}
                            >
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 12L12 4L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </motion.div>
                        </div>
                        <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2">
                            <motion.div
                                className="cursor-pointer"
                                style={{ transformOrigin: 'center center' }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNavigationUnder}
                            >
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleY(-1)" }}>
                                    <path d="M4 12L12 4L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </motion.div>
                        </div>
                        <div className="relative w-[80%]">
                            <img
                            src="/images/Radio.svg"
                            alt="radio"
                            className="w-[98%] object-contain relative z-20"
                            />
                            {showArrival && droppedIdx !== null && (
                                <motion.img
                                    src={flat[droppedIdx].src}
                                    alt="incoming cassette"
                                    className="absolute w-[25vw] left-[27vw] -translate-x-1/2 top-0 z-10 pointer-events-none"
                                    initial={{ y: "-100vh", scale: 1 }}
                                    animate={{ y: "15vh", scale: 0.5 }}
                                    transition={{ duration: 4.0, ease: "easeInOut" }}
                                    onAnimationComplete={() => setShowArrival(false)}
                                />
                            )}

                            <input
                            ref={inputRef}
                            value={radioText}
                            onChange={(e) => {
                                // If the text starts with "Volume:" or "Channel:", only use the new input
                                if (radioText.startsWith("Volume:") || radioText.startsWith("Channel:")) {
                                    setRadioText(e.target.value);
                                } else {
                                    setRadioText(e.target.value);
                                }
                            }}
                            onKeyDown={(e) => {
                                // Clear the text when any key is pressed
                                if (radioText.startsWith("Volume:") || radioText.startsWith("Channel:")) {
                                    setRadioText("");
                                }
                            }}
                            className="absolute opacity-0 w-[1px] h-[1px] -z-10"
                            />
                            
                            <RotatingKnob
                            src="/images/KnobBig.svg"
                            className="absolute top-[67%] left-[58%] w-[10%] h-[17%] z-30"
                            onDeltaRotate={(delta) => {
                                setVolume((prev) => {
                                const next = Math.min(100, Math.max(0, prev + delta * 0.5));
                                setRadioText(`Volume: ${Math.round(next)}`);
                                return next;
                                });
                            }}
                            />

                            <RotatingKnob
                            src="/images/KnobBig.svg"
                            className="absolute top-[67%] left-[30%] w-[10%] h-[17%] z-30"
                            onDeltaRotate={(delta) => {
                                setChannel((prev) => {
                                const next = Math.min(20, Math.max(0, prev + Math.round(delta / 15)));
                                setRadioText(`Channel: ${next}`);
                                return next;
                                });
                            }}
                            />

                            <RotatingKnob
                            src="/images/KnobSmall.svg"
                            className="absolute top-[70%] left-[41%] w-[7%] h-[12%] z-30"
                            />
                            <RotatingKnob
                            src="/images/KnobSmall.svg"
                            className="absolute top-[70%] left-[50%] w-[7%] h-[12%] z-30"
                            />

                            <div
                            style={{
                                position: "absolute",
                                top: "24%",
                                left: "35%",
                                width: "29%",
                                height: "10%",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                color: "#00ffcc",
                                fontFamily: "CustomFont",
                                fontSize: "15px",
                                fontWeight: "bold",
                                backgroundColor: "transparent",
                                pointerEvents: "none",
                                whiteSpace: "normal",
                                overflowWrap: "break-word",
                                wordBreak: "break-word",
                                overflow: "hidden",
                                zIndex: 30,
                            }}
                            >
                                {radioText}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
            <style jsx>{`
                @font-face {
                font-family: "CustomFont";
                src: url("/fonts/PF스타더스트 3.0.ttf") format("truetype");
                }
            `}</style>
        </>
    );
}
