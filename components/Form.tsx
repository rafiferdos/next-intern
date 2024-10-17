'use client'
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@nextui-org/button';

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn('credentials', {
      redirect: false, // We handle the redirection manually
      email,
      password,
    });

    if (result?.error) {
      setError(result.error); // Handle error
    } else {
      window.location.href = '/protected'; // Redirect after successful login
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div className="mt-4">
          <Button type="submit" color="success" variant="light">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
