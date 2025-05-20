"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

// Import cassette images
import cassetteFlat1 from "@/assets/cassette/CassetteFlat1.svg";
import cassetteFlat2 from "@/assets/cassette/CassetteFlat2.svg";
import cassetteFlat3 from "@/assets/cassette/CassetteFlat3.svg";
import cassetteFlat4 from "@/assets/cassette/CassetteFlat4.svg";
import cassetteFlat5 from "@/assets/cassette/CassetteFlat5.svg";
import cassetteFlat6 from "@/assets/cassette/CassetteFlat6.svg";
import cassetteFlat7 from "@/assets/cassette/CassetteFlat7svg.svg";

import cassetteStanding1 from "@/assets/cassette/Cassette2-1.svg";
import cassetteStanding2 from "@/assets/cassette/Cassette2-2.svg";
import cassetteStanding3 from "@/assets/cassette/Cassette2-3.svg";
import cassetteStanding4 from "@/assets/cassette/Cassette2-4.svg";
import cassetteStanding5 from "@/assets/cassette/Cassette2-5.svg";
import cassetteStanding6 from "@/assets/cassette/Cassette2-6.svg";
import cassetteStanding7 from "@/assets/cassette/Cassette2-7.svg";

const cassetteWidth = 145;
const gap = 20;

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

export default function CassetteCarousel() {
    const router = useRouter();
    const locale = useLocale();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
    const [floatingIndex, setFloatingIndex] = useState<number | null>(null);
    const [droppedIndex, setDroppedIndex] = useState<number | null>(null);
    const [hideOthers, setHideOthers] = useState<boolean>(false);
    const [stories, setStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [hasDroppedOnce, setHasDroppedOnce] = useState<boolean[]>([]);
    const [hasDroppedTwice, setHasDroppedTwice] = useState<boolean[]>([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://api-starrynight.luidium.com/v1/story/user');
                const data = await response.json();
                setStories(data);
                setHasDroppedOnce(Array(data.length).fill(false));
                setHasDroppedTwice(Array(data.length).fill(false));
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching stories:', error);
                setIsLoading(false);
            }
        };
        fetchStories();
    }, []);

    const cassettes = [
        { standing: cassetteStanding1, flat: cassetteFlat1, alt: "Cassette 1" },
        { standing: cassetteStanding2, flat: cassetteFlat2, alt: "Cassette 2" },
        { standing: cassetteStanding3, flat: cassetteFlat3, alt: "Cassette 3" },
        { standing: cassetteStanding4, flat: cassetteFlat4, alt: "Cassette 4" },
        { standing: cassetteStanding5, flat: cassetteFlat5, alt: "Cassette 5" },
        { standing: cassetteStanding6, flat: cassetteFlat6, alt: "Cassette 6" },
        { standing: cassetteStanding7, flat: cassetteFlat7, alt: "Cassette 7" },
    ];

    const offset =
        selectedIndex !== null ? (cassetteWidth + gap) * selectedIndex : 0;

    const handleClick = (index: number) => {
        if (selectedIndex === index) {
            if (hasDroppedOnce[index]) {
                // If already dropped once, make it drop off screen immediately
                setHasDroppedTwice((prev) => {
                    const updated = [...prev];
                    updated[index] = true;
                    return updated;
                });
                setDroppedIndex(index);
                setTimeout(() => {
                    router.push(`/${locale}?cassette=${index}&story=${stories[index].ID}`);
                }, 1000);
                return;
            }

            setHideOthers(true);
            setFloatingIndex(index);

            setHasDroppedOnce(prev => {
                const updated = [...prev];
                updated[index] = true;
                return updated;
            });

            setTimeout(() => {
                setFloatingIndex(null);
                setDroppedIndex(index);
            }, 1500);

            setTimeout(() => setDroppedIndex(null), 3000);
        } else {
            setSelectedIndex(index);
            setFloatingIndex(null);
            setDroppedIndex(null);
            setHideOthers(false);
            setHasDroppedOnce(Array(stories.length).fill(false));
            setHasDroppedTwice(Array(stories.length).fill(false));
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-[#FDF3D0]">
                <div className="text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <motion.div 
            className="relative w-full h-screen flex items-center justify-center overflow-hidden"
            initial={{ y: '-100vh' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ 
                backgroundColor: "#FDF3D0"
            }}
        >
            <motion.div
                className="flex gap-5 w-max"
                animate={{
                    x: `calc(50% - ${offset}px)`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {stories.map((story, index) => {
                    const isSelected = index === selectedIndex;
                    const isFloating = index === floatingIndex;
                    const isDropping = index === droppedIndex;
                    const shouldDisappear = hideOthers && index !== selectedIndex;

                    return (
                        <motion.div
                            key={index}
                            onClick={() => handleClick(index)}
                            className="cursor-pointer"
                            animate={{
                                scale: isFloating
                                    ? 1
                                    : shouldDisappear
                                    ? 0.5
                                    : isDropping || hasDroppedOnce[index]
                                    ? hasDroppedTwice[index] ? 3.0 : 3.0
                                    : isSelected
                                    ? 1.2
                                    : 1,
                                opacity: isFloating ? 1 : shouldDisappear ? 0 : 1,
                                y: isFloating 
                                    ? '-50vh' 
                                    : isDropping 
                                    ? hasDroppedTwice[index]
                                        ? ['30vh', '200vh']
                                        : ['-50vh', '30vh']
                                    : hasDroppedTwice[index]
                                    ? '200vh'
                                    : hasDroppedOnce[index] 
                                    ? '30vh' 
                                    : 0,
                                zIndex: isSelected ? 10 : 1,
                            }}
                            transition={
                                isDropping && hasDroppedTwice[index]
                                    ? { type: "tween", ease: "easeIn", duration: 2 }
                                    : { type: "spring", stiffness: 150, damping: 20 }
                            }
                        >
                            <Image
                                src={
                                    isFloating || isDropping || hasDroppedOnce[index]
                                    ? cassettes[index % cassettes.length].flat
                                    : cassettes[index % cassettes.length].standing
                                }
                                alt={story.Title}
                                width={cassetteWidth}
                                height={cassetteWidth}
                                className="object-contain"
                                priority={index < 4}
                            />
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
}