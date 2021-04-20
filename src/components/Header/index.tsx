import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './styles.module.scss'

const Header = () => {
    const curDate = format(new Date(), 'EEEEEE, d, MMMM',{
        locale: ptBR
    })
    return (
        <header className={ styles.headerContainer }>
            <img src="/logo.svg" alt="MPodcastr"/>
            <p>O melhor para você ouvir, sempre</p>
            <span>{ curDate }</span>
        </header>
    )
}

export default Header
