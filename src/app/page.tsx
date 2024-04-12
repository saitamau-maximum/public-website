import clsx from 'clsx';
import { HeroImage } from '../components/HeroImage';
import { LinkButton } from '../components/LinkButton';
import style from './page.module.scss';
import { Breadcrumb } from '@/components/Breadcrumb';
import { NewsList } from '@/components/news-list';

export default function Home() {
  return (
    <div className={style.container}>
      <main className={style.main}>
        <div className={style.hero}>
          <HeroImage type='thumbnail' />
          <Breadcrumb items={[{ title: 'Top', href: '/' }]} />
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
          <div className={clsx(style.imgBox1, style.imgBoxCommon)}>
            <img
              src='/images/top1.png'
              alt='TopImage1'
              className={style.topImages}
            />
          </div>
          <div className={style.activityCP}>
            <div className={style.activityTitle}>
              <h2>競技プログラミング</h2>
              <p>Competitive programming</p>
            </div>
            <p className={style.activityContent}>
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
              <div className={style.navigationForPC}>
                <LinkButton href='/about#kyopro' variant='gray' size='medium'>
                  Learn More
                </LinkButton>
              </div>
              <div className={style.navigationForMobile}>
                <LinkButton href='/about#kyopro' variant='gray' size='small'>
                  Learn More
                </LinkButton>
              </div>
            </div>
          </div>
          <div className={clsx(style.imgBox2, style.imgBoxCommon)}>
            <img
              src='/images/top2.png'
              alt='topImage2'
              className={style.topImages}
            />
          </div>
          <div className={style.activityWeb}>
            <div className={style.activityTitle}>
              <h2>Web研究会</h2>
              <p>Web programming</p>
            </div>
            <p className={style.activityContent}>
              Webプログラミングに関する講義と
              <br />
              パフォーマンスチューニングの大会に向けた
              <br />
              練習会などを行っています。
            </p>
            <div className={style.activityRightButtonContainer}>
              <div className={style.navigationForPC}>
                <LinkButton href='/about#webken' variant='gray' size='medium'>
                  Learn More
                </LinkButton>
              </div>
              <div className={style.navigationForMobile}>
                <LinkButton href='/about#webken' variant='gray' size='small'>
                  Learn More
                </LinkButton>
              </div>
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
              <div className={style.navigationForPC}>
                <LinkButton href='#' variant='green' size='medium'>
                  入会案内はこちら
                </LinkButton>
              </div>
              <div className={style.navigationForMobile}>
                <LinkButton href='#' variant='green' size='small'>
                  入会案内はこちら
                </LinkButton>
              </div>
            </div>
          </div>
          <h1 className={style.contentTitle}>新着情報</h1>
          <div className={style.news}>
            <NewsList />
            <div className={clsx(style.navigationForPC, style.newsButton)}>
              <LinkButton href='/news' variant='gray' size='medium'>
                Learn More
              </LinkButton>
            </div>
            <div className={clsx(style.navigationForMobile, style.newsButton)}>
              <LinkButton href='/news' variant='gray' size='small'>
                Learn More
              </LinkButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
