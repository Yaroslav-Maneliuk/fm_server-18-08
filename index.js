const http = require("http");
const fs = require("fs/promises");
// const fs = require("fs").promises;
const PORT = 3000;
const users = [];

const routerGET = {
  "/": async (req, res) => {
    const data = await fs.readFile("./views/index.html", "utf8");
    return res.end(data);
  },
  "/about.html": async (req, res) => {
    const data = await fs.readFile("./views/about.html", "utf8");
    return res.end(data);
  },
  "/contact.html": async (req, res) => {
    const data = await fs.readFile("./views/contact.html", "utf8");
    return res.end(data);
  },
};

const requestListener = async (req, res) => {
  const { method, url } = req;
  if (method === "GET" && routerGET[url]) {
    return routerGET[url](req, res);
  }
  // if (method === "GET") {
  //   if (url === "/") {
  //     const data = await fs.readFile("./views/index.html", "utf8");
  //     return res.end(data);
  //   }
  //   if (url === "/about.html") {
  //     const data = await fs.readFile("./views/about.html", "utf8");
  //     return res.end(data);
  //   }
  //   if (url === "/contact.html") {
  //     const data = await fs.readFile("./views/contact.html", "utf8");
  //     return res.end(data);
  //   }
  // }
  if (method === "POST") {
    if (url === "/create-user") {
      let jsonString = "";
      req.on("data", (chunk) => {
        jsonString += chunk;
      });
      req.on("end", () => {
        const user = JSON.parse(jsonString);
        user.id = Date.now();
        users.push(user);
        console.log(users);
        res.end(JSON.stringify(user));
      });
      return;
    }
  }
  fs.readFile("./views/404.html", (err, data) => {
    if (err) {
      throw err;
    }
    res.end(data);
  });
};

const server = http.createServer(requestListener);
server.listen(PORT);
