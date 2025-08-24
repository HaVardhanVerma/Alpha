import model from "../lib/googleAi";

/**
 * Generates a short conversation title based on the provided user prompt
 * 
 * This function utilizes google generative ai model to create a concise title
 * for a conversation. it sends the user prompt to the model and request a generated response containing a single short title.
 * 
 */

const getConversationTitle = async (userPrompt) => {
    try {

        const result = await model.generateContent(
            `Given a user prompt, generate a concise and informative title that accurately describes the conversation. Consider keywords, topics, and the overall intent of the prompt. Response in plain text format, not markdown.
            
            Prompt: ${userPrompt}`,
        );

        return result.response.text();
    }
    catch (ERROR) {
        // Log any errors that occur during title generation
    }
};

/**
*Generate a response from an AI model based on the user's prompt and the chat history 
*/

const getAiResponse = async(userPrompt, chats = []) => {

    const history = [];

    chats.forEach(({user_prompt, ai_response}) => {
        history.push(
            {
                role: 'user',
                parts: [{text: user_prompt}],
            },

            {
                role: 'model',
                parts: [{text: ai_response}],
            },
        );
    });

    try {
        model.generationConfig = {temperature: 1.5}
        const chat = model.startChat({history});
        const result = await chat.sendMessage(userPrompt);

        return result.response.text();
    } 
    catch (ERROR) {
        // Log any errors that occur during AI response generation
    }
}

export { getConversationTitle, getAiResponse };

// hello
