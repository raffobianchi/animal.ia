import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { ComingSoon } from "~/components/ComingSoon";

export default function BlogPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <ComingSoon section="blog" />
      </main>
      <Footer />
    </>
  );
}
