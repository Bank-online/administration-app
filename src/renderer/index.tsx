import { render } from 'react-dom';
import { MemoryRouter, MemoryRouter as Router } from 'react-router-dom';
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
