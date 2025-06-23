import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import CustomInput from '../../components/CustomInput';
import { useUserStore } from '../../store/useUserStore';
import { loginFormSchema } from '../../lib/validators';

const SplashScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-sky-900 text-white text-3xl z-50">
    Loading...
  </div>
);

const LogIn = () => {
  const navigate = useNavigate();
  const { loginUser, loading } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const schema = loginFormSchema();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      identifier: '11510001590',
      password: 'Password@1997',
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      await loginUser({
        identifier: data.identifier,
        password: data.password,
      });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSplash) return <SplashScreen />;

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-200 via-white to-blue-100">
      <div className="backdrop-blur-lg bg-white/40 border border-white/30 shadow-2xl rounded-2xl px-10 py-12 w-full max-w-md space-y-6">
        <div className="text-center space-y-1 animate-fade-in">
          <h1 className="text-2xl font-semibold text-sky-800 tracking-wide">Welcome Back</h1>
          <p className="text-sm text-sky-600">Login with your CID or phone number</p>
        </div>

  <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
    
    {/* CID / Phone Field with Blue Text */}
    <div className="mb-4">
      <CustomInput<z.infer<typeof schema>>
        control={form.control}
        name="identifier"
        label="CID / Phone"
        placeholder="Enter your CID or Phone Number"
        inputClassName="bg-white text-blue-700 placeholder-blue-400 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-md px-4 py-2"
      />
    </div>

    {/* Password Field with Green Text */}
    <div className="mb-6">
      <CustomInput<z.infer<typeof schema>>
        control={form.control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        inputClassName="bg-white text-green-700 placeholder-green-400 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300 rounded-md px-4 py-2"
      />
    </div>

    {/* Submit Button */}
    <Button
      type="submit"
      disabled={isLoading || loading}
      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2.5 rounded-xl font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
    >
      {isLoading ? 'Logging in...' : 'Login'}
    </Button>
  </form>
</Form>



        <p className="text-center text-xs text-red-400">
        "Need help? Get in touch with Admin for assistance."
        </p>
      </div>
    </section>
  );
};

export default LogIn;
