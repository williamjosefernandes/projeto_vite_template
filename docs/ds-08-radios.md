# DS-08 — Menu "Radios"

Documento estrutural e permanente. Faz parte da série `docs/ds-*` (ver `docs/ds-00-estrutura-e-visao-geral.md`).

## Componente `RadioGroup`

`components/ui/Radio` — wrapper de `@radix-ui/react-radio-group`. Compound: `RadioGroup` (`Root` — `value`/`defaultValue`/`onValueChange`, controla a exclusividade do grupo), `RadioGroup.Item` (primitivo, sem label — para composições customizadas) e `RadioGroup.Field` (label + description prontos, uso recomendado no dia a dia).

```tsx
<RadioGroup defaultValue="monthly">
  <RadioGroup.Field id="plan-monthly" value="monthly" label="Mensal" description="Cobrado a cada 30 dias." />
  <RadioGroup.Field id="plan-yearly" value="yearly" label="Anual" description="2 meses grátis." />
</RadioGroup>
```

## Tokens

| Token | Valor |
|---|---|
| Tamanho `sm` | 16px de diâmetro, borda 1.5px |
| Tamanho `md` (padrão) | 20px de diâmetro, borda 2px |
| Tamanho `lg` | 24px de diâmetro, borda 2px |
| Cor padrão | `border-gray-300` / `border-gray-700` |
| Cor selecionado | `border-violet-600`, bolinha `bg-violet-600` |
| Cor de erro | `border-red-500` (prop `error`) |
| Desabilitado | `opacity-50` |

## Props de `RadioGroup.Field`

| Prop | Tipo | Obrigatória |
|---|---|---|
| `id` | `string` | Sim |
| `value` | `string` | Sim (herdada do `RadioGroupItem` do Radix) |
| `label` | `ReactNode` | Sim |
| `description` | `ReactNode` | Não |
| `size` | `'sm' \| 'md' \| 'lg'` | Não (padrão `md`) |
| `error` | `boolean` | Não |
| `disabled` | `boolean` | Não |

## Quando usar Radio vs. Select vs. Checkbox

- **Radio**: seleção única, 2-6 opções, todas visíveis simultaneamente.
- **Select**: seleção única, mais de 6 opções ou espaço limitado (ver menu "Select").
- **Checkbox**: seleção múltipla e independente (ver `docs/ds-09-checkbox.md`).

## Nota sobre nomenclatura

O item "Radios" do menu de documentação foi inicialmente configurado em `lib/ds-menu-config.ts` com a descrição errada ("escala de raios de borda") — corrigido nesta etapa para refletir o componente real (`Radio`/`RadioGroup`). "Raios de borda" está documentado em `docs/ds-01-tokens.md` §4 e `docs/ds-07-bordas.md`.
