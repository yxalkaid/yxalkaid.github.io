"use strict";

const postVideo = (args) => {
    const src = args[0] || '';
    const type = args[1] || 'video/mp4';
    const width = args[2] || '100%';
    const height = args[3] || '100%';

    return `<video width="${width}" height="${height}" loop controls>
                <source src="${src}" type="${type}">
                <p>目前无法显示此视频</p>
            </video>
    `;
};

hexo.extend.tag.register('video', postVideo);