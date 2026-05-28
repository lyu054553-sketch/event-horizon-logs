import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Code from './pages/Code';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/code" element={<Code />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </I18nProvider>
    </BrowserRouter>
  );
}
