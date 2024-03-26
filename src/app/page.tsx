import clsx from 'clsx';
import Link from 'next/link';
import { LinkButton } from '../components/LinkButton';
import style from './page.module.scss';

export default function Home() {
  return (
    <div className={style.container}>
      <main className={style.main}>
        <div className={style.hero}>
          <img src='/images/hero.png' alt='Hero' className={style.heroImage} />
          <div className={style.breadcrumb}>
            <Link href='/' className={style.breadcrumbLink}>
              Top
            </Link>
          </div>
        </div>
        <div className={style.contents}>
          <h1 className={style.contentTitle}>活動内容</h1>
          <p className={style.aboutText}>
            Maximumでは&nbsp;
            <span className={clsx(style.span, style.bold)}>
              競技プログラミング
            </span>
            &nbsp;(週2回)と&nbsp;
            <span className={clsx(style.span, style.bold)}>Web研究会</span>
            &nbsp;(週1回)の2つの活動を行っています。
          </p>
          <div className={style.imgBox1}>
            {/* <img src='/images/hero.png' alt='Hero'/> */}
          </div>
          <div className={style.activityCP}>
            <div className={style.activityCPtitle}>
              <h2>競技プログラミング</h2>
              <p>Competitive programming</p>
            </div>
            <p className={style.activityCPcontent}>
              <span className={clsx(style.span, style.bold)}>AtCoder</span>
              &nbsp;や&nbsp;
              <span className={clsx(style.span, style.bold)}>ICPC</span>
              &nbsp;に向けて
              <br />
              毎週競技プログラミングの講義と
              <br />
              大会の感想会などを行っています。
            </p>
            <div className={style.activityLeftButtonContainer}>
              <LinkButton href='#' variant='gray'>
                Learn More
              </LinkButton>
            </div>
          </div>
          <div className={style.imgBox2}>
            {/* <img src='/images/hero.png' alt='Hero'/> */}
          </div>
          <div className={style.activityWeb}>
            <div className={style.activityWebtitle}>
              <h2>Web研究会</h2>
              <p>Web programming</p>
            </div>
            <p className={style.activityWebcontent}>
              Webプログラミングに関する講義と
              <br />
              パフォーマンスチューニングの大会に向けた
              <br />
              練習会などを行っています。
            </p>
            <div className={style.activityRightButtonContainer}>
              <LinkButton href='#' variant='gray'>
                Learn More
              </LinkButton>
            </div>
          </div>
          <div className={style.activityOther}>
            <p className={style.txtOther}>他にも&hellip;</p>
            <p>
              Discordを用いた&nbsp;
              <span className={style.span}>交流会</span>、
              <span className={style.span}>勉強会</span>、
              <span className={style.span}>サークル内模擬大会</span>
              &nbsp;等々
              <br />
              希望があれば、ほかにも様々な活動を行いたいと思っています。
            </p>
            <div className={style.activityOtherButtonContainer}>
              <LinkButton href='#' variant='green'>
                入会案内はこちら
              </LinkButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
