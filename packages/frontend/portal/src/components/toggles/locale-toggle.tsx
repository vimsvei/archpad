"use client"

import * as React from "react"
import {Languages} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useTolgee} from "@tolgee/react";
import {useTransition} from "react";
import {LOCALES} from "@/tolgee/shared";
import {useRouter} from "next/navigation";

export function LocaleToggle() {
  const tolgee = useTolgee(['language']);
  const locale = tolgee.getLanguage();
  const router = useRouter();
  const [_, startTransition] = useTransition();
  
  const onSelectChange = (newLocale: string) => {
    if (!newLocale || newLocale === locale) return;
    startTransition(() => {
      // Persist locale without changing URL (no /<locale>/ prefix).
      document.cookie = `archpad_locale=${encodeURIComponent(newLocale)}; Path=/; SameSite=Lax`
      tolgee.changeLanguage(newLocale)
      router.refresh()
    });
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages />
          <span className="sr-only">Toggle locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={locale} onValueChange={onSelectChange}>
          {
            LOCALES.map(locale => (
              <DropdownMenuRadioItem value={locale.code} key={locale.code}>
                <span className="inline-flex items-center gap-2">
                {locale.flag && <span className="text-base leading-none">{locale.flag}</span>}
                  {locale.label}
              </span>
              </DropdownMenuRadioItem>
            ))
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
