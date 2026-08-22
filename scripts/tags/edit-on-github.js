/**
 * Hexo 自定义标签：在 GitHub 上编辑此页面
 *
 * 功能：根据当前站点 URL 自动解析 GitHub 仓库地址，
 *       生成一个指向源文件编辑页面的链接，方便直接跳转修改文章。
 *
 * 用法：{% edit_on_github [分支名] [子目录] %}
 *   - 分支名：可选，默认 main，指定仓库分支
 *   - 子目录：可选，默认空，如果 Hexo 项目放在仓库的子目录中（如 docs），则填写该目录名
 *
 * 注意：仅在 GitHub 中包含源码时可用。
 */
"use strict";

const {parseTagArgs} = require("../utils/tag-args");
const parseRepoFromUrl = () => {
    const siteUrl = hexo.config.url || "";
    const match = siteUrl.match(/https?:\/\/([^/]+)\.github\.io(?:\/([^/]+))?/);
    if (!match) return "";
    const username = match[1];
    const project = match[2];
    return project ? `${username}/${project}` : `${username}/${username}.github.io`;
};

const postEditOnGitHub = function (args) {
    const repo = parseRepoFromUrl();
    const sourcePath = this.source;
    if (!repo || !sourcePath) {
        return "";
    }

    const kwargs = parseTagArgs(
        args,
        {
            branch: 'main',
            projectDir: ''
        },
        ['branch', 'projectDir']);
    
    const branch = kwargs.branch;
    const projectDir = kwargs.projectDir.replace(/^\/|\/$/g, '');
    const sourceDir = hexo.config.source_dir || "source";

    const basePath = projectDir ? `${projectDir}/${sourceDir}` : sourceDir;
    const editUrl = `https://github.com/${repo}/edit/${branch}/${basePath}/${sourcePath}`;

    return `
        <a class="link" href="${editUrl}" target="_blank" rel="noopener noreferrer">
            <i class="fa-regular fa-pen-to-square"></i> 在 GitHub 上编辑此页面
        </a>
    `;
};

hexo.extend.tag.register("edit_on_github", postEditOnGitHub);