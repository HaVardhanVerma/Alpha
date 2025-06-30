import React from 'react'
import Avatar from './Avatar';

import {IconBtn} from './Button';
import Menu from './Menu';
import MenuItem from './MenuItem';
import { LinerProgress } from './Progress';
import Logo from './Logo';

import logout from '../utils/logout';

import { useNavigation, useNavigate, useLoaderData, useSubmit } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useToggle from '../Hooks/useToggle';
import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';
import deleteConversation from '../utils/deleteConversation';

function TopAppbar({toggleSidebar}) {

  const navigation = useNavigation();

  const navigate = useNavigate();

  const {conversations, user} = useLoaderData();

  const param = useParams();
  // console.log("This is current user:-", user);

  /**
   * Use a custom hook to manage the menu's show state.
   * 'showMenu' holds the current state,
   * and 'setShowMenu' is a function to toggle the menu.
  */

  const [showMenu, setShowMenu] = useToggle();

  const submit = useSubmit();
  
  /**
   * Check if the current navigation state is 'loading' and if there is no form data associated with the navigation.
   * This condition typically signifies a normal page load,
   * Where the page is loading for the first time or is being reloaded without submitting a form.
  */
  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  return (
    <header className='relative flex justify-between items-center h-16 px-4'> 
      <div className='flex items-center gap-1'>
        <IconBtn 
          icon='menu'
          title='Menu'
          classes='lg:hidden'
          onClick={toggleSidebar}
        />

        <Logo classes='lg:hidden'/>
      </div>

      {param.conversationId && (
        <IconBtn
          icon='delete'
          classes='ms-auto me-1 lg:hidden'
          onClick={() => {
            // console.log(conversations);
            const {title} = conversations.documents.find(({$id}) => param.conversationId === $id);
            deleteConversation({
              id: param.conversationId,
              title,
              submit,
            });
          }}
        ></IconBtn>
      )}

      <div className='menu-wrapper'>
        <IconBtn onClick={setShowMenu}>
          <Avatar name={user.name}/>
        </IconBtn>

        <Menu classes={showMenu ? 'active' : ''}>
          <MenuItem labelText='Log Out' onClick={() => logout(navigate)}/>
        </Menu>
      </div>

      <AnimatePresence>
        {isNormalLoad && <LinerProgress classes='absolute top-full left-0 right-0 z-10'/>}
      </AnimatePresence>

    </header>
  )
};

TopAppbar.propTypes = {
  toggleSidebar: PropTypes.func,
}

export default TopAppbar;