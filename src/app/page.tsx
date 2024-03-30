import path from 'path';
import clsx from 'clsx';
import Link from 'next/link';
import Card from '../components/Card';
import { LinkButton } from '../components/LinkButton';
import { getMarkdowns } from '../utils/markdown';
import style from './page.module.scss';

export default async function Home() {
  // achievementの中身を取得
  const docsDir = path.join(process.cwd(), 'docs', 'achievement');
  const docs = await getMarkdowns(docsDir);

  // 一覧を日付でソート
  docs.sort((a, b) =>
    a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1,
  );

  // 上位3件に絞る
  docs.length = 3;

  // 例外処理
  if(docs.length === 0) {
    return <div>データがありません</div>;
  }
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
          <div className={clsx(style.imgBox1, style.imgBoxCommon)}>
            {/* <img src='/images/hero.png' alt='Hero'/> */}
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
                <LinkButton href='#' variant='gray' size='medium'>
                  Learn More
                </LinkButton>
              </div>
              <div className={style.navigationForMobile}>
                <LinkButton href='#' variant='gray' size='small'>
                  Learn More
                </LinkButton>
              </div>
            </div>
          </div>
          <div className={clsx(style.imgBox2, style.imgBoxCommon)}>
            {/* <img src='/images/hero.png' alt='Hero'/> */}
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
                <LinkButton href='#' variant='gray' size='medium'>
                  Learn More
                </LinkButton>
              </div>
              <div className={style.navigationForMobile}>
                <LinkButton href='#' variant='gray' size='small'>
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
          <div className={style.news}>
            <h2 className={style.contentTitle}>新着情報</h2>
            <div className={style.newsList}>
              {docs.map((doc) => (
                <div key={doc.slug} className={style.newsItem}>
                  <Card
                    title={doc.frontmatter.title}
                    content={doc.frontmatter.description}
                    date={new Date(
                      doc.frontmatter.updatedAt,
                    ).toLocaleDateString()}
                    group={doc.frontmatter.group}
                    to={`/achievements/${doc.slug}`}
                    imageSrc={doc.frontmatter.image}
                    imageAlt={doc.frontmatter.title}
                    style={{ width: '348px' }}
                  />
                </div>
              ))}
            </div>
            <div className={style.navigationForPC}>
              <LinkButton href='#' variant='gray' size='medium'>
                Learn More
              </LinkButton>
            </div>
            <div className={style.navigationForMobile}>
              <LinkButton href='#' variant='gray' size='small'>
                Learn More
              </LinkButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
