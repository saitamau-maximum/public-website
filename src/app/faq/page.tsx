import type { Metadata } from 'next';
import styles from './page.module.scss';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroImage } from '@/components/HeroImage';
import { QAComponent } from '@/components/QAComponent';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    '埼玉大学プログラミングサークル「Maximum」について、よくある質問をまとめたページです。',
};

export default function Faq() {
  return (
    <div className={styles.container}>
      <HeroImage type='default' title='よくある質問' blur={true} />
      <Breadcrumb
        items={[
          { title: 'Top', href: '/' },
          { title: 'よくある質問', href: '/faq' },
        ]}
      />
      <main className={styles.contents}>
        <span className={styles.head}>よくある質問</span>
        <QAComponent
          question='FAQに載ってないことはどこで聞けますか？'
          answer='もしほかにご質問があればX(旧Twitter)のDMなどで気軽に聞いてください！'
        />
        <QAComponent
          question='プログラミング初心者なんですが、大丈夫ですか？'
          answer='Maximumではプログラミングの初歩を学ぶ初心者向け講習会を定期的に行っていますので、そちらに参加していただければ問題ありません！'
        />
        <QAComponent
          question='時間が取れないのですが、大丈夫ですか？'
          answer='会員が一同に会する機会は多くなく、連絡は基本的にDiscordで行っています。そのため、講習会に毎回参加することはできなくても、コミュニケーションを取って遅れを取り戻すことができます。'
        />
        <QAComponent
          question='活動の成果は？'
          answer='上のAchievementsページから過去の成績をご覧ください！'
        />
        <QAComponent
          question='活動内容を教えてください！'
          answer='競プロやWeb研を中心に、2025年度からはCTF・広義AI・モバイルアプリなどの新たな活動班も加わり、幅広い分野に挑戦できるサークルになりました！詳細は上のAboutページをご覧ください！'
        />
        <QAComponent
          question='会費はいくらかかるのでしょうか？'
          answer='月額250円で、入会時点での残りの年度の活動月数分を一括徴収します。例えば、4月に入会した場合は12ヶ月分の3,000円、5月に入会した場合は11ヶ月分の2,750円、というようになります。'
        />
        <QAComponent
          question='情報工学科じゃないけれど入れる？'
          answer='独習がメインな部分もあり、他のメンバーと大きな差はないようです。（実は情報工学科が半数以下の年もあります）基本、入部者は歓迎するので興味があればぜひお声かけください！'
        />
        <QAComponent
          question='どうやって練習をしているの？'
          answer='AtCoderという毎週末に競技プログラミングコンテストを開催している企業があるので、主にそこの問題を解きます。まず"AtCoder Beginner Contest"に参加して競技プログラミングに慣れましょう。Web研では基礎を一通り講習した後で対価の過去問を使った実践演習を主に行っています！'
        />
        <QAComponent
          question='使う言語は？'
          answer='基本的には独習となるため、特に言語の強制などはしていません。ですが、講習で主に用いるのは、C++やHTML/CSS/JavaScriptという言語で、これを推奨しています。'
        />
        <QAComponent
          question='人数はどのくらい？'
          answer='2024年度の人数は40人強でした。女子のメンバーもいます。学部学科・男女関係なく歓迎しています！'
        />
      </main>
    </div>
  );
}
