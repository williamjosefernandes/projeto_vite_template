import { useState } from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { Badge, Card, Checkbox, CheckboxField, CodeBlock, Typography } from '../../../components/ui';

const guidelines = [
  'Use para seleções múltiplas e independentes entre si.',
  'Ideal para listas de itens, filtros e preferências.',
  'Garanta área de clique mínima de 44px (label completo, não só a caixa).',
  'Use o estado indeterminado apenas para representar seleção parcial de um grupo.',
  'Não use checkbox isolado para ações binárias simples — prefira Switch.',
  'Mantenha os rótulos curtos e específicos sobre o que será marcado.',
];

const bestPractices = 'Mantenha grupos de checkbox curtos e organizados — acima de 8-10 itens, considere agrupar por categoria ou usar um campo de busca dentro da lista.';

const tokens = [
  { label: 'Tamanho da caixa (sm)', value: '16×16px' },
  { label: 'Tamanho da caixa (md, padrão)', value: '20×20px' },
  { label: 'Tamanho da caixa (lg)', value: '24×24px' },
  { label: 'Espessura da borda (padrão)', value: '1.5px (sm)' },
  { label: 'Espessura da borda (ênfase)', value: '2px (md/lg)' },
  { label: 'Raio da borda (sm)', value: '2px' },
  { label: 'Raio da borda (md/lg)', value: '4px' },
  { label: 'Cor padrão-borda', value: 'gray-300 / gray-700' },
  { label: 'Cor selecionado-fundo', value: 'violet-600' },
  { label: 'Cor ícone-check', value: 'white' },
  { label: 'Cor indeterminado-ícone', value: 'white (traço)' },
  { label: 'Cor desabilitado', value: 'opacity 50%' },
];

const listItems = ['Revisar relatório financeiro', 'Aprovar orçamento do trimestre', 'Atualizar cadastro de fornecedores'];
const filters = ['Ativos', 'Pendentes', 'Arquivados', 'Cancelados'];
const preferences = [
  { label: 'Notificações por e-mail', description: 'Receba resumos e alertas por e-mail.' },
  { label: 'Notificações push', description: 'Alertas em tempo real no navegador.' },
  { label: 'Relatório semanal', description: 'Resumo de atividades toda segunda-feira.' },
];

const codeExample = `<label className="flex items-center gap-2">
  <Checkbox checked={checked} onCheckedChange={setChecked}>
    <Checkbox.Indicator>
      <CheckIcon className="h-3.5 w-3.5" />
    </Checkbox.Indicator>
  </Checkbox>
  Aceito os termos de uso
</label>`;

function CardTitle({ children }: { children: string }) {
  return (
    <Typography as="h2" variant="h2" className="text-base">
      {children}
    </Typography>
  );
}

function SelectAllGroup() {
  const [checked, setChecked] = useState<Record<string, boolean>>({ a: true, b: true, c: false, d: false });
  const values = Object.values(checked);
  const allChecked = values.every(Boolean);
  const someChecked = values.some(Boolean) && !allChecked;

  function toggleAll(value: boolean) {
    setChecked({ a: value, b: value, c: value, d: value });
  }

  return (
    <div className="space-y-2">
      <CheckboxField
        id="select-all"
        label="Selecionar tudo"
        checked={allChecked ? true : someChecked ? 'indeterminate' : false}
        onCheckedChange={(v) => toggleAll(v === true)}
      />
      <div className="ml-6 space-y-2 border-l border-gray-200 pl-4 dark:border-gray-800">
        {(['a', 'b', 'c', 'd'] as const).map((key, i) => (
          <CheckboxField
            key={key}
            id={`child-${key}`}
            label={`Item ${i + 1}`}
            checked={checked[key]}
            onCheckedChange={(v) => setChecked((prev) => ({ ...prev, [key]: v === true }))}
          />
        ))}
      </div>
    </div>
  );
}

export function CheckboxPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr_320px]">
        <Card>
          <Card.Header>
            <CardTitle>Visão Geral</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-3">
            <Typography>
              Use <code>Checkbox</code> quando o usuário precisa marcar zero, uma ou várias opções de forma independente
              entre si.
            </Typography>
            <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p>Ideal para listas de itens, filtros e preferências.</p>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Anatomia</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="flex items-start gap-4 rounded-lg border border-dashed border-gray-200 p-4 dark:border-gray-700">
              <Checkbox id="anatomy-checkbox" checked className="mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Rótulo da opção</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Descrição auxiliar (opcional)</p>
              </div>
            </div>
            <ul className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
              <li>1. Caixa — contorno do estado atual</li>
              <li>2. Ícone — check ou traço (indeterminado)</li>
              <li>3. Estado — marcado, preenchimento violet-600</li>
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
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
            <div>
              <Typography variant="caption" className="normal-case">Padrão</Typography>
              <Checkbox id="state-default" className="mt-2" />
            </div>
            <div>
              <Typography variant="caption" className="normal-case">Selecionado</Typography>
              <Checkbox id="state-checked" checked className="mt-2" />
            </div>
            <div>
              <Typography variant="caption" className="normal-case">Indeterminado</Typography>
              <Checkbox id="state-indeterminate" checked="indeterminate" className="mt-2" />
            </div>
            <div>
              <Typography variant="caption" className="normal-case">Desabilitado</Typography>
              <Checkbox id="state-disabled" disabled className="mt-2" />
            </div>
            <div>
              <Typography variant="caption" className="normal-case">Desab. selecionado</Typography>
              <Checkbox id="state-disabled-checked" checked disabled className="mt-2" />
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
                <Typography variant="caption" className="normal-case">Pequeno (sm, 16×16px)</Typography>
                <Checkbox id="size-sm" checked size="sm" className="mt-2" />
              </div>
              <div>
                <Typography variant="caption" className="normal-case">Médio (md, 20×20px — padrão)</Typography>
                <Checkbox id="size-md" checked size="md" className="mt-2" />
              </div>
              <div>
                <Typography variant="caption" className="normal-case">Grande (lg, 24×24px)</Typography>
                <Checkbox id="size-lg" checked size="lg" className="mt-2" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Tokens do Checkbox</CardTitle>
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <Card.Header>
            <CardTitle>Lista de itens</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-2">
            {listItems.map((item) => (
              <CheckboxField key={item} id={item} label={item} />
            ))}
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Filtros</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-2">
            {filters.map((f, i) => (
              <CheckboxField key={f} id={`filter-${f}`} label={f} defaultChecked={i < 2} />
            ))}
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Preferências</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-3">
            {preferences.map((p) => (
              <CheckboxField key={p.label} id={p.label} label={p.label} description={p.description} defaultChecked />
            ))}
          </Card.Body>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Card.Header>
            <CardTitle>Grupo com Selecionar tudo</CardTitle>
            <Badge variant="info">indeterminate</Badge>
          </Card.Header>
          <Card.Body>
            <SelectAllGroup />
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

      <div className="flex items-start gap-2 rounded-lg bg-violet-50 p-3 text-sm text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>{bestPractices}</p>
      </div>
    </div>
  );
}
