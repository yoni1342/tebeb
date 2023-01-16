import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import { ThemeProvider } from '@material-tailwind/react';
import '../styles/globals.css';
import { store } from '../store/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
