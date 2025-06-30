import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useLoaderData, useLocation } from 'react-router-dom';

import PageTitle from '../Components/PageTitle';
import UserPrompt from '../Components/userPrompt';
import AiResponse from '../Components/AiResponse';
import PromptPreloader from '../Components/PromptPreloader';

import {usePromptPreloader} from '../Hooks/usePromptPreloader';

const Conversation = () => {

  const {promptPreoaderValue} = usePromptPreloader();

  const {conversation: {title, chats},} = useLoaderData() || {};

  const location = useLocation();

  console.log(chats);

  return (
    <>
      <PageTitle title={`${title} - Fusion`}/>

      <motion.div className='max-w-[700px] mx-auto !will-change-auto' initial={!location.state?.isRedirect && {opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.2, delay: 0.05, ease: 'easeOut'}}>
        {
          chats.map((chat) => (
            <div key={chat.$id}>

              <UserPrompt text={chat.user_prompt} />

              <AiResponse aiResponse={chat.ai_response} />
            </div>
          ))
        }
      </motion.div>

        {promptPreoaderValue && (
          <PromptPreloader promptValue={promptPreoaderValue}/>
        )}
    </> 
  )
}

export default Conversation;

