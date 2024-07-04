import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './css/main.scss'
import { UserLoggedInProvider } from './Context/UserLoggedInProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClinet = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClinet}>
    <UserLoggedInProvider>
      <App />
    </UserLoggedInProvider>
  </QueryClientProvider>
  // </React.StrictMode>,
)
