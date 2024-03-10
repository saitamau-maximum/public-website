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

#### npmをインストールする

```bash
npm install -g
```

#### 必要なパッケージをインストールする

```bash
npm install
```

#### 開発サーバーの起動

```bash
npm run dev
```

### デプロイについて

GitHubの `main` ブランチに push すると、Cloudflare Pagesに自動デプロイされます。

### デザインについて

[Figma(Dev-Project)](https://www.figma.com/file/bpfQJEGw74avlImcC0LbiZ/Dev-Project?type=design&node-id=5%3A2&mode=design&t=6dFZsWxnenm8fWhx-1)
で管理しています。