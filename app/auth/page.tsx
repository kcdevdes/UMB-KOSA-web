import AuthForm from '@/components/Auth';
import { Navbar } from '@/components/ui/Navbar';
import { AuthProvider } from '@/lib/hooks/useAuth';

export default function AuthPage() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="flex justify-center items-center h-screen flex-col">
        <AuthProvider>
          <AuthForm />
        </AuthProvider>
      </div>
    </div>
  );
}
