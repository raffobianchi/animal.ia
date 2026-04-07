import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

interface Props {
  title: string;
  updatedLabel: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, updatedLabel, children }: Props) {
  return (
    <>
      <Header />
      <main className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-warm md:text-6xl">
              {title}
            </h1>
            <p className="text-base text-muted-foreground">{updatedLabel}</p>
          </div>
          <article className="prose prose-lg prose-neutral max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-warm prose-h2:mt-12 prose-h2:text-2xl md:prose-h2:text-3xl prose-p:text-base prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-base prose-li:text-muted-foreground prose-strong:text-warm prose-a:text-warm prose-a:font-semibold">
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
