'use client';

import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { usePageMeta } from '@/hooks/usePageMeta';
import {
  getTextBlockBySlug,
  getMetadata,
  getMetadataValue,
} from '@/lib/text-blocks';

export function Contact() {
  usePageMeta();
  const content = getTextBlockBySlug('contact');
  const subjectOptions = getMetadataValue<
    Array<{ value: string; label: string }>
  >(content, 'subjectOptions', []);
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreeToProcessing: false,
    agreeToContact: false,
  });

  // Установка темы из URL параметров
  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    if (subjectParam) {
      setFormData((prev) => ({ ...prev, subject: subjectParam }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSuccess(true);

    // Сброс через 5 секунд
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        agreeToProcessing: false,
        agreeToContact: false,
      });
    }, 5000);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Проверка валидности формы
  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.subject !== '' &&
      formData.message.trim() !== '' &&
      formData.agreeToProcessing
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F1F8E9] to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7CB342] transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            {getMetadata(content, 'backLink')}
          </Link>
          <div className="flex items-center gap-3">
            <Mail className="text-[#7CB342]" size={40} />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {getMetadata(content, 'pageTitle')}
              </h1>
              <p className="text-gray-600 mt-2">
                {getMetadata(content, 'pageSubtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info - Left Column */}
          <div className="space-y-6">
            {/* Контактная карточка */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {getMetadata(content, 'contactInfoTitle')}
                </h2>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#F1F8E9] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#7CB342]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {getMetadata(content, 'emailLabel')}
                    </p>
                    <a
                      href="mailto:info@archpad.ru"
                      className="text-gray-900 hover:text-[#7CB342] transition-colors"
                    >
                      {getMetadata(content, 'emailPrimary')}
                    </a>
                    <br />
                    <a
                      href="mailto:support@archpad.ru"
                      className="text-gray-900 hover:text-[#7CB342] transition-colors text-sm"
                    >
                      {getMetadata(content, 'emailSecondary')}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#F1F8E9] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#7CB342]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {getMetadata(content, 'phoneLabel')}
                    </p>
                    <a
                      href="tel:+74951234567"
                      className="text-gray-900 hover:text-[#7CB342] transition-colors"
                    >
                      {getMetadata(content, 'phoneValue')}
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      {getMetadata(content, 'phoneDescription')}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#F1F8E9] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#7CB342]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {getMetadata(content, 'addressLabel')}
                    </p>
                    <p className="text-gray-900">
                      {getMetadata(content, 'addressValue')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Дополнительная информация */}
            <div className="bg-gradient-to-br from-[#7CB342] to-[#689F38] rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-3">
                {getMetadata(content, 'helpTitle')}
              </h3>
              <p className="text-sm opacity-90 mb-4">
                {getMetadata(content, 'helpDescription')}
              </p>
              <Link
                to="/design-partner-program"
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
              >
                {getMetadata(content, 'helpLinkText')}
              </Link>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[#F1F8E9] rounded-full flex items-center justify-center">
                      <CheckCircle2 className="text-[#7CB342]" size={48} />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {getMetadata(content, 'successTitle')}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {getMetadata(content, 'successMessageLine1')}
                    <br />
                    {getMetadata(content, 'successMessageLine2')}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 text-gray-900"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {getMetadata(content, 'formTitle')}
                    </h2>
                    <p className="text-gray-600">
                      {getMetadata(content, 'formSubtitle')}
                    </p>
                  </div>

                  {/* Имя и Фамилия */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        {getMetadata(content, 'firstNameLabel')}
                      </Label>
                      <Input
                        id="firstName"
                        placeholder={getMetadata(
                          content,
                          'firstNamePlaceholder',
                        )}
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          handleChange('firstName', e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {getMetadata(content, 'lastNameLabel')}
                      </Label>
                      <Input
                        id="lastName"
                        placeholder={getMetadata(
                          content,
                          'lastNamePlaceholder',
                        )}
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          handleChange('lastName', e.target.value)
                        }
                      />
                    </div>
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

                  {/* Email и Телефон */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {getMetadata(content, 'emailFieldLabel')}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={getMetadata(
                          content,
                          'emailFieldPlaceholder',
                        )}
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        {getMetadata(content, 'phoneFieldLabel')}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={getMetadata(
                          content,
                          'phoneFieldPlaceholder',
                        )}
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Тематика обращения */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      {getMetadata(content, 'subjectLabel')}
                    </Label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-transparent bg-white text-gray-900"
                    >
                      <option value="">
                        {getMetadata(content, 'subjectPlaceholder')}
                      </option>
                      {subjectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Сообщение */}
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {getMetadata(content, 'messageLabel')}
                    </Label>
                    <textarea
                      id="message"
                      placeholder={getMetadata(content, 'messagePlaceholder')}
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-transparent bg-white text-gray-900 resize-none"
                    />
                  </div>

                  {/* Согласия */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="processing"
                        required
                        checked={formData.agreeToProcessing}
                        onCheckedChange={(checked) =>
                          handleChange('agreeToProcessing', checked as boolean)
                        }
                      />
                      <div className="text-sm text-gray-700 leading-relaxed">
                        {getMetadata(content, 'agreeProcessingText')}{' '}
                        <a
                          href="/privacy"
                          className="text-[#7CB342] hover:underline font-medium"
                        >
                          {getMetadata(content, 'agreeProcessingLink')}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="contact"
                        checked={formData.agreeToContact}
                        onCheckedChange={(checked) =>
                          handleChange('agreeToContact', checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="contact"
                        className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                      >
                        {getMetadata(content, 'agreeContactText')}
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-8 py-3 bg-[#7CB342] hover:bg-[#689F38] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#7CB342] disabled:hover:shadow-lg flex items-center justify-center gap-2"
                    disabled={!isFormValid()}
                  >
                    <Send size={20} />
                    {getMetadata(content, 'submitButton')}
                  </button>

                  <p className="text-xs text-center text-gray-500">
                    {getMetadata(content, 'termsAgreementPrefix')}{' '}
                    <Link
                      to="/terms"
                      className="text-[#7CB342] hover:underline"
                    >
                      {getMetadata(content, 'termsAgreementLink')}
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
