import React from 'react';
import PageTitle from '../Components/PageTitle';
import { Link, Form, useNavigation, useActionData} from 'react-router-dom';
import Banner from '../assets/banner.webp';
import TextField from '../Components/TextField';
import Button from '../Components/Button';
import { CircularProgress, LinerProgress } from '../Components/Progress';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Logo from '../Components/Logo';
/**
 * custom hook
 */
import {useSnackBar} from '../Hooks/useSnackBar';

function Register() {

  const isSubmitted = useNavigation().state;

  // Get error message from form submission using useActionData (likely from React Router)
  const error = useActionData();

  const {showSnackBar} = useSnackBar();

  useEffect(() => {

    // Show snackbar with the provided error message
    if(error?.message) {
      showSnackBar({message: error.message, type: 'error'});
    }

  }, [error, showSnackBar])

  return (
    <>
      <PageTitle title="Create an account" />

      <div className='relative w-screen h-dvh p-2 flex flex-col lg:flex-row lg:gap-10 lg:justify-center'>
        
        <div className='flex flex-col p-4 justify-center min-h-[60vh]'>

          <Logo classes='mb-8 mx-auto lg:mx-0'/>

          <div className='flex flex-col gap-4 max-w-[420px] w-full mx-auto bg-white/80 dark:bg-dark-surfaceContainer rounded-2xl shadow-lg p-6'>
            <h1 className='text-3xl font-bold text-light-onBackground dark:text-dark-onBackground text-center mb-2'>Create an account</h1>

            <p className='text-base text-light-onSurface dark:text-dark-onSurfaceVariant text-center mb-4'>
              Register to start chatting with Fusion to get your ideas into reality.
            </p>

            <Form
              method='POST'
              className='grid grid-cols-1 gap-4'
              autoComplete='on'
            >
              <TextField type="text" name="name" label="Full name" placeholder="Full name" required={true} autoFocus={true} error={!!error?.field && error.field === 'name'} errorText={error?.field === 'name' ? error.message : ''}/>
              <TextField type="email" name="email" label="Email" placeholder="Email" required={true} error={!!error?.field && error.field === 'email'} errorText={error?.field === 'email' ? error.message : ''}/>
              <TextField type="password" name="password" label="Password" placeholder="Enter your password" required={true} error={!!error?.field && error.field === 'password'} errorText={error?.field === 'password' ? error.message : ''}/>

              <Button type="submit" disabled={isSubmitted === 'submitting'} classes="w-full h-12 text-lg font-semibold mt-2">
                {isSubmitted === 'submitting' ? <CircularProgress size='small'/> : 'Create Account'}
              </Button>
            </Form>

            <p className='text-base text-light-onSurfaceVariant dark:text-dark-onSurface text-center mt-4 mb-2'>
              Already have an account?
              <Link to="/login" className='link text-labelLarge inline-block ms-1 text-primary font-semibold hover:underline focus:underline transition-colors'>Sign in</Link>
            </p>

          </div>
        </div>

        <div className='hidden lg:block relative h-full w-0 lg:w-1/2'>
          <img src={Banner} alt="Fusion register banner" className='absolute inset-0 w-full h-full object-cover rounded-none' />
        </div>
      </div>

      <AnimatePresence>
        {
          isSubmitted === 'loading' && (<LinerProgress classes='absolute top-0 left-0 right-0'/>)
        }
      </AnimatePresence>

    </>
  )
}

export default Register
