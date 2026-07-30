# DS-09 — Menu "Checkbox"

Documento estrutural e permanente. Faz parte da série `docs/ds-*` (ver `docs/ds-00-estrutura-e-visao-geral.md`).

## Componente `Checkbox` / `CheckboxField`

`components/ui/Checkbox` — wrapper de `@radix-ui/react-checkbox`. `Checkbox` é o primitivo estilizado (sem label); `CheckboxField` compõe label + description prontos.

```tsx
<CheckboxField id="terms" label="Aceito os termos de uso" checked={checked} onCheckedChange={setChecked} />
```

Estado indeterminado: passe `checked="indeterminate"` (não um booleano) — mostra o ícone de traço em vez do check.

## Tokens

| Token | Valor |
|---|---|
| Tamanho `sm` | 16×16px, borda 1.5px, `radius-sm` (2px) |
| Tamanho `md` (padrão) | 20×20px, borda 2px, `radius` (4px) |
| Tamanho `lg` | 24×24px, borda 2px, `radius` (4px) |
| Cor padrão-borda | `border-gray-300` / `border-gray-700` |
| Cor selecionado-fundo | `bg-violet-600` |
| Cor ícone-check | branco |
| Cor indeterminado-ícone | branco (traço, `Minus`) |
| Cor desabilitado | `opacity-50` |

## Props de `CheckboxField`

| Prop | Tipo | Obrigatória |
|---|---|---|
| `id` | `string` | Sim |
| `label` | `ReactNode` | Sim |
| `description` | `ReactNode` | Não |
| `size` | `'sm' \| 'md' \| 'lg'` | Não (padrão `md`) |
| `error` | `boolean` | Não |
| `checked` | `boolean \| 'indeterminate'` | Não (controlado) |
| `disabled` | `boolean` | Não |

## Padrão "Selecionar tudo"

Estado derivado em JS puro, sem lógica no componente:

```tsx
const allChecked = values.every(Boolean);
const someChecked = values.some(Boolean) && !allChecked;

<CheckboxField
  id="select-all"
  label="Selecionar tudo"
  checked={allChecked ? true : someChecked ? 'indeterminate' : false}
  onCheckedChange={(v) => toggleAll(v === true)}
/>
```

## Reutilização

Usado no card "Componentes em Destaque" da Visão Geral (`docs/ds-00-estrutura-e-visao-geral.md`) e será a base de seleção de linha em `DataTable` (menu "Dados"/"Tabelas", ainda pendente).

## Componentes ajustados nesta etapa

`Checkbox` (`components/ui/Checkbox`) ganhou `size` (`sm`/`md`/`lg`, via `cva`) e `error`; `CheckboxField` é novo. Atualizado em `docs/05-inventario-componentes.md`.
