'use client';

import { SignIn } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface Props {
  params: { locale: string };
}

export default function DealerLoginPage({
  params: { locale },
}: Props) {
  const t = useTranslations('auth');

  return (
    <div className="mt-10 sm:mt-16 sm:mx-auto sm:w-full sm:max-w-[480px] animate-fade-up">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-[conic-gradient(from_0deg_at_50%_50%,#003139_0%,#0496ff_25%,#446df6_50%,#9b4bff_75%,#003139_100%)] rounded-[28px] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#003139]/10 via-[#0496ff]/8 to-[#9b4bff]/5 rounded-[24px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#446df6_0%,_#0496ff_50%,_#003139_100%)] opacity-[0.08] rounded-[24px]" />
          <div className="mx-4 overflow-hidden rounded-[24px] bg-white/90 shadow-[0_4px_40px_-4px_rgba(0,49,57,0.12)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_8px_50px_-4px_rgba(4,150,255,0.25)] hover:bg-white hover:scale-[1.001] sm:mx-0">
            <div className="relative px-8 py-10 sm:px-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#003139_0%,_transparent_100%)] opacity-[0.03]" />
              
              <div className="mb-6 flex items-center justify-center space-x-1.5 text-[13px] font-medium text-gray-600">
                <span>{t('userLogin')}</span>
                <span>{t('or')}</span>
                <Link 
                  href={`/${locale}/sign-in`}
                  className="text-[#446df6] transition-all duration-300 hover:text-[#0496ff] hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t('clickHere')}
                </Link>
              </div>

              <SignIn
                path={`/${locale}/dealer-login`}
                routing="path"
                signUpUrl={`/${locale}/dealer-sign-up`}
                afterSignInUrl={`/${locale}/dealer/dashboard`}
                appearance={{
                  elements: {
                    rootBox: "w-full flex flex-col items-center",
                    card: "shadow-none w-full",
                    header: "hidden",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    logoBox: "hidden",
                    logo: "hidden",
                    main: "w-full",
                    footer: "hidden",
                    footerAction: "hidden",
                    badge: "hidden",
                    socialButtonsIconButton: "w-full flex justify-center items-center gap-2.5 rounded-[14px] border border-gray-200 bg-white/90 px-4 py-3 text-[15px] font-medium text-gray-700 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md hover:scale-[1.01] hover:border-[#446df6]/20 active:scale-[0.99]",
                    socialButtonsBlockButton: "w-full flex justify-center items-center gap-2.5 rounded-[14px] border border-gray-200 bg-white/90 px-4 py-3 text-[15px] font-medium text-gray-700 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md hover:scale-[1.01] hover:border-[#446df6]/20 active:scale-[0.99]",
                    dividerLine: "bg-gray-200",
                    dividerText: "text-[15px] text-gray-500",
                    formFieldLabel: "block text-[15px] font-medium text-gray-700 transition-opacity duration-200",
                    formFieldInput: "mt-1.5 block w-full appearance-none rounded-[14px] border border-gray-200 bg-white/90 px-4 py-3 text-[15px] placeholder-gray-400 shadow-sm transition-all duration-300 focus:border-[#446df6] focus:bg-white focus:outline-none focus:ring-[#446df6] hover:border-gray-300 focus:shadow-[0_2px_12px_-4px_rgba(68,109,246,0.16)] focus:scale-[1.001]",
                    formButtonPrimary: "w-full flex justify-center py-3 px-4 border border-transparent rounded-[14px] shadow-sm text-[15px] font-medium text-white bg-[#446df6] transition-all duration-300 hover:bg-[#446df6]/90 hover:shadow-md hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#446df6] active:scale-[0.99]",
                    formFieldAction: "text-[15px] font-medium text-[#446df6] transition-all duration-300 hover:text-[#446df6]/80 hover:scale-[1.01] active:scale-[0.99]",
                    formFieldSuccessText: "mt-2.5 text-[15px] text-green-600 animate-fade-in",
                    formFieldErrorText: "mt-2.5 text-[15px] text-red-600 animate-shake",
                    identityPreviewText: "text-[15px] text-gray-600",
                    identityPreviewEditButton: "text-[15px] font-medium text-[#446df6] transition-all duration-300 hover:text-[#446df6]/80 hover:scale-[1.01] active:scale-[0.99]",
                    formFieldInputShowPasswordButton: "transition-all duration-300 hover:text-[#446df6] hover:scale-[1.05] active:scale-[0.98]",
                    alternativeMethods: "hidden"
                  },
                  layout: {
                    socialButtonsPlacement: "bottom",
                    socialButtonsVariant: "iconButton",
                    dividerVariant: "span",
                  },
                  variables: {
                    colorPrimary: "#446df6",
                    colorText: "#374151",
                    colorTextSecondary: "#6B7280",
                    colorBackground: "#ffffff",
                    colorInputBackground: "#ffffff",
                    colorInputText: "#374151",
                    colorInputBorder: "#E5E7EB",
                    borderRadius: "14px",
                  }
                }}
              />

              <div className="mt-8 flex items-center justify-center space-x-1.5 text-[13px] font-medium text-gray-600">
                <span>{t('noDealerAccount')}</span>
                <Link 
                  href={`/${locale}/dealer-sign-up`}
                  className="text-[#446df6] transition-all duration-300 hover:text-[#0496ff] hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t('startHere')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
