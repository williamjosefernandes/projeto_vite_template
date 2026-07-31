export * from './useAuth';
export * from './useLogin';
export * from './useLogout';
export * from './useCurrentUser';
export * from './useCurrentAccount';
export * from './usePermissions';
export * from './useMenus';
export * from './useMenu';
export * from './useComponent';
// Hooks cross-cutting compartilhados por todo o app (não exclusivos de auth) —
// re-exportados aqui para expor a API de auth por inteiro em `src/auth`.
export { usePermission } from '../../hooks/usePermission';
export { useVisibleMenu } from '../../hooks/useVisibleMenu';
