import Search from '@/app/ui/search';
import {tmdbAuthenticate, tmdbSearch, tmdbSearchMovie} from '@/app/lib/data';

export default async function Home() {
    // const test = await tmdbAuthenticate();
    // const movieTest = await tmdbSearchMovie('Fight Club');
    // const movieTest2 = await tmdbSearchMovie('Podziemny Krąg');
    // const multiSearch = await tmdbSearch('Star Wars');

  return (
    <div className="flex min-h-screen items-center justify-center  font-sans bg-slate-700">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16  bg-slate-700 sm:items-start">
        <Search />
      </main>
    </div>
  );
}
