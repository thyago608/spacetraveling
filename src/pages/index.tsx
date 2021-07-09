import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import Link from 'next/link';

import { format, getMonth } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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

export default function Home({ postsPagination }:HomeProps) {

  return(
    <>
      <Head>
         <title> Posts | spacetraveling </title>
      </Head>
      <main className={commonStyles.container}>
          <div className={styles.post}>
             <Link href="/post/aijaijs">
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

          <div className={styles.post}>
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

export const getStaticProps:GetStaticProps = async () =>{
  //Iniciando um cliente prismic
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')],
    {
      fetch:['post.title','post.subtitle','post.author','post.banner','post.content'],
      pageSize: 3
    }
  );


  const posts = response.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(new Date(post.first_publication_date), 'PP',{
        locale: ptBR
      }),
      data:{
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      }
    }
  });


  const postsPagination = {
    next_page: response.next_page,
    results: posts
  }


  return {
    props:{
      postsPagination
    },
    revalidate: 60 * 30 // 30 minutes
  }
}