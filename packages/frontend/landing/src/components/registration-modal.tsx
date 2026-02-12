'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Rocket, CheckCircle2 } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация email
    if (formData.email !== formData.confirmEmail) {
      alert('Email адреса не совпадают');
      return;
    }

    console.log('Form submitted:', formData);
    setIsSuccess(true);
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
      formData.agreeToPrivacy
    );
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Сбросить ошибку при изменении email полей
    if (field === 'email' || field === 'confirmEmail') {
      setEmailError('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Rocket className="text-[#7CB342]" size={28} />
                Начните бесплатно
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Заполните форму, чтобы получить доступ к ArchPad. Это займет
                всего минуту!
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              {/* Имя и Фамилия */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя *</Label>
                  <Input
                    id="firstName"
                    placeholder="Иван"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия *</Label>
                  <Input
                    id="lastName"
                    placeholder="Петров"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ivan.petrov@company.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>

              {/* Подтверждение Email */}
              <div className="space-y-2">
                <Label htmlFor="confirmEmail">Подтвердите Email *</Label>
                <Input
                  id="confirmEmail"
                  type="email"
                  placeholder="ivan.petrov@company.com"
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
                <Label htmlFor="company">Название компании</Label>
                <Input
                  id="company"
                  placeholder="ООО «Ваша компания»"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                />
              </div>

              {/* Роль */}
              <div className="space-y-2">
                <Label htmlFor="role">Ваша роль *</Label>
                <select
                  id="role"
                  required
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-transparent bg-white text-gray-900"
                >
                  <option value="">Выберите роль</option>
                  <option value="architect">Архитектор</option>
                  <option value="cto">CTO / Технический директор</option>
                  <option value="tech-lead">Tech Lead</option>
                  <option value="pm">Project Manager</option>
                  <option value="dev">Разработчик</option>
                  <option value="analyst">Бизнес-аналитик</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              {/* Тип рабочего пространства */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Выберите тип рабочего пространства
                </Label>

                <RadioGroup
                  value={formData.workspaceType}
                  onValueChange={(value) =>
                    handleChange('workspaceType', value)
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="shared" id="shared" />
                    <Label
                      htmlFor="shared"
                      className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                    >
                      Я хочу присоединиться к общему демо-пространству
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="personal" id="personal" />
                    <Label
                      htmlFor="personal"
                      className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                    >
                      Я хочу создать личное рабочее пространство
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
                    Я согласен с{' '}
                    <a
                      href="#"
                      className="text-[#7CB342] hover:underline font-medium"
                    >
                      условиями использования
                    </a>
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
                    Я согласен с{' '}
                    <a
                      href="#"
                      className="text-[#7CB342] hover:underline font-medium"
                    >
                      политикой конфиденциальности
                    </a>
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
                    Я согласен на получение информационных и рекламных
                    материалов
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-3 bg-[#7CB342] hover:bg-[#689F38] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#7CB342] disabled:hover:shadow-lg"
                disabled={!isFormValid()}
              >
                Зарегистрироваться
              </button>

              <p className="text-xs text-center text-gray-500">
                У вас уже есть аккаунт?{' '}
                <a
                  href="#"
                  className="text-[#7CB342] hover:underline font-medium"
                >
                  Войти
                </a>
              </p>
            </form>
          </>
        ) : (
          // Success State
          <div className="py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#F1F8E9] rounded-full flex items-center justify-center">
                <CheckCircle2 className="text-[#7CB342]" size={36} />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              Спасибо за регистрацию!
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Мы отправили письмо с подтверждением на{' '}
              <strong>{formData.email}</strong>.
              <br />
              Проверьте почту, чтобы активировать аккаунт.
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
