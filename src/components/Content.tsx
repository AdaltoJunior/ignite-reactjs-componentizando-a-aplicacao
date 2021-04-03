import { Header } from './Header';
import { MovieList } from './MovieList';

import '../styles/content.scss';

export function Content() {
  return (
    <div className="container">
      <Header />

      <main>
        <MovieList />
      </main>
    </div>
  );
}
