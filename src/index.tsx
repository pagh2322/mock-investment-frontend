import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faMagnifyingGlass, faHome, faChevronRight, faHeart, faChevronLeft, faReply, faFlag, faThumbsUp as fasFaThumsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as farFaThumbsUp } from "@fortawesome/free-regular-svg-icons";
import BottomNavigator from './components/BottomNavigator';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

library.add(faMagnifyingGlass, faUser, faHome, faChevronRight, faHeart, faChevronLeft, faReply, faFlag, fasFaThumsUp, farFaThumbsUp);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <CookiesProvider>
        <BottomNavigator />
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
