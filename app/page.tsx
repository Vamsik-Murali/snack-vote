import SnackList from "./snack-list";

export default function Home() {
  return (
    <div className="flex flex-1 justify-center bg-background font-sans text-foreground">
      <main className="flex w-full max-w-xl flex-col gap-6 px-4 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Snack Vote</h1>
        <SnackList />
      </main>
    </div>
  );
}
