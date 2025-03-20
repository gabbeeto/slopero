import {createRoot} from 'react-dom/client'
import './index.css'
import Header from './Header'
import Main from './MainElement'



const rootElement = document.getElementById('root')!
const root = createRoot(rootElement)


export default function render() {
	root.render(
		<>
		<Header />
		<Main />
		</>
	)
}

render()
