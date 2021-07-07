import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Head from 'next/head';
import Link from 'next/link';

import { FiCalendar, FiUser } from 'react-icons/fi';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return(
    <>
      <Head>
         <title> Posts | spacetraveling </title>
      </Head>
      <main className={commonStyles.container}>
          <div className={styles.postItem}>
             <Link href="">
                <a>
                    <strong>Criando um app CRA do zero</strong>
                    <p>Tudo sobre como criar a sua primeira aplicação utilizando Create React App</p>
                    <div className={styles.blockIcon}>
                        <span>
                            <FiCalendar/>
                            <time>15 Mar 2021</time>           
                        </span>

                        <span>
                            <FiUser/>
                            <strong>15 Mar 2021</strong>
                        </span>           
                    </div>
                </a>
             </Link>
          </div>

          <div className={styles.postItem}>
             <Link href="">
                <a>
                    <strong>Criando um app CRA do zero</strong>
                    <p>Tudo sobre como criar a sua primeira aplicação utilizando Create React App</p>
                    <div className={styles.blockIcon}>
                        <span>
                            <FiCalendar/>
                            <time>15 Mar 2021</time>           
                        </span>

                        <span>
                            <FiUser/>
                            <strong>15 Mar 2021</strong>
                        </span>           
                    </div>
                </a>
             </Link>
          </div>

          <a href="#" className={styles.morePosts}>Carregar mais posts</a> 
      </main>
    </>
  );
}

// export const getStaticProps = async () => {

//   const prismic = getPrismicClient();
//   const response = await prismic.query();

// };
