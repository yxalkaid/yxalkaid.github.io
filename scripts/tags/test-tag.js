"use strict";

const {
    parseTagArgs,
} = require("../utils/tag-args");

const postTestTag = (args) => {
    console.log("======================")
    console.log(args);
    console.log(parseTagArgs(args));
    console.log("======================")
    return "";
};

hexo.extend.tag.register('test_tag', postTestTag);