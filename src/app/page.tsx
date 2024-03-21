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
          <img src='images/hero.png' alt='Hero' className={style.heroImage} />
          <div className={style.breadcrumb}>
            <Link href='/' className={style.breadcrumbLink}>
              Top
            </Link>
          </div>
        </div>
        <div className={style.contents}>
          <h1 className={style.about}>活動内容</h1>
          <p className={style.aboutText}>
            Maximumでは<span className={style.boldspan}>競技プログラミング</span>
            （週２回）と<span className={style.boldspan}>Web研究会</span>
            （週１回）の２つの活動を行っています。
          </p>
          <div className={style.activityCP}>
            <div className={style.activityCPtitle}>
              <h2>競技プログラミング</h2>
              <p>Competitive programming</p>
            </div>
            <p>
              AtCoderやICPCに向けて毎週競技プログラミングの講義と大会の感想会などを行っています。
            </p>
            <LinkButton href='#' variant='gray'>
              Learn More
            </LinkButton>
          </div>
          <div className={style.activityWeb}>
            <div className={style.activityWebtitle}>
              <h2>Web研究会</h2>
              <p>Web programming</p>
            </div>
            <p>
              Webプログラミングに関する講義とパフォーマンスチューニングの大会に向けた練習会などを行っています。
            </p>
            <LinkButton href='#' variant='gray'>
              Learn More
            </LinkButton>
          </div>
          <div className={style.activityOther}>
            <p>
              他にも&hellip;
              <br />
              Discordを用いた
              <span className={style.span}>交流会</span>、
              <span className={style.span}>勉強会</span>、
              <span className={style.span}>サークル内模擬大会</span>
              等々希望があれば、様々な活動を行っています。希望があれば、ほかにも様々な活動を行いたいと思っています。
            </p>
            <LinkButton href='#' variant='green'>
              入会案内はこちら
            </LinkButton>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
