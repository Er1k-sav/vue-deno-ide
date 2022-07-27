// deno-lint-ignore-file
const { cwd } = Deno;
import { Router } from "../deps.ts";
import { renderFile } from "https://deno.land/x/dejs@0.10.3/mod.ts";
const rep = new Router();
const localarray: any = [];
let data = {tree: localarray};
const github = "/https:yo//github.com";
let repo = "";
for(let i = 0; i < localStorage.length; i++) {
  localarray.push({path: localStorage.key(i)})
} 
console.log(localStorage)
rep.get("/", async (ctx: any) => {
  const output = await renderFile(`${cwd()}/public/index.html`, {});
  ctx.response.body = output;
  ctx.response.type = "text/html";
});

rep.get("/build.js", async (ctx: any) => {
  const output = await renderFile(`${cwd()}/vno-build/build.js`, {files: data, content: ""});
  ctx.response.body = output;
  ctx.response.type = "application/javascript";
});

rep.get("/codeHighlight.js", async (ctx: any) => {
  const output = await renderFile(`${cwd()}/vno-build/codeHighlight.js`, {files: data, content: ""});
  ctx.response.body = output;
  ctx.response.type = "application/javascript";
});

rep.get("/suggestions.js", async (ctx: any) => {
  const output = await renderFile(`${cwd()}/vno-build/suggestions.js`, {files: data, content: ""});
  ctx.response.body = output;
  ctx.response.type = "application/javascript";
});

rep.get("/openfolder/:file", async (ctx: any) => {
  let items = localStorage.getItem(`${ctx.params.file}`);
  let set = `${items}`;
  ctx.response.body = set;
}) 

rep.get("/getfiles", async (ctx: any) => {
  ctx.response.body = data;
})

rep.get("/create-file/:file", (ctx: any) => {
  const url = ctx.request.url.pathname;

  const previousContent = `${localStorage.getItem(url.slice(13, url.length).split("-").slice(0, -1).join("/"))}`;
  console.log(previousContent)
  const getDeepFolder = url.slice(13, url.length).split("-").slice(0, -1).join("/");
 
  if (url.slice(13, url.length).split("-").length > 2) {

    localStorage.removeItem(`${getDeepFolder}`)
    localStorage.setItem(`${getDeepFolder}`, `${previousContent + url.slice(13, url.length).split("-").slice(0, -1).join("")}`)
  } else {

    localStorage.removeItem(`${getDeepFolder}`)
    localStorage.setItem(`${getDeepFolder}`, `${url.slice(13, url.length).split("-").slice(1).join("")}`)
  }
  localStorage.setItem(`${url.slice(13, url.length)}`, "");
});

rep.get("/create-folder/:file", (ctx: any) => {
  const url = ctx.request.url.pathname;
  localStorage.setItem(`${url.slice(15, url.length)}`, "");
});

rep.get(`${github}/:user/:repo`, async (ctx: any) => {
  let sha = "";
  try {
    repo = ctx.request.url.pathname.slice(19, ctx.request.url.pathname.length);
    await fetch(`https://api.github.com/repos${repo}/commits`).then(data => data.json()).then((response => {sha = JSON.stringify(response[0].commit.tree.sha)}));
    await fetch(`https://api.github.com/repos${repo}/git/trees/${sha.slice(1, sha.length - 1)}`).then(data => data.json()).then(response => data = response);
    const output = await renderFile(`${cwd()}/public/index.html`, {files: data, content: ""});
    ctx.response.body = output;
    ctx.response.type = "text/html";
  } catch (e) {
    console.log(e);
  }
});

rep.get(`/:path`, async (ctx) => {
  let base64 = "";
  try {
    await fetch(`https://api.github.com/repos${repo}/contents/${ctx.params.path}`).then(data => data.json()).then(response => base64 = response.content);
    ctx.response.body = {filetext: atob(base64)};
  } catch (e) {
    ctx.response.body = {filetext: localStorage.getItem(ctx.params.path)};
  }
});

rep.get("/save-file/:name/:content", (ctx) => {
  const name = ctx.params.name;
  const content = atob(ctx.params.content);
  localStorage.removeItem(name);
  localStorage.setItem(name, content);
});

export default rep;