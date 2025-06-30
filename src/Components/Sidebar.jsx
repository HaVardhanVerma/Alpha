import React from 'react'

import PropTypes from 'prop-types'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import Logo from './Logo';
import {ExtendedFab} from './Button';
import { NavLink, useLoaderData, useSubmit, useParams } from 'react-router-dom';
import { IconBtn } from './Button';

import deleteConversation from '../utils/deleteConversation';

function Sidebar({ isSidebarOpen, toggleSidebar }) {

    const submit = useSubmit();

    const {conversationId} = useParams();

    // Extract conversation data from the loader if exists
    const {
        conversations
    } = useLoaderData() || {};

    const conversationData = conversations?.documents;

    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.2, ease: 'easeOut'}}
                className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <div className='sidebar-inner'>
                    <div className='h-16 grid items-center px-4 mb-4'>
                        <Logo />
                    </div>

                    <ExtendedFab
                        herf='/'
                        text='New chat'
                        classes='mb-4'
                        onClick={toggleSidebar}
                        disabled={!conversationId}
                    />

                    <div className='overflow-y-auto -me-2 pe-1'>
                        <p className='text-titleSmall h-9 grid items-center px-4'>
                            Recent
                        </p>

                        <nav>
                            {conversationData && Array.isArray(conversationData) && conversationData.map((item) => (
                                <div key={item.$id} className='relative group'>
                                <NavLink to={item.$id} className='nav-link' title={item.title} onClick={toggleSidebar}>
                                    <span className="material-symbols-rounded icon-small">chat_bubble</span>

                                    <span className='truncate'>{item.title}</span>

                                    <div className='state-layer'></div>
                                </NavLink>

                                <IconBtn
                                    icon='delete'
                                    size='small'
                                    classes='absolute top-1/2 right-1.5 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 group:focus-within:opacity-100 hidden lg:grid'
                                    title='Delete'
                                    onClick={() => {
                                        deleteConversation({
                                            id: item.$id,
                                            title: item.title,
                                            submit,
                                        });
                                    }}
                                ></IconBtn>

                            </div>
                            ))}
                        </nav>
                    </div>

                </div>
            </motion.div>
            

            <div className={`overlay ${isSidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
        </>
    )
}

Sidebar.propTypes = {
    isSidebarOpen: PropTypes.bool,
    toggleSidebar: PropTypes.func,
};

export default Sidebar;