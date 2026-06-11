import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Banner from '@/components/sections/Banner';
import AboutMe from '@/components/sections/AboutMe';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Blogs from '@/components/sections/Blogs';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <AboutMe />
        <Skills />
        <Projects />
        <Experience />
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
