---
slug: kubernetes-nuxt
published_date: 2018-09-22T15:00:00.000Z
updated_date: 2018-09-22T15:00:00.000Z
title: Nuxtで作ったアプリをKubernetesでデプロイするチュートリアル
tags:
  - GCP
  - Kubernetes
  - Nuxt
---
## はじめに

最近、Kubernetesを勉強していたので、

これから、勉強する方のために簡単にできるチュートリアルを作りました。



Nuxtで作ったアプリをKubenetesにデプロイして、実際にアクセスできるところまでやっています。



Google Cloud Shellのハンズオン支援機能を使っているので、

チュートリアルをバンバン進めますよ。

## 事前注意

Google Cloud PlatformのGoogle Kubernetes Engineで動かしますので、

少しお金がかかります。

**１時間**で終われば**５円**いかないと思います。

## チュートリアルの始め方

### Google アカウントを用意する。

タイトルのとおりです。

アカウントない方はつくってください.

作ってログインしたら次に

### GitHubからリポジトリをクローン

↓からアクセスしてください。

[k8s-tutorial](https://github.com/rayyyy/k8s-tutorial)

OPEN IN GOOGLE CLOUD SHELLというボタンがあるので

クリックしてください。

![github-k8s-tutorial](http://35.222.151.25/wp-content/uploads/2018/09/github-k8s-tutorial-1024x794.png)

そうすると Google Cloud Shellに飛ばされます。

ディレクトリやファイル。

その下にコンソールが表示されると思います。



クローンしてきたk8s-tutorialのディレクトリに入り（もしかしたら、すでに入ってるかも）

**下記コマンドでチュートリアルを開始できます。**

`teachme tutorial.md`

あとは、右に表示される、チュートリアルを読み進めながらやっていくだけです。

### おわったら

作成されたKubernetes クラスタごと削除してください。

放置するとどんどん課金されていきます。

※ちなみに、適当にNuxtを選んだだけです。