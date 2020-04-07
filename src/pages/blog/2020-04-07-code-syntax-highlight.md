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
[GatsbyJS公式 PrismJS導入方法](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/)もあるのでこちらを参考にしました。

```
npm install --save gatsby-transformer-remark gatsby-remark-prismjs prismjs
```