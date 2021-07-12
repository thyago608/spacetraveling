import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import Head from 'next/head';
import { RichText } from 'prismic-dom';

import { FiUser, FiCalendar, FiClock } from 'react-icons/fi';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  return (
    <>
      <Head>
        <title>Criando um app CRA do zero | spacetraveling </title>
      </Head>

      <div className={styles.containerBanner}>
          <img src="/image.svg" alt="banner" />
      </div> 
      
      <main className={styles.container}> 
        <article>
            <h1>Criando um app CRA do zero</h1>

            <div className={styles.containerDescription}>
                <div className={styles.blockIcon}>
                    <span>
                        <FiCalendar/>
                        <time>15 Mar 2021</time>           
                    </span>

                    <span>
                        <FiUser/>
                        <strong>15 Mar 2021</strong>
                    </span> 

                    <span>
                        <FiClock/>
                        <strong>15 Mar 2021</strong>
                    </span>       
                </div>
            </div>

            <div className={styles.containerContent}>
                <h2>Proin et varius</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

                    Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.

                    Ut venenatis mauris vel libero pretium, et pretium ligula faucibus. Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam venenatis.
                </p>

                <h2>Cras laoreet mi</h2>
                <p>
                    Nulla auctor sit amet quam vitae commodo. Sed risus justo, vulputate quis neque eget, dictum sodales sem. In eget felis finibus, mattis magna a, efficitur ex. Curabitur vitae justo consequat sapien gravida auctor a non risus. Sed malesuada mauris nec orci congue, interdum efficitur urna dignissim. Vivamus cursus elit sem, vel facilisis nulla pretium consectetur. Nunc congue.

                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam consectetur massa nec metus condimentum, sed tincidunt enim tincidunt. Vestibulum fringilla risus sit amet massa suscipit eleifend. Duis eget metus cursus, suscipit ante ac, iaculis est. Donec accumsan enim sit amet lorem placerat, eu dapibus ex porta. Etiam a est in leo pulvinar auctor. Praesent sed vestibulum elit, consectetur egestas libero.
                </p>

                <p>
                    Nulla auctor sit amet quam vitae commodo. Sed risus justo, vulputate quis neque eget, dictum sodales sem. In eget felis finibus, mattis magna a, efficitur ex. Curabitur vitae justo consequat sapien gravida auctor a non risus. Sed malesuada mauris nec orci congue, interdum efficitur urna dignissim. Vivamus cursus elit sem, vel facilisis nulla pretium consectetur. Nunc congue.

                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam consectetur massa nec metus condimentum, sed tincidunt enim tincidunt. Vestibulum fringilla risus sit amet massa suscipit eleifend. Duis eget metus cursus, suscipit ante ac, iaculis est. Donec accumsan enim sit amet lorem placerat, eu dapibus ex porta. Etiam a est in leo pulvinar auctor. Praesent sed vestibulum elit, consectetur egestas libero.
                </p>

                <p>
                    Nulla auctor sit amet quam vitae commodo. Sed risus justo, vulputate quis neque eget, dictum sodales sem. In eget felis finibus, mattis magna a, efficitur ex. Curabitur vitae justo consequat sapien gravida auctor a non risus. Sed malesuada mauris nec orci congue, interdum efficitur urna dignissim. Vivamus cursus elit sem, vel facilisis nulla pretium consectetur. Nunc congue.

                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam consectetur massa nec metus condimentum, sed tincidunt enim tincidunt. Vestibulum fringilla risus sit amet massa suscipit eleifend. Duis eget metus cursus, suscipit ante ac, iaculis est. Donec accumsan enim sit amet lorem placerat, eu dapibus ex porta. Etiam a est in leo pulvinar auctor. Praesent sed vestibulum elit, consectetur egestas libero.
                </p>
            </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths:GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);
  return{
    paths:[],
    fallback:'blocking'
  }


  // TODO
};

export const getStaticProps:GetStaticProps = async({params}) => {
  //Parâmetros da rota
  const { slug } = params;
  
  //Iniciando o cliente prismic
  const prismic = getPrismicClient();
  
  const response = await prismic.getByUID('posts',String(slug),{});

  const post = {
    first_publication_date: response.first_publication_date,
    data:{
      title: response.data.title,
      banner:{
        url: response.href,
      },          
    },
    author: response.data.author,
    content: response.data.content.map(content => {
      return{
        heading: content.heading,
        body: content.body.map(bodyContent =>{
          return {
            text: bodyContent.text
          }
        })
      }
    })
  }


 console.log(JSON.stringify(post, null, 2))
  
  return {
    props:{
      
    }
  }
};
