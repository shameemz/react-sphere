# react-sphere
[![Maintenance Status][status-image]][status-url] [![NPM version][npm-image]][npm-url]

React Sphere is a boiler plate for building product for multiple platforms (mobile, desktop and VR) with single codebase.
It explains an architecture for building sites and apps for multiple platforms, for geographical regions(internationalization with a capability of changing themes) and flexible for building whitelabel sites/apps.

### Advantages of react-sphere
- `Follow adaptive design` You can implement the adaptive design for each device types like mobile, desktop and VR
- `Multiple sites / apps` Able to build multiple sites and apps like B2B, whitelabel sites / apps and also tragetting geographical regions by country wise. (eg: French, Arabic) by inheriting or overriding the templates of global app / site (.com)

## Idea
Idea inspired from [Leland Richardson](https://github.com/lelandrichardson) talk on [Chain React 2017: React as a Platform](https://www.youtube.com/watch?v=JaRtmgaNZos)

## Getting Started
- [Install react native](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies) If you haven't  installed react native on your machine, follow these steps from [React Native](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies) till Create new Application
- Install react-sphere as Gobal
    ```
    $ npm install -g react-sphere
    ```
- Create your project
    ```
    $ react-sphere init project_name
    ```
    Alternate way:
    ```
    react-native init project_name --template sphere
    cd project_name/
    node scripts/addDevDependencies.js
    ```
- After initializing the project, its all react-native and react. you can use react-native / react commands

## Usage
- Configure the sites in .babelrc file, like below.
    ```json
    {
      "presets": [
        "react-native"
      ],
      "plugins": [
        ["transform-inline-environment-variables"],
        ["variable-path-resolver", {
          "envName": "SITE",
          "vars": {
            "m-fr": {"Device": "Mobile", "Site": "Fr" },
            "m-com": {"Device": "Mobile", "Site": "Com"},
            "d-fr": {"Device": "Desktop", "Site": "Fr" },
            "d-com": {"Device": "Desktop", "Site": "Com"},
            "default": {"Device": null, "Site": "Com"}
          }
        }]
      ]
    }
    ```
- Running a web application (Webpack dev server)
    -  SITE=m-com yarn web // For running your global mobile site
    -  SITE=m-fr yarn web // french mobile site
    -  SITE=d-com yarn web // global desktop site
    -  SITE=d-fr yarn web // french desktop
    - To switch between sites, you may need to clear the compiler cache, for that you can use below command
        ```
        react-sphere switch m-fr web
        ```
- Running react-native app
    - react-native run-ios // For running your global mobile app
    - To change to french app, stop the existing bundling terminal and run below script and reload your app.
        ```
        SITE=m-fr yarn start --reset-cache
        ```
- Produciton build (web sites)
    -  SITE=m-com yarn build
    -  SITE=m-fr yarn build
    -  yarn build:all // this will create builds for your sites mentioned in the .babelrc file
- Production build (mobile apps)
    - SITE=m-fr react-native run-ios --configuration Release
    - Basically prepend SITE={site-name} and follow the steps from [react naitve running-on-device](https://facebook.github.io/react-native/docs/running-on-device.html)

## Major Dependency
- [babel-plugin-variable-path-resolver](https://github.com/shameemz/babel-plugin-variable-path-resolver) React sphere is implemented with this babel plugin

## Similar Projects
- [re-start](https://github.com/react-everywhere/re-start)
- [react-xp](https://microsoft.github.io/reactxp/)

### IDE
VScode users can start the project as 
```
SITE=m-fr code project_name  
```
[Create VScode Alias](https://code.visualstudio.com/docs/editor/command-line)

[status-image]: https://img.shields.io/badge/status-maintained-brightgreen.svg
[status-url]: https://github.com/shameemz/react-sphere

[npm-image]: https://img.shields.io/npm/v/react-sphere.svg
[npm-url]: https://www.npmjs.com/package/react-sphere