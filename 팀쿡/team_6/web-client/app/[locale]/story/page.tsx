"use client"

import { motion } from "framer-motion";

export default function Story() {
    const handleBackToRadio = () => {
        // This will be handled by the parent component
        window.dispatchEvent(new CustomEvent('backToRadio'));
    };

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();

        const titleInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        const storyTextarea = document.querySelector('textarea') as HTMLTextAreaElement;

        if (!titleInput || !storyTextarea) {
            console.error("Title or story input not found.");
            return;
        }

        const title = titleInput.value.trim();
        const story = storyTextarea.value.trim();

        if (!title || !story) {
            alert("Both title and story must be filled out.");
            return;
        }
        
        // Example: Log the data or send it to an API
        console.log("Title:", title);
        console.log("Story:", story);
        // Prepare the request data
        const requestData = {
            "channel_id": 4,
            "content": story,
            "language_code": "ko",
            "title": title
        };
        console.log("Request Data:", requestData);

        // Send the data to the API
        fetch("https://api-starrynight.luidium.com/v1/story", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => {
            console.log("Raw Response:", response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
            })
            .then((data) => {
            console.log("API Response:", data);
            // alert("Your story has been submitted successfully!");
            // Optionally clear the inputs after submission
            titleInput.value = "";
            storyTextarea.value = "";
            })
            .catch((error) => {
            console.error("Error submitting story:", error);
            alert("Failed to submit your story. Please try again.");
            });

        // Optionally clear the inputs after submission
        titleInput.value = "";
        storyTextarea.value = "";

        alert("Your story has been submitted!");
    }

    return (
    <>
        <style jsx global>
        {`
            @font-face {
                font-family: "HandwritingFont";
                src: url("/fonts/foo.ttf") format("truetype");
            }
            
                input::selection {
                background:rgb(232, 133, 224);
                color: #ffffff;
            }

                textarea::selection {
                background:rgb(232, 133, 224);
                color: #ffffff;
            }
            textarea::-webkit-scrollbar {
            width: 12px; /* Width of the scrollbar */
            }

            textarea::-webkit-scrollbar-track {
            background: #f0e6f6; /* Background color of the scrollbar track */
            }

            textarea::-webkit-scrollbar-thumb {
            background: rgba(255, 168, 246, 0.57); /* Color of the scrollbar thumb */
            border-radius: 6px; /* Rounded corners for the scrollbar thumb */
            }

            textarea::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 190, 251, 0.6); /* Color when hovering over the scrollbar thumb */
            }

            textarea {
            resize: none; /* Disable resizing */
            }
        `}
        </style>

        <div className="absolute top-[0%] left-1/2 transform -translate-x-1/2">
            <motion.div
                className="cursor-pointer"
                style={{ transformOrigin: 'center center' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBackToRadio}
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12L12 4L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </motion.div>
        </div>

        <div
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-transform duration-500 ${
                "translate-y-0"
            } w-[60vw] h-[80vh] shadow-lg flex flex-col items-center justify-start pt-12`}
            style={{
                backgroundColor: "#FFE6DE",
                boxShadow: "0px 0px 20px 30px rgba(0, 0, 0, 0.25)",
            }}
        > 
        <input
            type="text"
            className="w-3/4 p-4 text-black focus:outline-none mt-4 font-bold "
            placeholder="제목"
            maxLength={20}
            style={{
            backgroundColor: "#FFE6DE",
            fontFamily: "HandwritingFont",
            fontSize: "2rem",
            }}
        />
        <textarea
            className="w-3/4 p-4 text-black mt-4 font-bold focus:outline-none"
            placeholder="사연을 작성해보세요"
            style={{
            backgroundColor: "#FFE6DE",
            fontFamily: "HandwritingFont",
            fontSize: "1.6rem",
            overflowWrap: "normal",
            height: "50vh",
            paddingTop: "10px",
            lineHeight: "1.6rem",
            whiteSpace: "pre-wrap",
            }}
        />

        <button
          className="bg-[#784B3C] hover:bg-[#5A3228] text-white font-bold py-2 px-6 mt-4 rounded"
          onClick={handleSubmit} // Handle submit
        >
          사연 보내기!
        </button>
        
    </div>


    </>
);
}