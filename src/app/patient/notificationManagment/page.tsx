"use client";
import React, { useState, useRef, useEffect } from "react";

const DentalAppointmentFollowup: React.FC = () => {
  // Default values
  const defaultMessage =
    "<p>Hello Mike:</p><p>We noticed that you haven't scheduled your next dental appointment.</p><p>Regular check-ups are important for maintaining good oral health, and we'd love to see you back soon.</p><p>Please give us a call at (123)-555-666 to schedule your appointment at your earliest convenience.</p><p>We look forward to seeing you soon!</p><p>Smile Works.</p>";
  const defaultPhone = "(456) - 258 - 369";

  // State for message content and phone number
  const [messageContent, setMessageContent] = useState<string>(defaultMessage);
  const [phoneNumber, setPhoneNumber] = useState<string>(defaultPhone);

  // State for modal visibility
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState<boolean>(false);

  // Refs for modal inputs
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Update textarea value when modal opens
  useEffect(() => {
    if (isMessageModalOpen && messageTextareaRef.current) {
      // Create a temporary div to parse HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = messageContent;

      // Extract paragraphs and preserve formatting
      const paragraphs = [];
      for (const paragraph of tempDiv.querySelectorAll("p")) {
        paragraphs.push(paragraph.innerHTML);
      }

      // Set value with paragraphs separated by double newlines
      messageTextareaRef.current.value = paragraphs.join("\n\n");
    }
  }, [isMessageModalOpen, messageContent]);

  // Update phone input value when modal opens
  useEffect(() => {
    if (isPhoneModalOpen && phoneInputRef.current) {
      phoneInputRef.current.value = phoneNumber;
    }
  }, [isPhoneModalOpen, phoneNumber]);

  // Handle message editing
  const openMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const saveMessage = () => {
    if (messageTextareaRef.current) {
      const newText = messageTextareaRef.current.value;
      const paragraphs = newText
        .split("\n\n")
        .map((para) =>
          para.trim() ? `<p>${para.replace(/\n/g, "<br>")}</p>` : ""
        )
        .join("");

      setMessageContent(paragraphs || defaultMessage);
    }
    setIsMessageModalOpen(false);
  };

  // Handle phone editing
  const openPhoneModal = () => {
    setIsPhoneModalOpen(true);
  };

  const savePhone = () => {
    if (phoneInputRef.current) {
      const newPhone = phoneInputRef.current.value.trim();
      setPhoneNumber(newPhone || defaultPhone);
    }
    setIsPhoneModalOpen(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    alert("Message submitted successfully!");
  };

  // Close modal when clicking outside
  const handleModalOutsideClick = (
    event: React.MouseEvent<HTMLDivElement>,
    setModalState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (event.target === event.currentTarget) {
      setModalState(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 w-full flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="mb-4 text-sm text-gray-700">Follow up message for:</div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold m-0">Mike Wilson</h1>
          <p className="text-base mt-1">Teeth Removal</p>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-md relative mb-8">
          <button
            className="absolute top-4 right-4 p-1 bg-transparent border-none cursor-pointer"
            onClick={openMessageModal}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </button>

          <div
            className="mt-3"
            dangerouslySetInnerHTML={{ __html: messageContent }}
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm text-gray-700">
            Phone number on file
          </label>
          <div className="flex items-center w-full">
            <input
              type="tel"
              className="py-2 px-3 border border-gray-300 rounded-md text-sm w-36 mr-1"
              value={phoneNumber}
              readOnly
            />
            <button
              className="p-1 bg-transparent border-none cursor-pointer ml-1"
              onClick={openPhoneModal}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
            </button>
            <div className="flex-grow"></div>
            <button
              className="bg-gray-600 text-white py-2 px-5 border-none rounded-md text-sm cursor-pointer text-center"
              onClick={handleSubmit}
            >
              Submit Message
            </button>
          </div>
        </div>

        {/* Message Modal */}
        {isMessageModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center"
            onClick={(e) => handleModalOutsideClick(e, setIsMessageModalOpen)}
          >
            <div className="bg-white p-5 rounded-lg w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Edit Message</h3>
                <button
                  className="bg-transparent border-none text-xl cursor-pointer"
                  onClick={() => setIsMessageModalOpen(false)}
                >
                  &times;
                </button>
              </div>
              <textarea
                ref={messageTextareaRef}
                className="w-full min-h-40 p-3 border border-gray-300 rounded-md font-sans text-sm resize-y mb-4"
              />
              <button
                className="bg-gray-600 text-white py-2 px-5 border-none rounded-md text-sm cursor-pointer float-right"
                onClick={saveMessage}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Phone Modal */}
        {isPhoneModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center"
            onClick={(e) => handleModalOutsideClick(e, setIsPhoneModalOpen)}
          >
            <div className="bg-white p-5 rounded-lg w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Edit Phone Number</h3>
                <button
                  className="bg-transparent border-none text-xl cursor-pointer"
                  onClick={() => setIsPhoneModalOpen(false)}
                >
                  &times;
                </button>
              </div>
              <input
                ref={phoneInputRef}
                type="tel"
                className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm mb-4"
              />
              <button
                className="bg-gray-600 text-white py-2 px-5 border-none rounded-md text-sm cursor-pointer float-right"
                onClick={savePhone}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DentalAppointmentFollowup;
