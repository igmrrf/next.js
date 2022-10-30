import Head from "next/head";
import Link from "next/link";
import { PaystackButton, usePaystackPayment } from "react-paystack";
import Dater from "../components/date";
import Layout, { siteTitle } from "../components/Layout";
import { getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";
import Alert from "./alert";

const config = {
  reference: new Date().getTime().toString(),
  email: "user@example.com",
  amount: 20000,
  publicKey: "pk_test_74ac8e527101670cc3b83881f67b87f16f4afa6e",
};

const pages = [
  {
    id: "1",
    title: "Home",
    url: "/home",
    description: "The home that's not home",
  },
  {
    id: "2",
    title: "Alert",
    url: "/alert",
    description: "The alert that's not alert",
  },
  {
    id: "3",
    title: "news",
    url: "/news",
    description: "The News that's not News",
  },
  {
    id: "4",
    title: "404",
    url: "/random",
    description: "The 404 that's not found",
  },
  {
    id: "5",
    title: "Okra",
    url: "/okra",
    description: "The Okra that's not Okra",
  },
  {
    id: "6",
    title: "Quiz",
    url: "/quiz",
    description: "The Quiz that's not Quiz",
  },
  {
    id: "7",
    title: "StarWars",
    url: "/starwars",
    description: "The StarWars that's not StarWars",
  },
];

const onSuccess = (reference) => {
  console.log(reference);
};

const onClose = () => {
  console.log("closed");
};

const handlePaystackSuccessAction = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const handlePaystackCloseAction = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log("closed");
};
const componentProps = {
  ...config,
  text: "Paystack Button Implementation",
  onSuccess: (reference) => handlePaystackSuccessAction(reference),
  onClose: handlePaystackCloseAction,
};

const PaystackHookExample = () => {
  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
};
export default function Home({ data }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>=
      </Head>
      <Alert type="error" />
      <Alert type="success" />
      <section className={utilStyles.headingMd}>
        <p>
          I'm The L D O, a developer first, an otaku before that, then a crypto
          enthusiast. While maintaining being a trader (Meme Trader)
        </p>
        <p>
          (This is a sample website - you'll be building a site like this on{" "}
          <a href="http://nextjs.org/learn">Our Next.js Tutorial</a>.)
        </p>
        <PaystackHookExample />
        <PaystackButton {...componentProps} />
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h3 className={utilStyles.headingLg}> Blog</h3>
        <ul className={utilStyles.list}>
          {data.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Dater dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h3 className={utilStyles.headingLg}> Pages</h3>
        <ul className={utilStyles.list}>
          {pages.map(({ id, url, title, description }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={url}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>{description}</small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export function getStaticProps() {
  const data = getSortedPostsData();

  return {
    props: { data },
  };
}
