import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './redux/store/store';


const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


