import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Doc {
  slug: string;
  content: string;
  frontmatter: {
    [key: string]: any;
  };
}

export const getMarkdowns = async (dir: string): Promise<Doc[]> => {
  const fileNames = await fs.readdir(dir);
  const docs: Doc[] = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(dir, fileName);
      // ファイルの中身を取得
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(fileContents);

      // ファイル名からカテゴリを取得
      return {
        slug: fileName.replace(".md", ""),
        content,
        frontmatter: data,
      };
    })
  );
  return docs;
};