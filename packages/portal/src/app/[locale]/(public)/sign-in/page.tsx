import {signIn} from "@/auth";
import SignInKeycloak from "@/components/auth/sign-in/sign-in-keyckloak";

async function handleLogin() {
  'use server';
  await signIn('keycloak');
}

export default function SignInPage() {
  
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {/*<SignInForm />*/}
        <SignInKeycloak action={handleLogin}/>
      </div>
    </div>
  )
}
