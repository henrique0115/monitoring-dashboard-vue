# Uptime Kuma

<a target="_blank" href="https://github.com/louislam/uptime-kuma"><img src="https://img.shields.io/github/stars/louislam/uptime-kuma" /></a> <a target="_blank" href="https://hub.docker.com/r/louislam/uptime-kuma"><img src="https://img.shields.io/docker/pulls/louislam/uptime-kuma" /></a> <a target="_blank" href="https://hub.docker.com/r/louislam/uptime-kuma"><img src="https://img.shields.io/docker/v/louislam/uptime-kuma/latest?label=docker%20image%20ver." /></a> <a target="_blank" href="https://github.com/louislam/uptime-kuma"><img src="https://img.shields.io/github/last-commit/louislam/uptime-kuma" /></a>

<div align="center" width="100%">
    <img src="./public/icon.svg" width="128" alt="" />
</div>

It is a self-hosted monitoring tool like "Uptime Robot".

<img src="https://louislam.net/uptimekuma/1.jpg" width="512" alt="" />

## 🥔 Live Demo

Try it!

https://demo.uptime.kuma.pet

It is a 5 minutes live demo, all data will be deleted after that. The server is located at Tokyo, if you live far away from here, it may affact your experience. I suggest that you should install to try it.

VPS is sponsored by Uptime Kuma sponsors on [Open Collective](https://opencollective.com/uptime-kuma)! Thank you so much!


## ⭐ Features

* Monitoring uptime for HTTP(s) / TCP / Ping / DNS Record.
* Fancy, Reactive, Fast UI/UX.
* Notifications via Telegram, Discord, Gotify, Slack, Pushover, Email (SMTP), and [70+ notification services, click here for the full list](https://github.com/louislam/uptime-kuma/issues/284). 
* 20 seconds interval.
* [Multi Languages](https://github.com/louislam/uptime-kuma/tree/master/src/languages)

## 🔧 How to Install

### 🐳 Docker

```bash
docker volume create uptime-kuma
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:1
```

Browse to http://localhost:3001 after started.

### 💪🏻 Without Docker

Required Tools: Node.js >= 14, git and pm2.

```bash
git clone https://github.com/louislam/uptime-kuma.git
cd uptime-kuma
npm run setup

# Option 1. Try it
node server/server.js

# (Recommended) Option 2. Run in background using PM2
# Install PM2 if you don't have: npm install pm2 -g
pm2 start server/server.js --name uptime-kuma
```

Browse to http://localhost:3001 after started.

### Advanced Installation

If you need more options or need to browse via a reserve proxy, please read:

https://github.com/louislam/uptime-kuma/wiki/%F0%9F%94%A7-How-to-Install


## 🆙 How to Update

Please read:

https://github.com/louislam/uptime-kuma/wiki/%F0%9F%86%99-How-to-Update

## 🆕 What's Next?

I will mark requests/issues to the next milestone.

https://github.com/louislam/uptime-kuma/milestones

Project Plan:

https://github.com/louislam/uptime-kuma/projects/1

## 🖼 More Screenshots

Dark Mode:

<img src="https://user-images.githubusercontent.com/1336778/128710166-908f8d88-9256-43f3-9c49-bfc2c56011d2.png" width="400" alt="" />

Settings Page:

<img src="https://louislam.net/uptimekuma/2.jpg" width="400" alt="" />

Telegram Notification Sample:

<img src="https://louislam.net/uptimekuma/3.jpg" width="400" alt="" />

## Motivation

* I was looking for a self-hosted monitoring tool like "Uptime Robot", but it is hard to find a suitable one. One of the close ones is statping. Unfortunately, it is not stable and unmaintained.
* Want to build a fancy UI.
* Learn Vue 3 and vite.js.
* Show the power of Bootstrap 5.
* Try to use WebSocket with SPA instead of REST API.
* Deploy my first Docker image to Docker Hub.

If you love this project, please consider giving me a ⭐.


## 🗣️ Discussion

You can also discuss or ask for help in [Issues](https://github.com/louislam/uptime-kuma/issues).

Alternatively, you can discuss in my original post on reddit: https://www.reddit.com/r/selfhosted/comments/oi7dc7/uptime_kuma_a_fancy_selfhosted_monitoring_tool_an/

I think the real "Discussion" tab is hard to use, as it is reddit-like flow, I always missed new comments. 


## Contribute

If you want to report a bug or request a new feature. Free feel to open a [new issue](https://github.com/louislam/uptime-kuma/issues).

If you want to translate Uptime Kuma into your langauge, please read: https://github.com/louislam/uptime-kuma/tree/master/src/languages

If you want to modify Uptime Kuma, this guideline may be useful for you: https://github.com/louislam/uptime-kuma/blob/master/CONTRIBUTING.md

English proofreading is needed too because my grammar is not that great sadly. Feel free to correct my grammar in this readme, source code, or wiki.

