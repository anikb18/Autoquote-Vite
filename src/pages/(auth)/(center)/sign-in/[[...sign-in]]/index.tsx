'use client';

import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { getSupabaseClient } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export default function SignInPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="mt-10 sm:mt-16 sm:mx-auto sm:w-full sm:max-w-[480px] animate-fade-up">
      <div className="bg-white rounded-[24px] shadow-lg">
        <div className="px-8 py-10 sm:px-10">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Se connecter
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Connectez-vous à votre compte pour accéder à votre tableau de bord
            </p>
          </div>

          <Auth
            supabaseClient={supabase}
            view="sign_in"
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#446df6',
                    brandAccent: '#446df6',
                  },
                  radii: {
                    borderRadiusButton: '0.5rem',
                    buttonBorderRadius: '0.5rem',
                    inputBorderRadius: '0.5rem',
                  },
                },
              },
              className: {
                container: 'supabase-container',
                button: 'supabase-button',
                input: 'supabase-input',
                label: 'supabase-label',
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Adresse courriel',
                  password_label: 'Mot de passe',
                  email_input_placeholder: 'Votre adresse courriel',
                  password_input_placeholder: 'Votre mot de passe',
                  button_label: 'Se connecter',
                  loading_button_label: 'Connexion en cours...',
                  social_provider_text: 'Continuer avec {{provider}}',
                  link_text: 'Vous avez déjà un compte? Se connecter',
                },
                sign_up: {
                  email_label: 'Adresse courriel',
                  password_label: 'Mot de passe',
                  email_input_placeholder: 'Votre adresse courriel',
                  password_input_placeholder: 'Votre mot de passe',
                  button_label: "S'inscrire",
                  loading_button_label: 'Inscription en cours...',
                  social_provider_text: 'Continuer avec {{provider}}',
                  link_text: "Vous n'avez pas de compte? S'inscrire",
                },
                forgotten_password: {
                  email_label: 'Adresse courriel',
                  password_label: 'Mot de passe',
                  email_input_placeholder: 'Votre adresse courriel',
                  button_label: 'Envoyer les instructions',
                  loading_button_label: 'Envoi des instructions en cours...',
                  link_text: 'Mot de passe oublié?',
                },
              },
            }}
            providers={['google']}
            theme="default"
            onlyThirdPartyProviders={false}
          />
        </div>
      </div>
    </div>
  );
}
