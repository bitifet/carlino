#!/usr/bin/env node

const pug = require("pug");
const html2pug = require("html2pug");
const re_tag = /<([^>]+)>/g;
const re_blank = /^\s*[\r\n]+/gm;

const pugOptions = {
    pretty: true,
    doctype: "html5",
};

const htmlOptions = {
    fragment: true,
    doubleQuotes: false,
    tabs: false,
};

const getStdin = async () => await new Promise((resolve, reject) => {//{{{
    let inputString = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
        inputString += chunk;
    });
    process.stdin.on('end', () => resolve(inputString));
});//}}}

function swapQuoting(html) {//{{{

  // Parse all HTML tags:
  html = html.replace(re_tag, function(match) {
    // Extract tag contents:
    var content = match.slice(1, -1);

    // Encode single quotes:
    content = content.replace(/'/g, "&apos;");

    // Switch external quoting from dobule to single quotes.
    content = content.replace(/"/g, "'");

    // Decode encoded double quotes (&quot; -> ")
    content = content.replace(/&quot;/g, '"');

    // Rebuild tag with parsed content:
    return '<' + content + '>';
  });

  return html;
};//}}}

function removeBlanks(pug) {
    return pug.replace(re_blank, "");
};

const toHTML = src => swapQuoting(//{{{
    // Avoid blank lines in pug output.
    pug.render(src, pugOptions)
);//}}}

const toPug = src => removeBlanks(
    html2pug(src, htmlOptions)
);

getStdin().then(async src=>{
    const {default: isHtml} = await import("is-html");
    try {
        console.log(
            isHtml(src) ? toPug(src)
            : toHTML(src)
        );
    } catch (err) {
        console.error("Input does not look like valid HTML neither Pug.");
        console.error(err);
        process.exit(1);
    };
    process.exit(0);
});



