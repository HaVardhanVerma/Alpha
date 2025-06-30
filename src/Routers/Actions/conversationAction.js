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
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            conversationId,
        );

        chatHistory = chats.map(({user_prompt, ai_response}) => {
            return {user_prompt, ai_response};
        });
    }
    catch (ERROR) {
    }

    try {
        aiResponse = await getAiResponse(userPrompt, chatHistory);
    }
    catch (ERROR) {
    }
    
    try {
        await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
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
    }

    return null;
}

export default conversationAction;