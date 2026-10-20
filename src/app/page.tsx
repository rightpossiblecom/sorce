import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoReveal from "@/components/VideoReveal";
import WhatWeOffer from "@/components/WhatWeOffer";
import SuccessStories from "@/components/SuccessStories";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="sorce-redesign">
      <Header />
      <main>
        <Hero />
        <VideoReveal />
        <WhatWeOffer />
        <SuccessStories />
      </main>
      <Footer />
    </div>
  );
}
