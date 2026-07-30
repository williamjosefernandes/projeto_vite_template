import type { ReactNode } from 'react';
import { Card, CodeBlock, Typography } from '../../../components/ui';

const primaryScale = [
  { label: '50', className: 'bg-violet-50 border border-gray-200 dark:border-gray-700' },
  { label: '100', className: 'bg-violet-100' },
  { label: '300', className: 'bg-violet-300' },
  { label: '400', className: 'bg-violet-400' },
  { label: '600', className: 'bg-violet-600' },
  { label: '700', className: 'bg-violet-700' },
  { label: '800', className: 'bg-violet-800' },
  { label: '900', className: 'bg-violet-900' },
];

const semanticScale = [
  { label: 'Sucesso', className: 'bg-green-600' },
  { label: 'Informativo', className: 'bg-blue-600' },
  { label: 'Aviso', className: 'bg-amber-500' },
  { label: 'Erro', className: 'bg-red-600' },
  { label: 'Neutro', className: 'bg-gray-400' },
  { label: 'Indigo', className: 'bg-indigo-500' },
  { label: 'Roxo', className: 'bg-purple-500' },
  { label: 'Rosa', className: 'bg-pink-500' },
];

const neutralScale = [
  { label: '0', className: 'bg-white border border-gray-200 dark:border-gray-700' },
  { label: '50', className: 'bg-gray-50 border border-gray-200 dark:border-gray-700' },
  { label: '100', className: 'bg-gray-100' },
  { label: '200', className: 'bg-gray-200' },
  { label: '400', className: 'bg-gray-400' },
  { label: '500', className: 'bg-gray-500' },
  { label: '600', className: 'bg-gray-600' },
  { label: '700', className: 'bg-gray-700' },
  { label: '800', className: 'bg-gray-800' },
  { label: '900', className: 'bg-gray-900' },
  { label: '950', className: 'bg-gray-950' },
];

const typographyTokens = [
  { token: '--font-sans', family: 'Inter', weight: '400', size: '—', lineHeight: '—' },
  { token: 'text-xs', family: 'Inter', weight: '400', size: '12px', lineHeight: '16px' },
  { token: 'text-sm', family: 'Inter', weight: '400', size: '14px', lineHeight: '20px' },
  { token: 'text-base', family: 'Inter', weight: '400', size: '16px', lineHeight: '24px' },
  { token: 'text-lg', family: 'Inter', weight: '500', size: '18px', lineHeight: '28px' },
  { token: 'text-xl', family: 'Inter', weight: '600', size: '20px', lineHeight: '28px' },
  { token: 'text-2xl', family: 'Inter', weight: '600', size: '24px', lineHeight: '32px' },
  { token: 'text-3xl', family: 'Inter', weight: '700', size: '30px', lineHeight: '36px' },
  { token: 'text-4xl', family: 'Inter', weight: '700', size: '36px', lineHeight: '40px' },
];

const spacingTokens = [
  { token: 'p-0 / gap-0', rem: '0', px: '0px' },
  { token: 'p-1 / gap-1', rem: '0.25rem', px: '4px' },
  { token: 'p-2 / gap-2', rem: '0.5rem', px: '8px' },
  { token: 'p-3 / gap-3', rem: '0.75rem', px: '12px' },
  { token: 'p-4 / gap-4', rem: '1rem', px: '16px' },
  { token: 'p-6 / gap-6', rem: '1.5rem', px: '24px' },
  { token: 'p-8 / gap-8', rem: '2rem', px: '32px' },
  { token: 'p-10 / gap-10', rem: '2.5rem', px: '40px' },
  { token: 'p-12 / gap-12', rem: '3rem', px: '48px' },
  { token: 'p-16 / gap-16', rem: '4rem', px: '64px' },
];

const radiusTokens = [
  { token: 'rounded-none', rem: '0', px: '0px', className: 'rounded-none' },
  { token: 'rounded-sm', rem: '0.125rem', px: '2px', className: 'rounded-sm' },
  { token: 'rounded', rem: '0.25rem', px: '4px', className: 'rounded' },
  { token: 'rounded-md', rem: '0.375rem', px: '6px', className: 'rounded-md' },
  { token: 'rounded-lg', rem: '0.5rem', px: '8px', className: 'rounded-lg' },
  { token: 'rounded-xl', rem: '0.75rem', px: '12px', className: 'rounded-xl' },
  { token: 'rounded-2xl', rem: '1rem', px: '16px', className: 'rounded-2xl' },
  { token: 'rounded-full', rem: '9999px', px: '9999px', className: 'rounded-full' },
];

const shadowTokens = [
  { token: 'shadow-xs', className: 'shadow-xs' },
  { token: 'shadow-sm', className: 'shadow-sm' },
  { token: 'shadow-md', className: 'shadow-md' },
  { token: 'shadow-lg', className: 'shadow-lg' },
  { token: 'shadow-xl', className: 'shadow-xl' },
  { token: 'shadow-2xl', className: 'shadow-2xl' },
  { token: 'shadow-inner', className: 'shadow-inner' },
];

const borderTokens = [
  { token: 'border-0', value: '0px', className: 'border-0 border-gray-400 dark:border-gray-500' },
  { token: 'border', value: '1px solid', className: 'border border-gray-400 dark:border-gray-500' },
  { token: 'border-2', value: '2px solid', className: 'border-2 border-gray-400 dark:border-gray-500' },
  { token: 'border-4', value: '4px solid', className: 'border-4 border-gray-400 dark:border-gray-500' },
  { token: 'border-dashed', value: '1px dashed', className: 'border border-dashed border-gray-400 dark:border-gray-500' },
  { token: 'border-dotted', value: '1px dotted', className: 'border border-dotted border-gray-400 dark:border-gray-500' },
];

const zIndexTokens = [
  { token: 'z-0', usage: 'Base', value: '0' },
  { token: 'z-10', usage: 'Elementos elevados (sticky headers)', value: '10' },
  { token: 'z-20', usage: 'Sidebar / Topbar', value: '20' },
  { token: 'z-30', usage: 'Dropdown / Select / Popover', value: '30' },
  { token: 'z-40', usage: 'Tooltip', value: '40' },
  { token: 'z-50', usage: 'Modal / Dialog / Toast', value: '50' },
];

const opacityTokens = [
  { token: 'opacity-0', value: '0' },
  { token: 'opacity-25', value: '0.25' },
  { token: 'opacity-50', value: '0.5' },
  { token: 'opacity-75', value: '0.75' },
  { token: 'opacity-90', value: '0.9' },
  { token: 'opacity-100', value: '1' },
];

function CardTitle({ children }: { children: string }) {
  return (
    <Typography as="h2" variant="h2" className="text-base">
      {children}
    </Typography>
  );
}

function Th({ children }: { children: ReactNode }) {
  return (
    <th className="border-b border-gray-200 px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-gray-400 dark:border-gray-800">
      {children}
    </th>
  );
}

function Td({ children, mono = false }: { children: ReactNode; mono?: boolean }) {
  return (
    <td
      className={`border-b border-gray-100 px-3 py-2 text-sm text-gray-700 last:text-right dark:border-gray-800/60 dark:text-gray-200 ${mono ? 'font-mono text-xs' : ''}`}
    >
      {children}
    </td>
  );
}

const cssVariablesCode = `:root {
  --color-primary-600: #7C3AED;
  --space-4: 1rem;
  --radius-md: 0.375rem;
}

.btn-primary {
  background: var(--color-primary-600);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}`;

const tailwindConfigCode = `// tailwind.config / @theme (globals.css)
@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui;
  --color-violet-600: #7C3AED;
}`;

const jsTokensCode = `export const tokens = {
  colors: {
    primary: { 600: '#7C3AED' },
  },
  spacing: { 4: '1rem' },
  radius: { md: '0.375rem' },
} as const;`;

const reactCode = `const Button = ({ className, ...props }) => (
  <button
    className={cn(
      'bg-violet-600 rounded-md p-4',
      className,
    )}
    {...props}
  />
);`;

const jsonCode = `{
  "color": {
    "primary": {
      "600": { "value": "#7C3AED" }
    }
  },
  "spacing": {
    "4": { "value": "1rem" }
  }
}`;

export function TokensPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <Card.Header>
            <CardTitle>Cores</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-5">
            <div>
              <Typography variant="caption">Primárias</Typography>
              <div className="mt-2 flex flex-wrap gap-2">
                {primaryScale.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className={`h-10 w-10 rounded-md ${s.className}`} />
                    <p className="mt-1 text-[10px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Typography variant="caption">Semânticas</Typography>
              <div className="mt-2 grid grid-cols-4 gap-3">
                {semanticScale.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className={`mx-auto h-9 w-9 rounded-full ${s.className}`} />
                    <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Typography variant="caption">Neutras</Typography>
              <div className="mt-2 flex flex-wrap gap-2">
                {neutralScale.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className={`h-10 w-10 rounded-md ${s.className}`} />
                    <p className="mt-1 text-[10px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Tipografia</CardTitle>
          </Card.Header>
          <Card.Body className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th>Token</Th>
                  <Th>Família</Th>
                  <Th>Peso</Th>
                  <Th>Tamanho</Th>
                  <Th>Altura</Th>
                </tr>
              </thead>
              <tbody>
                {typographyTokens.map((t) => (
                  <tr key={t.token}>
                    <Td mono>{t.token}</Td>
                    <Td>{t.family}</Td>
                    <Td>{t.weight}</Td>
                    <Td>{t.size}</Td>
                    <Td>{t.lineHeight}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Espaçamento</CardTitle>
          </Card.Header>
          <Card.Body className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th>Token</Th>
                  <Th>Rem</Th>
                  <Th>Px</Th>
                </tr>
              </thead>
              <tbody>
                {spacingTokens.map((t) => (
                  <tr key={t.token}>
                    <Td mono>{t.token}</Td>
                    <Td>{t.rem}</Td>
                    <Td>{t.px}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <Card.Header>
            <CardTitle>Raios (Border Radius)</CardTitle>
          </Card.Header>
          <Card.Body className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th>Token</Th>
                  <Th>Rem</Th>
                  <Th>Px</Th>
                  <Th>Exemplo</Th>
                </tr>
              </thead>
              <tbody>
                {radiusTokens.map((t) => (
                  <tr key={t.token}>
                    <Td mono>{t.token}</Td>
                    <Td>{t.rem}</Td>
                    <Td>{t.px}</Td>
                    <td className="border-b border-gray-100 px-3 py-2 text-right dark:border-gray-800/60">
                      <div className={`ml-auto h-6 w-6 border-2 border-violet-500 ${t.className}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Sombras (Box Shadow)</CardTitle>
          </Card.Header>
          <Card.Body className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th>Token</Th>
                  <Th>Exemplo</Th>
                </tr>
              </thead>
              <tbody>
                {shadowTokens.map((t) => (
                  <tr key={t.token}>
                    <Td mono>{t.token}</Td>
                    <td className="border-b border-gray-100 px-3 py-2 text-right dark:border-gray-800/60">
                      <div className={`ml-auto h-6 w-10 rounded-md bg-white dark:bg-gray-800 ${t.className}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Bordas (Border)</CardTitle>
          </Card.Header>
          <Card.Body className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th>Token</Th>
                  <Th>Valor</Th>
                  <Th>Exemplo</Th>
                </tr>
              </thead>
              <tbody>
                {borderTokens.map((t) => (
                  <tr key={t.token}>
                    <Td mono>{t.token}</Td>
                    <Td>{t.value}</Td>
                    <td className="border-b border-gray-100 px-3 py-2 dark:border-gray-800/60">
                      <div className={`h-0 w-10 ${t.className}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Card.Header>
            <CardTitle>Z-Index</CardTitle>
          </Card.Header>
          <Card.Body className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th>Token</Th>
                  <Th>Uso</Th>
                  <Th>Valor</Th>
                </tr>
              </thead>
              <tbody>
                {zIndexTokens.map((t) => (
                  <tr key={t.token}>
                    <Td mono>{t.token}</Td>
                    <Td>{t.usage}</Td>
                    <Td>{t.value}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Opacidade</CardTitle>
          </Card.Header>
          <Card.Body className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th>Token</Th>
                  <Th>Valor</Th>
                  <Th>Exemplo</Th>
                </tr>
              </thead>
              <tbody>
                {opacityTokens.map((t) => (
                  <tr key={t.token}>
                    <Td mono>{t.token}</Td>
                    <Td>{t.value}</Td>
                    <td className="border-b border-gray-100 px-3 py-2 dark:border-gray-800/60">
                      <div
                        className="ml-auto h-6 w-6 rounded bg-violet-600"
                        style={{
                          opacity: Number(t.value),
                          backgroundImage:
                            'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                          backgroundSize: '8px 8px',
                          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>

      <div>
        <Typography as="h2" variant="h2" className="mb-1 text-base">
          Uso de Tokens no Código
        </Typography>
        <Typography className="mb-3">Exemplos de como utilizar os tokens em diferentes tecnologias.</Typography>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <CodeBlock language="CSS" code={cssVariablesCode} />
          <CodeBlock language="CSS" code={tailwindConfigCode} />
          <CodeBlock language="TS" code={jsTokensCode} />
          <CodeBlock language="TS" code={reactCode} />
          <CodeBlock language="JSON" code={jsonCode} />
        </div>
      </div>
    </div>
  );
}
