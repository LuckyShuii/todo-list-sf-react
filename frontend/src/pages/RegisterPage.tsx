import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { FormField } from '@/components/ui/form';
import { Separator } from "@/components/ui/separator"
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    console.log("sending data: ", data)
    try {
      await axios.post('/api/user/register', data);
      console.log('Registration successful!');
      window.location.href = '/login'; 
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return <>
    <div className='w-[15rem]'>
      <h1 className='text-center'>Register</h1>
      <Separator className="my-4 mb-8" />

      <div className='mb-8 flex flex-col gap-4'>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <Input placeholder="Username" {...field} />
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <Input type='password' placeholder="Password" {...field} />
          )}
        />
      </div>

      <Button className='w-full' onClick={form.handleSubmit(onSubmit)}>
        Register
      </Button>
      <p className='w-full text-center'>Already have an account? <a href="/login" className='text-blue-500 hover:underline'>Log in</a></p>
    </div>
  </>
};

export default RegisterPage; 
