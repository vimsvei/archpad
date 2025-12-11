'use client';

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import {useTranslate} from "@tolgee/react";

type AuthFormWrapperProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function AuthFormWrapper({className, title, subtitle, children, ...props}: AuthFormWrapperProps) {
  const { t } = useTranslate();
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{title}</h1>
                {subtitle && (
                  <p className="text-muted-foreground text-balance">
                    {subtitle}
                  </p>
                )}
              </div>
              {children}
            </div>
          </div>
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
