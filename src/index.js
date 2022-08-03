import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import ShiftsProvider from './context/ShiftsContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<ShiftsProvider>
			<App />
		</ShiftsProvider>
	</React.StrictMode>
)
