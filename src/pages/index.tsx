import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'
import styles from './home.module.scss'

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  description: string;
  url: string
}

type HomeProps = {
  latestEpisodes: Array<Episode>;
  otherEpisodes:  Array<Episode>;
}
export default function Home({latestEpisodes, otherEpisodes}: HomeProps) {

  const latestEpisodeField = latestEpisodes.map(ep => {
    return (
      <li key={ ep.id }>
        <Image
          width={192}
          height={192}
          src={ ep.thumbnail } 
          alt={ ep.title } 
          objectFit="cover"
        />
        
        <div className={styles.episodeDetails}>
          <Link href={`/episode/${ep.id}`}>
            <a>{ ep.title }</a>
          </Link>
          <p>{ ep.members }</p>
          <span>{ ep.publishedAt }</span>
          <span>{ ep.durationAsString }</span>
        </div>

        <button type="button">
          <img src="/play-green.svg" alt="play episode"/>
        </button>
      </li>


    )
})
  
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          { latestEpisodeField }
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {otherEpisodes.map(ep =>{
              return (
                <tr key={ep.id}>
                  <td style={{ width: 72}}>
                    <Image
                      width={120}
                      height={120}
                      src={ep.thumbnail}
                      alt={ep.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episode/${ep.id}`}>
                      <a>{ep.title}</a>  
                    </Link>
                  </td>
                  <td>{ep.members}</td>
                  <td style={{ width: 100}}>{ep.publishedAt}</td>
                  <td>{ep.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="play"/>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
      
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  //use getServerSideProps  for SSR 
  const { data } = await api.get('episodes', {
    params:{
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const otherEpisodes = episodes.slice(2, episodes.length)

  return {
    props:{
      latestEpisodes,
      otherEpisodes
    },
    revalidate : 60 * 60 * 8
  }  
}
