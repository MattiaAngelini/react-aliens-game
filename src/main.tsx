import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.tsx'
import Game from './Game.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/Game",
    element: <Game></Game>
  }

])

createRoot(document.getElementById('root')!).render(
 
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,

)
