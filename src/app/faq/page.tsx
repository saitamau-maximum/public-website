import type { Metadata } from 'next';
import styles from './page.module.scss';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroImage } from '@/components/HeroImage';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    '埼玉大学プログラミングサークル「Maximum」について、よくある質問をまとめたページです。',
};

export default function Faq() {
  return (
    <div className={styles.container}>
      <HeroImage type='default' title='よくある質問' />
      <Breadcrumb
        items={[
          { title: 'Top', href: '/' },
          { title: 'FAQ', href: '/faq' },
        ]}
      />
      <div className={styles.contents}>
        <h1 className={styles.head}>よくある質問</h1>
        <div className={styles.QAcontainer}>
          <p className={styles.chatMessageQuestion}>
            <div className={styles.chara}>Q</div>
            FAQに載ってないことはどこで聞けますか?
          </p>
          <p className={styles.chatMessageAnswer}>
            <div className={styles.chara}>A</div>
            もしほかにご質問があれば
            <a href='https://twitter.com/Maximum03400346' target='_blank'>
              X(旧Twitter)
            </a>
            のDMなどで気軽に聞いてください！
          </p>
        </div>
        <div className={styles.QAcontainer}>
          <p className={styles.chatMessageQuestion}>
            <div className={styles.chara}>Q</div>
            プログラミング初心者なんですが、大丈夫ですか？
          </p>
          <p className={styles.chatMessageAnswer}>
            <div className={styles.chara}>A</div>
            Maximumではプログラミングの初歩を学ぶ初心者向け講習会を定期的に行っていますので、そちらに参加していただければ問題ありません！
          </p>
        </div>
        <div className={styles.QAcontainer}>
          <p className={styles.chatMessageQuestion}>
            <div className={styles.chara}>Q</div>
            時間が取れないのですが、大丈夫ですか？
          </p>
          <p className={styles.chatMessageAnswer}>
            <div className={styles.chara}>A</div>
            会員が一同に会する機会は多くなく、連絡は基本的にDiscordで行っています。そのため、講習会に毎回参加することはできなくても、コミュニケーションを取って遅れを取り戻すことができます。
          </p>
        </div>
        <div className={styles.QAcontainer}>
          <p className={styles.chatMessageQuestion}>
            <div className={styles.chara}>Q</div>活動の成果は？
          </p>
          {/* 
        TODO: Achievementの名前、後で決める。+ ref:https://github.com/saitamau-maximum/public-website/pull/25 
      */}
          <p className={styles.chatMessageAnswer}>
            <div className={styles.chara}>A</div>{' '}
            上のAchievementsページから過去の成績をご覧ください！
          </p>
        </div>
        <div className={styles.QAcontainer}>
          <p className={styles.chatMessageQuestion}>
            <div className={styles.chara}>Q</div>
            活動内容を教えてください！{' '}
          </p>
          <p className={styles.chatMessageAnswer}>
            <div className={styles.chara}>A</div>
            競技プログラミングやWeb制作・Webパフォーマンスチューニングなどを行っています！詳細は上のAboutページをご覧ください！
          </p>
        </div>
        <div className={styles.QAcontainer}>
          <p className={styles.chatMessageQuestion}>
            <div className={styles.chara}>Q</div>
            会費はいくらかかるのでしょうか？{' '}
          </p>
          <p className={styles.chatMessageAnswer}>
            <div className={styles.chara}>A</div> 月額 250
            円で、入会時点での残りの今年度の活動月数分を一括徴収します。
            例えば、 4 月に入会した場合は 12 ヶ月分の 3,000 円、 5
            月に入会した場合は 11 ヶ月分の 2,750 円、というようになります。
          </p>
        </div>
        <div className={styles.QAcontainer}>
          <p className={styles.chatMessageQuestion}>
            <div className={styles.chara}>Q</div>
            情報工学科じゃないけれど入れる？{' '}
          </p>
          <p className={styles.chatMessageAnswer}>
            <div className={styles.chara}>A</div>
            独習がメインな部分もあり、他のメンバーと大きな差はないようです。（実は情報工学科が半数以下の年もあります）
            基本、入部者は歓迎するので興味があればぜひお声かけください！
          </p>
        </div>
        <div className={styles.QAcontainer}>
          <p className={styles.chatMessageQuestion}>
            <div className={styles.chara}>Q</div>
            どうやって練習をしているの？{' '}
          </p>
          <p className={styles.chatMessageAnswer}>
            <div className={styles.chara}>A</div>
            AtCoderという毎週末に競技プログラミングコンテストを開催している企業があるので、主にそこの問題を解きます。
            まず&quot;AtCoder Beginner
            Contest&quot;に参加して競技プログラミングに慣れましょう。
            Web研では基礎を一通り講習した後で対価の過去問を使った実践演習を主に行っています！
          </p>
        </div>
        <div className={styles.QAcontainer}>
          <p className={styles.chatMessageQuestion}>
            <div className={styles.chara}>Q</div>使う言語は？{' '}
          </p>
          <p className={styles.chatMessageAnswer}>
            <div className={styles.chara}>A</div>{' '}
            基本的には独習となるため、特に言語の強制などはしていません。
            ですが、講習で主に用いるのは、C++やHTML/CSS/JavaScriptという言語で、これを推奨しています。
          </p>
        </div>
        <div className={styles.QAcontainer}>
          <p className={styles.chatMessageQuestion}>
            <div className={styles.chara}>Q</div>人数はどのくらい？{' '}
          </p>
          <p className={styles.chatMessageAnswer}>
            <div className={styles.chara}>A</div>
            2023年度の人数は30人弱でした。女子のメンバーもいます。学部学科・男女関係なく歓迎しています！
          </p>
        </div>
      </div>
    </div>
  );
}
