import Link from 'next/link';
import { Header } from '../components/Header';
import { LinkButton } from '../components/LinkButton';
import style from './page.module.css';

export function Home() {
  return (
    <div className={style.container}>
      <Header />
      <main className={style.main}>
        <div className={style.hero}>
          <img src='images/hero.png' alt='Hero' />
          <div className={style.breadcrumb}>
            <Link href='/' className={style.breadcrumbLink}>
              Top
            </Link>
          </div>
        </div>
        <h1 className={style.about}>活動内容</h1>
        <p>
          Maximumでは競技プログラミング（週２回）とWeb研究会（週１回）の２つの活動を行っています。
        </p>
        <div className={style.activityCP}>
          <h2 className={style.activityCPtitle}>競技プログラミング</h2>
          <p>Competitive programming</p>
          <p>
            AtCoderやICPCに向けて毎週競技プログラミングの講義と大会の感想会などを行っています。
          </p>
          <LinkButton href='#' variant='gray'>
            Learn More
          </LinkButton>
        </div>
        <div className={style.activityWeb}>
          <h2 className={style.activityWebTitle}>Web研究会</h2>
          <p>Web programming</p>
          <p>
            Webプログラミングに関する講義とパフォーマンスチューニングの大会に向けた練習会などを行っています。
          </p>
          <LinkButton href='#' variant='gray'>
            Learn More
          </LinkButton>
        </div>
        <div className={style.activityOther}>
          <p>
            他にも&hellip;Discordを用いた交流会、勉強会、サークル内模擬大会等々希望があれば、様々な活動を行っています。希望があれば、ほかにも様々な活動を行いたいと思っています。
          </p>
          <LinkButton href='#' variant='green'>
            入会案内はこちら
          </LinkButton>
        </div>
      </main>
    </div>
  );
}

export default Home;