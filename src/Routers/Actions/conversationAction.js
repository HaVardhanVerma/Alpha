import { databases } from "../../lib/appwriter";
import { getAiResponse } from "../../api/googleAi";
import IdGenerator from "../../utils/IdGenerator";
import Conversation from "../../Pages/Conversation";

const conversationAction = async ({request, params}) => {

    const {conversationId} = params;
    const formData = await request.formData();
    const userPrompt = formData.get('user_prompt');

    let chatHistory = [];
    let aiResponse = '';

    try {
        const {chats} = await databases.getDocument(
            'fusion_db',
            'conversations',
            conversationId,
        );

        chatHistory = chats.map(({user_prompt, ai_response}) => {
            return {user_prompt, ai_response};
        });
    }
    catch (ERROR) {
        console.log(`Error fetching chat history: ${ERROR.message}`);
    }

    try {
        aiResponse = await getAiResponse(userPrompt, chatHistory);
    }
    catch (ERROR) {
        console.log(`Error fetching AI response: ${ERROR.message}`);
    }
    
    try {
        await databases.createDocument(
            'fusion_db',
            'chats',
            IdGenerator(),
            {
                user_prompt: userPrompt,
                ai_response: aiResponse,
                conversation: conversationId,
            },
        );
    }
    catch (ERROR) {
        console.log(`Error saving chat history: ${ERROR.message}`);
    }

    return null;
}

export default conversationAction;