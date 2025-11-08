import {SignInForm} from "@/components/sign-in-form";
import {signIn} from "@/auth";


export default function SignInPage() {
  async function handleLogin(_: unknown, formData: FormData) {
    'use server';
    
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    
    // напрямую вызвать Keycloak логин через signIn
    await signIn('keycloak', {
      // если в Keycloak настроен password flow
      username,
      password,
      redirectTo: '/dashboard',
    });
  }
  
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignInForm />
      </div>
    </div>
  )
}
