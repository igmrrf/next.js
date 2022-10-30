import gsap from "gsap";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../components/header404.module.css";
import Layout from "../components/Layout";

function Header404() {
  useEffect(() => {
    gsap.to(".hover", {
      duration: 3,
      x: gsap.utils.random(5, 10),
      y: gsap.utils.random(10, 100),
      rotation: gsap.utils.random(-20, 20),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      transformOrigin: "50% 50%",
    });
  });

  return (
    <section className={styles.container}>
      <div className={`section-contain margintop-lg ${styles.content}`}>
        <h1 className={styles.h1}>404</h1>
        <h2 className={styles.h2}>Lost in space?</h2>
        <Link href="/">
          <button className="btn btnprimary">Go back home</button>
        </Link>
        <br />
      </div>
      <div className={`hover ${styles.floating}`}>
        <h1>Not Found</h1>
      </div>
    </section>
  );
}

const FourOhFour = () => {
  const pageMeta = {
    title: "Oops! You found a missing page! - Jamstack Explorers",
    description: "Oops! It looks like this page is lost in space somewhere!",
    url: `/404`,
  };

  return (
    <Layout navtheme="dark" pageMeta={pageMeta}>
      <Header404 />
    </Layout>
  );
};

export default FourOhFour;
