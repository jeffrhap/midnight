import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Material } from './components/Material';
import { Protocol } from './components/Protocol';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-full bg-[var(--bg-deep)] text-[var(--text-primary)] font-sans">
      <Header />
      <main>
        <Hero />
        <Material />
        <Protocol />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
