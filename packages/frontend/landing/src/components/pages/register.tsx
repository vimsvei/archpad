'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Link } from 'react-router';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Rocket, CheckCircle2, ArrowLeft } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import {
  getTextBlockBySlug,
  getMetadata,
  getMetadataValue,
} from '@/lib/text-blocks';

type RegisterProps = {
  turnstileSiteKey?: string;
};

export function Register({ turnstileSiteKey = '' }: RegisterProps) {
  usePageMeta();
  const content = getTextBlockBySlug('register');
  const roleOptions = getMetadataValue<Array<{ value: string; label: string }>>(
    content,
    'roleOptions',
    [],
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [turnstileError, setTurnstileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const turnstileEnabled = Boolean(turnstileSiteKey);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    company: '',
    role: '',
    workspaceType: 'shared',
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToNewsletter: false,
  });

  useEffect(() => {
    if (!turnstileEnabled || !turnstileContainerRef.current) return;

    const renderWidget = () => {
      if (!turnstileContainerRef.current) return;
      const turnstile = (window as any).turnstile;
      if (!turnstile || turnstileWidgetIdRef.current) return;
      turnstileWidgetIdRef.current = turnstile.render(
        turnstileContainerRef.current,
        {
          sitekey: turnstileSiteKey,
          callback: (token: string) => {
            setTurnstileToken(token);
            setTurnstileError('');
          },
          'error-callback': () => {
            setTurnstileToken('');
            setTurnstileError(getMetadata(content, 'turnstileError'));
          },
          'expired-callback': () => {
            setTurnstileToken('');
            setTurnstileError(getMetadata(content, 'turnstileExpiredError'));
          },
        },
      );
    };

    const onLoad = (window as any).onTurnstileLoad;
    if (!onLoad) {
      (window as any).onTurnstileLoad = renderWidget;
    }

    if ((window as any).turnstile) {
      renderWidget();
    }

    return () => {
      const turnstile = (window as any).turnstile;
      if (turnstile && turnstileWidgetIdRef.current) {
        turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [content, turnstileEnabled, turnstileSiteKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setTurnstileError('');

    // Валидация email
    if (formData.email !== formData.confirmEmail) {
      setEmailError(getMetadata(content, 'emailMismatchError'));
      return;
    }

    if (turnstileEnabled && !turnstileToken) {
      setTurnstileError(getMetadata(content, 'turnstileError'));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          formId: 'landing-register',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          personalWorkspace: formData.workspaceType === 'personal',
          agreeToNewsletter: formData.agreeToNewsletter,
          turnstileToken,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        return;
      }

      if (res.status === 400) {
        setSubmitError(getMetadata(content, 'validationError'));
        return;
      }
      if (res.status === 429) {
        setSubmitError(getMetadata(content, 'rateLimitError'));
        return;
      }
      setSubmitError(getMetadata(content, 'submitError'));
    } catch {
      setSubmitError(getMetadata(content, 'submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Проверка валидности формы
  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.confirmEmail.trim() !== '' &&
      formData.email === formData.confirmEmail &&
      formData.role.trim() !== '' &&
      formData.agreeToTerms &&
      formData.agreeToPrivacy &&
      (!turnstileEnabled || turnstileToken !== '')
    );
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Сбросить ошибку при изменении email полей
    if (field === 'email' || field === 'confirmEmail') {
      setEmailError('');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F1F8E9] via-white to-[#E8F5E9] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#F1F8E9] rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-[#7CB342]" size={48} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {getMetadata(content, 'successTitle')}
          </h1>
          <p className="text-gray-600 mb-8">
            {getMetadata(content, 'successDescriptionPrefix')}{' '}
            <strong>{formData.email}</strong>.
            <br />
            <br />
            {getMetadata(content, 'successDescriptionSuffix')}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#7CB342] hover:bg-[#689F38] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft size={20} />
            {getMetadata(content, 'successBackButton')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F8E9] via-white to-[#E8F5E9] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {turnstileEnabled && (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit"
            strategy="afterInteractive"
          />
        )}
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7CB342] transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            {getMetadata(content, 'backLink')}
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="text-[#7CB342]" size={40} />
            <h1 className="text-4xl font-bold text-gray-900">
              {getMetadata(content, 'pageTitle')}
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            {getMetadata(content, 'pageSubtitle')}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Имя и Фамилия */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {getMetadata(content, 'firstNameLabel')}
                </Label>
                <Input
                  id="firstName"
                  placeholder={getMetadata(content, 'firstNamePlaceholder')}
                  required
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  {getMetadata(content, 'lastNameLabel')}
                </Label>
                <Input
                  id="lastName"
                  placeholder={getMetadata(content, 'lastNamePlaceholder')}
                  required
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                {getMetadata(content, 'emailLabel')}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={getMetadata(content, 'emailPlaceholder')}
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>

            {/* Подтверждение Email */}
            <div className="space-y-2">
              <Label htmlFor="confirmEmail">
                {getMetadata(content, 'confirmEmailLabel')}
              </Label>
              <Input
                id="confirmEmail"
                type="email"
                placeholder={getMetadata(content, 'confirmEmailPlaceholder')}
                required
                value={formData.confirmEmail}
                onChange={(e) => handleChange('confirmEmail', e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            {/* Компания */}
            <div className="space-y-2">
              <Label htmlFor="company">
                {getMetadata(content, 'companyLabel')}
              </Label>
              <Input
                id="company"
                placeholder={getMetadata(content, 'companyPlaceholder')}
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
              />
            </div>

            {/* Роль */}
            <div className="space-y-2">
              <Label htmlFor="role">{getMetadata(content, 'roleLabel')}</Label>
              <select
                id="role"
                required
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-transparent bg-white text-gray-900"
              >
                <option value="">
                  {getMetadata(content, 'rolePlaceholder')}
                </option>
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Тип рабочего пространства */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                {getMetadata(content, 'workspaceTypeLabel')}
              </Label>

              <RadioGroup
                value={formData.workspaceType}
                onValueChange={(value) => handleChange('workspaceType', value)}
                className="grid grid-cols-2 gap-3"
              >
                <div>
                  <RadioGroupItem
                    value="shared"
                    id="shared"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="shared"
                    className="flex items-center justify-center h-full px-4 py-3 text-sm text-gray-700 bg-white border-2 border-gray-300 rounded-lg cursor-pointer peer-data-[state=checked]:border-[#7CB342] peer-data-[state=checked]:bg-[#F1F8E9] peer-data-[state=checked]:text-[#7CB342] hover:border-gray-400 transition-all"
                  >
                    {getMetadata(content, 'workspaceShared')}
                  </Label>
                </div>

                <div>
                  <RadioGroupItem
                    value="personal"
                    id="personal"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="personal"
                    className="flex items-center justify-center h-full px-4 py-3 text-sm text-gray-700 bg-white border-2 border-gray-300 rounded-lg cursor-pointer peer-data-[state=checked]:border-[#7CB342] peer-data-[state=checked]:bg-[#F1F8E9] peer-data-[state=checked]:text-[#7CB342] hover:border-gray-400 transition-all"
                  >
                    {getMetadata(content, 'workspacePersonal')}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Согласия */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  required
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    handleChange('agreeToTerms', checked as boolean)
                  }
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                >
                  {getMetadata(content, 'agreeTermsPrefix')}{' '}
                  <Link
                    to="/terms"
                    className="text-[#7CB342] hover:underline font-medium"
                  >
                    {getMetadata(content, 'agreeTermsLink')}
                  </Link>
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy"
                  required
                  checked={formData.agreeToPrivacy}
                  onCheckedChange={(checked) =>
                    handleChange('agreeToPrivacy', checked as boolean)
                  }
                />
                <Label
                  htmlFor="privacy"
                  className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                >
                  {getMetadata(content, 'agreePrivacyPrefix')}{' '}
                  <Link
                    to="/privacy"
                    className="text-[#7CB342] hover:underline font-medium"
                  >
                    {getMetadata(content, 'agreePrivacyLink')}
                  </Link>
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.agreeToNewsletter}
                  onCheckedChange={(checked) =>
                    handleChange('agreeToNewsletter', checked as boolean)
                  }
                />
                <Label
                  htmlFor="newsletter"
                  className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                >
                  {getMetadata(content, 'agreeNewsletter')}
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            {submitError && (
              <p className="text-red-500 text-sm text-center">{submitError}</p>
            )}

            {turnstileEnabled && (
              <div className="space-y-2">
                <div ref={turnstileContainerRef} />
                {turnstileError && (
                  <p className="text-red-500 text-sm">{turnstileError}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-8 py-3 bg-[#7CB342] hover:bg-[#689F38] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#7CB342] disabled:hover:shadow-lg"
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting
                ? getMetadata(content, 'submitButtonLoading')
                : getMetadata(content, 'submitButton')}
            </button>

            <p className="text-sm text-center text-gray-500">
              {getMetadata(content, 'haveAccountText')}{' '}
              <a
                href="https://portal.archpad.pro/sign-in"
                className="text-[#7CB342] hover:underline font-medium"
              >
                {getMetadata(content, 'loginLink')}
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
