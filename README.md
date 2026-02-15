# Maximum Public Website

一般公開向けの Maximum ウェブサイトを管理するリポジトリです。

<https://maximum.vc>

## Development

### 前提条件: `npm.pkg.github.com` にログインする

```bash
npm login --scope=@saitamau-maximum --auth-type=legacy --registry=https://npm.pkg.github.com
```

この時、 `username` には GitHub のユーザー名、 `password` には GitHub のパーソナルアクセストークンを入力してください。
パーソナルアクセストークンは `read:packages` の権限が必要です。
これがないと `@saitamau-maximum/markdown-processor` がインストールできません。

発行方法はクラメソさんの記事を参考にしてください。
<https://dev.classmethod.jp/articles/github-personal-access-tokens>

### 必要なパッケージをインストールする

```bash
pnpm install
```

### pre-commitについて

prepare を使ってインストールなどのアクション時に husky のフックを設定しています。
こうしてコミット前にフォーマッターを適応させています。

### 開発サーバーの起動

```bash
pnpm dev
```

もし docs 内に画像などを配置した場合は、更新後以下のコマンドで public にコピーしてください。

```bash
pnpm build:assets:news
```

## デプロイについて

GitHubの `main` ブランチに push すると、 Cloudflare Workers に自動デプロイされます。

## これまでの maximum.vc

- 2022 年度まで: DokuWiki を使用していたためバージョン管理されていません
- 2023 年度まで: [saitamau-maximum/website](https://github.com/saitamau-maximum/website)
- 2025 年 10 月まで: [saitamau-maximum/public-website@v1](https://github.com/saitamau-maximum/public-website/tree/v1)
- 現在: [saitamau-maximum/public-website@main](https://github.com/saitamau-maximum/public-website)
