'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {useTranslate} from "@tolgee/react";

type SignInKeycloakProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'onSubmit'> & {
  action: (formData: FormData) => void | Promise<void>;
};

function SignInKeycloak({className, action, ...props}: SignInKeycloakProps) {
  const { t } = useTranslate();
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={action}>
            <div className="flex flex-col gap-6 h-64 justify-between">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{t('SignIn-Title')}</h1>
                <p className="text-muted-foreground text-balance">
                  {t('SignIn-SubTitle')}
                </p>
              </div>
              <Button type="submit" className="w-full">
                {t('SignIn-Submit')}
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

export default SignInKeycloak
