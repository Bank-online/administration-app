import { render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

render(
  <RecoilRoot>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </RecoilRoot>,
  document.getElementById('root')
);
