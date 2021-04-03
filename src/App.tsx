import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { GenresProvider } from './hooks/useGenres';

import './styles/global.scss';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <GenresProvider>
        <SideBar />
        <Content />
      </GenresProvider>
    </div>
  )
}
