// ==UserScript==
// @name         YouTube Rotate & Fit
// @name:zh-CN   YouTube 视频旋转与全屏适配
// @namespace    youtube-rotate-fit
// @version      1.0.2
// @description  Rotate sideways YouTube videos 90° and automatically fit the entire video in fullscreen without cropping.
// @description:zh-CN 一键旋转侧着的 YouTube 视频，并自动适配全屏显示，完整显示画面而不裁切。
// @author       YouTube Rotate & Fit contributors
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-idle
// @license      MIT
// @homepageURL  https://github.com/anamelessdude/YouTube-Video-Rotator
// @updateURL    https://raw.githubusercontent.com/anamelessdude/YouTube-Video-Rotator/main/youtube-rotate-fit.user.js
// @downloadURL  https://raw.githubusercontent.com/anamelessdude/YouTube-Video-Rotator/main/youtube-rotate-fit.user.js
// ==/UserScript==

(功能 () {
    “用严格的”;

    cont UI_ID = “YouTube-旋转-调整-控制”;

    令旋转 = 0;
    设旋转计时器 = 零;

    // ------------------------------------------------------------
    寻找YouTube的视频元素
    // ------------------------------------------------------------

    function getVideo() {
        回归 (
            记录。querySelector（'video.html5-main-video'） ||
            记录。querySelector（'video')
        );
    }

    函数 getPlayer() {
        退回文件。querySelector（'#movie_player');
    }

    保持角度在-180到180度之间
    函数 normalizeAngle（角度) {
        角度 %= 360;

        如果（角度>180) {
            角度 -= 360;
        }

        如果（角度<-180) {
            角度 += 360;
        }

        回弹角度;
    }

    // ------------------------------------------------------------
    核心：旋转视频并放进播放器里
    // ------------------------------------------------------------

    函数应用旋转() {
        const video = getVideo();
        const player = getPlayer();

        如果（！视频 || ！球员) {
            回归;
        }

        const 角度 = 归一化角度（旋转）);

        0度=恢复YouTube的正常视频显示
        如果（角度=== 0）) {
            视频。风格。removeProperty（'transform');
            视频。风格。removeProperty（'transform-origin');
            视频。风格。removeProperty（'transition');
            回归;
        }

        /*
* 暂时移除变换，以便测量
* YouTube在计算比例前的真实视频尺寸。
         *
* 这是防止裁剪的重要部分。
         */
        视频。风格。setProperty(
            “变形”，
            “没有”，
            “重要”
        );

        视频。风格。setProperty(
            “变换起源”，
            “中心中心”，
            “重要”
        );

        视频。风格。setProperty(
            “过渡”，
            “没有”，
            “重要”
        );

        const videoRect = 视频。getBoundingClientRect();

        让playerWidth受影响;
        让 playerHeight;

        当YouTube全屏时，使用整个屏幕大小
        如果（文档）。全屏元素) {
            playerWidth = 窗口。内宽;
            playerHeight = 窗口。内高;
        } 否则 {
            const playerRect = 玩家。getBoundingClientRect();
            playerWidth = playerRect。宽度;
            playerHeight = playerRect。高度;
        }

        如果 (
            ！视频Rect。宽度||
            ！视频Rect。身高 ||
            ！player宽度 ||
            ！球员身高
        ) {
            回归;
        }

        const quarterTurn =
            数学。腹肌（角度）% 180 === 90;

        /*
* 旋转90°或-90°后，
* 宽度和高度互换。
         */
        cont rotated宽度 = 四分之一转
?视频Rect。高度
： 视频 Rect。宽度;

        const rotd高度 = 四分之一转
?视频Rect。宽度
： 视频 Rect。高度;

        /*
* 选择最大且仍保持比例的比例
* 完整视频可见。
         */
        集合尺度 = 数学。明(
            playerWidth / rotatedWidth，
            playerHeight / rotatedHeight
        );

        视频。风格。setProperty(
            “变形”，
            '旋转（' + 角度 + '度）比例（' + 刻度+'）'，
            “重要”
        );
    }

    // ------------------------------------------------------------
    YouTube更换全屏/布局后重新应用
    // ------------------------------------------------------------

    函数刷新旋转() {
        应用旋转();

        YouTube 可能会在全屏调整后不久重建其布局
        setTimeout（applyRotation， 100);
        setTimeout（applyRotation， 300);
        setTimeout（applyRotation， 800）);
    }

    function startProtection() {
        如果（rotateTimer）) {
            clearInterval（rotateTimer);
            旋转计时器 = 零;
        }

        如果 （normalizeAngle（旋转） ！== 0) {
            /*
* YouTube有时会覆盖视频的变换。
* 重新应用可以保持旋转全屏运行。
             */
            rotateTimer = setInterval(
                应用旋转，
                500
            );
        }
    }

    函数 setRotation（角度) {
        旋转 = 归一化角度（角度);

        更新角度按钮();
        刷新旋转();
        startProtection();
    }

    // ------------------------------------------------------------
    用户界面
    // ------------------------------------------------------------

    function createButton（text， title) {
        const button = 文档。createElement（'button');

        按钮。文本内容 = 文本;
        按钮。标题 = 标题;

        按钮。风格。宽度 = '38px';
        按钮。风格。高度 = '34px';
        按钮。风格。border = '0';
        按钮。风格。borderRadius = '6px';
        按钮。风格。背景 = 'RGBA（255,255,255,0.16）';
        按钮。风格。颜色 = '#fff';
        按钮。风格。fontSize = '18px';
        按钮。风格。光标 = “指针”;
        按钮。风格。填充 = '0';
        按钮。风格。margin = '0';

        按钮。addEventListener（事件听众）(
            “鼠标进入”
            功能 () {
                按钮。风格。背景 =
                    'rgba（255,255,255,0.30）';
            }
        );

        按钮。addEventListener（事件听众）(
            “鼠叶”，
            功能 () {
                按钮。风格。背景 =
                    'rgba（255,255,255,0.16）';
            }
        );

        /*
* 防止YouTube处理按钮点击
* 作为视频本身的点击。
         */
        按钮。addEventListener（事件听众）(
            “鼠标倒下”，
            函数（事件）) {
                活动。停止传播();
            }
        );

        按钮。addEventListener（事件听众）(
            “咔嗒”，
            函数（事件）) {
                活动。停止传播();
                活动。防止默认();
            }
        );

        返回按钮;
    }

    function ensureControls() {
        const player = getPlayer();

        如果（！球员) {
            回归;
        }

        如果（文档）。getElementById（UI_ID)) {
            回归;
        }

        const panel = 文档。createElement（'div');

        小组。id = UI_ID;

        小组。风格。位置 = '绝对';
        小组。风格。top = '12px';
        小组。风格。右 = '12px';
        小组。风格。zIndex = '999999';
        小组。风格。display = “flex”;
        小组。风格。alignItems = '中心';
        小组。风格。间隙 = “4px”;
        小组。风格。填充 = '5px';
        小组。风格。borderRadius = '8px';
        小组。风格。背景 = 'RGBA（0,0,0,0.65）'';
        小组。风格。backdropFilter = '模糊（4px）';
        小组。风格。font家族 =
            “阿里亚尔，衬线”;
        小组。风格。userSelect = 'none';
        小组。风格。pointerEvents = 'auto';

        向左转
        const leftButton = createButton(
            “↺'，
            “向左转90°”
        );

        中央按钮：电流角度+复位
        const angleButton = createButton(
            '0°'，
            “重置旋转”
        );

        angleButton。身份证 =
            “YouTube旋转贴合角度”;

        angleButton。风格。宽度 = '46px';
        angleButton。风格。fontSize = '13px';

        向右旋转
        const rightButton = createButton(
            “↻”，
            “向右旋转90°”
        );

        左按钮。addEventListener（事件听众）(
            “咔嗒”，
            功能 () {
                setRotation（旋转 - 90);
            }
        );

        angleButton。addEventListener（事件听众）(
            “咔嗒”，
            功能 () {
                setRotation（0);
            }
        );

        右按钮。addEventListener（事件听众）(
            “咔嗒”，
            功能 () {
                setRotation（旋转 + 90);
            }
        );

        小组。appendChild（leftButton）);
        小组。appendChild（angleButton）);
        小组。appendChild（rightButton）);

        玩家。appendChild（panel）);

        更新角度按钮();
    }

    function updateAngleButton() {
        const angleButton =
            记录。getElementById(
                “YouTube旋转贴合角度”
            );

        如果（！angleButton) {
            回归;
        }

        angleButton。文本内容 =
            normalizeAngle（旋转) + '°';
    }

    // ------------------------------------------------------------
    YouTube活动
    // ------------------------------------------------------------

    记录。addEventListener（事件听众）(
        “全屏切换”，
        刷新旋转
    );

    窗户。addEventListener（事件听众）(
        “resize”，
        刷新旋转
    );

    /*
* YouTube是一个单页应用。
* 当用户更换视频时，该事件会触发。
     */
    记录。addEventListener（事件听众）(
        'yt-navigate-finish'，
        功能 () {
            setTimeout（函数） () {
                ensureControls();
                刷新旋转();
            }，500);
        }
    );

    初始启动
    ensureControls();

    setTimeout(
        确保控制，
        1000
    );

    /*
* 如果YouTube重建播放器，请恢复我们的按钮。
* 这本节目每两秒才运行一次。
     */
    setInterval(
        确保控制，
        2000
    );

})();
