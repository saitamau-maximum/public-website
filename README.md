# Maximum Public Website

一般公開向けのMaximumウェブサイトを管理するリポジトリです。

## 開発形態

### ブランチ名

- `main`: 本番環境
- `feat/xxx`: 機能追加
- `fix/xxx`: バグ修正
- `hotfix/xxx`: 緊急バグ修正

## 開発手順

### 前提条件

#### `npm.pkg.github.com` にログインする

```bash
npm login --scope=@saitamau-maximum --auth-type=legacy --registry=https://npm.pkg.github.com
```

この時、`username` にはGitHubのユーザー名、`password` にはGitHubのパーソナルアクセストークンを入力してください。
パーソナルアクセストークンは `read:packages` の権限が必要です。
これがないと`@saitamau-maximum/markdown-processor` がインストールできません。

発行方法はクラメソさんの記事を参考にしてください。
<https://dev.classmethod.jp/articles/github-personal-access-tokens>

#### 必要なパッケージをインストールする

```bash
npm install
```

#### npm run prepareについて

huskyを用いてコミット前にフォーマッターを適応しています。

#### 開発サーバーの起動

```bash
npm run dev
```

### デプロイについて

GitHubの `main` ブランチに push すると、Cloudflare Pagesに自動デプロイされます。

### デザインについて

[Figma(Dev-Project)](https://www.figma.com/file/bpfQJEGw74avlImcC0LbiZ/Dev-Project?type=design&node-id=5%3A2&mode=design&t=6dFZsWxnenm8fWhx-1)
で管理しています。
