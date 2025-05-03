import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { AllRoutes } from './routes/AllRoutes.jsx'

createRoot(document.getElementById('root')).render(
   <RouterProvider router={AllRoutes} />
)
