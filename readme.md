[![install size](https://packagephobia.com/badge?p=conative-nodejs)](https://packagephobia.com/result?p=conative-nodejs)

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 8 ✔ |


# NOTE
> This NPM Module is based on <u><b>express-generator.</b></u><br>
> It will use <u><b>express, ejs, mysql.</b></u> and using <u><b>MVC Pattern.</b></u>

It is an npm module that I made for my convenience, and if you find a bug while using it because you are interested, I would appreciate it if you let me know. :)

Git : https://github.com/Positive-Conative/conative-nodejs 
<br>
Npm : https://www.npmjs.com/package/conative-nodejs

<br>

# Install
* <b>npm i -g conative-nodejs</b><br>

<br>

# Using
* <b>conative-nodejs [ Options ] -n [ Path/Dirname ]</b><br>
    * ex) conative-nodejs -n dirname<br>
    * ex) conative-nodejs -s -n /your/path/dirname<br>
* <b>cd [ Path/Dirname ]</b><br>
* <b>npm start</b><br>

<br>

# Options
* -n, --n &lt;path/directory name&gt; : Required fields
* -s, --strict : Use strict Mode.
* -v, -ver : Check version.

<br>

# Directory Tree
> conative-nodejs -n helloworld
```
helloworld
├── package.json
└── src
    ├── app.js
    ├── bin
    │   └── www
    ├── config
    │   └── dbConnection.js
    ├── controllers
    │   └── indexController.js
    ├── models
    │   └── testDAO.js
    ├── routers
    │   ├── index.js
    │   └── test.js
    ├── services
    │   └── indexService.js
    └── views
        ├── error.ejs
        └── index.ejs
```
<br>

# Code Flow
> Router → Controller → Service → Model

* /router/index.js
* /controllers/indexController.js
* /services/indexService.js
* /models/testDAO.js