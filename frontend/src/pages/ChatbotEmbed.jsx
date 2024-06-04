import React, { useEffect } from 'react';

const ChatbotEmbed = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;

    // Add attributes to the script element
    script.setAttribute('chatbotId', 'YG4pq2Ul5tMYYKgX2Ns0l');
    script.setAttribute('domain', 'www.chatbase.co');

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.embeddedChatbotConfig = {
              chatbotId: "YG4pq2Ul5tMYYKgX2Ns0l",
              domain: "www.chatbase.co"
            };
          `,
        }}
      />
      {/* The div or any other container element where the chatbot will be embedded */}
      <div id="chatbot-container"></div>
    </div>
  );
};

export default ChatbotEmbed;
