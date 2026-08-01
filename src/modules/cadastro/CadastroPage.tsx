import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Building2, User } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../components/ui';
import { PublicLayout } from '../../auth/layouts';
import { SessionLoadingScreen } from '../../auth/components';
import { authApi } from '../../auth/api';
import { applyLoginResponse } from '../../auth/services';
import { getApiErrorMessage } from '../../auth/utils';
import type { LoginResponse } from '../../auth/types';
import {
  useCompleteOnboarding,
  useSaveAddress,
  useSaveCompanyData,
  useSavePersonalData,
  useSavePersonalization,
} from '../../onboarding';
import { toE164BR, toIsoDate } from '../../lib/masks';
import { AccountTypeSelector } from './components/AccountTypeSelector';
import { StepAcesso } from './components/StepAcesso';
import { StepConfirmarEmail } from './components/StepConfirmarEmail';
import { StepDadosPessoais } from './components/StepDadosPessoais';
import { StepEmpresaDados } from './components/StepEmpresaDados';
import { StepEndereco } from './components/StepEndereco';
import { StepPersonalizacao } from './components/StepPersonalizacao';
import { StepConfirmacao } from './components/StepConfirmacao';
import { StepSucessoCliente } from './components/StepSucessoCliente';
import { StepSucessoEmpresa } from './components/StepSucessoEmpresa';
import { useCadastroWizard } from './hooks/useCadastroWizard';
import type { AcessoData } from './schemas/cadastro.schemas';

const SELECTION_SUPPORT_TEXT =
  'Comece criando sua conta e tenha acesso a todos os recursos da plataforma. Escolha o tipo de conta que melhor atende às suas necessidades.';
const WIZARD_SUPPORT_TEXT =
  'Crie sua conta e tenha acesso a todos os recursos da plataforma para gerenciar, colaborar e crescer com mais eficiência.';

/** "Burra": só lê `useCadastroWizard` e decide qual Step renderizar dentro do `PublicLayout`. */
export function CadastroPage() {
  const wizard = useCadastroWizard();
  const { accountType, currentStep, currentStepId, stepsConfig, data, goToNextStep, goToPreviousStep, saveStepData, isResumingDraft } =
    wizard;

  /**
   * Guarda a sessão nova até o clique em "Acessar portal" (ver comentário em
   * `useCompleteOnboarding`) — aplicar antes disso faria o `GuestGuard`
   * redirecionar para `/` assim que `currentAccount` deixasse de ser `null`,
   * pulando o step de Sucesso inteiro.
   */
  const [pendingSession, setPendingSession] = useState<LoginResponse | null>(null);

  const registerMutation = useMutation({
    mutationFn: (values: AcessoData) =>
      authApi.register({
        firstName: values.nome,
        lastName: values.sobrenome,
        email: values.email,
        password: values.senha,
        accountType: accountType === 'empresa' ? 'COMPANY' : 'CUSTOMER',
      }),
    onSuccess: (_response, values) => {
      saveStepData('acesso', values);
      goToNextStep();
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Não foi possível criar sua conta.')),
  });

  /** Confirma o código e, em seguida, loga automaticamente — `verify-email` não emite sessão sozinho. */
  const confirmEmailMutation = useMutation({
    mutationFn: async (codigo: string) => {
      await authApi.verifyEmail({ email: data.acesso!.email, code: codigo });
      return authApi.login({ email: data.acesso!.email, password: data.acesso!.senha, authProvider: 'LOCAL' });
    },
    onSuccess: (loginResponse, codigo) => {
      applyLoginResponse(loginResponse);
      saveStepData('confirmarEmail', { codigo });
      goToNextStep();
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Não foi possível confirmar seu e-mail.')),
  });

  const resendMutation = useMutation({
    mutationFn: () => authApi.resendVerification({ email: data.acesso!.email }),
    onSuccess: () => toast.success('Um novo código foi enviado para o seu e-mail.'),
    onError: (error) => toast.error(getApiErrorMessage(error, 'Não foi possível reenviar o código.')),
  });

  const savePersonalData = useSavePersonalData();
  const saveCompanyData = useSaveCompanyData();
  const saveAddress = useSaveAddress();
  const savePersonalization = useSavePersonalization();
  const completeOnboarding = useCompleteOnboarding();

  if (isResumingDraft) {
    return <SessionLoadingScreen />;
  }

  if (!accountType || currentStep < 0) {
    return (
      <PublicLayout supportText={SELECTION_SUPPORT_TEXT} thirdHighlightDescription="Recursos pensados para o seu sucesso">
        <AccountTypeSelector onSelect={wizard.selectAccountType} />
      </PublicLayout>
    );
  }

  const commonProps = {
    accountType,
    stepsConfig,
    currentStep,
  };

  return (
    <PublicLayout
      supportText={WIZARD_SUPPORT_TEXT}
      thirdHighlightDescription="Uma experiência personalizada"
      accountTypeBadge={
        <Badge variant="info" className="gap-1.5 bg-violet-50 py-1.5 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
          {accountType === 'empresa' ? <Building2 className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
          Tipo de conta selecionado: {accountType === 'empresa' ? 'Empresa' : 'Cliente'}
        </Badge>
      }
    >
      {currentStepId === 'acesso' && (
        <StepAcesso
          {...commonProps}
          defaultValues={data.acesso}
          onCancel={goToPreviousStep}
          onSubmit={(values) => registerMutation.mutate(values)}
          isSubmitting={registerMutation.isPending}
        />
      )}

      {currentStepId === 'confirmar-email' && (
        <StepConfirmarEmail
          {...commonProps}
          email={data.acesso?.email ?? ''}
          onBack={goToPreviousStep}
          onSubmit={(codigo) => confirmEmailMutation.mutate(codigo)}
          onResend={() => resendMutation.mutate()}
          isVerifying={confirmEmailMutation.isPending}
          isResending={resendMutation.isPending}
        />
      )}

      {currentStepId === 'dados-pessoais' && (
        <StepDadosPessoais
          {...commonProps}
          defaultValues={data.dadosPessoais}
          onBack={goToPreviousStep}
          isSubmitting={savePersonalData.isPending}
          onSubmit={(values) =>
            savePersonalData.mutate(
              {
                document: values.cpf,
                birthDate: toIsoDate(values.dataNascimento),
                phone: toE164BR(values.telefone),
                gender: values.genero,
              },
              {
                onSuccess: () => {
                  saveStepData('dadosPessoais', values);
                  goToNextStep();
                },
              },
            )
          }
        />
      )}

      {currentStepId === 'empresa' && (
        <StepEmpresaDados
          {...commonProps}
          defaultValues={data.empresaDados}
          onBack={goToPreviousStep}
          isSubmitting={saveCompanyData.isPending}
          onSubmit={(values) =>
            saveCompanyData.mutate(
              {
                corporateName: values.razaoSocial,
                tradeName: values.nomeFantasia,
                document: values.cnpj,
                email: values.emailEmpresa,
                phone: toE164BR(values.telefoneComercial),
                whatsapp: toE164BR(values.whatsapp),
                website: values.site || undefined,
              },
              {
                onSuccess: () => {
                  saveStepData('empresaDados', values);
                  goToNextStep();
                },
              },
            )
          }
        />
      )}

      {currentStepId === 'endereco' && (
        <StepEndereco
          {...commonProps}
          defaultValues={data.endereco}
          onBack={goToPreviousStep}
          isSubmitting={saveAddress.isPending}
          onSubmit={(values) =>
            saveAddress.mutate(
              {
                zipCode: values.cep,
                street: values.logradouro,
                number: values.numero,
                complement: values.complemento || undefined,
                district: values.bairro,
                city: values.cidade,
                state: values.estado,
                countryId: values.paisId,
              },
              {
                onSuccess: () => {
                  saveStepData('endereco', values);
                  goToNextStep();
                },
              },
            )
          }
        />
      )}

      {currentStepId === 'personalizacao' && (
        <StepPersonalizacao
          {...commonProps}
          defaultValues={data.personalizacao}
          onBack={goToPreviousStep}
          isSubmitting={savePersonalization.isPending}
          onSubmit={(values) =>
            savePersonalization.mutate(
              {
                accountName: values.nomeConta,
                logoUrl: values.logoUrl,
                language: values.idioma,
                timezone: values.timezone,
              },
              {
                onSuccess: () => {
                  saveStepData('personalizacao', values);
                  goToNextStep();
                },
              },
            )
          }
        />
      )}

      {currentStepId === 'confirmacao' && (
        <StepConfirmacao
          {...commonProps}
          data={data}
          onBack={goToPreviousStep}
          isSubmitting={completeOnboarding.isPending}
          onSubmit={(values) =>
            completeOnboarding.mutate(
              { termsAccepted: values.termos, privacyAccepted: values.privacidade },
              {
                onSuccess: (response) => {
                  setPendingSession(response);
                  saveStepData('confirmacao', values);
                  goToNextStep();
                },
              },
            )
          }
        />
      )}

      {currentStepId === 'sucesso' && accountType === 'cliente' && (
        <StepSucessoCliente {...commonProps} onAccessPortal={() => pendingSession && applyLoginResponse(pendingSession)} />
      )}
      {currentStepId === 'sucesso' && accountType === 'empresa' && (
        <StepSucessoEmpresa {...commonProps} onAccessPortal={() => pendingSession && applyLoginResponse(pendingSession)} />
      )}
    </PublicLayout>
  );
}
