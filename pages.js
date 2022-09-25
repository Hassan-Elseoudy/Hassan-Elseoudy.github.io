const ghpages = require("gh-pages");
const pathname = `${__dirname}/build`;
const repoURL = "git@github.com:Hassan-Elseoudy/Hassan-Elseoudy.github.io.git";

ghpages.publish(
  pathname,
  {
    branch: "gh-pages",
    repo: repoURL,
  },
  (err) => {
    if (err) console.log("ERROR: ", err);
    else console.log("PUBLISHED");
  }
);
