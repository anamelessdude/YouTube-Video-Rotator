# 🔄 YouTube Video Rotator & Fullscreen Fit

### Fix sideways YouTube videos in one click.

Rotate YouTube videos **90° left or right**, keep them rotated in **fullscreen**, and automatically fit the **entire picture without cropping**.

**一键修复侧着的 YouTube 视频：左右旋转 90°、全屏保持正确方向、完整显示画面不裁切。**

---

## 🚀 Install / 安装

Already have Tampermonkey?

### 👉 [Install YouTube Video Rotator](https://raw.githubusercontent.com/anamelessdude/YouTube-Video-Rotator/main/youtube-rotate-fit.user.js)

If you don't know what Tampermonkey is, no problem — follow the beginner-friendly guide below.

---

# ✨ What does it do? / 它能做什么？

Sometimes a YouTube video is uploaded sideways, but YouTube does not provide a built-in button to rotate the video.

**YouTube Video Rotator & Fullscreen Fit** adds simple rotation controls directly to the YouTube player:

```text
↺     0°     ↻
```

It can:

- 🔄 Rotate YouTube videos 90° left or right
- 🖥️ Keep the correct rotation in fullscreen
- 🔍 Automatically fit the whole rotated video on screen
- ✂️ Prevent the picture from being cropped
- ↩️ Restore the original orientation at any time
- 🪶 Run as a lightweight userscript
- 🚫 No ads
- 🔒 No tracking

### 中文

如果 YouTube 视频本身被侧着上传，而播放器又没有旋转功能，这个工具可以：

- 🔄 YouTube 视频左转 / 右转 90°
- 🖥️ 进入全屏后仍然保持正确方向
- 🔍 自动缩放到屏幕能够显示的最大完整画面
- ✂️ 不裁切视频内容
- ↩️ 随时恢复原始方向
- 🪶 非常轻量
- 🚫 无广告
- 🔒 无跟踪

---

# 🎯 Who is this for? / 适合什么情况？

This tool is designed for YouTube videos that were uploaded in the wrong orientation.

For example:

```text
Sideways video
      ↓
Rotate 90°
      ↓
Enter fullscreen
      ↓
Entire video stays visible
      ↓
No cropping
```

如果你遇到 YouTube 视频整个画面侧着、倒着，而 YouTube 本身又没有提供旋转按钮，这个工具就是为了解决这个问题。

---

# 🚀 Installation / 安装教程

## No programming knowledge is required.

You do **not** need to know JavaScript, coding, or GitHub development.

This tool runs through a browser extension called **Tampermonkey**.

A userscript is simply a small piece of code that adds extra features to a website.

If you've never heard of Tampermonkey before, that's completely fine.

Just follow the steps below.

---

# Step 1 — Install Tampermonkey

Tampermonkey is a browser extension that allows small userscripts like this one to run on websites.

Official website:

### 👉 [Tampermonkey](https://www.tampermonkey.net/)

Install the version for your browser.

This project currently targets Chromium-based browsers such as:

- Microsoft Edge
- Google Chrome

---

# Step 2 — ⚠️ Important for Microsoft Edge users

Microsoft Edge may prevent userscripts from running by default.

After installing Tampermonkey, open this address in Edge:

```text
edge://extensions
```

Find:

**Tampermonkey**

Then click:

**Details / 详细信息**

Enable:

### **Allow user scripts / 允许用户脚本**

If you do not see this option, enable:

### **Developer mode / 开发人员模式**

on the Extensions page.

> ⚠️ If you skip this step, the script may install successfully but nothing will appear on YouTube.

---

# Step 3 — Install YouTube Video Rotator

After Tampermonkey is installed and enabled, click:

## 👉 [Install YouTube Video Rotator](https://raw.githubusercontent.com/anamelessdude/YouTube-Video-Rotator/main/youtube-rotate-fit.user.js)

Tampermonkey should automatically open an installation page.

You should see:

**YouTube Video Rotator & Fullscreen Fit**

Click:

### **Install / 安装**

That's it. 🎉

---

# Step 4 — Open YouTube

Open any normal YouTube video page.

If YouTube was already open, refresh the page:

```text
Ctrl + R
```

Move your mouse over the video player.

You should see three buttons in the upper-right corner:

```text
↺     0°     ↻
```

### ↺ Rotate Left

Rotates the video 90° counter-clockwise.

### 0° Reset

Restores the video to its normal orientation.

### ↻ Rotate Right

Rotates the video 90° clockwise.

---

# 🖥️ Fullscreen

After rotating the video, press:

```text
F
```

or click YouTube's fullscreen button.

The script will:

1. Keep the video rotated
2. Detect the fullscreen size
3. Automatically resize the rotated video
4. Keep the entire picture visible
5. Prevent cropping

On a widescreen monitor, a rotated vertical video may have empty space on the left and right.

This is normal.

The script prioritizes showing the **entire video without cutting anything off**.

---

# 🇨🇳 中文快速安装教程

如果你完全不懂代码，也没关系。

按照下面几步操作即可。

## 1. 安装 Tampermonkey

打开：

### 👉 [Tampermonkey 官网](https://www.tampermonkey.net/)

安装适合你浏览器的版本。

Tampermonkey 中文通常也叫：

- 篡改猴
- 油猴

---

## 2. Edge 用户一定要检查这个权限

在 Edge 地址栏输入：

```text
edge://extensions
```

找到：

**Tampermonkey**

点击：

**详细信息**

然后开启：

### **允许用户脚本**

如果没有看到这个选项，就在扩展页面开启：

### **开发人员模式**

⚠️ 如果没有开启这个权限，可能会出现：

> Tampermonkey 已经安装  
> 脚本也已经安装  
> 但 YouTube 上什么都没有

---

## 3. 安装 YouTube Video Rotator

点击：

### 👉 [安装 YouTube Video Rotator](https://raw.githubusercontent.com/anamelessdude/YouTube-Video-Rotator/main/youtube-rotate-fit.user.js)

Tampermonkey 会自动打开脚本安装页面。

点击：

### **安装**

---

## 4. 打开 YouTube

打开一个 YouTube 视频。

如果之前已经打开 YouTube，请按：

```text
Ctrl + R
```

刷新页面。

播放器右上角应该会出现：

```text
↺     0°     ↻
```

其中：

- **↺** = 向左旋转 90°
- **0°** = 恢复正常
- **↻** = 向右旋转 90°

旋转以后直接进入 YouTube 全屏即可。

脚本会自动保持旋转，并调整画面大小，让完整视频显示出来。

---

# 🛠️ Troubleshooting / 常见问题

## The buttons don't appear

If you installed the script but cannot see:

```text
↺     0°     ↻
```

try the following.

### 1. Refresh YouTube

Press:

```text
Ctrl + R
```

---

### 2. Check Tampermonkey

Click the Tampermonkey icon in your browser.

Make sure:

**YouTube Video Rotator & Fullscreen Fit**

is enabled.

---

### 3. Microsoft Edge: check "Allow user scripts"

Open:

```text
edge://extensions
```

Go to:

**Tampermonkey → Details**

Make sure:

**Allow user scripts / 允许用户脚本**

is enabled.

This is especially important on Microsoft Edge.

---

### 4. Reload the YouTube tab

After changing Tampermonkey or Edge permissions, return to YouTube and press:

```text
Ctrl + R
```

again.

---

# 🔄 Automatic Updates / 自动更新

The script can update through Tampermonkey.

The latest version is hosted in this GitHub repository:

`youtube-rotate-fit.user.js`

When a new version is released, increasing the userscript version number allows Tampermonkey to detect the update.

---

# 🔒 Privacy

YouTube Video Rotator does not collect personal information.

It does not:

- Track your browsing
- Send YouTube history anywhere
- Collect account information
- Display advertisements
- Send analytics data

The script only changes the appearance and behavior of the YouTube video player inside your browser.

---

# 💡 Why does this project exist?

This project started with a very simple problem:

> A YouTube video was uploaded sideways, and YouTube had no built-in way to rotate it properly.

The first solution rotated the video.

But then fullscreen reset the orientation.

So that problem was fixed.

Then the rotated fullscreen video was cropped.

So the scaling logic was fixed too.

Eventually the solution could:

```text
Rotate the video
        +
Keep rotation in fullscreen
        +
Automatically fit the entire picture
        +
Avoid cropping
```

That solution became:

# YouTube Video Rotator & Fullscreen Fit

Sometimes a useful tool starts with nothing more than one annoying little problem.

---

# 📄 License

MIT License.

You are free to use, modify, improve, and share this project.

---

## ❤️ Contributions

Bug reports, suggestions, improvements, and pull requests are welcome.

If YouTube changes its player and something stops working, feel free to open an Issue.

---

### YouTube Video Rotator & Fullscreen Fit

**Rotate sideways YouTube videos. Keep them rotated in fullscreen. See the whole picture.**

**旋转侧着的 YouTube 视频，全屏保持方向，完整显示不裁切。**

**本项目完全由AI制作，本人完全不懂代码，只是因为看视频的时候发现油管无法旋转，所以问了GPT该怎么办，于是有了此项目**
**This project was made entirely with AI. I don't know how to code at all. It started because I was watching a video and realized that YouTube has no built-in way to rotate it, so I asked GPT what I could do. And that is how this project came to exist.**
