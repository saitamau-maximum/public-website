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

#### yarnをインストールする

```bash
npm install -g yarn
```

#### 必要なパッケージをインストールする

```bash
yarn install
```

#### yarn prepareについて

huskyを用いてコミット前にフォーマッターを適応しています。
huskyは以下のコマンドでインストールできます。
```bash
yarn add -D husky
```

#### 開発サーバーの起動

```bash
yarn dev
```

### デプロイについて

GitHubの `main` ブランチに push すると、Cloudflare Pagesに自動デプロイされます。

### デザインについて

[Figma(Dev-Project)](https://www.figma.com/file/bpfQJEGw74avlImcC0LbiZ/Dev-Project?type=design&node-id=5%3A2&mode=design&t=6dFZsWxnenm8fWhx-1)
で管理しています。
