import type { Metadata } from 'next';
import Link from 'next/link';
import style from './styles.module.css';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroImage } from '@/components/HeroImage';

export const metadata: Metadata = {
  title: 'サークルについて',
  description:
    '埼玉大学プログラミングサークル「Maximum」についての活動内容のページです。',
};

export default function About() {
  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.heroBox}>
          <HeroImage title='Maximumの活動について' type='default' blur={true} />
          <Breadcrumb
            items={[
              { title: 'Top', href: '/' },
              { title: 'Maximumの活動について', href: '/about' },
            ]}
          />
        </div>
        <main className={style.box}>
          <h2 className={style.title}>
            埼玉大学プログラミングサークル　
            <span className={style.highlight}>Maximum</span>とは？
          </h2>
          <p className={style.text}>
            Maximumは、
            <span className={style.highlight}>
              国際大学対抗プログラミングコンテスト（ICPC）
            </span>
            へ参加し、 良い成績を上げるために成立したプログラミング研究会です。
            2022年度からは、
            <span className={style.highlight}>競技プログラミング</span>
            のみならず、
            <span className={style.highlight}>Web</span>や
            <span className={style.highlight}>その他プログラミング</span>
            の知識を高める活動を行っています。
          </p>
          <h2 className={style.title} id='kyopro'>
            競技プログラミング
          </h2>
          <h3 className={style.subtitle}>活動内容</h3>
          <p className={style.text}>
            国際大学対抗プログラミングコンテスト(ICPC)に参加し、良い成績を上げるための活動を行っています。
            具体的には、ICPCなどの各種プログラミングコンテストへの参加、週2回の勉強会などを行っています。
          </p>
          <img className={style.image} src='/images/about.png' alt='活動風景' />
          <h3 className={style.subtitle}>競技プログラミングとは？</h3>
          <p className={style.text}>
            皆さんご存じの通り、コンピュータはとても高速に計算してくれます。
            しかし、その速さには限界があり、世界中の多くの問題は
            そのままコンピュータで解くと数万年・数億年単位の時間を要すると言われています。
            そこで、こういった問題の答えを高速かつ正確に出すための工夫を行って、
            プログラムとして記述するのが競技プログラミングです。
          </p>
          <p className={style.text}>
            工学部情報工学科のパンフレットに記載していただきました！
            例題も掲載されているので是非ご覧ください。
            <Link
              className={style.link}
              href='http://www.ics.saitama-u.ac.jp/content/uploads/pamphlet/ics_pamphlet.pdf'
              target='_blank'
            >
              情報工学科パンフレット（PDF）
            </Link>
          </p>
          <h2 className={style.title} id='webken'>
            Web研究会
          </h2>
          <h3 className={style.subtitle}>講習</h3>
          <p className={style.text}>
            WebサイトやWebサーバーを制作・構築・運用するための基礎を一通り学びます。講習ではHTML,CSS,JavaScriptを触ります。
            Webに関しては
            <strong className={style.highlight}>アウトプットこそ正義</strong>
            なので「勉強する」よりも
            「作りながらその都度調べる」というフローで効率の良い学習ができるようサポートします!
          </p>
          <h3 className={style.subtitle}>サイト制作・アプリ制作</h3>
          <p className={style.text}>
            一通り基礎を学び終えたら、実際にX（旧twitter）やNoteのような投稿ができるサービスを
            自分たちで作ってもらいます。
          </p>
          <h3 className={style.subtitle}>パフォーマンスチューニング</h3>
          <p className={style.text}>
            Webの醍醐味は「制作」だけではありません。
            この世には「遅すぎる」や「セキュリティ的に危険」などの様々な問題を抱えたサイトがあります。
            こんなサイトを高速化したり安全に書き換えたりなどするのも、もちろんWebの範疇です。
            一見競技性のないWebの分野でも、こういった問題を解決する力を競う大会がいくつか開催されており、
            そこに出場することを目標にトレーニングもします。
          </p>
          <p className={style.text}>
            詳しく知りたい方は大会参加記を見てみてください。
          </p>
        </main>
      </div>
    </div>
  );
}
