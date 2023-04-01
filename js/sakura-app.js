try {
    (function webpackUniversalModuleDefinition(b, a) {
        if (typeof exports === "object" && typeof module === "object") {
            module.exports = a()
        } else {
            if (typeof define === "function" && define.amd) {
                define([], a)
            } else {
                if (typeof exports === "object") {
                    exports.POWERMODE = a()
                } else {
                    b.POWERMODE = a()
                }
            }
        }
    }
    )(this, function() {
        return (function(c) {
            var b = {};
            function a(e) {
                if (b[e]) {
                    return b[e].exports
                }
                var d = b[e] = {
                    exports: {},
                    id: e,
                    loaded: false
                };
                c[e].call(d.exports, d, d.exports, a);
                d.loaded = true;
                return d.exports
            }
            a.m = c;
            a.c = b;
            a.p = "";
            return a(0)
        }
        )([function(j, e, a) {
            var b = document.createElement("canvas");
            b.width = window.innerWidth;
            b.height = window.innerHeight;
            b.style.cssText = "position:fixed;top:0;left:0;pointer-events:none;z-index:999999";
            window.addEventListener("resize", function() {
                b.width = window.innerWidth;
                b.height = window.innerHeight
            });
            document.body.appendChild(b);
            var c = b.getContext("2d");
            var l = [];
            var k = 0;
            m.shake = true;
            function h(o, n) {
                return Math.random() * (n - o) + o
            }
            function g(n) {
                if (m.colorful) {
                    var o = h(0, 360);
                    return "hsla(" + h(o - 10, o + 10) + ", 100%, " + h(50, 80) + "%, " + 1 + ")"
                } else {
                    return window.getComputedStyle(n).color
                }
            }
            function f() {
                var o = document.activeElement;
                var n;
                if (o.tagName === "TEXTAREA" || (o.tagName === "INPUT" && o.getAttribute("type") === "text")) {
                    var p = a(1)(o, o.selectionStart);
                    n = o.getBoundingClientRect();
                    return {
                        x: p.left + n.left,
                        y: p.top + n.top,
                        color: g(o)
                    }
                }
                var r = window.getSelection();
                if (r.rangeCount) {
                    var q = r.getRangeAt(0);
                    var s = q.startContainer;
                    if (s.nodeType === document.TEXT_NODE) {
                        s = s.parentNode
                    }
                    n = q.getBoundingClientRect();
                    return {
                        x: n.left,
                        y: n.top,
                        color: g(s)
                    }
                }
                return {
                    x: 0,
                    y: 0,
                    color: "transparent"
                }
            }
            function d(o, p, n) {
                return {
                    x: o,
                    y: p,
                    alpha: 1,
                    color: n,
                    velocity: {
                        x: -1 + Math.random() * 2,
                        y: -3.5 + Math.random() * 2
                    }
                }
            }
            function m() {
                var n = f();
                var p = 5 + Math.round(Math.random() * 10);
                while (p--) {
                    l[k] = d(n.x, n.y, n.color);
                    k = (k + 1) % 500
                }
                if (m.shake) {
                    var o = 1 + 2 * Math.random();
                    var q = o * (Math.random() > 0.5 ? -1 : 1);
                    var r = o * (Math.random() > 0.5 ? -1 : 1);
                    document.body.style.marginLeft = q + "px";
                    document.body.style.marginTop = r + "px";
                    setTimeout(function() {
                        document.body.style.marginLeft = "";
                        document.body.style.marginTop = ""
                    }, 75)
                }
            }
            m.colorful = false;
            function i() {
                requestAnimationFrame(i);
                c.clearRect(0, 0, b.width, b.height);
                for (var n = 0; n < l.length; ++n) {
                    var o = l[n];
                    if (o.alpha <= 0.1) {
                        continue
                    }
                    o.velocity.y += 0.075;
                    o.x += o.velocity.x;
                    o.y += o.velocity.y;
                    o.alpha *= 0.96;
                    c.globalAlpha = o.alpha;
                    c.fillStyle = o.color;
                    c.fillRect(Math.round(o.x - 1.5), Math.round(o.y - 1.5), 3, 3)
                }
            }
            requestAnimationFrame(i);
            j.exports = m
        }
        , function(b, a) {
            (function() {
                var e = ["direction", "boxSizing", "width", "height", "overflowX", "overflowY", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderStyle", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontStyle", "fontVariant", "fontWeight", "fontStretch", "fontSize", "fontSizeAdjust", "lineHeight", "fontFamily", "textAlign", "textTransform", "textIndent", "textDecoration", "letterSpacing", "wordSpacing", "tabSize", "MozTabSize"];
                var d = window.mozInnerScreenX != null;
                function c(k, m, l) {
                    var h = l && l.debug || false;
                    if (h) {
                        var j = document.querySelector("#input-textarea-caret-position-mirror-div");
                        if (j) {
                            j.parentNode.removeChild(j)
                        }
                    }
                    var i = document.createElement("div");
                    i.id = "input-textarea-caret-position-mirror-div";
                    document.body.appendChild(i);
                    var o = i.style;
                    var f = window.getComputedStyle ? getComputedStyle(k) : k.currentStyle;
                    o.whiteSpace = "pre-wrap";
                    if (k.nodeName !== "INPUT") {
                        o.wordWrap = "break-word"
                    }
                    o.position = "absolute";
                    if (!h) {
                        o.visibility = "hidden"
                    }
                    e.forEach(function(p) {
                        o[p] = f[p]
                    });
                    if (d) {
                        if (k.scrollHeight > parseInt(f.height)) {
                            o.overflowY = "scroll"
                        }
                    } else {
                        o.overflow = "hidden"
                    }
                    i.textContent = k.value.substring(0, m);
                    if (k.nodeName === "INPUT") {
                        i.textContent = i.textContent.replace(/\s/g, "\u00a0")
                    }
                    var n = document.createElement("span");
                    n.textContent = k.value.substring(m) || ".";
                    i.appendChild(n);
                    var g = {
                        top: n.offsetTop + parseInt(f.borderTopWidth),
                        left: n.offsetLeft + parseInt(f.borderLeftWidth)
                    };
                    if (h) {
                        n.style.backgroundColor = "#aaa"
                    } else {
                        document.body.removeChild(i)
                    }
                    return g
                }
                if (typeof b != "undefined" && typeof b.exports != "undefined") {
                    b.exports = c
                } else {
                    window.getCaretCoordinates = c
                }
            }())
        }
        ])
    });
} catch (e) {}
try {
    mashiro_global.variables = new function() {
        this.has_bot_ui = false;
        this.isNight = false;
        this.skinSecter = false;
    }
    mashiro_global.ini = new function() {
        this.normalize = function() {
            lazyload();
            social_share();
            mashiro_global.post_list_show_animation.ini();
            copy_code_block();
            if (window.is_app) {
                try {
                    setTimeout(function() {
                        mashiro_option.app_update(true);
                    }, 10000);
                } catch (e) {}
            }
            if ($("div").hasClass("poem-wrap")) {
                get_poem('#poem', '#info')
            }
            $(function() {
                function waveloop1() {
                    $("#banner_wave_1").css({
                        "left": "-236px"
                    }).animate({
                        "left": "-1233px"
                    }, 25000, 'linear', waveloop1);
                }
                function waveloop2() {
                    $("#banner_wave_2").css({
                        "left": "0px"
                    }).animate({
                        "left": "-1009px"
                    }, 60000, 'linear', waveloop2);
                }
                if (screen && screen.width > 860) {
                    waveloop1();
                    waveloop2();
                }
                if (navigator.userAgent.indexOf('AppleWebKit') != -1) {
                    $("body").addClass("isWebKit");
                }
            });
            hearthstone_deck_iframe();
            coverVideoIni();
        }
        this.pjax = function() {
            pjaxInit();
            social_share();
            mashiro_global.post_list_show_animation.ini();
            copy_code_block();
            if ($("div").hasClass("poem-wrap")) {
                get_poem('#poem', '#info')
            }
            hearthstone_deck_iframe();
            coverVideoIni();
            mashiro_global.variables.pageTitile = document.title;
        }
    }
    mashiro_global.lib = new function() {
        this.removeClass = function(ele, className) {
            var el = document.getElementById(ele);
            if (el.classList)
                el.classList.remove(className);
            else
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)','gi'), ' ');
        }
        this.addClass = function(ele, className) {
            var el = document.getElementById(ele);
            if (el.classList)
                el.classList.add(className);
            else
                el.className += ' ' + className;
        }
        this.hasClass = function(ele, className) {
            var el = document.getElementById(ele);
            if (el.classList)
                var e = el.classList.contains(className);
            else
                var e = new RegExp('(^| )' + className + '( |$)','gi').test(el.className);
            return e;
        }
        this.toggleClass = function(ele, className) {
            var el = document.getElementById(ele);
            if (el.classList) {
                el.classList.toggle(className);
            } else {
                var classes = el.className.split(' ');
                var existingIndex = classes.indexOf(className);
                if (existingIndex >= 0)
                    classes.splice(existingIndex, 1);
                else
                    classes.push(className);
                el.className = classes.join(' ');
            }
        }
        this.saveFile = function(url, file_name) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function() {
                var a = document.createElement('a');
                a.href = window.URL.createObjectURL(xhr.response);
                a.download = file_name;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
            }
            ;
            xhr.open('GET', url);
            xhr.send();
        }
    }
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + mashiro_option.cookie_version_control + "=" + (value || "") + expires + "; path=/";
    }
    function getCookie(name) {
        var nameEQ = name + mashiro_option.cookie_version_control + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    function removeCookie(name) {
        document.cookie = name + mashiro_option.cookie_version_control + '=; Max-Age=-99999999;';
    }
    function jumpTo(url) {
        return mashiro_global.lib.pjax_to_url(url, '#page');
    }
    function injectStyles(rule) {
        var div = $("<div />", {
            html: '&shy;<style>' + rule + '</style>'
        }).appendTo("body");
    }
    $('body').on('click', '.comment-reply-link', function(e) {
        addComment.moveForm("comment-" + $(this).attr('data-commentid'), $(this).attr('data-commentid'), "respond", $(this).attr('data-postid'));
        return false;
    });
    function tagHack() {
        var link = document.querySelector("link[rel*='icon']");
        mashiro_global.variables.title = document.title;
        window.onblur = function() {
            document.title = unescape('\u0028\u3064\u0020\u30a7\u0020\u2282\u0029\u6211\u85cf\u597d\u4e86\u54e6\u007e');
            link.href = 'https://static.2heng.xin/google.ico';
        }
        ;
        window.onfocus = function() {
            document.title = unescape('\u0028\u002a\u309c\u30ed\u309c\u0029\u30ce\u88ab\u53d1\u73b0\u5566\u007e');
            link.href = 'https://static.2heng.xin/favicon.ico';
            setTimeout(function() {
                document.title = mashiro_global.variables.title;
            }, 1000);
        }
    }
    function imgError(ele, type) {
        switch (type) {
        case 1:
            if (ele.src.includes("https://cn.gravatar.com/avatar")) {
                ele.src = ele.src.replace("https://cn.gravatar.com/avatar/", "https://cdn.v2ex.com/gravatar/");
            } else {
                ele.src = 'https://view.moezx.cc/images/2017/12/30/Transparent_Akkarin.th.jpg';
            }
            break;
        case 2:
            ele.src = 'https://s3.mashiro.top/avatar/?s=80&d=mm&r=g';
            break;
        case 3:
            if (ele.src.includes("https://static.2heng.xin/")) {
                ele.src = ele.src.replace("https://2heng.xin/wp-content/uploads/", "https://cdn.2heng.xin/");
            } else {
                ele.src = 'https://view.moezx.cc/images/2018/05/13/image-404.png';
            }
            break;
        default:
            ele.src = 'https://view.moezx.cc/images/2018/05/13/image-404.png';
        }
    }
    mashiro_global.post_list_show_animation = new function() {
        this.ini = function(ajax) {
            $("article.post-list-thumb").each(function(i) {
                if (ajax) {
                    var window_height = $(window).height();
                } else {
                    if ($(".headertop").hasClass("headertop-bar")) {
                        var window_height = 0;
                    } else {
                        if (mashiro_option.land_at_home) {
                            var window_height = $(window).height() - 300;
                        } else {
                            var window_height = $(window).height();
                        }
                    }
                }
                var article_height = $("article.post-list-thumb").eq(i).offset().top;
                if ($(window).height() + $(window).scrollTop() >= article_height)
                    $("article.post-list-thumb").eq(i).addClass('post-list-show');
                $(window).scroll(function() {
                    var scrolltop = $(window).scrollTop();
                    if (scrolltop + window_height >= article_height && scrolltop)
                        $("article.post-list-thumb").eq(i).addClass("post-list-show");
                });
            });
        }
    }
    mashiro_global.font_control = new function() {
        this.change_font = function() {
            if ($("body").hasClass("serif")) {
                $("body").removeClass("serif");
                $(".control-btn-serif").removeClass("selected");
                $(".control-btn-sans-serif").addClass("selected");
                setCookie("font_family", "sans-serif", 30);
            } else {
                $("body").addClass("serif");
                $(".control-btn-serif").addClass("selected");
                $(".control-btn-sans-serif").removeClass("selected");
                setCookie("font_family", "serif", 30);
                if (document.body.clientWidth <= 860) {
                    addComment.createButterbar("将从网络加载字体，流量请注意");
                }
            }
        }
        this.ini = function() {
            if (document.body.clientWidth > 860) {
                if (!getCookie("font_family") || getCookie("font_family") == "serif")
                    $("body").addClass("serif");
            }
            if (getCookie("font_family") == "sans-serif") {
                $("body").removeClass("sans-serif");
                $(".control-btn-serif").removeClass("selected");
                $(".control-btn-sans-serif").addClass("selected");
            }
        }
    }
    mashiro_global.font_control.ini();
    function code_highlight_style() {
        function gen_top_bar(i) {
            var attributes = {
                'autocomplete': 'off',
                'autocorrect': 'off',
                'autocapitalize': 'off',
                'spellcheck': 'false',
                'contenteditable': 'false',
                'design': 'by Mashiro'
            }
            var ele_name = $('pre:eq(' + i + ')')[0].children[0].className;
            var lang = ele_name.substr(0, ele_name.indexOf(" ")).replace('language-', '');
            if (lang.toLowerCase() == "hljs")
                var lang = "text";
            if (lang.toLowerCase() == "js")
                var lang = "javascript";
            if (lang.toLowerCase() == "md")
                var lang = "markdown";
            if (lang.toLowerCase() == "py")
                var lang = "python";
            $('pre:eq(' + i + ')').addClass('highlight-wrap');
            for (var t in attributes) {
                $('pre:eq(' + i + ')').attr(t, attributes[t]);
            }
            $('pre:eq(' + i + ') code').attr('data-rel', lang.toUpperCase());
        }
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
        for (var i = 0; i < $('pre').length; i++) {
            gen_top_bar(i);
        }
        hljs.initLineNumbersOnLoad();
        $('pre').on('click', function(e) {
            if (e.target !== this)
                return;
            $(this).toggleClass('code-block-fullscreen');
            $('html').toggleClass('code-block-fullscreen-html-scroll');
        });
    }
    try {
        code_highlight_style();
    } catch (e) {}
    function attach_image() {
        $('#upload-img-file').change(function() {
            if (this.files.length > 10) {
                addComment.createButterbar("每次上传上限为10张.<br>10 files max per request.");
                return 0;
            }
            for (i = 0; i < this.files.length; i++) {
                if (this.files[i].size >= 5242880) {
                    alert('图片上传大小限制为5 MB.\n5 MB max per file.\n\n「' + this.files[i].name + '」\n\n这张图太大啦~\nThis image is too large~');
                }
            }
            for (var i = 0; i < this.files.length; i++) {
                var f = this.files[i];
                var formData = new FormData();
                formData.append('cmt_img_file', f);
                $.ajax({
                    url: '/wp-json/sakura/v1/image/upload/?_wpnonce=' + $('body').attr('nonce-data'),
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    data: formData,
                    beforeSend: function(xhr) {
                        $('.insert-image-tips').html('<i class="fa fa-spinner rotating" aria-hidden="true"></i>');
                        addComment.createButterbar("上传中...<br>Uploading...");
                    },
                    success: function(res) {
                        $('.insert-image-tips').html('<i class="fa fa-check" aria-hidden="true"></i>');
                        setTimeout(function() {
                            $('.insert-image-tips').html('<i class="fa fa-picture-o" aria-hidden="true"></i>');
                        }, 1000);
                        if (res.status == 200) {
                            var get_the_url = res.proxy;
                            $('#upload-img-show').append('<img class="lazyload upload-image-preview" src="https://jsdelivr.2heng.xin/gh/moezx/cdn@3.0.2/img/svg/loader/trans.ajax-spinner-preloader.svg" data-src="' + get_the_url + '" onclick="window.open(\'' + get_the_url + '\')" onerror="imgError(this)" />');
                            lazyload();
                            addComment.createButterbar("图片上传成功~<br>Uploaded successfully~");
                            grin(get_the_url, type = 'Img');
                        } else {
                            addComment.createButterbar("上传失败！<br>Uploaded failed!<br> 文件名/Filename: " + f.name + "<br>code: " + res.status + "<br>" + res.message, 3000);
                        }
                    },
                    error: function() {
                        $('.insert-image-tips').html('<i class="fa fa-times" aria-hidden="true" style="color:red"></i>');
                        alert("上传失败，请重试.\nUpload failed, please try again.");
                        setTimeout(function() {
                            $('.insert-image-tips').html('<i class="fa fa-picture-o" aria-hidden="true"></i>');
                        }, 1000);
                    }
                })
            }
        });
    }
    function clean_upload_images() {
        $('#upload-img-show').html('');
    }
    function add_upload_tips() {
        $('<div class="insert-image-tips popup"><i class="fa fa-picture-o" aria-hidden="true"></i><span class="insert-img-popuptext" id="uploadTipPopup">上传图片</span></div><input id="upload-img-file" type="file" accept="image/*" multiple="multiple" class="insert-image-button">').insertAfter($(".form-submit #submit"));
        attach_image();
        $("#upload-img-file").hover(function() {
            $(".insert-image-tips").addClass("insert-image-tips-hover");
            $("#uploadTipPopup").addClass("show");
        }, function() {
            $(".insert-image-tips").removeClass("insert-image-tips-hover");
            $("#uploadTipPopup").removeClass("show");
        });
    }
    function click_to_view_image() {
        $(".comment_inline_img").click(function() {
            var temp_url = $(this).attr('src');
            window.open(temp_url);
        });
    }
    click_to_view_image();
    function original_emoji_click() {
        $(".emoji-item").click(function() {
            grin($(this).text(), type = "custom", before = "`", after = "` ");
        });
    }
    original_emoji_click();
    function showPopup(ele) {
        var popup = ele.querySelector("#thePopup");
        popup.classList.toggle("show");
    }
    function cmt_showPopup(ele) {
        var popup = $(ele).find("#thePopup");
        popup.addClass("show");
        $(ele).find("input").blur(function() {
            popup.removeClass("show");
        });
    }
    function headertop_down() {
        var coverOffset = $('#content').offset().top;
        $('html,body').animate({
            scrollTop: coverOffset
        }, 600);
    }
    function scrollBar() {
        if (document.body.clientWidth > 860) {
            $(window).scroll(function() {
                var s = $(window).scrollTop();
                var a = $(document).height();
                var b = $(window).height();
                var result = parseInt(s / (a - b) * 100);
                $("#bar").css("width", result + "%");
                if (false) {
                    if (result >= 0 && result <= 19)
                        $("#bar").css("background", "#cccccc");
                    if (result >= 20 && result <= 39)
                        $("#bar").css("background", "#50bcb6");
                    if (result >= 40 && result <= 59)
                        $("#bar").css("background", "#85c440");
                    if (result >= 60 && result <= 79)
                        $("#bar").css("background", "#f2b63c");
                    if (result >= 80 && result <= 99)
                        $("#bar").css("background", "#FF0000");
                    if (result == 100)
                        $("#bar").css("background", "#5aaadb");
                } else {
                    $("#bar").css("background", "orange");
                }
                $(".toc-container").css("height", $(".site-content").outerHeight());
                $(".skin-menu").removeClass('show');
            });
        }
    }
    scrollBar();
    '主题切换代码好恶心，有空一定要重构';
    function checkBgImgCookie() {
        var bgurl = getCookie("bgImgSetting");
        if (!bgurl) {
            $('#banner_wave_1').removeClass('banner_wave_hide_fit_skin');
            $('#banner_wave_2').removeClass('banner_wave_hide_fit_skin');
        } else {
            $('#banner_wave_1').addClass('banner_wave_hide_fit_skin');
            $('#banner_wave_2').addClass('banner_wave_hide_fit_skin');
        }
        if (bgurl != "") {
            if (bgurl == "https://view.moezx.cc/images/2018/01/03/sakura.png" || bgurl == "https://view.moezx.cc/images/2018/01/03/plaid2dbf8.jpg" || bgurl == "https://view.moezx.cc/images/2018/01/10/star02.png" || bgurl == "https://view.moezx.cc/images/2018/01/24/kyotoanimation.png" || bgurl == "https://view.moezx.cc/images/2018/09/17/little-monster.png") {
                mashiro_global.variables.skinSecter = true;
                mashiro_global.variables.isNight = false;
                $("#night-mode-cover").css("visibility", "hidden");
                $("body").css("background-image", "url(" + bgurl + ")");
                $(".blank").css("background-color", "rgba(255,255,255,1)");
                $(".pattern-center").removeClass('pattern-center').addClass('pattern-center-sakura');
                $(".headertop-bar").removeClass('headertop-bar').addClass('headertop-bar-sakura');
            } else if (bgurl == "https://api.2heng.xin/bing/") {
                mashiro_global.variables.skinSecter = true;
                mashiro_global.variables.isNight = true;
                $("#night-mode-cover").css("visibility", "hidden");
                $("body").css("background-image", "url(" + bgurl + ")");
                $(".blank").css("background-color", "rgba(255,255,255,1)");
                $(".pattern-center").removeClass('pattern-center').addClass('pattern-center-sakura');
                $(".headertop-bar").removeClass('headertop-bar').addClass('headertop-bar-sakura');
            } else {}
        } else {
            return false;
        }
    }
    if (document.body.clientWidth > 860) {
        checkBgImgCookie();
    }
    function no_right_click() {
        $('.post-thumb img').bind('contextmenu', function(e) {
            return false;
        });
    }
    if (mashiro_global.variables.isNight) {
        $(".changeSkin-gear, .toc").css("background", "rgba(255,255,255,0.8)");
    } else {
        $(".changeSkin-gear, .toc").css("background", "none");
    }
    $(document).ready(function() {
        function changeBG(tagid, url) {
            $(".skin-menu " + tagid).click(function() {
                mashiro_global.variables.skinSecter = true;
                mashiro_global.variables.isNight = false;
                $("#night-mode-cover").css("visibility", "hidden");
                $("body").css("background-image", "url(" + url + ")");
                $(".blank").css("background-color", "rgba(255,255,255,1)");
                $(".pattern-center").removeClass('pattern-center').addClass('pattern-center-sakura');
                $(".headertop-bar").removeClass('headertop-bar').addClass('headertop-bar-sakura');
                $('#banner_wave_1').addClass('banner_wave_hide_fit_skin');
                $('#banner_wave_2').addClass('banner_wave_hide_fit_skin');
                closeSkinMenu();
                setCookie("bgImgSetting", url, 30);
            });
        }
        function changeBGnoTrans(tagid, url) {
            $(".skin-menu " + tagid).click(function() {
                mashiro_global.variables.skinSecter = true;
                mashiro_global.variables.isNight = true;
                $("#night-mode-cover").css("visibility", "hidden");
                $("body").css("background-image", "url(" + url + ")");
                $(".blank").css("background-color", "rgba(255,255,255,1)");
                $(".pattern-center").removeClass('pattern-center').addClass('pattern-center-sakura');
                $(".headertop-bar").removeClass('headertop-bar').addClass('headertop-bar-sakura');
                $('#banner_wave_1').addClass('banner_wave_hide_fit_skin');
                $('#banner_wave_2').addClass('banner_wave_hide_fit_skin');
                closeSkinMenu();
                setCookie("bgImgSetting", url, 30);
            });
        }
        changeBG("#sakura-bg", "https://view.moezx.cc/images/2018/01/03/sakura.png");
        changeBG("#gribs-bg", "https://view.moezx.cc/images/2018/01/03/plaid2dbf8.jpg");
        changeBG("#pixiv-bg", "https://view.moezx.cc/images/2018/01/10/star02.png");
        changeBG("#KAdots-bg", "https://view.moezx.cc/images/2018/01/24/kyotoanimation.png");
        changeBG("#totem-bg", "https://view.moezx.cc/images/2018/09/17/little-monster.png");
        changeBGnoTrans("#bing-bg", "https://api.2heng.xin/bing/");
        $(".skin-menu #white-bg").click(function() {
            mashiro_global.variables.skinSecter = false;
            mashiro_global.variables.isNight = false;
            $("#night-mode-cover").css("visibility", "hidden");
            $("body").css("background-image", "none");
            $(".blank").css("background-color", "rgba(255,255,255,.0)");
            $(".pattern-center-sakura").removeClass('pattern-center-sakura').addClass('pattern-center');
            $(".headertop-bar-sakura").removeClass('headertop-bar-sakura').addClass('headertop-bar');
            $('#banner_wave_1').removeClass('banner_wave_hide_fit_skin');
            $('#banner_wave_2').removeClass('banner_wave_hide_fit_skin');
            closeSkinMenu();
            setCookie("bgImgSetting", "", 30);
        });
        $(".skin-menu #dark-bg").click(function() {
            mashiro_global.variables.skinSecter = true;
            mashiro_global.variables.isNight = true;
            $("body").css("background-image", "url(https://jsdelivr.2heng.xin/gh/moezx/cdn@3.1.2/other-sites/api-index/images/me.png)");
            $(".blank").css("background-color", "rgba(255,255,255,.8)");
            $("#night-mode-cover").css("visibility", "visible");
            $(".pattern-center").removeClass('pattern-center').addClass('pattern-center-sakura');
            $(".headertop-bar").removeClass('headertop-bar').addClass('headertop-bar-sakura');
            $('#banner_wave_1').addClass('banner_wave_hide_fit_skin');
            $('#banner_wave_2').addClass('banner_wave_hide_fit_skin');
            closeSkinMenu();
        });
        function closeSkinMenu() {
            $(".skin-menu").removeClass('show');
            setTimeout(function() {
                $(".changeSkin-gear").css("visibility", "visible");
            }, 300);
            if (mashiro_global.variables.isNight) {
                $(".changeSkin-gear, .toc").css("background", "rgba(255,255,255,0.8)");
            } else {
                $(".changeSkin-gear, .toc").css("background", "none");
            }
        }
        $(".changeSkin-gear").click(function() {
            $(".skin-menu").toggleClass('show');
            if (mashiro_global.variables.isNight) {
                $(".changeSkin").css("background", "rgba(255,255,255,0.8)");
            } else {
                $(".changeSkin").css("background", "none");
            }
        })
        $(".skin-menu #close-skinMenu").click(function() {
            closeSkinMenu();
        });
        add_upload_tips();
    });
    function hide_live2d() {
        if (getCookie("live2d") == "Hide") {
            setTimeout(function() {
                $(".prpr").css("visibility", "hidden");
                if (document.body.clientWidth > 860) {
                    $(".hide-live2d").css("bottom", "66px");
                    $(".save-live2d, .switch-live2d").addClass("hide-live2d-tool");
                }
                $(".hide-live2d .keys").html("Show");
                setCookie("live2d", "Show", 7);
            }, 00);
        } else {
            setTimeout(function() {
                $(".prpr").css("visibility", "visible");
                if (document.body.clientWidth > 860) {
                    $(".hide-live2d").css("bottom", "156px");
                    $(".save-live2d, .switch-live2d").removeClass("hide-live2d-tool");
                }
                $(".hide-live2d .keys").html("Hide");
                setCookie("live2d", "Hide", 7);
            }, 00);
        }
    }
    mashiro_global.ini.live2d = function() {
        if (!getCookie("live2d"))
            setCookie("live2d", "Hide", 7);
        if (getCookie("live2d") == "Show") {
            setCookie("live2d", "Hide", 7);
            hide_live2d();
        }
    }
    mashiro_global.ini.live2d();
    var bgn = 1;
    function nextBG() {
        $(".centerbg").css("background-image", "url(https://api.2heng.xin/cover/?" + bgn + ")");
        bgn = bgn + 1;
    }
    function preBG() {
        bgn = bgn - 1;
        $(".centerbg").css("background-image", "url(https://api.2heng.xin/cover/?" + bgn + ")");
    }
    $(document).ready(function() {
        $("#bg-next").click(function() {
            nextBG();
        });
        $("#bg-pre").click(function() {
            preBG();
        });
    });
    if (document.body.clientWidth <= 860 && !window.is_app) {
        window.onscroll = function() {
            scrollFunction()
        }
        ;
        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                document.getElementById("moblieGoTop").style.display = "block";
            } else {
                document.getElementById("moblieGoTop").style.display = "none";
            }
        }
        function topFunction() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }
    function reload_show_date_time() {
        BirthDay = new Date("06/02/2017 18:00:00");
        today = new Date();
        timeold = (today.getTime() - BirthDay.getTime());
        sectimeold = timeold / 1000
        secondsold = Math.floor(sectimeold);
        msPerDay = 24 * 60 * 60 * 1000
        e_daysold = timeold / msPerDay
        daysold = Math.floor(e_daysold);
        monitorday.innerHTML = daysold;
    }
    function timeSeriesReload(flag) {
        if (flag == true) {
            $('#archives span.al_mon').click(function() {
                $(this).next().slideToggle(400);
                return false;
            });
            lazyload();
        } else {
            (function() {
                $('#al_expand_collapse,#archives span.al_mon').css({
                    cursor: "s-resize"
                });
                $('#archives span.al_mon').each(function() {
                    var num = $(this).next().children('li').length;
                    $(this).children('#post-num').text(num);
                });
                var $al_post_list = $('#archives ul.al_post_list')
                  , $al_post_list_f = $('#archives ul.al_post_list:first');
                $al_post_list.hide(1, function() {
                    $al_post_list_f.show();
                });
                $('#archives span.al_mon').click(function() {
                    $(this).next().slideToggle(400);
                    return false;
                });
                if (document.body.clientWidth > 860) {
                    $('#archives li.al_li').mouseover(function() {
                        $(this).children('.al_post_list').show(400);
                        return false;
                    });
                    if (false) {
                        $('#archives li.al_li').mouseout(function() {
                            $(this).children('.al_post_list').hide(400);
                            return false;
                        });
                    }
                }
                var al_expand_collapse_click = 0;
                $('#al_expand_collapse').click(function() {
                    if (al_expand_collapse_click == 0) {
                        $al_post_list.show();
                        al_expand_collapse_click++;
                    } else if (al_expand_collapse_click == 1) {
                        $al_post_list.hide();
                        al_expand_collapse_click--;
                    }
                });
            }
            )();
        }
    }
    timeSeriesReload();
    function coverVideo() {
        var video = document.getElementById("coverVideo");
        var btn = document.getElementById("coverVideo-btn");
        if (video.paused) {
            video.play();
            try {
                btn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
            } catch (e) {}
            ;
        } else {
            video.pause();
            try {
                btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
            } catch (e) {}
            ;
        }
    }
    function killCoverVideo() {
        var video = document.getElementById("coverVideo");
        var btn = document.getElementById("coverVideo-btn");
        if (video.paused) {} else {
            video.pause();
            try {
                btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
            } catch (e) {}
            ;
        }
    }
    function coverVideoIni() {
        if ($('video').hasClass('hls')) {
            var video = document.getElementById('coverVideo');
            var video_src = $('#coverVideo').attr('data-src');
            if (Hls.isSupported()) {
                var hls = new Hls();
                hls.loadSource(video_src);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, function() {
                    video.play();
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = video_src;
                video.addEventListener('loadedmetadata', function() {
                    video.play();
                });
            }
        }
    }
    function copy_code_block() {
        $('pre code').each(function(i, block) {
            $(block).attr({
                id: 'hljs-' + i
            });
            $(this).after('<a class="copy-code" href="javascript:" data-clipboard-target="#hljs-' + i + '" title="拷贝代码"><i class="fa fa-clipboard" aria-hidden="true"></i></a>');
        });
        var clipboard = new ClipboardJS('.copy-code');
    }
    function tableOfContentScroll(flag) {
        if (document.body.clientWidth <= 1200) {
            return;
        } else if ($("div").hasClass("have-toc") == false && $("div").hasClass("has-toc") == false) {
            $(".toc-container").remove();
        } else {
            $(document).ready(function() {
                if ($("div").hasClass("toc")) {
                    $(".toc-container").css("height", $(".site-content").outerHeight());
                    setTimeout(function() {
                        $(".toc-container").css("height", $(".site-content").outerHeight());
                    }, 1000);
                    setTimeout(function() {
                        $(".toc-container").css("height", $(".site-content").outerHeight());
                    }, 6000);
                }
            });
            if (flag) {
                var id = 1;
                $(".entry-content , .links").children("h1,h2,h3,h4,h5").each(function() {
                    var hyphenated = "toc-head-" + id;
                    $(this).attr('id', hyphenated);
                    id++;
                });
                tocbot.init({
                    tocSelector: '.toc',
                    contentSelector: ['.entry-content', '.links'],
                    headingSelector: 'h1, h2, h3, h4, h5',
                    scrollEndCallback: function(e) {},
                });
            }
        }
    }
    tableOfContentScroll(flag = true);
    var pjaxInit = function() {
        add_upload_tips();
        click_to_view_image();
        original_emoji_click();
        mashiro_global.font_control.ini();
        $("p").remove(".head-copyright");
        try {
            code_highlight_style();
        } catch (e) {}
        ;try {
            inlojv_js_getqqinfo();
        } catch (e) {}
        ;lazyload();
        $("#to-load-aplayer").click(function() {
            try {
                reloadHermit();
            } catch (e) {}
            ;$("div").remove(".load-aplayer");
        });
        if ($("div").hasClass("aplayer")) {
            reloadHermit();
        }
        if ($("div").hasClass("popcontainer")) {
            loadBotui();
        }
        try {
            reload_show_date_time();
        } catch (e) {}
        if (mashiro_global.variables.skinSecter === true) {
            $(".pattern-center").removeClass('pattern-center').addClass('pattern-center-sakura');
            $(".headertop-bar").removeClass('headertop-bar').addClass('headertop-bar-sakura');
            if (mashiro_global.variables.isNight) {
                $(".blank").css("background-color", "rgba(255,255,255,1)");
                $(".toc").css("background-color", "rgba(255,255,255,0.8)");
            }
        }
        $('.iconflat').css('width', '50px').css('height', '50px');
        $('.openNav').css('height', '50px');
        $("#bg-next").click(function() {
            nextBG();
        });
        $("#bg-pre").click(function() {
            preBG();
        });
        smileBoxToggle();
        timeSeriesReload();
        add_copyright();
        tableOfContentScroll(flag = true);
        console.log($("#myscript").text());
    }
    $(document).on("click", ".sm", function() {
        var msg = "您真的要设为私密吗？";
        if (confirm(msg) == true) {
            $(this).commentPrivate();
        } else {
            aler("已取消");
        }
    });
    $.fn.commentPrivate = function() {
        if ($(this).hasClass('private_now')) {
            alert('您之前已设过私密评论');
            return false;
        } else {
            $(this).addClass('private_now');
            var idp = $(this).data('idp')
              , actionp = $(this).data('actionp')
              , rateHolderp = $(this).children('.has_set_private');
            var ajax_data = {
                action: "siren_private",
                p_id: idp,
                p_action: actionp
            };
            $.post("/wp-admin/admin-ajax.php", ajax_data, function(data) {
                $(rateHolderp).html(data);
            });
            return false;
        }
    }
    ;
    function show_date_time() {
        BirthDay = new Date("06/02/2017 18:00:00");
        today = new Date();
        timeold = (today.getTime() - BirthDay.getTime());
        sectimeold = timeold / 1000
        secondsold = Math.floor(sectimeold);
        msPerDay = 24 * 60 * 60 * 1000
        e_daysold = timeold / msPerDay
        daysold = Math.floor(e_daysold);
        monitorday.innerHTML = daysold;
    }
    try {
        show_date_time();
    } catch (e) {}
    POWERMODE.colorful = true;
    POWERMODE.shake = false;
    document.body.addEventListener('input', POWERMODE);
    function motionSwitch(ele) {
        var motionEles = [".bili", ".menhera", ".tieba"];
        for (var i in motionEles) {
            $(motionEles[i] + '-bar').removeClass("on-hover");
            $(motionEles[i] + '-container').css("display", "none");
        }
        $(ele + '-bar').addClass("on-hover");
        $(ele + '-container').css("display", "block");
    }
    $('.comt-addsmilies').click(function() {
        $('.comt-smilies').toggle();
    })
    $('.comt-smilies a').click(function() {
        $(this).parent().hide();
    })
    function smileBoxToggle() {
        $(document).ready(function() {
            $("#emotion-toggle").click(function() {
                $(".emotion-toggle-off").toggle(0);
                $(".emotion-toggle-on").toggle(0);
                $(".emotion-box").toggle(160);
            });
        });
    }
    smileBoxToggle();
    function grin(tag, type, before, after) {
        var myField;
        if (type == "custom") {
            tag = before + tag + after;
        } else if (type == "Img") {
            tag = '[img]' + tag + '[/img]';
        } else if (type == "Math") {
            tag = ' f(x)=∫(' + tag + ')sec²xdx ';
        } else {
            tag = ' :' + tag + ': ';
        }
        if (document.getElementById('comment') && document.getElementById('comment').type == 'textarea') {
            myField = document.getElementById('comment');
        } else {
            return false;
        }
        if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = tag;
            myField.focus();
        } else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            var cursorPos = endPos;
            myField.value = myField.value.substring(0, startPos) + tag + myField.value.substring(endPos, myField.value.length);
            cursorPos += tag.length;
            myField.focus();
            myField.selectionStart = cursorPos;
            myField.selectionEnd = cursorPos;
        } else {
            myField.value += tag;
            myField.focus();
        }
    }
    if ($("div").hasClass("popcontainer")) {
        loadBotui();
    }
    $("bot-ui").click(function() {
        loadBotui();
    });
    function add_copyright() {
        document.body.addEventListener("copy", function(e) {
            if (!mashiro_global.is_user_logged_in && window.getSelection().toString().length > 30) {
                setClipboardText(e);
            }
            addComment.createButterbar("复制成功！<br>Copied to clipboard successfully!", 1000);
        });
        function setClipboardText(event) {
            event.preventDefault();
            var htmlData = "# 商业转载请联系作者获得授权，非商业转载请注明出处。<br>" + "# For commercial use, please contact the author for authorization. For non-commercial use, please indicate the source.<br>" + "# 协议(License)：署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)<br>" + "# 作者(Author)：" + mashiro_option.author_name + "<br>" + "# 链接(URL)：" + window.location.href + "<br>" + "# 来源(Source)：" + mashiro_option.site_name + "<br><br>" + window.getSelection().toString().replace(/\r\n/g, "<br>");
            ;var textData = "# 商业转载请联系作者获得授权，非商业转载请注明出处。\n" + "# For commercial use, please contact the author for authorization. For non-commercial use, please indicate the source.\n" + "# 协议(License)：署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)\n" + "# 作者(Author)：" + mashiro_option.author_name + "\n" + "# 链接(URL)：" + window.location.href + "\n" + "# 来源(Source)：" + mashiro_option.site_name + "\n\n" + window.getSelection().toString().replace(/\r\n/g, "\n");
            if (event.clipboardData) {
                event.clipboardData.setData("text/html", htmlData);
                event.clipboardData.setData("text/plain", textData);
            } else if (window.clipboardData) {
                return window.clipboardData.setData("text", textData);
            }
        }
    }
    add_copyright();
    $(function() {
        inlojv_js_getqqinfo();
    });
    function inlojv_js_getqqinfo() {
        var is_get_by_qq = false;
        var qq_test = /^[0-9]+$/;
        if (!getCookie('user_qq') && !getCookie('user_qq_email') && !getCookie('user_author')) {
            $('input#qq,input#author,input#email,input#url').val('');
        }
        if (getCookie('user_avatar') && getCookie('user_qq') && getCookie('user_qq_email')) {
            $('div.comment-user-avatar img').attr('src', getCookie('user_avatar'));
            $('input#author').val(getCookie('user_author'));
            $('input#email').val(getCookie('user_qq') + '@qq.com');
            $('input#qq').val(getCookie('user_qq'));
            if (mashiro_option.qzone_autocomplete) {
                $('input#url').val('https://user.qzone.qq.com/' + getCookie('user_qq'));
            }
            if ($('input#qq').val()) {
                $('.qq-check').css('display', 'block');
                $('.gravatar-check').css('display', 'none');
            }
        }
        var emailAddressFlag = $('input#email').val();
        $('input#author').on('blur', function() {
            var qq = $('input#author').val();
            $.ajax({
                type: 'get',
                url: mashiro_option.qq_api_url + '?type=getqqnickname&qq=' + qq,
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'portraitCallBack',
                success: function(data) {
                    $('input#author').val(data[qq][6]);
                    $('input#email').val($.trim(qq) + '@qq.com');
                    if (mashiro_option.qzone_autocomplete) {
                        $('input#url').val('https://user.qzone.qq.com/' + $.trim(qq));
                    }
                    $('div.comment-user-avatar img').attr('src', 'https://q2.qlogo.cn/headimg_dl?dst_uin=' + qq + '&spec=100');
                    is_get_by_qq = true;
                    $('input#qq').val($.trim(qq));
                    if ($('input#qq').val()) {
                        $('.qq-check').css('display', 'block');
                        $('.gravatar-check').css('display', 'none');
                    }
                    setCookie('user_author', data[qq][6], 30);
                    setCookie('user_qq', qq, 30);
                    setCookie('is_user_qq', 'yes', 30);
                    setCookie('user_qq_email', qq + '@qq.com', 30);
                    setCookie('user_email', qq + '@qq.com', 30);
                    emailAddressFlag = $('input#email').val();
                },
                error: function() {
                    if (qq_test.test(qq)) {
                        addComment.createButterbar("QQ号不存在（建议不要使用纯数字昵称）");
                    }
                    $('input#qq').val('');
                    $('.qq-check').css('display', 'none');
                    $('.gravatar-check').css('display', 'block');
                    $('div.comment-user-avatar img').attr('src', get_gravatar_cn($('input#email').val(), 80));
                    setCookie('user_qq', '', 30);
                    setCookie('user_email', $('input#email').val(), 30);
                    setCookie('user_avatar', get_gravatar_cn($('input#email').val(), 80), 30);
                }
            });
            $.ajax({
                type: 'get',
                url: mashiro_option.qq_avatar_api_url + '?type=getqqavatar&qq=' + qq,
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'qqavatarCallBack',
                beforeSend: function() {
                    if (qq_test.test(qq)) {
                        addComment.createButterbar("正在获取QQ头像...");
                    }
                },
                success: function(data) {
                    $('div.comment-user-avatar img').attr('src', data[qq]);
                    addComment.createButterbar("QQ头像获取成功");
                    setCookie('user_avatar', data[qq], 30);
                },
                error: function() {
                    if (qq_test.test(qq)) {
                        addComment.createButterbar("QQ号不存在（建议不要使用纯数字昵称）");
                    }
                    $('input#qq', 'input#email', 'input#url').val('');
                    if (!$('input#qq').val()) {
                        $('.qq-check').css('display', 'none');
                        $('.gravatar-check').css('display', 'block');
                        setCookie('user_qq', '', 30);
                        $('div.comment-user-avatar img').attr('src', get_gravatar_cn($('input#email').val(), 80));
                        setCookie('user_avatar', get_gravatar_cn($('input#email').val(), 80), 30);
                    }
                }
            });
        });
        if (getCookie('user_avatar') && getCookie('user_email') && getCookie('is_user_qq') == 'no' && !getCookie('user_qq_email')) {
            $('div.comment-user-avatar img').attr('src', getCookie('user_avatar'));
            $('input#email').val(getCookie('user_email'));
            $('input#qq').val('');
            if (!$('input#qq').val()) {
                $('.qq-check').css('display', 'none');
                $('.gravatar-check').css('display', 'block');
            }
        }
        $('input#email').on('blur', function() {
            var emailAddress = $('input#email').val();
            if (is_get_by_qq == false || emailAddressFlag != emailAddress) {
                $('div.comment-user-avatar img').attr('src', get_gravatar_cn(emailAddress, 80));
                setCookie('user_avatar', get_gravatar_cn(emailAddress, 80), 30);
                setCookie('user_email', emailAddress, 30);
                setCookie('user_qq_email', '', 30);
                setCookie('is_user_qq', 'no', 30);
                $('input#qq').val('');
                if (!$('input#qq').val()) {
                    $('.qq-check').css('display', 'none');
                    $('.gravatar-check').css('display', 'block');
                }
            }
        });
        if (getCookie('user_url')) {
            $('input#url').val(getCookie('user_url'));
        }
        $('input#url').on('blur', function() {
            var URL_Address = $('input#url').val();
            $('input#url').val(URL_Address);
            setCookie('user_url', URL_Address, 30);
        });
        if (getCookie('user_author')) {
            $('input#author').val(getCookie('user_author'));
        }
        $('input#author').on('blur', function() {
            var user_name = $('input#author').val();
            $('input#author').val(user_name);
            setCookie('user_author', user_name, 30);
        });
    }
    function get_gravatar_cn(email, size) {
        var MD5 = function(s) {
            function L(k, d) {
                return (k << d) | (k >>> (32 - d))
            }
            function K(G, k) {
                var I, d, F, H, x;
                F = (G & 2147483648);
                H = (k & 2147483648);
                I = (G & 1073741824);
                d = (k & 1073741824);
                x = (G & 1073741823) + (k & 1073741823);
                if (I & d) {
                    return (x ^ 2147483648 ^ F ^ H)
                }
                if (I | d) {
                    if (x & 1073741824) {
                        return (x ^ 3221225472 ^ F ^ H)
                    } else {
                        return (x ^ 1073741824 ^ F ^ H)
                    }
                } else {
                    return (x ^ F ^ H)
                }
            }
            function r(d, F, k) {
                return (d & F) | ((~d) & k)
            }
            function q(d, F, k) {
                return (d & k) | (F & (~k))
            }
            function p(d, F, k) {
                return (d ^ F ^ k)
            }
            function n(d, F, k) {
                return (F ^ (d | (~k)))
            }
            function u(G, F, aa, Z, k, H, I) {
                G = K(G, K(K(r(F, aa, Z), k), I));
                return K(L(G, H), F)
            }
            function f(G, F, aa, Z, k, H, I) {
                G = K(G, K(K(q(F, aa, Z), k), I));
                return K(L(G, H), F)
            }
            function D(G, F, aa, Z, k, H, I) {
                G = K(G, K(K(p(F, aa, Z), k), I));
                return K(L(G, H), F)
            }
            function t(G, F, aa, Z, k, H, I) {
                G = K(G, K(K(n(F, aa, Z), k), I));
                return K(L(G, H), F)
            }
            function e(G) {
                var Z;
                var F = G.length;
                var x = F + 8;
                var k = (x - (x % 64)) / 64;
                var I = (k + 1) * 16;
                var aa = Array(I - 1);
                var d = 0;
                var H = 0;
                while (H < F) {
                    Z = (H - (H % 4)) / 4;
                    d = (H % 4) * 8;
                    aa[Z] = (aa[Z] | (G.charCodeAt(H) << d));
                    H++
                }
                Z = (H - (H % 4)) / 4;
                d = (H % 4) * 8;
                aa[Z] = aa[Z] | (128 << d);
                aa[I - 2] = F << 3;
                aa[I - 1] = F >>> 29;
                return aa
            }
            function B(x) {
                var k = "", F = "", G, d;
                for (d = 0; d <= 3; d++) {
                    G = (x >>> (d * 8)) & 255;
                    F = "0" + G.toString(16);
                    k = k + F.substr(F.length - 2, 2)
                }
                return k
            }
            function J(k) {
                k = k.replace(/rn/g, "n");
                var d = "";
                for (var F = 0; F < k.length; F++) {
                    var x = k.charCodeAt(F);
                    if (x < 128) {
                        d += String.fromCharCode(x)
                    } else {
                        if ((x > 127) && (x < 2048)) {
                            d += String.fromCharCode((x >> 6) | 192);
                            d += String.fromCharCode((x & 63) | 128)
                        } else {
                            d += String.fromCharCode((x >> 12) | 224);
                            d += String.fromCharCode(((x >> 6) & 63) | 128);
                            d += String.fromCharCode((x & 63) | 128)
                        }
                    }
                }
                return d
            }
            var C = Array();
            var P, h, E, v, g, Y, X, W, V;
            var S = 7
              , Q = 12
              , N = 17
              , M = 22;
            var A = 5
              , z = 9
              , y = 14
              , w = 20;
            var o = 4
              , m = 11
              , l = 16
              , j = 23;
            var U = 6
              , T = 10
              , R = 15
              , O = 21;
            s = J(s);
            C = e(s);
            Y = 1732584193;
            X = 4023233417;
            W = 2562383102;
            V = 271733878;
            for (P = 0; P < C.length; P += 16) {
                h = Y;
                E = X;
                v = W;
                g = V;
                Y = u(Y, X, W, V, C[P + 0], S, 3614090360);
                V = u(V, Y, X, W, C[P + 1], Q, 3905402710);
                W = u(W, V, Y, X, C[P + 2], N, 606105819);
                X = u(X, W, V, Y, C[P + 3], M, 3250441966);
                Y = u(Y, X, W, V, C[P + 4], S, 4118548399);
                V = u(V, Y, X, W, C[P + 5], Q, 1200080426);
                W = u(W, V, Y, X, C[P + 6], N, 2821735955);
                X = u(X, W, V, Y, C[P + 7], M, 4249261313);
                Y = u(Y, X, W, V, C[P + 8], S, 1770035416);
                V = u(V, Y, X, W, C[P + 9], Q, 2336552879);
                W = u(W, V, Y, X, C[P + 10], N, 4294925233);
                X = u(X, W, V, Y, C[P + 11], M, 2304563134);
                Y = u(Y, X, W, V, C[P + 12], S, 1804603682);
                V = u(V, Y, X, W, C[P + 13], Q, 4254626195);
                W = u(W, V, Y, X, C[P + 14], N, 2792965006);
                X = u(X, W, V, Y, C[P + 15], M, 1236535329);
                Y = f(Y, X, W, V, C[P + 1], A, 4129170786);
                V = f(V, Y, X, W, C[P + 6], z, 3225465664);
                W = f(W, V, Y, X, C[P + 11], y, 643717713);
                X = f(X, W, V, Y, C[P + 0], w, 3921069994);
                Y = f(Y, X, W, V, C[P + 5], A, 3593408605);
                V = f(V, Y, X, W, C[P + 10], z, 38016083);
                W = f(W, V, Y, X, C[P + 15], y, 3634488961);
                X = f(X, W, V, Y, C[P + 4], w, 3889429448);
                Y = f(Y, X, W, V, C[P + 9], A, 568446438);
                V = f(V, Y, X, W, C[P + 14], z, 3275163606);
                W = f(W, V, Y, X, C[P + 3], y, 4107603335);
                X = f(X, W, V, Y, C[P + 8], w, 1163531501);
                Y = f(Y, X, W, V, C[P + 13], A, 2850285829);
                V = f(V, Y, X, W, C[P + 2], z, 4243563512);
                W = f(W, V, Y, X, C[P + 7], y, 1735328473);
                X = f(X, W, V, Y, C[P + 12], w, 2368359562);
                Y = D(Y, X, W, V, C[P + 5], o, 4294588738);
                V = D(V, Y, X, W, C[P + 8], m, 2272392833);
                W = D(W, V, Y, X, C[P + 11], l, 1839030562);
                X = D(X, W, V, Y, C[P + 14], j, 4259657740);
                Y = D(Y, X, W, V, C[P + 1], o, 2763975236);
                V = D(V, Y, X, W, C[P + 4], m, 1272893353);
                W = D(W, V, Y, X, C[P + 7], l, 4139469664);
                X = D(X, W, V, Y, C[P + 10], j, 3200236656);
                Y = D(Y, X, W, V, C[P + 13], o, 681279174);
                V = D(V, Y, X, W, C[P + 0], m, 3936430074);
                W = D(W, V, Y, X, C[P + 3], l, 3572445317);
                X = D(X, W, V, Y, C[P + 6], j, 76029189);
                Y = D(Y, X, W, V, C[P + 9], o, 3654602809);
                V = D(V, Y, X, W, C[P + 12], m, 3873151461);
                W = D(W, V, Y, X, C[P + 15], l, 530742520);
                X = D(X, W, V, Y, C[P + 2], j, 3299628645);
                Y = t(Y, X, W, V, C[P + 0], U, 4096336452);
                V = t(V, Y, X, W, C[P + 7], T, 1126891415);
                W = t(W, V, Y, X, C[P + 14], R, 2878612391);
                X = t(X, W, V, Y, C[P + 5], O, 4237533241);
                Y = t(Y, X, W, V, C[P + 12], U, 1700485571);
                V = t(V, Y, X, W, C[P + 3], T, 2399980690);
                W = t(W, V, Y, X, C[P + 10], R, 4293915773);
                X = t(X, W, V, Y, C[P + 1], O, 2240044497);
                Y = t(Y, X, W, V, C[P + 8], U, 1873313359);
                V = t(V, Y, X, W, C[P + 15], T, 4264355552);
                W = t(W, V, Y, X, C[P + 6], R, 2734768916);
                X = t(X, W, V, Y, C[P + 13], O, 1309151649);
                Y = t(Y, X, W, V, C[P + 4], U, 4149444226);
                V = t(V, Y, X, W, C[P + 11], T, 3174756917);
                W = t(W, V, Y, X, C[P + 2], R, 718787259);
                X = t(X, W, V, Y, C[P + 9], O, 3951481745);
                Y = K(Y, h);
                X = K(X, E);
                W = K(W, v);
                V = K(V, g)
            }
            var i = B(Y) + B(X) + B(W) + B(V);
            return i.toLowerCase()
        };
        var size = size || 80;
        return 'https://gravatar.loli.net/avatar/' + MD5(email) + '.jpg?s=' + size + '&d=mm';
    }
    function get_poem(poem_ele, info_ele) {
        var poem = document.querySelector(poem_ele);
        var info = document.querySelector(info_ele);
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'https://v2.jinrishici.com/one.json');
        xhr.withCredentials = true;
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var data = JSON.parse(xhr.responseText);
                poem.innerHTML = data.data.content;
                info.innerHTML = '【' + data.data.origin.dynasty + '】' + data.data.origin.author + '《' + data.data.origin.title + '》';
            }
        }
        ;
        xhr.send();
    }
    function loadBotui() {
        if ($('div').hasClass('popcontainer')) {
            if (mashiro_global.variables.has_bot_ui) {
                bot_ui_ini();
            } else {
                $.getScript('https://jsdelivr.2heng.xin/gh/moezx/cdn@latest/js/botui/botui.js', function() {
                    bot_ui_ini();
                    mashiro_global.variables.has_bot_ui = true;
                });
            }
        }
    }
    function mail_me() {
        var mail = "mailto:" + mashiro_option.email_name + "@" + mashiro_option.email_domain;
        window.open(mail);
    }
    function hearthstone_deck_iframe() {
        if ($("iframe").hasClass("hearthstone-deck")) {
            $(".hearthstone-deck").each(function() {
                $(this).attr('height', $(this).width() * 5 / 9 + 'px');
            });
            $(".hearthstone-deck-container").each(function() {
                var deck_container_height_fix = $(this).width() * 5 / 9 + 14;
                $(this).css("height", deck_container_height_fix + "px");
            });
        }
    }
    var currentFontIsUbuntu = true;
    function changeFont() {
        if (currentFontIsUbuntu) {
            loadCSS("https://jsdelivr.2heng.xin/gh/moezx/cdn@3.1.8/css/cn.css");
            currentFontIsUbuntu = false;
        } else {
            loadCSS("https://jsdelivr.2heng.xin/gh/moezx/cdn@3.1.8/css/or.css");
            currentFontIsUbuntu = true;
        }
    }
    function convertChinese(zh) {
        if (zh == 'cn') {
            $("#zh_cn").css("display", "none");
            $("#zh_tw").css("display", "inline-block");
            loadCSS("https://jsdelivr.2heng.xin/gh/moezx/cdn@3.1.8/css/tw.css");
        }
        if (zh == 'tw') {
            $("#zh_tw").css("display", "none");
            $("#zh_cn").css("display", "inline-block");
            loadCSS("https://jsdelivr.2heng.xin/gh/moezx/cdn@3.1.8/css/cn.css");
        }
    }
    mashiro_global.ini.normalize();
    if (window.location.hostname == "lovelive.2heng.xin") {
        Poi.ajaxurl = Poi.ajaxurl.replace('//2heng.xin', '');
    }
    var home = location.href
      , s = $('#bgvideo')[0]
      , Siren = {
        MN: function() {
            $('.iconflat').on('click', function() {
                if ($("#main-container").hasClass("open")) {
                    $('.iconflat').css('width', '50px').css('height', '50px');
                    $('.openNav').css('height', '50px');
                } else {
                    $('.iconflat').css('width', '100%').css('height', '100%');
                    $('.openNav').css('height', '100%');
                }
                $('body').toggleClass('navOpen');
                $('#main-container,#mo-nav,.openNav').toggleClass('open');
            });
        },
        MNH: function() {
            if ($('body').hasClass('navOpen')) {
                $('body').toggleClass('navOpen');
                $('#main-container,#mo-nav,.openNav').toggleClass('open');
            }
        },
        splay: function() {
            $('#video-btn').addClass('video-pause').removeClass('video-play').show();
            $('.video-stu').css({
                "bottom": "-100px"
            });
            $('.focusinfo').css({
                "top": "-999px"
            });
            $('#banner_wave_1').addClass('banner_wave_hide');
            $('#banner_wave_2').addClass('banner_wave_hide');
            for (var i = 0; i < ap.length; i++) {
                try {
                    ap[i].destroy()
                } catch (e) {}
            }
            try {
                hermitInit()
            } catch (e) {}
            s.play();
        },
        spause: function() {
            $('#video-btn').addClass('video-play').removeClass('video-pause');
            $('.focusinfo').css({
                "top": "49.3%"
            });
            $('#banner_wave_1').removeClass('banner_wave_hide');
            $('#banner_wave_2').removeClass('banner_wave_hide');
            s.pause();
        },
        liveplay: function() {
            if (s.oncanplay != undefined && $('.haslive').length > 0) {
                if ($('.videolive').length > 0) {
                    Siren.splay();
                }
            }
        },
        livepause: function() {
            if (s.oncanplay != undefined && $('.haslive').length > 0) {
                Siren.spause();
                $('.video-stu').css({
                    "bottom": "0px"
                }).html('已暂停 ...');
            }
        },
        addsource: function() {
            $('.video-stu').html('正在载入视频 ...').css({
                "bottom": "0px"
            });
            var t = Poi.movies.name.split(",")
              , _t = t[Math.floor(Math.random() * t.length)];
            $('#bgvideo').attr('src', Poi.movies.url + '/' + _t + '.mp4');
            $('#bgvideo').attr('video-name', _t);
        },
        LV: function() {
            var _btn = $('#video-btn');
            _btn.on('click', function() {
                if ($(this).hasClass('loadvideo')) {
                    $(this).addClass('video-pause').removeClass('loadvideo').hide();
                    Siren.addsource();
                    s.oncanplay = function() {
                        Siren.splay();
                        $('#video-add').show();
                        _btn.addClass('videolive');
                        _btn.addClass('haslive');
                    }
                } else {
                    if ($(this).hasClass('video-pause')) {
                        Siren.spause();
                        _btn.removeClass('videolive');
                        $('.video-stu').css({
                            "bottom": "0px"
                        }).html('已暂停 ...');
                    } else {
                        Siren.splay();
                        _btn.addClass('videolive');
                    }
                }
                s.onended = function() {
                    $('#bgvideo').attr('src', '');
                    $('#video-add').hide();
                    _btn.addClass('loadvideo').removeClass('video-pause');
                    _btn.removeClass('videolive');
                    _btn.removeClass('haslive');
                    $('.focusinfo').css({
                        "top": "49.3%"
                    });
                }
            });
            $('#video-add').on('click', function() {
                Siren.addsource();
            });
        },
        AH: function() {
            if (Poi.windowheight == 'auto') {
                if ($('h1.main-title').length > 0) {
                    var _height = $(window).height();
                    $('#centerbg').css({
                        'height': _height
                    });
                    $('#bgvideo').css({
                        'min-height': _height
                    });
                    $(window).resize(function() {
                        Siren.AH();
                    });
                }
            } else {
                $('.headertop').addClass('headertop-bar');
            }
        },
        PE: function() {
            if ($('.headertop').length > 0) {
                if ($('h1.main-title').length > 0) {
                    $('.blank').css({
                        "padding-top": "0px"
                    });
                    $('.headertop').css({
                        "height": "auto"
                    }).show();
                    if (Poi.movies.live == 'open')
                        Siren.liveplay();
                } else {
                    $('.blank').css({
                        "padding-top": "75px"
                    });
                    $('.headertop').css({
                        "height": "0px"
                    }).hide();
                    Siren.livepause();
                }
            }
        },
        CE: function() {
            $('.comments-hidden').show();
            $('.comments-main').hide();
            $('.comments-hidden').click(function() {
                $('.comments-main').slideDown(500);
                $('.comments-hidden').hide();
            });
            $('.archives').hide();
            $('.archives:first').show();
            $('#archives-temp h3').click(function() {
                $(this).next().slideToggle('fast');
                return false;
            });
            baguetteBox.run('.entry-content', {
                captions: function(element) {
                    return element.getElementsByTagName('img')[0].alt;
                },
                noScrollbars: true,
                preload: 2,
                ignoreClass: 'fancybox',
            });
            $('.js-toggle-search').on('click', function() {
                $('.js-toggle-search').toggleClass('is-active');
                $('.js-search').toggleClass('is-visible');
            });
            $('.search_close').on('click', function() {
                if ($('.js-search').hasClass('is-visible')) {
                    $('.js-toggle-search').toggleClass('is-active');
                    $('.js-search').toggleClass('is-visible');
                }
            });
            $('#show-nav').on('click', function() {
                if ($('#show-nav').hasClass('showNav')) {
                    $('#show-nav').removeClass('showNav').addClass('hideNav');
                    $('.site-top .lower nav').addClass('navbar');
                    $('.mobile-fit-control').removeClass('hide');
                    if (screen && screen.width <= 1200) {
                        $(".site-title").toggle();
                    }
                } else {
                    $('#show-nav').removeClass('hideNav').addClass('showNav');
                    $('.site-top .lower nav').removeClass('navbar');
                    $('.mobile-fit-control').addClass('hide');
                    if (screen && screen.width <= 1200) {
                        $(".site-title").toggle();
                    }
                }
            });
            $("#loading").click(function() {
                $("#loading").fadeOut(500);
            });
        },
        NH: function() {
            var h1 = 0
              , h2 = 50
              , ss = $(document).scrollTop();
            $(window).scroll(function() {
                var s = $(document).scrollTop();
                if (s == h1) {
                    $('.site-header').removeClass('yya');
                }
                if (s > h1) {
                    $('.site-header').addClass('yya');
                }
                if (s > h2) {
                    $('.site-header').addClass('gizle');
                    if (s > ss) {
                        $('.site-header').removeClass('sabit');
                    } else {
                        $('.site-header').addClass('sabit');
                    }
                    ss = s;
                }
            });
        },
        XLS: function() {
            $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            $('body').on('click', '#pagination a', function() {
                $(this).addClass("loading").text("");
                $.ajax({
                    type: "POST",
                    url: $(this).attr("href") + "#main",
                    success: function(data) {
                        result = $(data).find("#main .post");
                        nextHref = $(data).find("#pagination a").attr("href");
                        $("#main").append(result.fadeIn(500));
                        $("#pagination a").removeClass("loading").text("Previous");
                        lazyload();
                        mashiro_global.post_list_show_animation.ini(50);
                        if (nextHref != undefined) {
                            $("#pagination a").attr("href", nextHref);
                        } else {
                            $("#pagination").html("<span>很高兴你翻到这里，但是真的没有了...</span>");
                        }
                    }
                });
                return false;
            });
        },
        XCS: function() {
            var __cancel = jQuery('#cancel-comment-reply-link')
              , __cancel_text = __cancel.text()
              , __list = 'commentwrap';
            jQuery(document).on("submit", "#commentform", function() {
                jQuery.ajax({
                    url: Poi.ajaxurl,
                    data: jQuery(this).serialize() + "&action=ajax_comment",
                    type: jQuery(this).attr('method'),
                    beforeSend: addComment.createButterbar("提交中(Commiting)...."),
                    error: function(request) {
                        var t = addComment;
                        t.createButterbar(request.responseText);
                    },
                    success: function(data) {
                        jQuery('textarea').each(function() {
                            this.value = ''
                        });
                        var t = addComment
                          , cancel = t.I('cancel-comment-reply-link')
                          , temp = t.I('wp-temp-form-div')
                          , respond = t.I(t.respondId)
                          , post = t.I('comment_post_ID').value
                          , parent = t.I('comment_parent').value;
                        if (parent != '0') {
                            jQuery('#respond').before('<ol class="children">' + data + '</ol>');
                        } else if (!jQuery('.' + __list).length) {
                            if (Poi.formpostion == 'bottom') {
                                jQuery('#respond').before('<ol class="' + __list + '">' + data + '</ol>');
                            } else {
                                jQuery('#respond').after('<ol class="' + __list + '">' + data + '</ol>');
                            }
                        } else {
                            if (Poi.order == 'asc') {
                                jQuery('.' + __list).append(data);
                            } else {
                                jQuery('.' + __list).prepend(data);
                            }
                        }
                        t.createButterbar("提交成功(Succeed)");
                        lazyload();
                        code_highlight_style();
                        click_to_view_image();
                        clean_upload_images();
                        cancel.style.display = 'none';
                        cancel.onclick = null;
                        t.I('comment_parent').value = '0';
                        if (temp && respond) {
                            temp.parentNode.insertBefore(respond, temp);
                            temp.parentNode.removeChild(temp)
                        }
                    }
                });
                return false;
            });
            addComment = {
                moveForm: function(commId, parentId, respondId) {
                    var t = this, div, comm = t.I(commId), respond = t.I(respondId), cancel = t.I('cancel-comment-reply-link'), parent = t.I('comment_parent'), post = t.I('comment_post_ID');
                    __cancel.text(__cancel_text);
                    t.respondId = respondId;
                    if (!t.I('wp-temp-form-div')) {
                        div = document.createElement('div');
                        div.id = 'wp-temp-form-div';
                        div.style.display = 'none';
                        respond.parentNode.insertBefore(div, respond)
                    }
                    !comm ? (temp = t.I('wp-temp-form-div'),
                    t.I('comment_parent').value = '0',
                    temp.parentNode.insertBefore(respond, temp),
                    temp.parentNode.removeChild(temp)) : comm.parentNode.insertBefore(respond, comm.nextSibling);
                    jQuery("body").animate({
                        scrollTop: jQuery('#respond').offset().top - 180
                    }, 400);
                    parent.value = parentId;
                    cancel.style.display = '';
                    cancel.onclick = function() {
                        var t = addComment
                          , temp = t.I('wp-temp-form-div')
                          , respond = t.I(t.respondId);
                        t.I('comment_parent').value = '0';
                        if (temp && respond) {
                            temp.parentNode.insertBefore(respond, temp);
                            temp.parentNode.removeChild(temp);
                        }
                        this.style.display = 'none';
                        this.onclick = null;
                        return false;
                    }
                    ;
                    try {
                        t.I('comment').focus();
                    } catch (e) {}
                    return false;
                },
                I: function(e) {
                    return document.getElementById(e);
                },
                clearButterbar: function(e) {
                    if (jQuery(".butterBar").length > 0) {
                        jQuery(".butterBar").remove();
                    }
                },
                createButterbar: function(message, showtime) {
                    var t = this;
                    t.clearButterbar();
                    jQuery("body").append('<div class="butterBar butterBar--center"><p class="butterBar-message">' + message + '</p></div>');
                    if (showtime > 0) {
                        setTimeout("jQuery('.butterBar').remove()", showtime);
                    } else {
                        setTimeout("jQuery('.butterBar').remove()", 6000);
                    }
                }
            };
        },
        XCP: function() {
            $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            $('body').on('click', '#comments-navi a', function(e) {
                e.preventDefault();
                $.ajax({
                    type: "GET",
                    url: $(this).attr('href'),
                    beforeSend: function() {
                        $('#comments-navi').remove();
                        $('ul.commentwrap').remove();
                        $('#loading-comments').slideDown();
                        $body.animate({
                            scrollTop: $('#comments-list-title').offset().top - 65
                        }, 800);
                    },
                    dataType: "html",
                    success: function(out) {
                        result = $(out).find('ul.commentwrap');
                        nextlink = $(out).find('#comments-navi');
                        $('#loading-comments').slideUp('fast');
                        $('#loading-comments').after(result.fadeIn(500));
                        $('ul.commentwrap').after(nextlink);
                        lazyload();
                        code_highlight_style();
                        click_to_view_image();
                    }
                });
            });
        },
        IA: function() {
            POWERMODE.colorful = true;
            POWERMODE.shake = false;
            document.body.addEventListener('input', POWERMODE)
        },
        GT: function() {
            var offset = 100
              , offset_opacity = 1200
              , scroll_top_duration = 700
              , $back_to_top = $('.cd-top');
            $(window).scroll(function() {
                if ($(this).scrollTop() > offset) {
                    $back_to_top.addClass('cd-is-visible');
                    $(".changeSkin-gear").css("bottom", "0");
                    if ($(window).height() > 950) {
                        $(".cd-top.cd-is-visible").css("top", "0");
                    } else {
                        $(".cd-top.cd-is-visible").css("top", ($(window).height() - 950) + "px");
                    }
                } else {
                    $(".changeSkin-gear").css("bottom", "-999px");
                    $(".cd-top.cd-is-visible").css("top", "-900px");
                    $back_to_top.removeClass('cd-is-visible cd-fade-out');
                }
                if ($(this).scrollTop() > offset_opacity) {
                    $back_to_top.addClass('cd-fade-out');
                }
            });
            $back_to_top.on('click', function(event) {
                event.preventDefault();
                $('body,html').animate({
                    scrollTop: 0,
                }, scroll_top_duration);
            });
        }
    }
    $(function() {
        Siren.AH();
        Siren.PE();
        Siren.NH();
        Siren.GT();
        Siren.XLS();
        Siren.XCS();
        Siren.XCP();
        Siren.CE();
        Siren.MN();
        Siren.IA();
        Siren.LV();
        if (window.is_app)
            injectStyles('#nprogress .bar { display: none; }');
        if (Poi.pjax) {
            $(document).pjax('a[target!=_top]', '#page', {
                fragment: '#page',
                timeout: 8000,
            }).on('pjax:beforeSend', ()=>{
                $('.normal-cover-video').each(function() {
                    this.pause();
                    this.src = '';
                    this.load = '';
                });
            }
            ).on('pjax:send', function() {
                $("#bar").css("width", "0%");
                if (mashiro_option.NProgressON)
                    NProgress.start();
                Siren.MNH();
            }).on('pjax:complete', function() {
                Siren.AH();
                Siren.PE();
                Siren.CE();
                if (mashiro_option.NProgressON)
                    NProgress.done();
                mashiro_global.ini.pjax();
                $("#loading").fadeOut(500);
                if (Poi.codelamp == 'open') {
                    self.Prism.highlightAll(event)
                }
                ;if ($('.ds-thread').length > 0) {
                    if (typeof DUOSHUO !== 'undefined') {
                        DUOSHUO.EmbedThread('.ds-thread');
                    } else {
                        $.getScript("//static.duoshuo.com/embed.js");
                    }
                }
            }).on('submit', '.search-form,.s-search', function(event) {
                event.preventDefault();
                $.pjax.submit(event, '#page', {
                    fragment: '#page',
                    timeout: 8000,
                });
                if ($('.js-search.is-visible').length > 0) {
                    $('.js-toggle-search').toggleClass('is-active');
                    $('.js-search').toggleClass('is-visible');
                }
            });
            mashiro_global.lib.pjax_to_url = function(url, ele) {
                $.pjax({
                    url: url,
                    container: ele,
                    fragment: ele,
                    timeout: 8000
                })
            }
            window.addEventListener('popstate', function(e) {
                Siren.AH();
                Siren.PE();
                Siren.CE();
                timeSeriesReload(true);
            }, false);
        }
        $.fn.postLike = function() {
            if ($(this).hasClass('done')) {
                return false;
            } else {
                $(this).addClass('done');
                var id = $(this).data("id")
                  , action = $(this).data('action')
                  , rateHolder = $(this).children('.count');
                var ajax_data = {
                    action: "specs_zan",
                    um_id: id,
                    um_action: action
                };
                $.post(Poi.ajaxurl, ajax_data, function(data) {
                    $(rateHolder).html(data);
                });
                return false;
            }
        }
        ;
        $(document).on("click", ".specsZan", function() {
            $(this).postLike();
        });
        console.log("%c Mashiro %c", "background:#24272A; color:#ffffff", "", "https://2heng.xin/");
        console.log("%c Github %c", "background:#24272A; color:#ffffff", "", "https://github.com/mashirozx");
    });
    var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1
      , isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1
      , isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
    if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
        window.addEventListener('hashchange', function() {
            var id = location.hash.substring(1), element;
            if (!(/^[A-z0-9_-]+$/.test(id))) {
                return;
            }
            element = document.getElementById(id);
            if (element) {
                if (!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))) {
                    element.tabIndex = -1;
                }
                element.focus();
            }
        }, false);
    }
    loadCSS(mashiro_option.jsdelivr_css_src);
    loadCSS("https://at.alicdn.com/t/font_679578_dishi1yoavm.css");
    loadCSS("https://jsdelivr.2heng.xin/gh/moezx/cdn@3.5.4/fonts/Moe-Mashiro/stylesheet.css");
    loadCSS("https://fonts.googleapis.com/css?family=Noto+SerifMerriweather|Merriweather+Sans|Source+Code+Pro|Ubuntu:400,700|Noto+Serif+SC");
    loadCSS("https://jsdelivr.2heng.xin/gh/moezx/cdn@3.3.9/css/sharejs.css");
    ;
} catch (e) {}
try {
    function checkPIOCookie() {
        var donotneed = getCookie("dontwantlive2d");
        if (donotneed != "") {
            if (donotneed == "yes") {
                $(".hide-live2d").css("visibility", "hidden");
                $(".prpr").css("visibility", "hidden");
                console.log("If you want to see live2d please clean cookie!");
            } else {
                loadlive2d("live2d", "https://jsdelivr.2heng.xin/gh/moezx/live2d@v1.0/live2d/Pio/appv4.json");
            }
        } else {
            loadlive2d("live2d", "https://jsdelivr.2heng.xin/gh/moezx/live2d@v1.0/live2d/Pio/appv4.json");
        }
    }
    var Live2D_img_path = "";
    function pio() {
        var Live2D_file_domain = 'https://jsdelivr.2heng.xin/gh/moezx/cdn@3.4.9/img/Sakura/images/lagrange/';
        var live2d_file_id = Math.ceil(Math.random() * 92);
        var Live2D_file_name = 'pio (' + live2d_file_id + ').png';
        Live2D_img_path = Live2D_file_domain + MD5(Live2D_file_name);
        loadlive2d("live2d", "https://jsdelivr.2heng.xin/gh/moezx/live2d@v1.0/live2d/Pio/appv4.json");
    }
    function tia() {
        Live2D_img_path = "https://calculus.shino.cc/eulerian/";
        loadlive2d("live2d", "https://jsdelivr.2heng.xin/gh/moezx/live2d@v1.0/live2d/Tia/appv2.json");
    }
    function switch_pio() {
        if (isIE || isEdge) {
            addComment.createButterbar("此功能不支持您的浏览器<br>Feature cannot work on your browser");
            return false;
        } else if (isChrome) {
            pio();
        } else if (isSafari) {
            addComment.createButterbar("此功能不支持您的浏览器<br>Feature cannot work on your browser");
            return false;
        } else {
            pio();
        }
    }
    function save_pio() {
        window.Live2D.captureName = 'Screenshot-' + Date.now() + '.png';
        window.Live2D.captureFrame = true;
        addComment.createButterbar("保存成功！<br>Screenshot saved!", 1000);
    }
    if (!window.is_app) {
        var userAgent = navigator.userAgent;
        console.log('userAgent = ' + userAgent);
        console.log('window inner size: ' + window.innerWidth + ' x ' + window.innerHeight);
        var isOpera = userAgent.indexOf("Opera") > -1;
        var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;
        var isEdge = userAgent.indexOf("Edge") > -1;
        var isSafari = userAgent.indexOf("Safari") > -1;
        if (isIE || isEdge) {
            Live2D_img_path = 'https://2heng.xin/live2d/Pio/api/';
            loadlive2d("live2d", "https://jsdelivr.2heng.xin/gh/moezx/live2d@v1.0/live2d/Pio/model-default.json");
        } else if (isChrome) {
            pio();
        } else if (isSafari) {
            Live2D_img_path = 'https://2heng.xin/live2d/Pio/api/';
            loadlive2d("live2d", "https://jsdelivr.2heng.xin/gh/moezx/live2d@v1.0/live2d/Pio/model-default.json");
        } else {
            pio();
        }
    }
    ;
} catch (e) {}
try {
    function render(template, context) {
        var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
        return template.replace(tokenReg, function(word, slash1, token, slash2) {
            if (slash1 || slash2) {
                return word.replace('\\', '');
            }
            var variables = token.replace(/\s/g, '').split('.');
            var currentObject = context;
            var i, length, variable;
            for (i = 0,
            length = variables.length; i < length; ++i) {
                variable = variables[i];
                currentObject = currentObject[variable];
                if (currentObject === undefined || currentObject === null)
                    return '';
            }
            return currentObject;
        });
    }
    String.prototype.render = function(context) {
        return render(this, context);
    }
    ;
    var re = /x/;
    re.toString = function() {
        showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
        return '';
    }
    ;
    $(document).on('copy', function() {
        showMessage('你都复制了些什么呀，转载要记得加上出处哦', 5000);
    });
    $.ajax({
        cache: true,
        url: "https://jsdelivr.2heng.xin/gh/moezx/live2d@v1.3/live2d/tips.json",
        dataType: "json",
        success: function(result) {
            $.each(result.mouseover, function(index, tips) {
                $(document).on("mouseover", tips.selector, function() {
                    var text = tips.text;
                    if (Array.isArray(tips.text))
                        text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                    text = text.render({
                        text: $(this).text()
                    });
                    showMessage(text, 3000);
                });
            });
            $.each(result.click, function(index, tips) {
                $(document).on("click", tips.selector, function() {
                    var text = tips.text;
                    if (Array.isArray(tips.text))
                        text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                    text = text.render({
                        text: $(this).text()
                    });
                    showMessage(text, 5000);
                });
            });
        }
    });
    (function() {
        var text;
        if (document.referrer !== '') {
            var referrer = document.createElement('a');
            referrer.href = document.referrer;
            text = 'Hello! 来自 <span style="color:#E06020;">' + referrer.hostname + '</span> 的朋友~';
            var domain = referrer.hostname.split('.')[1];
            if (domain == 'baidu') {
                text = 'Hello! 从 百度 进来的朋友<br>欢迎阅读<span style="color:#E06020;';
            } else if (domain == 'so') {
                text = 'Hello! 用 360搜索 找到我的朋友<br>欢迎阅读<span style="color:#E06020;';
            } else if (domain == 'sogou') {
                text = 'Hello! 用 搜狗搜索 找到我的朋友<br>欢迎阅读<span style="color:#E06020;';
            } else if (domain == 'bing') {
                text = 'Hello! 用 必应 找到我的朋友<br>欢迎阅读<span style="color:#E06020;';
            } else if (domain == '2heng') {
                text = '只要微笑就可以了 ^_^';
            } else if (domain == 'google') {
                text = 'Hello! 来自 Google 的朋友<br>欢迎阅读<span style="color:#E06020;">『' + document.title.split(' - ')[0] + '』</span>';
            }
        } else {
            if (window.location.href == 'https://2heng.xin/') {
                var now = (new Date()).getHours();
                if (now > 23 || now <= 5) {
                    text = '你是夜猫子呀？这么晚还不睡觉，明天起得来嘛?';
                } else if (now > 5 && now <= 7) {
                    text = '早上好！一日之计在于晨，美好的一天就要开始了';
                } else if (now > 7 && now <= 11) {
                    text = '上午好！工作顺利嘛？不要久坐，多起来走动走动哦！';
                } else if (now > 11 && now <= 14) {
                    text = '中午了，工作了一个上午，现在是午餐时间！';
                } else if (now > 14 && now <= 17) {
                    text = '午后很容易犯困呢，幸福地睡个午觉吧？';
                } else if (now > 17 && now <= 19) {
                    text = '傍晚了！窗外的夕阳很美丽呢~';
                } else if (now > 19 && now <= 21) {
                    text = '晚上好，今天过得怎么样？';
                } else if (now > 21 && now <= 23) {
                    text = '已经这么晚了呀，早点休息吧，晚安~';
                } else {
                    text = '嗨~ 快来逗我玩吧！';
                }
            } else if (window.location.href == 'https://2heng.xin/about/') {
                text = 'Do you like me? ヾ(≧∇≦*)ゝ';
            } else {
                text = '欢迎阅读<span style="color:#E06020;">『' + document.title.split(' - ')[0] + '』</span>';
            }
        }
        showMessage(text, 12000);
    }
    )();
    window.setInterval(showHitokoto, 30000);
    function showHitokoto() {
        $.getJSON('https://api.mashiro.top/hitokoto/?encode=json', function(result) {
            showMessage(result.hitokoto, 16000);
        });
    }
    function showMessage(text, timeout) {
        if (Array.isArray(text))
            text = text[Math.floor(Math.random() * text.length + 1) - 1];
        $('.mashiro-tips').stop();
        $('.mashiro-tips').html(text).fadeTo(200, 1);
        if (timeout === null)
            timeout = 5000;
        hideMessage(timeout);
    }
    function hideMessage(timeout) {
        $('.mashiro-tips').stop().css('opacity', 1);
        if (timeout === null)
            timeout = 5000;
        $('.mashiro-tips').delay(timeout).fadeTo(200, 0);
    }
    $(document).ready(function() {
        setTimeout(function() {
            isFirstLoad = true;
            if (document.body.clientWidth > 860) {
                $(".changeSkin-gear").css("visibility", "visible");
            }
            $("p").remove(".head-copyright");
        }, 0)
    });
    if ($("div").hasClass("aplayer")) {
        reloadHermit();
    }
    ;
} catch (e) {}
try {
    function aplayerF() {
        'use strict';
        var aplayers = []
          , loadMeting = function() {
            function a(a, b) {
                var c = {
                    container: a,
                    audio: b,
                    mini: null,
                    fixed: null,
                    autoplay: !1,
                    mutex: !0,
                    lrcType: 3,
                    listFolded: !1,
                    preload: 'auto',
                    theme: '#2980b9',
                    loop: 'all',
                    order: 'list',
                    volume: null,
                    listMaxHeight: null,
                    customAudioType: null,
                    storageName: 'metingjs'
                };
                if (b.length) {
                    b[0].lrc || (c.lrcType = 0);
                    var d = {};
                    for (var e in c) {
                        var f = e.toLowerCase();
                        (a.dataset.hasOwnProperty(f) || a.dataset.hasOwnProperty(e) || null !== c[e]) && (d[e] = a.dataset[f] || a.dataset[e] || c[e],
                        ('true' === d[e] || 'false' === d[e]) && (d[e] = 'true' == d[e]))
                    }
                    aplayers.push(new APlayer(d))
                }
                for (var f = 0; f < aplayers.length; f++)
                    try {
                        aplayers[f].lrc.hide();
                    } catch (a) {
                        console.log(a)
                    }
                var lrcTag = 1;
                $(".aplayer.aplayer-fixed").click(function() {
                    if (lrcTag == 1) {
                        for (var f = 0; f < aplayers.length; f++)
                            try {
                                aplayers[f].lrc.show();
                            } catch (a) {
                                console.log(a)
                            }
                    }
                    lrcTag = 2;
                });
                var apSwitchTag = 0;
                $(".aplayer.aplayer-fixed .aplayer-body").addClass("ap-hover");
                $(".aplayer-miniswitcher").click(function() {
                    if (apSwitchTag == 0) {
                        $(".aplayer.aplayer-fixed .aplayer-body").removeClass("ap-hover");
                        apSwitchTag = 1;
                    } else {
                        $(".aplayer.aplayer-fixed .aplayer-body").addClass("ap-hover");
                        apSwitchTag = 0;
                    }
                });
            }
            var b = 'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r';
            'undefined' != typeof meting_api && (b = meting_api);
            for (var f = 0; f < aplayers.length; f++)
                try {
                    aplayers[f].destroy()
                } catch (a) {
                    console.log(a)
                }
            aplayers = [];
            for (var c = document.querySelectorAll('.aplayer'), d = function() {
                var d = c[e]
                  , f = d.dataset.id;
                if (f) {
                    var g = d.dataset.api || b;
                    g = g.replace(':server', d.dataset.server),
                    g = g.replace(':type', d.dataset.type),
                    g = g.replace(':id', d.dataset.id),
                    g = g.replace(':auth', d.dataset.auth),
                    g = g.replace(':r', Math.random());
                    var h = new XMLHttpRequest;
                    h.onreadystatechange = function() {
                        if (4 === h.readyState && (200 <= h.status && 300 > h.status || 304 === h.status)) {
                            var b = JSON.parse(h.responseText);
                            a(d, b)
                        }
                    }
                    ,
                    h.open('get', g, !0),
                    h.send(null)
                } else if (d.dataset.url) {
                    var i = [{
                        name: d.dataset.name || d.dataset.title || 'Audio name',
                        artist: d.dataset.artist || d.dataset.author || 'Audio artist',
                        url: d.dataset.url,
                        cover: d.dataset.cover || d.dataset.pic,
                        lrc: d.dataset.lrc,
                        type: d.dataset.type || 'auto'
                    }];
                    a(d, i)
                }
            }, e = 0; e < c.length; e++)
                d()
        };
        document.addEventListener('DOMContentLoaded', loadMeting, !1);
    }
    if (document.body.clientWidth > 860) {
        aplayerF();
    }
    mashiro_global.ini.live2d;
} catch (e) {}
try {
    /*! This file is auto-generated */
    !function(c, d) {
        "use strict";
        var e = !1
          , n = !1;
        if (d.querySelector)
            if (c.addEventListener)
                e = !0;
        if (c.wp = c.wp || {},
        !c.wp.receiveEmbedMessage)
            if (c.wp.receiveEmbedMessage = function(e) {
                var t = e.data;
                if (t)
                    if (t.secret || t.message || t.value)
                        if (!/[^a-zA-Z0-9]/.test(t.secret)) {
                            for (var r, a, i, s = d.querySelectorAll('iframe[data-secret="' + t.secret + '"]'), n = d.querySelectorAll('blockquote[data-secret="' + t.secret + '"]'), o = 0; o < n.length; o++)
                                n[o].style.display = "none";
                            for (o = 0; o < s.length; o++)
                                if (r = s[o],
                                e.source === r.contentWindow) {
                                    if (r.removeAttribute("style"),
                                    "height" === t.message) {
                                        if (1e3 < (i = parseInt(t.value, 10)))
                                            i = 1e3;
                                        else if (~~i < 200)
                                            i = 200;
                                        r.height = i
                                    }
                                    if ("link" === t.message)
                                        if (a = d.createElement("a"),
                                        i = d.createElement("a"),
                                        a.href = r.getAttribute("src"),
                                        i.href = t.value,
                                        i.host === a.host)
                                            if (d.activeElement === r)
                                                c.top.location.href = t.value
                                }
                        }
            }
            ,
            e)
                c.addEventListener("message", c.wp.receiveEmbedMessage, !1),
                d.addEventListener("DOMContentLoaded", t, !1),
                c.addEventListener("load", t, !1);
        function t() {
            if (!n) {
                n = !0;
                for (var e, t, r = -1 !== navigator.appVersion.indexOf("MSIE 10"), a = !!navigator.userAgent.match(/Trident.*rv:11\./), i = d.querySelectorAll("iframe.wp-embedded-content"), s = 0; s < i.length; s++) {
                    if (!(e = i[s]).getAttribute("data-secret"))
                        t = Math.random().toString(36).substr(2, 10),
                        e.src += "#?secret=" + t,
                        e.setAttribute("data-secret", t);
                    if (r || a)
                        (t = e.cloneNode(!0)).removeAttribute("security"),
                        e.parentNode.replaceChild(t, e)
                }
            }
        }
    }(window, document);
} catch (e) {}
