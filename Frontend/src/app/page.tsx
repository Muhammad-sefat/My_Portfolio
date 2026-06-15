import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Banner from '@/features/personal/components/Banner';
import AboutMe from '@/features/personal/components/AboutMe';
import Skills from '@/features/skills/components/Skills';
import Projects from '@/features/projects/components/Projects';
import Experience from '@/features/experiences/components/Experience';
import Blogs from '@/features/blogs/components/Blogs';
import Contact from '@/features/contacts/components/Contact';

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
