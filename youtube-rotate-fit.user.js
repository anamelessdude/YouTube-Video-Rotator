// ==UserScript==
// @name         YouTube Rotate & Fit
// @namespace    youtube-rotate-fit
// @version      1.0.2
// @description  Rotate sideways YouTube videos 90 degrees and automatically fit the entire video in fullscreen without cropping.
// @author       YouTube Rotate & Fit contributors
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-idle
// @license      MIT
// @homepageURL  https://github.com/anamelessdude/YouTube-Video-Rotator
// @updateURL    https://raw.githubusercontent.com/anamelessdude/YouTube-Video-Rotator/main/youtube-rotate-fit.user.js
// @downloadURL  https://raw.githubusercontent.com/anamelessdude/YouTube-Video-Rotator/main/youtube-rotate-fit.user.js
// ==/UserScript==

(function () {
    'use strict';

    const UI_ID = 'youtube-rotate-fit-controls';

    let rotation = 0;
    let rotateTimer = null;

    // ------------------------------------------------------------
    // Find YouTube's video element
    // ------------------------------------------------------------

    function getVideo() {
        return (
            document.querySelector('video.html5-main-video') ||
            document.querySelector('video')
        );
    }

    function getPlayer() {
        return document.querySelector('#movie_player');
    }

    // Keep the angle between -180 and 180 degrees
    function normalizeAngle(angle) {
        angle %= 360;

        if (angle > 180) {
            angle -= 360;
        }

        if (angle < -180) {
            angle += 360;
        }

        return angle;
    }

    // ------------------------------------------------------------
    // Core: rotate the video and fit it inside the player
    // ------------------------------------------------------------

    function applyRotation() {
        const video = getVideo();
        const player = getPlayer();

        if (!video || !player) {
            return;
        }

        const angle = normalizeAngle(rotation);

        // 0 degrees = restore YouTube's normal video display
        if (angle === 0) {
            video.style.removeProperty('transform');
            video.style.removeProperty('transform-origin');
            video.style.removeProperty('transition');
            return;
        }

        /*
         * Temporarily remove the transform so we can measure
         * YouTube's real video size before calculating the scale.
         *
         * This is the important part that prevents cropping.
         */
        video.style.setProperty(
            'transform',
            'none',
            'important'
        );

        video.style.setProperty(
            'transform-origin',
            'center center',
            'important'
        );

        video.style.setProperty(
            'transition',
            'none',
            'important'
        );

        const videoRect = video.getBoundingClientRect();

        let playerWidth;
        let playerHeight;

        // When YouTube is fullscreen, use the entire screen size
        if (document.fullscreenElement) {
            playerWidth = window.innerWidth;
            playerHeight = window.innerHeight;
        } else {
            const playerRect = player.getBoundingClientRect();
            playerWidth = playerRect.width;
            playerHeight = playerRect.height;
        }

        if (
            !videoRect.width ||
            !videoRect.height ||
            !playerWidth ||
            !playerHeight
        ) {
            return;
        }

        const quarterTurn =
            Math.abs(angle) % 180 === 90;

        /*
         * After rotating 90 or -90 degrees,
         * the width and height are exchanged.
         */
        const rotatedWidth = quarterTurn
            ? videoRect.height
            : videoRect.width;

        const rotatedHeight = quarterTurn
            ? videoRect.width
            : videoRect.height;

        /*
         * Choose the largest possible scale that still keeps
         * the ENTIRE video visible.
         */
        const scale = Math.min(
            playerWidth / rotatedWidth,
            playerHeight / rotatedHeight
        );

        video.style.setProperty(
            'transform',
            'rotate(' + angle + 'deg) scale(' + scale + ')',
            'important'
        );
    }

    // ------------------------------------------------------------
    // Re-apply after YouTube changes fullscreen/layout
    // ------------------------------------------------------------

    function refreshRotation() {
        applyRotation();

        // YouTube may rebuild its layout shortly after fullscreen changes
        setTimeout(applyRotation, 100);
        setTimeout(applyRotation, 300);
        setTimeout(applyRotation, 800);
    }

    function startProtection() {
        if (rotateTimer) {
            clearInterval(rotateTimer);
            rotateTimer = null;
        }

        if (normalizeAngle(rotation) !== 0) {
            /*
             * YouTube can occasionally overwrite the video's transform.
             * Re-applying it keeps the rotation working in fullscreen.
             */
            rotateTimer = setInterval(
                applyRotation,
                500
            );
        }
    }

    function setRotation(angle) {
        rotation = normalizeAngle(angle);

        updateAngleButton();
        refreshRotation();
        startProtection();
    }

    // ------------------------------------------------------------
    // User interface
    // ------------------------------------------------------------

    function createButton(text, title) {
        const button = document.createElement('button');

        button.textContent = text;
        button.title = title;

        button.style.width = '38px';
        button.style.height = '34px';
        button.style.border = '0';
        button.style.borderRadius = '6px';
        button.style.background = 'rgba(255,255,255,0.16)';
        button.style.color = '#fff';
        button.style.fontSize = '18px';
        button.style.cursor = 'pointer';
        button.style.padding = '0';
        button.style.margin = '0';

        button.addEventListener(
            'mouseenter',
            function () {
                button.style.background =
                    'rgba(255,255,255,0.30)';
            }
        );

        button.addEventListener(
            'mouseleave',
            function () {
                button.style.background =
                    'rgba(255,255,255,0.16)';
            }
        );

        /*
         * Prevent YouTube from treating the button click
         * as a click on the video itself.
         */
        button.addEventListener(
            'mousedown',
            function (event) {
                event.stopPropagation();
            }
        );

        button.addEventListener(
            'click',
            function (event) {
                event.stopPropagation();
                event.preventDefault();
            }
        );

        return button;
    }

    function ensureControls() {
        const player = getPlayer();

        if (!player) {
            return;
        }

        if (document.getElementById(UI_ID)) {
            return;
        }

        const panel = document.createElement('div');

        panel.id = UI_ID;

        panel.style.position = 'absolute';
        panel.style.top = '12px';
        panel.style.right = '12px';
        panel.style.zIndex = '999999';
        panel.style.display = 'flex';
        panel.style.alignItems = 'center';
        panel.style.gap = '4px';
        panel.style.padding = '5px';
        panel.style.borderRadius = '8px';
        panel.style.background = 'rgba(0,0,0,0.65)';
        panel.style.backdropFilter = 'blur(4px)';
        panel.style.fontFamily = 'Arial, sans-serif';
        panel.style.userSelect = 'none';
        panel.style.pointerEvents = 'auto';

        // Rotate left
        const leftButton = createButton(
            '↺',
            'Rotate left 90 degrees'
        );

        // Center button: current angle + reset
        const angleButton = createButton(
            '0°',
            'Reset rotation'
        );

        angleButton.id = 'youtube-rotate-fit-angle';

        angleButton.style.width = '46px';
        angleButton.style.fontSize = '13px';

        // Rotate right
        const rightButton = createButton(
            '↻',
            'Rotate right 90 degrees'
        );

        leftButton.addEventListener(
            'click',
            function () {
                setRotation(rotation - 90);
            }
        );

        angleButton.addEventListener(
            'click',
            function () {
                setRotation(0);
            }
        );

        rightButton.addEventListener(
            'click',
            function () {
                setRotation(rotation + 90);
            }
        );

        panel.appendChild(leftButton);
        panel.appendChild(angleButton);
        panel.appendChild(rightButton);

        player.appendChild(panel);

        updateAngleButton();
    }

    function updateAngleButton() {
        const angleButton =
            document.getElementById(
                'youtube-rotate-fit-angle'
            );

        if (!angleButton) {
            return;
        }

        angleButton.textContent =
            normalizeAngle(rotation) + '°';
    }

    // ------------------------------------------------------------
    // YouTube events
    // ------------------------------------------------------------

    document.addEventListener(
        'fullscreenchange',
        refreshRotation
    );

    window.addEventListener(
        'resize',
        refreshRotation
    );

    /*
     * YouTube is a single-page application.
     * This event fires when the user changes videos.
     */
    document.addEventListener(
        'yt-navigate-finish',
        function () {
            setTimeout(
                function () {
                    ensureControls();
                    refreshRotation();
                },
                500
            );
        }
    );

    // Initial startup
    ensureControls();

    setTimeout(
        ensureControls,
        1000
    );

    /*
     * If YouTube rebuilds the player,
     * restore our controls.
     */
    setInterval(
        ensureControls,
        2000
    );

})();
