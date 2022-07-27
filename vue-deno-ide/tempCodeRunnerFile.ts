server.use(async (ctx: any, next: any) => {
  const filePath = ctx.request.url.pathname;
  if (filePath.includes("/https://github.com/")) {
    const repo = filePath.slice(19, filePath.length);
    console.log(filePath, filePath.replace(/[^/]/g, "").length)
    await fetch(`https://api.github.com/repos${repo}/commits`).then(data => data.json()).then((response => {console.log(response[0].commit)}))
    console.log()
    const output = await renderFile(`${cwd()}/public/index.html`, {});
    ctx.response.body = output;
    ctx.response.type = "text/html";
  } else if (filePath === "/") {
    await send(ctx, ctx.request.url.pathname, {
      root: join(Deno.cwd(), "public"),
      index: "index.html",
    });   
  } else if (filePath === "/build.js") {
    ctx.response.type = "application/javascript";
    await send(ctx, filePath, {
      root: join(Deno.cwd(), "vno-build"),
      index: "build.js",
    });
  } else if (filePath === "/style.css") {
    ctx.response.type = "text/css";
    await send(ctx, filePath, {
      root: join(Deno.cwd(), "vno-build"),
      index: "style.css",
    });
  } else await next();
});
