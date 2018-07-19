Profile Task
==============

MSL Frontend Development Task.

Developer: Marc San Buenaventura

Date: 16th July 2018


### About the template
There are no browser support requirements, therefore I will only focus on modern web technologies.

* Images: using Lazy Load with no JS fallback

* Icons: inline SVG to reduce server requests

Before you start you will need NodeJS + Node Packages, GruntJS and SASS.


### First, install node.js

Grunt needs [node](https://nodejs.org/en/) to work. If you don't have it yet, [download the current version](https://nodejs.org/en/download/current/) (not the LTS) and install it. 
Node comes with [npm](https://www.npmjs.com/), the node package manager, which you will use to install packages.


### Install Grunt

Open up a terminal window and type in the command below

```
sudo npm install -g grunt-cli
```

The “-g” in the command above will install grunt globally, so we can use it everywhere. 
Sudo will run the command as an administrator. You can skip the “sudo” part if you are using a windows machine.


### Install SASS

You will need [SASS](https://sass-lang.com/) to write the CSS.

In terminal window type in the command below

```
sudo npm install -g sass
```

The “-g” in the command above will install grunt globally, so we can use it everywhere. 
Sudo will run the command as an administrator. You can skip the “sudo” part if you are using a windows machine.


### Install Packages

Now you will need to get all node packages.
Open the folder in your terminal window and type in the command below

```
npm install
```


### Package Overview

**Most Used Plugins**

* grunt-html-build: For the HTML template.

* grunt-contrib-clean: Clean files and folders from the project.

* grunt-contrib-connect: Start a connect web server.

* grunt-contrib-watch: Watch for file changes & Reload assets live in the browser.

* grunt-contrib-copy: Copy files into a different folder.

* grunt-text-replace: Remove strings for production.


**For CSS Compilation**

* grunt-contrib-sass: Compile Sass to CSS.


**For Minify**

* grunt-contrib-cssmin: Minify CSS.

* grunt-contrib-htmlmin: Minify HTML.

* grunt-contrib-uglify: Minify files with UglifyJS.


### Run Grunt

Open the folder in your terminal window and type in the command below

```
grunt dev
```

Open the URL http://localhost:8000/ in your browser

Tyope the command _grunt prod_ if you want the minified version.