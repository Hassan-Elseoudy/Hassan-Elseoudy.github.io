const ghpages = require("gh-pages");
const pathname = `${__dirname}/build`;
const repoURL = "https://github.com/Hassan-Elseoudy/Hassan-Elseoudy.github.io";

ghpages.publish(
  pathname,
  {
    branch: "base",
    repo: repoURL,
  },
  (err) => {
    if (err) console.log("ERROR: ", err);
    else console.log("PUBLISHED");
  }
);
