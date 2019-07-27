---
title: 【CI】FTPサーバに生成物をアップロードするスマートな方法
createdDate: "2019-07-27"
updatedDate: "2019-07-27"
author: ykd
tags:
  - ftp
  - git
  - 開発
  - CI
  - CircleCI
image: ../img/it.jpg
draft: false
description: 実はgitコマンドを使うことで簡単にftpサーバに生成物をアップロードできます！
---

実は、[`git ftp`](https://github.com/git-ftp/git-ftp/blob/master/man/git-ftp.1.md)コマンドを使うことで簡単にftpサーバにファイルをアップロードすることができます。(そもそもftpを使うのは好ましくないですが、必要なこともありますよね・・・)  

# 基本編
gitで管理されているファイルをすべてftpサーバにアップロードする場合は以下のような手順で行えます。
```bash
apt-get install git-ftp # git ftpのインストール。各ディストリビューション、OSに合わせて変更してください。
git config git-ftp.url <ftpサーバのURL>
git config git-ftp.user <ftpサーバのユーザ名>
git config git-ftp.password <ftpサーバのパスワード>
git ftp init # ファイルをアップロードし、`.git-ftp.log`をサーバに生成します。
git ftp push # ファイルの更新を反映したいときに使います。
```

# 応用編
静的サイトジェネレータやWebpack、TypeScriptなどを利用する場合、生成されたコードは`dist`や`public`といったディレクトリに出力される場合が多いです。このような特定のディレクトリの中身のみをftpサーバに展開する場合、少し手間を加える必要があります。
```bash
apt-get install git-ftp
git config git-ftp.url <ftpサーバのURL>
git config git-ftp.user <ftpサーバのユーザ名>
git config git-ftp.password <ftpサーバのパスワード>
git subtree push --prefix dist/ . temp # tempブランチが作られ、ルートにdistの中身が展開されます。
git checkout temp
git ftp init # tempの中身がftpサーバにアップロードされます。
```

# 僕の場合・・・
僕がCircleCIで走らせてるコードを晒します。
```bash
apt-get -qq install git-ftp
git config git-ftp.url ${URL}
git config git-ftp.user ${FTP_USERNAME}
git config git-ftp.password ${FTP_PASSWORD}

# アップロードしたいファイルをtrackedにする。
git config --global user.email "dummy@dummy.com" # CI環境でコミットするために設定。
git config --global user.name "dummy" # ftpにアップロードするためなので適当でOK
git add public -f # ディレクトリが.gitignoreにあるので、-fで強制的に追加。
git commit -nm "temp" # コミットフックがかからないように-nオプションを使用。

git subtree push --prefix public/ . build
git checkout build
git ftp push -f # 問題があっても-fで構わず更新
```