---
slug: goa-docker-dev
published_date: 2018-08-29T15:00:00.000Z
updated_date: 2018-08-29T15:00:00.000Z
title: 【goadock】goaの開発環境のテンプレートをDockerでつくりました。
tags:
  - Docker
  - Go
  - goa
---
## goadockとは

Dockerを立ち上げるだけで、goaフレームワークを使ったAPI開発をすぐに始められるものです。

git cloneしてdocker-compose upするだけですぐに開発を始められます。

リポジトリはこれです。

<https://github.com/rayyyy/goadock>

## 作った目的

自分で思い立った時にgoaで簡単にAPIサーバーをつくって試せるようにしたかったのと、

周りの人にもっとgoaを使ってもらってコミュニティを大きくしたかったからです。

名前は某dockをパクりました。

## デモ

まずは、コンテナをたちあげます。

terminal

```
git clone https://github.com/rayyyy/goadock
cd goadock
cp .env.example .env
make up
```

コンテナを立ち上げたら、

コンテナに入ってごにょごにょする感じです。

試しに、goaの<https://github.com/goadesign/goa/tree/v2>ここを参考にはじめます。

terminal
```
make exec
root@xxxxxxx:/go/src/goa_api# goa gen goa_api/design
root@xxxxxxx:/go/src/goa_api# goa example goa_api/design
root@xxxxxxx:/go/src/goa_api# dep ensure -v
root@xxxxxxx:/go/src/goa_api# go run cmd/calc_svc/main.go
[calc] 00:45:20 method "Add" mounted on GET /add/{a}/{b}
[calc] 00:45:20 listening on :8080
```

http://localhost:8080/add/1/2 ここにアクセスするとAPIが立ち上がっています。

簡単にAPIを試せる以外にも、goadockを使うと

* mysql
* adminer – データベースクライアント
* migrate – migrateツール
* gen – DBスキーマからstructの生成ツール
* dep – 依存関係管理ツール

が最初からついています。

これからアップデートで増えるかもしれないですが、現状はこれだけです。

### ロゴについて

下記サイトで作りました。

<https://hatchful.shopify.com/>

無料でこのクオリティが作れるのはすごい。。。

![](http://35.222.151.25/wp-content/uploads/2018/08/goadock-logo-300x300.png)