import GithubHeatmap from "./GithubHeatmap";

export default function GithubActivity() {
  return (
    <section className="flex h-full flex-col items-center justify-center border-b border-line bg-cream px-5 py-6 sm:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <GithubHeatmap />
      </div>
    </section>
  );
}
