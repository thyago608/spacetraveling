import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import Link from 'next/link';

import { format } from 'date-fns';
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
  const [posts, setPosts] = useState<PostPagination[]>([]);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
 
  async function handleSearchMorePosts(){
      if(nextPage){  
          const response = await fetch(nextPage);
          const data = await response.json();

          const postsCurrent = data.results.map(post => {
            return {
              uid: post.uid, 
              first_publication_date: post.first_publication_date,
              data: {
                title:post.data.title,
                subtitle:post.data.subtitle, 
                author: post.data.author
              }
            }
          });

          const postsPagination = {
            next_page: data.next_page,
            results: postsCurrent
          };


          setPosts(postsOld => [...postsOld, postsPagination]);
          console.log(nextPage)
        return;
      }
  }

  useEffect(() => {
    setPosts([postsPagination]);
  },[]);


  console.log(posts)

  return(
    <>
      <Head>
         <title> Posts | spacetraveling </title>
      </Head>
      <main className={commonStyles.container}>
          <div className={styles.posts}>
             {
               postsPagination.results.map(post=>(
                  <Link href={`/post/${post?.uid}`} key={post.uid}>
                    <a>
                        <strong>{post.data.title}</strong>
                        <p>{post.data.subtitle}</p>
                        <div>
                            <FiCalendar/>
                            <time>{format(new Date(post.first_publication_date), 'PP',{
                                locale: ptBR
                                })}
                          </time>           
                            <FiUser/>
                            <span>{post.data.author}</span>
                        </div>
                    </a>
              </Link>            
            ))
          }
        </div>


        { nextPage && <button onClick={handleSearchMorePosts} className={styles.morePosts}>Carregar mais posts</button>
        }
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
      pageSize: 1
    }
  );


  const posts = response.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
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