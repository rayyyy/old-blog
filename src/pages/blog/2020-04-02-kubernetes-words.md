---
slug: kubernetes-words
published_date: 2018-09-16T15:00:00.000Z
updated_date: 2018-09-16T15:00:00.000Z
title: kubernetes 用語集
tags:
  - Docker
  - Kubernetes
---
## はじめに

今、絶賛Kubernetesの勉強中です。

使いこなせれば大分便利になる印象。

勉強するにあたって、よく使う用語をまとめています。



Docker、Kubernetesを勉強する方はこちらへ

[Dockerを身に着けたい方へ](http://35.222.151.25/2018/09/11/173/)

## 基本的な用語

### Cluster

1つ以上のNodeの集合体とそれを管理する Masterで構成されるインスタンスグループ

Kubernetesの様々なリソースを管理する

### Namespace

Kubernetesクラスタ内で作る仮想的クラスタ

本番、開発ように分けて使うのかな？

### Node

Dockerホストのこと コンテナを実行するサーバー

コンテナをデプロイするために使う

### Pod

コンテナの集合体（ひとつでもいい）

デプロイする時にセットにしたいものをひとまとめにしておくといい

### Service

podの集合にIPアドレスを振る

### Ingress

クラスタを外に公開するためのもの

このリクエストはこのServiceに流すみたいなルーティングも設定できる

## 応用的な用語

### ReplicaSet

Podを複数生成して管理する

スケールする時に使うっぽい

### Deployment

ReplicaSetを世代管理する

デプロイしたり、ロールバックしたりできる

### ConfigMap

Podの設定情報を定義できる

### PersistentVolume

Podが使用するストレージのサイズや種別を定義できる

### PersistentVolumeClaim

PersistentVolumeを動的に確保できる。

### StorageClass

PersistentVolumeのストレージの種類を定義する

### StatefulSet

データストアのような継続的にデータを永続化するステートフルなアプリを管理するときに使う

DBなどもこちらで作るのかな

### Job

常駐しないPodを作成し、正常終了することを保証する

### CronJob

スケジューリングして実行されるJob

cron記法

### Secret

機密データを定義するところ

パスワードや接続情報などを定義しておくといい

### Role

Namespace内で操作可能なリソースのルールを定義する

### RoleBinding

Kubernetesリソースを使うユーザーとRoleを紐付ける

### ClusterRole

Cluster内で操作可能なリソースのルールを定義する

### ClusterRoleBinding

Kubernetesリソースを使うユーザーとClusterRoleを紐付ける

### ServiceAccount

PodにKubernetesリソースを操作させる時に利用するユーザーを定義できる