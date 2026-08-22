/**
 * Hexo 自定义标签：嵌入视频播放器
 *
 * 功能：在文章中插入一个支持循环播放的 <video> 标签，
 *       可自定义视频源、MIME 类型以及宽高尺寸。
 *
 * 用法：{% video [视频URL] [MIME类型] [宽度] [高度] %}
 *   - 视频URL：必填，视频文件地址
 *   - MIME类型：可选，默认 video/mp4
 *   - 宽度：可选，默认 100%
 *   - 高度：可选，默认 100%
 */
"use strict";

const postVideo = (args) => {
    const src = args[0] || '';
    const type = args[1] || 'video/mp4';
    const width = args[2] || '100%';
    const height = args[3] || '100%';

    return `
        <video width="${width}" height="${height}" loop controls>
            <source src="${src}" type="${type}">
            <p>目前无法显示此视频</p>
        </video>
    `;
};

hexo.extend.tag.register('video', postVideo);