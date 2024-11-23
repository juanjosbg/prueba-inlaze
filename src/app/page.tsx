"use client";
import Header from "./public/header/nav";
import Footer from "./public/footer/footer";
import ContWeb from "./components/moviesList";
export default function Home() {
  return (
    <section>
      <Header/>
      <ContWeb/>
      <Footer/>
    </section>
  );
}
