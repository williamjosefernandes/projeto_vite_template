import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-2 bg-gray-50 font-sans text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Base técnica pronta. AppShell e telas de negócio chegam nas próximas etapas.
      </p>
      <Link to="/design-system" className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400">
        Ver inventário do Design System →
      </Link>
    </div>
  )
}

export default App
