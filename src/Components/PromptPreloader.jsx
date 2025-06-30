import React from 'react'

import UserPrompt from './userPrompt';
import AiResponse from './AiResponse';
import Skeleton from './Skeleton';

const PromptPreloader = ({promptValue}) => {
  return (
    <div className='max-w-[700px] mx-auto'>
        <UserPrompt text={promptValue} />
        <AiResponse>
            <Skeleton/>
        </AiResponse>
    </div>
  )
}

export default PromptPreloader
