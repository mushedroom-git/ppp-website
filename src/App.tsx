import { Builder } from "./components/Builder";
import { CartDrawer } from "./components/CartDrawer";
import { DetailDialog } from "./components/DetailDialog";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ReadyBuilds } from "./components/ReadyBuilds";
import { RequestForm } from "./components/RequestForm";
import { Showcase } from "./components/Showcase";
import { Toast } from "./components/Toast";
import { StoreProvider } from "./context/StoreContext";

export default function App() {
  return (
    <StoreProvider>
      <Header />
      <main>
        <Hero />
        <ReadyBuilds />
        <Builder />
        <Showcase />
        <RequestForm />
      </main>
      <Footer />
      <DetailDialog />
      <CartDrawer />
      <Toast />
    </StoreProvider>
  );
}
