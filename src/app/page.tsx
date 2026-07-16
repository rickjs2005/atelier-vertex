import SmoothScroll from "@/components/smooth-scroll";
import Cursor from "@/components/cursor";
import Loader from "@/components/loader";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Hero from "@/components/sections/hero";
import Manifesto from "@/components/sections/manifesto";
import Projects from "@/components/sections/projects";
import Process from "@/components/sections/process";
import Materials from "@/components/sections/materials";
import Differentials from "@/components/sections/differentials";
import Testimonials from "@/components/sections/testimonials";
import Cta from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <Manifesto />
        <Projects />
        <Process />
        <Materials />
        <Differentials />
        <Testimonials />
        <Cta />
      </main>

      <Footer />
    </>
  );
}
