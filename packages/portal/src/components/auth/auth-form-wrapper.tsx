'use client';

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import {useTranslate} from "@tolgee/react";

type AuthFormWrapperProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  title?: string;
  titleKey?: string;
  subtitle?: string;
  subtitleKey?: string;
  children: React.ReactNode;
};

export function AuthFormWrapper({className, title, titleKey, subtitle, subtitleKey, children, ...props}: AuthFormWrapperProps) {
  const { t } = useTranslate();

  const resolvedTitle = titleKey ? t(titleKey, title || titleKey) : title
  const resolvedSubtitle = subtitleKey ? t(subtitleKey, subtitle || subtitleKey) : subtitle
  const showHeader = Boolean(resolvedTitle || resolvedSubtitle)
  
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md md:max-w-5xl">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-8 md:p-10">
                <div className="flex flex-col gap-6">
                  {showHeader ? (
                    <div className="flex flex-col items-center text-center">
                      {resolvedTitle ? (
                        <h1 className="text-2xl font-bold">{resolvedTitle}</h1>
                      ) : null}
                      {resolvedSubtitle ? (
                        <p className="text-muted-foreground text-balance">
                          {resolvedSubtitle}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-6">
                    {children}
                  </div>
                </div>
              </div>
              <div className="bg-muted relative hidden md:block">
                <img
                  src="/placeholder.svg"
                  alt="Image"
                  className="inset-0 w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  )
}
