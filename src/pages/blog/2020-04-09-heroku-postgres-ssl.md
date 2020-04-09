---
slug: heroku-postgres-ssl
published_date: 2020-04-09T04:51:46.118Z
updated_date: 2020-04-09T04:51:46.153Z
title: Heroku PostgreSQLをGoogle Data Studioに追加する方法
tags:
  - Heroku
  - PostgreSQL
  - Google Data Studio
---
なにも知らずにGoogle Data StudioにHerokuのPostgreSQLのデータソースを接続しようとしたら、エラー。。。

認証情報は間違いなかったのですが、探してたらこのような記事が見つかりました。

SSL接続で繋げればいいとのこと。

参考サイト\
<https://stackoverflow.com/questions/42386975/heroku-postgresql-with-google-datastudio>\
[https://qiita.com/brewer_/items/fb1b1f2af3af273b5e3e](https://qiita.com/brewer_/items/fb1b1f2af3af273b5e3e)

\`\``bash{outputLines: 2}

openssl req -newkey rsa:2048 -nodes -keyout client.key -x509 -days 365 -out client.crt

\`\``

common nameはHerokuのPostgreSQLのhostを書いて証明書を作成してください。



そして、下記を実行して、herokuのssl証明書を取得してきます。

\`\``bash{outputLines: 3}

curl -O https://raw.githubusercontent.com/thusoy/postgres-mitm/master/postgres_get_server_cert.py

python postgres_get_server_cert.py {HerokuのPostgreSQLのhost}:{port} > heroku.crt

\`\``

\`heroku.crt\`、 \`client.crt\`、\`client.key\`が出来上がったと思います。

これをGoogle Data StudioのSSL接続の部分にアップロードすれば認証が通ると思います。