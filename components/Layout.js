import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import styles from "./layout.module.css";

const name = "The L D O";
export const siteTitle = "Next.js Sample Application";

export default function Layout({ children, home = false }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="ico" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using React's framework NEXTJS"
        />
        content=
        {`https://og-image.vercel.app/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpeg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={"bored"}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href={"/"}>
              <Image
                priority
                src="/images/profile.jpeg"
                className={utilStyles.borderCirlce}
                height={144}
                width={144}
                alt={name}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backHome}>
          <Link href={"/"}>🏠 Back Home</Link>
        </div>
      )}
    </div>
  );
}
