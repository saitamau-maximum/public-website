# Maximum Public Website

一般公開向けの Maximum ウェブサイトを管理するリポジトリです。

<https://maximum.vc>

## Development

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
