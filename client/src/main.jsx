import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { AllRoutes } from './routes/AllRoutes.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
   <RouterProvider router={AllRoutes} />
   </Provider>
)
