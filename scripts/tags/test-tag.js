"use strict";

const {
    parseTagArgs,
} = require("../utils/tag-args");

const postTestTag = (args) => {
    console.log(args);
    console.log(parseTagArgs(args));

    return "";
};

hexo.extend.tag.register('test_tag', postTestTag);