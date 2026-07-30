# DS-07 — Menu "Bordas"

⏳ **Página provisória — aguardando print de referência (`Bordas.png`) para ajuste fino.** Conteúdo abaixo segue o mesmo padrão visual das demais páginas de Fundamentos, com valores reais do projeto — quando o print chegar, reexecutar o prompt DS-08 anexando a imagem, sem recriar do zero.

Documento estrutural. Faz parte da série `docs/ds-*` (ver `docs/ds-00-estrutura-e-visao-geral.md`).

## Escala de espessura

| Token | Valor | Uso |
|---|---|---|
| `border-0` | 0px | Remove borda de um elemento que normalmente teria |
| `border` | 1px | Padrão — cards, inputs, divisores |
| `border-2` | 2px | Ênfase — foco, seleção |
| `border-4` | 4px | Uso raro/destaque |

## Estilos

`solid` (padrão), `dashed` (áreas de upload/placeholder), `dotted` (divisórias decorativas), `none`.

## Raios de borda

Idêntico a `docs/ds-01-tokens.md` §4 — ver aquela tabela para a fonte única.

## Cores de borda

| Token | Uso |
|---|---|
| `border-gray-200` / `border-gray-800` | Padrão (cards, inputs, divisores) |
| `border-violet-500` | Foco / elemento ativo (combinar com `ring-2 ring-violet-500/30`) |
| `border-red-500` | Erro de validação |
| `border-green-500` | Sucesso de validação |
| `border-amber-500` | Aviso |

## Raio e borda por componente (real, do código)

| Componente | Raio | Borda |
|---|---|---|
| `Button` | `rounded-lg` | Nenhuma (`primary`/`danger`) ou 1px (`secondary`) |
| `Card` | `rounded-xl` | 1px, `border-gray-200`/`border-gray-800` |
| `Badge` | `rounded-full` | Nenhuma |
| `Input`/`Select` | `rounded-lg` | 1px, `border-gray-300`/`border-gray-700` |
| `Modal` | `rounded-2xl` | Nenhuma (usa `shadow-xl`) |
| `Avatar` | `rounded-full` | Nenhuma |

## Componentes novos criados nesta etapa

Nenhum — página construída com `Card` e `Input` já existentes.
