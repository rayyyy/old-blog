---
slug: docker-dev
published_date: 2020-04-02T15:10:56.413Z
updated_date: 2020-04-02T15:10:56.435Z
title: DockerでGoの開発環境と実行環境を構築してみた
tags:
  - Docker
  - Go
  - VS Code
---
## はじめに

Dockerを使って、開発環境を立ち上げて開発したいって思ったことはありませんか？

GoでAPIサーバーを作るためにDockerをつかってやったことを書きます。

Goはビルドすることでプログラムをバイナリにすることができるので、ちょっと特殊な対応が必要でした。

## 前提

* Go 1.10.3
* APIには[goaフレームワーク](https://github.com/goadesign/goa/tree/v2)＆ 依存管理には[dep](https://github.com/golang/dep)
* Docker 18.06.0-ce
* docker-compose 1.22.0
* dockerや操作コマンドについては詳しくは説明しません

## やりたかったこと

* DockerでGoの開発環境の用意
* ローカルのVS Code(Mac)からDockerのコンテナ内のファイルを編集
* VS Codeで強力な補完を効かせる(Dockerの開発環境内のライブラリなど)
* DockerでGoのビルド済みのプログラムを実行する環境の用意
* docker-composeでコンテナ管理

## ソースコード

完成したソースコードを載せます。

Dockerfile
```
FROM golang:1.10.3 as build_env
 
# goaフレームワーク
RUN go get -u goa.design/goa/...
# dep 依存管理
RUN go get -u github.com/golang/dep/cmd/dep
 
WORKDIR /go/src/api
ADD go/src/api/. .
 
# ビルド処理
ENV CGO_ENABLED 0
RUN go build -o api_server svc/cmd/api_svc/main.go
 
# 実行環境
FROM alpine:latest as run_env
# タイムゾーン
RUN apk --update add tzdata
COPY --from=build_env /go/src/api/api_server /usr/local/bin/api_server
ENTRYPOINT ["/usr/local/bin/api_server"]
```

docker-compose.yml
```
version: '3.7'
 
services:
  app:
    build: .
    ports:
      - "80:8080"
    environment:
      TZ: Asia/Tokyo
 
  app_dev:
    build:
      context: .
      target: build_env
    tty: true
    ports:
      - "8080:8080"
    volumes:
      - ./go/src/api/:/go/src/api/
    environment:
      TZ: Asia/Tokyo
```

### DockerでGoの開発環境の用意

まず、DockerでGoの開発環境の用意しました。

Dockerfileにトライ＆エラーで順次必要なものを記述しておきました。

APIサーバーには[goaフレームワーク](https://github.com/goadesign/goa/tree/v2)を使うつもりなので、

goaのインストールをしました。

Goの依存関係管理ツールには[dep](https://github.com/golang/dep)を使いました。

Dockerfile
```
FROM golang:1.10.3 as build_env
 
# goaフレームワーク
RUN go get -u goa.design/goa/...
# dep 依存管理
RUN go get -u github.com/golang/dep/cmd/dep
 
WORKDIR /go/src/api
```

このDockerfileでコンテナを立ち上げてgoaを使ってプロジェクトを作りました。

詳しい内容はgoaの話になるのでここでは省略します。

最終的にローカルはこんな感じのフォルダ構成になりました。

/Users/user/docker/api_service

```
├── Dockerfile
└── go
    └── src
        └── api // ここのディレクトリはローカルとコンテナで共有しています。
            ├── Gopkg.lock
            ├── Gopkg.toml
            ├── design
            ├── svc // ここに実行するプログラムが格納されています。
            └── vendor
```

これだけでGoの開発環境は用意できます。

### ローカルのVS Code(Mac)からDockerのコンテナ内のファイルを編集

ローカルのVS Code(Mac)からDockerのコンテナ内のコードを編集するために

ローカルのgo/src/apiをコンテナ内の/go/src/apiにマウントしています。

これを実現するのは簡単ですね。

### VS Codeで強力な補完を効かせる(Dockerの開発環境内のライブラリなど)

補完については２つあります。

1. 構文などの補完
2. ライブラリや自分で定義した関数や構造体などの補完

#### 構文などの補完

VS CodeでGoのコーディングは補完などが聞いてて凄くおすすめなのですが、

コンテナ内のファイルを編集の際に補完を効かせるのは少し、設定が必要です。

まず、VS CodeでGoの拡張機能をインストールします。

<https://marketplace.visualstudio.com/items?itemName=ms-vscode.Go>

これをインストールするだけです。

これで、Goの構文などの補完は効きます。

#### ライブラリや自分で定義した関数や構造体などの補完

ライブラリや自分で定義した関数や構造体などの補完が効くと、開発スピードがあがりますよね。

Goのプロジェクトで依存関係管理ツールのdepを使っているので、

ライブラリなどは、go/src/api/vendor下にインストールされます。

go/src/apiはローカルと共有しているのでローカルからもアクセスできます。

これをうまくVS Codeに読み取ってもらうために、

VS Codeの基本設定のjsonに下記を追加しました。

User Setting
```
{
  "go.gopath": "/Users/user/docker/api_service/go" // 自分が今回作業しているディレクトリのパスです。
}
```

これで補完が効くと思います。

### DockerでGoのビルド済みのプログラムを実行する環境の用意

Goはビルドすることでプログラムをバイナリにできます。

バイナリにすることでGo環境がなくても実行できます。



先程までのDockerfileで作成したDockerイメージは容量が1GBを超えてきます。

開発環境で、いろいろ詰め込んでしまうので容量がどんどん増えていきます。

実行時にはバイナリだけが必要なのに、こんなに複雑で重い環境は実行時にはいりませんよね？



Dockerのmulti-stage buildという機能を利用すると、イメージ作成時にステージ分けできます。

Goの場合だと、だいたいこんな感じになります。

1. Goのプログラムをビルドするイメージ
2. 1でビルドしたバイナリを実行するイメージ

実際のDockerfileはこちらです。

Dockerfile
```
# イメージ名　as ステージ名
FROM golang:1.10.3 as build_env
 
# goaフレームワーク
RUN go get -u goa.design/goa/...
# dep 依存管理
RUN go get -u github.com/golang/dep/cmd/dep
 
WORKDIR /go/src/api
ADD go/src/api/. .
 
# ビルド処理 ビルドするときに必要なので環境変数をセットする。
ENV CGO_ENABLED 0
# 実際にビルド
RUN go build -o api_server svc/cmd/api_svc/main.go
 
# 実行環境 alpineは軽量イメージ
FROM alpine:latest as run_env
# build_envステージからバイナリファイルだけをコピーしてくる。
COPY --from=build_env /go/src/api/api_server /usr/local/bin/api_server
# 起動時に実行
ENTRYPOINT ["/usr/local/bin/api_server"]
```

そして、

これでイメージを作成したところこうなりました。

```
# 実行環境
api_service_app       latest              43dfa002e03d        1 days ago          18.2MB
# 開発環境
api_service_app_dev   latest              7fc2e3d84df5        1 days ago          1.97GB
```

開発環境のイメージは結果2GB近い結果になりました。

それと、比べて実行環境のイメージは18MBととても軽量ですね！

※記事に書いてあるところ以外で他にインストールしているのでホントは開発環境でも1GB前後になります。ログなくてすみません。。。

### docker-composeでコンテナ管理

docker-composeを使うことで複数のコンテナを管理できます。

docker-compose.yml

```
version: '3.7'
 
services:
  # 実行環境用
  app:
    build: . 
    # 実行環境のAPIサーバーはポート80番につなげる。
    ports:
      - "80:8080"
    environment:
      TZ: Asia/Tokyo
 
  # 開発環境用
  app_dev:
    build:
      context: .
      # targetでステージを指定することで、そのステージまでのビルドだけをします。
      target: build_env
    # コンテナは処理が終わると停止するので、停止しないようにします。
    tty: true
    # 開発環境のAPIサーバーはポート8080番につなげる。
    ports:
      - "8080:8080"
    # 共有ディレクトリをここに記載します。
    volumes:
      - ./go/src/api/:/go/src/api/
    # コンテナ内の時間を日本時間にします
    environment:
      TZ: Asia/Tokyo
```

これで、docker-compose up -dで開発環境と実行環境を起動できます。

通常だと、開発環境のステージでビルドを終えると、開発環境のコンテナは終了し、

ビルドしたバイナリを移した実行環境ではすぐにAPIサーバーが立ち上がります。

ただ、今回は開発環境でビルドだけではなく開発もしたいので、

ビルド後も、コンテナが終了しないように

tty: true

というオプションをつけています。

## おわり

長くなりましたが、自分の要望を叶えるために、

少し複雑な構成になりました。

ただ、頑張り次第で、良い開発環境をDockerで構築できるので

みなさんもやってみてください。