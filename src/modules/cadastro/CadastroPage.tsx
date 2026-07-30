import { Building2, User } from 'lucide-react';
import { Badge } from '../../components/ui';
import { AccountTypeSelector } from './components/AccountTypeSelector';
import { AuthLayout } from './components/AuthLayout';
import { StepAcesso } from './components/StepAcesso';
import { StepConfirmarEmail } from './components/StepConfirmarEmail';
import { StepConta } from './components/StepConta';
import { StepEmpresaDados } from './components/StepEmpresaDados';
import { StepEmpresaEndereco } from './components/StepEmpresaEndereco';
import { StepSucessoCliente } from './components/StepSucessoCliente';
import { StepSucessoEmpresa } from './components/StepSucessoEmpresa';
import { useCadastroWizard } from './hooks/useCadastroWizard';

const SELECTION_SUPPORT_TEXT =
  'Comece criando sua conta e tenha acesso a todos os recursos da plataforma. Escolha o tipo de conta que melhor atende às suas necessidades.';
const WIZARD_SUPPORT_TEXT =
  'Crie sua conta e tenha acesso a todos os recursos da plataforma para gerenciar, colaborar e crescer com mais eficiência.';

/** "Burra": só lê `useCadastroWizard` e decide qual Step renderizar dentro do `AuthLayout`. */
export function CadastroPage() {
  const wizard = useCadastroWizard();
  const { accountType, currentStep, currentStepId, stepsConfig, data, goToNextStep, goToPreviousStep, saveStepData } = wizard;

  if (!accountType || currentStep < 0) {
    return (
      <AuthLayout supportText={SELECTION_SUPPORT_TEXT} thirdHighlightDescription="Recursos pensados para o seu sucesso">
        <AccountTypeSelector onSelect={wizard.selectAccountType} />
      </AuthLayout>
    );
  }

  const commonProps = {
    accountType,
    stepsConfig,
    currentStep,
  };

  return (
    <AuthLayout
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
          onSubmit={(values) => {
            saveStepData('acesso', values);
            goToNextStep();
          }}
        />
      )}

      {currentStepId === 'confirmar-email' && (
        <StepConfirmarEmail
          {...commonProps}
          email={data.acesso?.email ?? ''}
          onBack={goToPreviousStep}
          onSubmit={(codigo) => {
            saveStepData('confirmarEmail', { codigo });
            goToNextStep();
          }}
        />
      )}

      {currentStepId === 'conta' && (
        <StepConta
          {...commonProps}
          defaultValues={data.conta}
          onBack={goToPreviousStep}
          onSubmit={(values) => {
            saveStepData('conta', values);
            goToNextStep();
          }}
        />
      )}

      {currentStepId === 'empresa' && (
        <StepEmpresaDados
          {...commonProps}
          defaultValues={data.empresaDados}
          onBack={goToPreviousStep}
          onSubmit={(values) => {
            saveStepData('empresaDados', values);
            goToNextStep();
          }}
        />
      )}

      {currentStepId === 'endereco' && (
        <StepEmpresaEndereco
          {...commonProps}
          defaultValues={data.empresaEndereco}
          onBack={goToPreviousStep}
          onSubmit={(values) => {
            saveStepData('empresaEndereco', values);
            goToNextStep();
          }}
        />
      )}

      {currentStepId === 'sucesso' && accountType === 'cliente' && <StepSucessoCliente {...commonProps} />}
      {currentStepId === 'sucesso' && accountType === 'empresa' && <StepSucessoEmpresa {...commonProps} />}
    </AuthLayout>
  );
}
