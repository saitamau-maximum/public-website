import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../../components/Header/Header';
import style from './styles.module.css';

export const metadata: Metadata = {
  title: 'サークルについて',
  description:
    '埼玉大学プログラミングサークル「Maximum」についての活動内容のページです。',
};

export default function About() {
  return (
    <div className={style.container}>
      <Header />
        <img className={style.hero} src='/heros/hero-about.png' alt='hero' />
      <div className={style.box}>
        <p className={style.title}>
          埼玉大学プログラミングサークル　
          <span className={style.highlight}>Maximum</span>とは？
        </p>
        <hr />
        <p className={style.text}>
          Maximumは、
          <span className={style.highlight}>
            国際大学対抗プログラミングコンテスト（ICPC）
          </span>
          へ参加し、
        </p>
        <p className={style.text}>
          良い成績を上げるために成立したプログラミング研究会です。
        </p>
        <p className={style.text}>
          2022年度からは、
          <span className={style.highlight}>競技プログラミング</span>
          のみならず、
        </p>
        <p className={style.text}>
          <span className={style.highlight}>Web</span>や
          <span className={style.highlight}>その他プログラミング</span>
          の知識を高める活動を行っています。
        </p>
        <p className={style.title}>競技プログラミング</p>
        <hr />
        <p className={style.subtitle}>活動内容</p>
        <p className={style.text}>
          国際大学対抗プログラミングコンテスト(ICPC)に参加し、
        </p>
        <p className={style.text}>良い成績を上げるための活動を行っています。</p>
        <p className={style.text}>
          具体的には、ICPCなどの各種プログラミングコンテストへの参加、
        </p>
        <p className={style.text}>週2回の勉強会などを行っています。</p>
        <img className={style.image} src='/images/about.png' alt='活動風景' />
        <p className={style.subtitle}>競技プログラミングとは？</p>
        <p className={style.text}>
          皆さんご存じの通り、コンピュータはとても高速に計算してくれます。
        </p>
        <p className={style.text}>
          しかし、その速さには限界があり、世界中の多くの問題は
        </p>
        <p className={style.text}>
          そのままコンピュータで解くと数万年・数億年単位の時間を要すると言われています。
        </p>
        <p className={style.text}>
          そこで、こういった問題の答えを高速かつ正確に出すための工夫を行って、
        </p>
        <p className={style.text}>
          プログラムとして記述するのが競技プログラミングです。
        </p>
        <p></p>
        {/*スペースを空けるためのもの*/}
        <p className={style.text}>
          工学部情報工学科のパンフレットに記載していただきました！
        </p>
        <p className={style.text}>
          例題も掲載されているので是非ご覧ください。
          <Link
            className={style.link}
            href='http://www.ics.saitama-u.ac.jp/content/uploads/pamphlet/ics_pamphlet.pdf'
            target='_blank'
          >
            情報工学科パンフレット（PDF）
          </Link>
        </p>
        <p className={style.title}>Web研究会</p>
        <hr />
        <p className={style.subtitle}>講習</p>
        <p className={style.text}>
          WebサイトやWebサーバーを制作・構築・運用するための基礎を一通り学びます。
        </p>
        <p className={style.text}>講習ではHTML,CSS,JabaScriptを触ります。</p>
        <p className={style.text}>
          Webに関しては
          <strong className={style.highlight}>アウトプットこそ正義</strong>
          なので「勉強する」よりも
        </p>
        <p className={style.text}>
          「作りながらその都度調べる」というフローで効率の良い学習ができるようサポートします!
        </p>
        <p className={style.subtitle}>サイト制作・アプリ制作</p>
        <p className={style.text}>
          一通り基礎を学び終えたら、実際にX（旧twitter）やNoteのような投稿ができるサービスを
        </p>
        <p className={style.text}>
          自分たちで作ってもらいます。実際に私（sor4chi）は自作のブログや広告収入のある
        </p>
        <p className={style.text}>Webアプリを作成・公開してきました。</p>
        <p className={style.subtitle}>パフォーマンスチューニング</p>
        <p className={style.text}>Webの醍醐味は「制作」だけではありません。</p>
        <p className={style.text}>
          この世には「遅すぎる」や「セキュリティ的に危険」などの様々な問題を抱えたサイトがあります。
        </p>
        <p className={style.text}>
          こんなサイトを高速化したり安全に書き換えたりなどするのも、もちろんWebの範疇です。
        </p>
        <p className={style.text}>
          一見競技性のないWebの分野でも、こういった問題を解決する力を競う大会がいくつか開催されており、
        </p>
        <p className={style.text}>
          そこに出場することを目標にトレーニングもします。
        </p>
        <p className={style.text}>
          詳しく知りたい方は大会参加記を見てみてください。
        </p>
      </div>
    </div>
  );
}
