import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { ComingSoon } from "~/components/ComingSoon";

export default function ShopPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <ComingSoon section="shop" />
      </main>
      <Footer />
    </>
  );
}
