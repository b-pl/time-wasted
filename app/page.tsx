import Search from '@/app/ui/search';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans bg-slate-700">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16  bg-slate-700 sm:items-start">
        <Search />
      </main>
    </div>
  );
}
