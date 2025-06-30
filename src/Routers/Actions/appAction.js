import { account, databases } from "../../lib/appwriter";

import { getConversationTitle, getAiResponse } from "../../api/googleAi";

import IdGenerator from "../../utils/IdGenerator";

import { redirect } from "react-router-dom";

const userPromptAction = async(request) => {
    const userPrompt = request.get('user_prompt');

    const user = await account.get();

    // get conversation title based on user prompt
    const conversationTitle = await getConversationTitle(userPrompt);

    let conversation = null;

    try {
        // Create a new conversation document in the Appwrite database
        conversation = await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            IdGenerator(),
            {
                title: conversationTitle,
                user_id: user.$id,
            },
        );
    }
    catch(ERROR) {
        console.log(`Error creating conversation: ${ERROR.message}`)
    }

    // Generate an AI response based on the user's prompt
    const aiResponse = await getAiResponse(userPrompt);

    try {
        // Create a new message document in the Appwrite database 'chats' collection
        await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'chats',
            IdGenerator(),
            {
                user_prompt: userPrompt,
                ai_response: aiResponse,
                conversation: conversation.$id, 
            },
        );
    }
    catch (ERROR) {
        console.log(`Error generating AI response: ${ERROR.message}`);
    }

    return redirect(`/${conversation.$id}`);
};

const conversationAction = async (formData) => {
    const conversationId = formData.get('conversation_id');
    const conversationTitle = formData.get('conversation_title');

    try {
        await databases.deleteDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            conversationId,
        );

        return {conversationTitle};
    } catch(ERROR) {
        console.log(`Error getting deletion ${ERROR.message}`);
    }
}

const appAction = async({request}) => {
    
    const formData = await request.formData();
    const requestType = formData.get('request_type');

    if(requestType === 'user_prompt') {
        return await userPromptAction(formData);
    }

    if(requestType === 'delete_conversation') {
        return await conversationAction(formData);
    }
};

export default appAction;