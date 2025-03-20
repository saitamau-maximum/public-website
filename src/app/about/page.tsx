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
            今年度からは活動班に分かれて、
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
            是非ご覧ください。
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

          <h2 className={style.title} id='CTF'>
            CTF（新設）
          </h2>
          <h3 className={style.subtitle}>活動内容</h3>
          <p className={style.text}>
            CTF (Capture The
            Flag)はセキュリティに関する競技で、隠された「フラグ」と呼ばれる文字列をあらゆる手段で探し出す競技です！
          </p>
          <p className={style.text}>
            いわゆるハッキングの技術を学んで、攻撃者から身を守ることが目的です。
            (攻撃は最大の防御というイメージ)
          </p>
          <p className={style.text}>
            フラグは、ctf&#123;7H15_15_4_D35cr1P710n4B3G1nn3r2&#125;のような文字列で、Web
            サイトのハッキングや実行ファイルの解析などをすることによって見つかります。フラグそのものが暗号化されているような問題もあります。
          </p>
          <p className={style.text}>
            毎年沢山のCTFの大会があり、それに参加し良い成績をおさめることを目的としています！
          </p>

          <h2 className={style.title} id='AI'>
            広義AI（新設）
          </h2>
          <h3 className={style.subtitle}>活動内容</h3>
          <p className={style.text}>
            広義AI活動班では、まず「手の形状検出AI」の基礎部分の完成を目標としながら、
            基礎知識（人工知能の概要とその仕組み、人工知能の構成要素とそれを構築することに対する必要知識など）を
            身に着けていきます。
          </p>
          <p className={style.text}>
            ゆくゆくは、手を動かすだけでPCやスマホを操作できる「ジェスチャー操作」への組み込みや、
            手以外のものを対象とした検出AIの作成など、形状検出を応用したプログラムを各々が作ることができるようにします！
          </p>
          <p>
            活動は主に週に1度の頻度で
            <ul>
              <li>集めた情報や技術について話し合う</li>
              <li>自分の作成したものを見せ合う</li>
            </ul>
            などを行います。
          </p>
          <p className={style.text}>
            班員は皆、今年度から知識0でのスタートです！
            しかしあなたの発想力によって、活動内容は無限の広がりを見せます！
            ぜひ気軽に参加してみてください！！
          </p>
          <h2 className={style.title} id='mobileapp'>
            モバイルアプリ開発（新設）
          </h2>
          <h3 className={style.subtitle}>活動内容</h3>
          <p className={style.text}>
            モバイルアプリ班では、その名の通りモバイルアプリの開発を行っていきます。
          </p>
          <p className={style.text}>
            今年から新しくできた班なので、メンバーもそれぞれ学びながら活動をしています。
            各々がそれぞれやりたいことを自主的に学び、その知識をお互いに教え合うことで、インフラの知識をしっかりと身につけることを目標にしています！
            3〜4人チームでの開発か個人開発の、好きな方を選ぶことができます。
          </p>
          <p className={style.text}>
            また、開発言語としてはFlutterを使用しての開発となります！
          </p>
          <p className={style.text}>
            週に1、2回の進捗共有を行い、活動開始から3ヶ月〜半年でプロダクトの発表会を行います。
          </p>
          <p className={style.text}>どんなアプリを作るかは自由です！</p>
          <p className={style.text}>
            みんなで気楽にアプリ開発をしてみましょう！
          </p>

          <h2 className={style.title} id='Game'>
            ゲーム開発（新設）
          </h2>
          <h3 className={style.subtitle}>活動内容</h3>
          <p className={style.text}>
            ゲーム開発ではウェブサイトなどを使って色々なゲームを作っていきます。
          </p>
          <p className={style.text}>
            まずは比較的簡単なパズルゲームから作り始め、シューティングや対戦型のボードゲームまで作れるようにすることを目標にしています。
          </p>
          <p className={style.text}>
            当面はUbuntuサーバー上でWebサイトを作り、そこでHTMLやCSS、JavaScriptを用いてゲームを作っていこうと思います。そのために先ずはほかの班と同様にWebサイトの作り方を学びます。
          </p>
          <p className={style.text}>
            活動としてまずは基礎固めをして、その後は開発に使えそうなレクチャーをしながら共同開発をしようと思っています。
          </p>
          <p className={style.text}>
            初心者大歓迎なので、工学部ではない方も是非お越しください！
          </p>

          <h2 className={style.title} id='Infra'>
            インフラ（新設）
          </h2>
          <h3 className={style.subtitle}>活動内容</h3>
          <p className={style.text}>インフラ班では主に、</p>
          <p className={style.text}>
            AWS、Ubuntuサーバを利用したWebサイトの公開、仮想マシンの構築、Minecraftサーバの構築などを可能にするための勉強を行います！
          </p>
          <p className={style.text}>
            Ubuntuサーバを利用したWebサイトの公開では、サイトの公開までの手順を実際に行い、生じた疑問を調べながら解消することで概形を把握し、操作に慣れることを目的としています。
          </p>
          <p className={style.text}>
            仮想マシンの構築では、UbuntuをホストOSとしてquem-kvmで仮想マシンを構築し、それを外部に公開する方法を勉強します！
          </p>
          <p className={style.text}>
            今年から新しくできた班なので、メンバーもそれぞれ学びながら活動をしています。
          </p>
          <p className={style.text}>
            各々がそれぞれやりたいことを自主的に学び、その知識をお互いに教え合うことで、インフラの知識をしっかりと身につけることを目標にしています！
          </p>
        </main>
      </div>
    </div>
  );
}
