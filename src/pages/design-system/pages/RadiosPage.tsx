import { CheckCircle2, Info } from 'lucide-react';
import { Card, CodeBlock, RadioGroup, Typography } from '../../../components/ui';

const guidelines = [
  'Use para seleção única entre opções mutuamente exclusivas.',
  'Mantenha o número de opções entre 2 e 6 — acima disso, prefira Select.',
  'Sempre marque um valor padrão quando fizer sentido para o fluxo.',
  'Alinhe os rótulos verticalmente para facilitar a leitura em grupo.',
  'Garanta área de clique mínima de 44px (label completo, não só o círculo).',
];

const bestPractices = [
  'Nunca use radio para seleções múltiplas — use Checkbox.',
  'Evite pré-selecionar uma opção que tenha custo/risco associado.',
  'Combine com descrição quando a opção não for autoexplicativa.',
  'Teste a navegação por teclado (setas movem entre opções do grupo).',
  'Use o estado de erro apenas após uma tentativa de envio, não no carregamento inicial.',
];

const tokens = [
  { label: 'Tamanho (sm)', value: '16px de diâmetro' },
  { label: 'Tamanho (md, padrão)', value: '20px de diâmetro' },
  { label: 'Tamanho (lg)', value: '24px de diâmetro' },
  { label: 'Espessura da borda (sm)', value: '1.5px' },
  { label: 'Espessura da borda (md/lg)', value: '2px' },
  { label: 'Cor padrão', value: 'color-border-neutral (gray-300 / gray-700)' },
  { label: 'Cor selecionado', value: 'color-primary-600 (violet-600)' },
  { label: 'Cor de erro', value: 'color-danger-500 (red-500)' },
  { label: 'Cor desabilitado', value: 'opacity 50%' },
];

const codeExample = `<RadioGroup defaultValue="monthly">
  <RadioGroup.Field
    id="plan-monthly"
    value="monthly"
    label="Mensal"
    description="Cobrado a cada 30 dias."
  />
  <RadioGroup.Field
    id="plan-yearly"
    value="yearly"
    label="Anual"
    description="2 meses grátis."
  />
</RadioGroup>`;

function CardTitle({ children }: { children: string }) {
  return (
    <Typography as="h2" variant="h2" className="text-base">
      {children}
    </Typography>
  );
}

export function RadiosPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr_320px]">
        <Card>
          <Card.Header>
            <CardTitle>Visão Geral</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-3">
            <Typography>
              Use <code>Radio</code> quando o usuário precisa escolher exatamente uma opção entre um conjunto pequeno e
              visível de alternativas mutuamente exclusivas.
            </Typography>
            <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p>A seleção é exclusiva dentro do mesmo grupo (mesmo `name`, controlado pelo `RadioGroup`).</p>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Anatomia</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="flex items-start gap-4 rounded-lg border border-dashed border-gray-200 p-4 dark:border-gray-700">
              <RadioGroup defaultValue="a" className="pt-0.5">
                <RadioGroup.Item value="a" id="anatomy-radio" />
              </RadioGroup>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Rótulo da opção</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Descrição auxiliar (opcional)</p>
              </div>
            </div>
            <ul className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
              <li>1. Círculo externo — borda do estado atual</li>
              <li>2. Círculo interno — bolinha de seleção</li>
              <li>3. Estado selecionado — preenchimento violet-600</li>
              <li>4. Rótulo — texto principal, sempre presente</li>
              <li>5. Descrição — texto de apoio, opcional</li>
            </ul>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Diretrizes de Uso</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-2">
            {guidelines.map((g) => (
              <div key={g} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                <span>{g}</span>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <CardTitle>Estados</CardTitle>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            <div>
              <Typography variant="caption" className="normal-case">Padrão</Typography>
              <RadioGroup className="mt-2 space-y-2">
                <RadioGroup.Field id="std-1" value="1" label="Opção A" />
                <RadioGroup.Field id="std-2" value="2" label="Opção B" />
                <RadioGroup.Field id="std-3" value="3" label="Opção C" />
              </RadioGroup>
            </div>
            <div>
              <Typography variant="caption" className="normal-case">Selecionado</Typography>
              <RadioGroup defaultValue="2" className="mt-2 space-y-2">
                <RadioGroup.Field id="sel-1" value="1" label="Opção A" />
                <RadioGroup.Field id="sel-2" value="2" label="Opção B" />
                <RadioGroup.Field id="sel-3" value="3" label="Opção C" />
              </RadioGroup>
            </div>
            <div>
              <Typography variant="caption" className="normal-case">Desabilitado</Typography>
              <RadioGroup className="mt-2 space-y-2">
                <RadioGroup.Field id="dis-1" value="1" label="Opção A" disabled />
                <RadioGroup.Field id="dis-2" value="2" label="Opção B" disabled />
                <RadioGroup.Field id="dis-3" value="3" label="Opção C" disabled />
              </RadioGroup>
            </div>
            <div>
              <Typography variant="caption" className="normal-case">Desab. selecionado</Typography>
              <RadioGroup defaultValue="1" className="mt-2 space-y-2">
                <RadioGroup.Field id="disel-1" value="1" label="Opção A" disabled />
                <RadioGroup.Field id="disel-2" value="2" label="Opção B" disabled />
                <RadioGroup.Field id="disel-3" value="3" label="Opção C" disabled />
              </RadioGroup>
            </div>
            <div>
              <Typography variant="caption" className="normal-case">Com descrição</Typography>
              <RadioGroup defaultValue="std" className="mt-2 space-y-3">
                <RadioGroup.Field id="desc-1" value="std" label="Padrão" description="Entrega em 5-7 dias." />
                <RadioGroup.Field id="desc-2" value="exp" label="Expressa" description="Entrega em 1-2 dias." />
              </RadioGroup>
            </div>
          </div>
        </Card.Body>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <Card>
          <Card.Header>
            <CardTitle>Tamanhos</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <Typography variant="caption" className="normal-case">Pequeno (sm, 16px)</Typography>
                <RadioGroup defaultValue="1" className="mt-2">
                  <RadioGroup.Field id="size-sm" value="1" label="Opção" size="sm" />
                </RadioGroup>
              </div>
              <div>
                <Typography variant="caption" className="normal-case">Médio (md, 20px — padrão)</Typography>
                <RadioGroup defaultValue="1" className="mt-2">
                  <RadioGroup.Field id="size-md" value="1" label="Opção" size="md" />
                </RadioGroup>
              </div>
              <div>
                <Typography variant="caption" className="normal-case">Grande (lg, 24px)</Typography>
                <RadioGroup defaultValue="1" className="mt-2">
                  <RadioGroup.Field id="size-lg" value="1" label="Opção" size="lg" />
                </RadioGroup>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Tokens de Radios</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-2">
            {tokens.map((t) => (
              <div key={t.label} className="flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 text-xs last:border-0 dark:border-gray-800/60">
                <span className="text-gray-500 dark:text-gray-400">{t.label}</span>
                <span className="font-mono text-gray-700 dark:text-gray-200">{t.value}</span>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Card.Header>
            <CardTitle>Composição em Forms</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-4">
            <div>
              <Typography variant="caption" className="normal-case">Grupo de opções</Typography>
              <RadioGroup defaultValue="pro" className="mt-2 space-y-2">
                <RadioGroup.Field id="form-free" value="free" label="Gratuito" description="Recursos básicos." />
                <RadioGroup.Field id="form-pro" value="pro" label="Pro" description="Recursos avançados e suporte prioritário." />
                <RadioGroup.Field id="form-enterprise" value="enterprise" label="Enterprise" description="Para grandes equipes." />
              </RadioGroup>
            </div>
            <div>
              <Typography variant="caption" className="normal-case">Com validação</Typography>
              <RadioGroup className="mt-2 space-y-2">
                <RadioGroup.Field id="err-1" value="1" label="Opção A" error />
                <RadioGroup.Field id="err-2" value="2" label="Opção B" error />
              </RadioGroup>
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">Selecione uma opção para continuar.</p>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Código (Exemplo)</CardTitle>
          </Card.Header>
          <Card.Body>
            <CodeBlock language="TS" code={codeExample} />
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <CardTitle>Boas Práticas</CardTitle>
        </Card.Header>
        <Card.Body className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {bestPractices.map((p) => (
            <div key={p} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
              <span>{p}</span>
            </div>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}
