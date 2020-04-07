---
slug: code-syntax-highlight
published_date: 2020-04-07T14:55:25.250Z
updated_date: 2020-04-07T14:55:25.285Z
title: Gatsbyjsにコードシンタックスハイライトを導入する方法
tags:
  - GatsbyJS
---
GatsbyJSを使ったブログでソースコードをキレイに表示する方法が分かったのでメモがてら書きます。

## Prismjsをインストール
PrismJSというものを使います。
npmでインストールします。

```bash{outputLines: 2}
npm install --save gatsby-transformer-remark gatsby-remark-prismjs prismjs
```

## GatsbyJSの設定
`gatsby-config.js`に書き加えます。

optionsの値などは公式の情報などを参考にして行けばいいと思います！
[GatsbyJS公式 PrismJS導入方法](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/)もあるのでこちらを参考にしました。

僕は最小構成で設定してます。
```js
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      {
        resolve: `gatsby-remark-prismjs`,
        options: {
          classPrefix: "language-"
        },
      },
    ],
  },
},
```

次に、`gatsby-browser.js`にCSSの設定を加えます。
行ナンバーを表示したいのと、コマンドラインの表示もやりたいので、
下記の3つを読み込みます。

また、表示テーマはいろいろありますが、自分は`prism-okaidia`というものを気に入りました。
[PrismJS公式サイト](https://prismjs.com/)こちらから気に入るテーマを探すといいと思います。
```js
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
require("prismjs/themes/prism-okaidia.css")
require("prismjs/plugins/command-line/prism-command-line.css")
```

そして、追加CSSで調整します。
```sass
// prismjs
.gatsby-highlight
  border-radius: 0.3em
  margin: 0.5em 0
  overflow: auto
  padding: 1em

.gatsby-highlight pre[class*='language-']
  float: left
  margin: 0
  padding: 0

.gatsby-highlight pre[class*='language-'].line-numbers
  padding-left: 2.8em

.gatsby-highlight
  background-color: #272822 // テーマ次第で色が変わるかも
```

## 最後に
以上で設定は終わりです。

これだけでサイトが大分リッチになったので、
GatsbyJSを使ってる方がいたら是非試してみてください！