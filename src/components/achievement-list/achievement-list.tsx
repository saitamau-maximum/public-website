import path from 'path';
import { getMarkdowns } from '../../utils/markdown';
import AchievementCard from '@/components/AchievementCard';

export default async function AchievementList() {
  // achievementの中身を取得
  const docsDir = path.join(process.cwd(), 'docs', 'news');
  const docs = await getMarkdowns(docsDir);

  // 一覧を日付でソート
  docs.sort((a, b) =>
    a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1,
  );

  return (
    <div>
      {docs.map((doc) => (
        <AchievementCard
          key={doc.slug}
          title={doc.frontmatter.title}
          subtitle={doc.frontmatter.subtitle}
          description={doc.frontmatter.description}
          iconUrl={doc.frontmatter.iconUrl}
          slug={doc.slug}
        />
      ))}
    </div>
  );
}
