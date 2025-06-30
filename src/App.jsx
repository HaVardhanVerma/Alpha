import './App.css'

import PageTitle from './Components/PageTitle';
import TopAppbar from './Components/TopAppbar';
import Sidebar from './Components/Sidebar';
import Greetings from './Pages/Greetings';
import PromptField from './Components/PromptField';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import useToggle from './Hooks/useToggle';
import { useEffect, useRef } from 'react';
import { Outlet, useParams, useNavigation, useActionData } from 'react-router-dom';

import { useSnackBar } from './Hooks/useSnackBar';
import { usePromptPreloader } from './Hooks/usePromptPreloader';

function App() {

  const params =  useParams();

  const navigate = useNavigation();

  const actionData = useActionData();

  const [isSidebarOpen, toggleSidebar] = useToggle();

  const isNormaload = navigate.state === 'loading' && !navigate.formData;

  const {showSnackBar} = useSnackBar();

  const {promptPreoaderValue} = usePromptPreloader();

  const chatHistroyRef = useRef();

  useEffect(() => {
    const chatHistory = chatHistroyRef.current;

    if(promptPreoaderValue) {
      chatHistory.scroll({
        top: chatHistory.scrollHeight - chatHistory.clientHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistroyRef, promptPreoaderValue]);

  useEffect(() => {
    if(actionData?.conversationTitle) {
      showSnackBar({
        message: `Deleted '${actionData.conversationTitle}' conversation`
      });
    }
  }, [actionData, showSnackBar]);
  
  return (
    <>
      {/* Meta title*/}
      <PageTitle title='Fusion - chat to supercharge your ideas'></PageTitle>

      <div className='lg:grid lg:grid-cols-[320px,1fr]'>
        {/* Sidebar*/}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>

        <div className='h-dvh grid grid-rows-[max-content,minmax(0,1fr),max-content]'>
          {/*Top app bar*/}
          <TopAppbar toggleSidebar={toggleSidebar}/>

          {/*Main content*/}
          <div ref={chatHistroyRef} className='px-5 pb-5 flex flex-col overflow-y-auto'>
            <div className='max-w-[840px] w-full mx-auto grow'>
              {isNormaload ? null : params.conversationId ? (<Outlet/>) : (<Greetings />)}
            </div>
          </div>

          {/*Prompt field */}
          <div className='bg-light-background dark:bg-dark-background'>
            <div className='max-w-[870px] px-5 w-full mx-auto'>

              <PromptField/>

              <motion.p
                initial={{opacity: 0, translateY: '-4px'}}
                animate={{opacity: 1, translateY: '0'}}
                transition={{duration: 0.2, delay: 0.8, ease: 'easeOut'}}
                className='text-bodySmall text-center text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant p-3'
              >Fusion may display the incorrect info, including about people, so double-check its responses.
                <a href="https://support.google.com/gemini?p=privacy_notice" target='-blank' className='inline underline ms-1'>
                  Your privacy & Gemini Apps
                </a>
              </motion.p>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default App
