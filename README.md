# kirov

![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/NJU-2023Postgraduate-DepMining/kirov)![Top Language](https://img.shields.io/github/languages/top/NJU-2023Postgraduate-DepMining/kirov)![Code Size](https://img.shields.io/github/languages/code-size/NJU-2023Postgraduate-DepMining/kirov)![NPM Bundle Size](https://img.shields.io/bundlephobia/min/kirov?label=npm%20bundle%20size)![License](https://img.shields.io/github/license/NJU-2023Postgraduate-DepMining/kirov)

![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/NJU-2023Postgraduate-DepMining/kirov/dev/typescript)![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/NJU-2023Postgraduate-DepMining/kirov/dev/eslint)![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/NJU-2023Postgraduate-DepMining/kirov/react)![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/NJU-2023Postgraduate-DepMining/kirov/next)

![Goto Counter](https://img.shields.io/github/search/NJU-2023Postgraduate-DepMining/kirov/goto)![Github Downloads](https://img.shields.io/github/downloads/NJU-2023Postgraduate-DepMining/kirov/total?label=github%20downloads)![GitHub issues](https://img.shields.io/github/issues/NJU-2023Postgraduate-DepMining/kirov)![Github pull requests](https://img.shields.io/github/issues-pr/NJU-2023Postgraduate-DepMining/kirov)![GitHub last commit](https://img.shields.io/github/last-commit/NJU-2023Postgraduate-DepMining/kirov)[![Create and publish a Docker image](https://github.com/NJU-2023Postgraduate-DepMining/kirov/actions/workflows/build-image.yaml/badge.svg?branch=main)](https://github.com/NJU-2023Postgraduate-DepMining/kirov/actions/workflows/build-image.yaml)



Next.js based front-end for cloud native app DepMining


## Vercel 部署

```sh
# main 分支
https://kirov-nju.vercel.app/

# dev 分支
https://kirov-dev.vercel.app/
```

:bulb: 可能需要科学上网



## 本地镜像调试

###  打包镜像

确保暂存区的文件全部 commit 后，运行 `ci.sh` 对最新的 commit 自动打包镜像。

镜像 tag 命名规则：

* 如果不是 `main` 分支，将 commit ID 作为镜像 tag。
* 对 `main` 分支
  * 如果没有 `tag`，使用 `latest`
  * 否则，使用 `tag` 作为镜像 tag



### 运行镜像

执行如下命令：

```sh
docker run -p 3000:3000 --rm kirov:<tag>
```

容器运行成功后，在浏览器使用 `localhost:3000` 访问。



## 拉取 Github 镜像

### 注册一个 Secret Key

1. 登录 Github，点击右上角头像，点击 `Settings` 菜单项
2. 点击左侧边栏最下面的 `Developer settings` 菜单项
3. 点击打开左侧边栏最下面的 `Personal access tokens`，选择 `Tokens(classic)`
4. 点击 `Generate new token` 按钮，选择 `Generate new token (classic)`
5. 在权限范围勾选和 `packages` 有关的三个权限。自行选择过期时间，默认 30 天
6. 点击 `Generate token` 按钮完成创建
7. **复制密钥并保存好**，推荐保存为系统环境变量 `ghcr_token`，方便后续使用



### 登录 ghcr.io

使用上述创建的密钥登录 ghcr.io，这样才能拉取 Github Package Registry 中的镜像

Windows：

```cmd
echo %ghcr_token% | docker login ghcr.io -u peachest --password-stdin
```

Linux：

```shell
echo $ghcr_token | docker login ghcr.io -u peachest --password-stdin
```



登录成功会显示 `Login Succeeded`。



### 拉取镜像

登录成功后就可以拉取镜像。

进入项目的 Github 仓库页面，右下角 `Packages` 可以查看发布的所有软件包、镜像。点击名称查看镜像详细信息。

```sh
docker pull ghcr.io/nju-2023postgraduate-depmining/kirov:dev
```
