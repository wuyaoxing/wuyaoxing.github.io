---
title: react中使用import()异步加载组件的实现
date: 2018-05-10 17:52:31
tags:
    - import()
    - react
---

## 简介

当下，按需加载，已是主流优化方案。webpack为我们提供了很好的方案。

- require.ensure()
- import()

**require.ensure()**

```js
function enter() {
    return new Promise(resolve => {
        require.ensure([ ], () => {
            const AppLauncher = require('./AppLauncher')
            resolve(AppLauncher.launchApp())
        }, 'app')
    })
}

async function app() {
    await enter()
}
```

**import()**

```js
function enter() {
    return import(/* webpackChunkName: "app" */ './AppLauncher').then(
        module => {
            const AppLauncher = module
            return AppLauncher.launchApp()
        }
    )
}

async function app() {
    await enter()
}
```

require.ensure() 是webpack 特定的，import() 是符合 ECMAScript 提案的语法。故优先使用 import()。

## 在react中使用 import()

- 方案一([例子](https://github.com/wuyaoxing/taskworld/blob/5805b9eb78e6f930f2bf63f613a7655c97fdf542/src/react/lazyRouteRenderer.js))

```js
// lazyRouteRenderer.js
import React from 'react'

const asyncComponent = loadComponent =>
    class AsyncComponent extends React.Component {
        state = {
            Component: null
        }

        componentWillMount() {
            if (this.hasLoadedComponent()) return

            loadComponent()
                .then(module => module.default)
                .then(Component => {
                    this.setState({ Component })
                })
                .catch(err => {
                    console.error(`Cannot load component in <AsyncComponent />`)
                    throw err
                })
        }

        hasLoadedComponent() {
            return this.state.Component !== null
        }

        render() {
            const { Component } = this.state
            return Component ? <Component {...this.props} /> : null
        }
    }

export default asyncComponent
```
- 方案二([例子](https://github.com/wuyaoxing/taskworld/blob/master/src/react/lazyRouteRenderer.js))

```js
// lazyRouteRenderer.js
import React from 'react'

import { Subject } from 'rxjs'

import LoadingScreen from 'components/LoadingScreen.react'

export default function createRenderer(loadModule) {
    const finish = new Subject()
    let requested = false
    let component

    function request() {
        if (requested) return
        requested = true
        loadModule().then(loadedModule => {
            setTimeout(() => {
                component = loadedModule.default || loadedModule
                finish.next(true)
            }, 500)
        }).catch(err => {
            console.error(`Cannot load Module in lazyRouteRenderer`)
            throw err
        })
    }

    return class LazyRouteRenderer extends React.Component {
        constructor(props) {
            super(props)
            request()
            if (!component) {
                this.subscription = finish.subscribe(() => {
                    this.forceUpdate()
                })
            }
        }
        componentWillUnmount() {
            if (this.subscription) this.subscription.unsubscribe()
        }
        render() {
            const Component = component || LoadingScreen
            return <Component {...this.props} />
        }
    }
}
```

- 使用

```js
// renderRoute.js
import lazyRouteRenderer from './lazyRouteRenderer'

const renderers = {
    projects: asyncComponent(() =>
        import(/* webpackChunkName: "projects-page" */ './components/ProjectsPage.react')
    ),
    test: asyncComponent(() =>
        import(/* webpackChunkName: "test-page" */ './TestPage')
    )
}

function asyncComponent(asyncComponent, props = {}) {
    const Component = lazyRouteRenderer(asyncComponent)
    return component(Component, props)
}

function component(Component, props) {
    return options => <Component {...options} {...props} />
}

export default function renderRoute({ name, options }) {
    const renderer = renderers[name]
    if (!renderer)
        throw new Error('Unable to find a route renderer for: ' + name)
    return renderer(options)
}

```

```js
// App.react.js
import renderRoute from './renderRoute'
import LoadingScreen from 'components/LoadingScreen.react'

export default class App extends React.PureComponent {
    static propTypes = {
        route: PropTypes.object
    }
    
    renderContent = () => {
        return this.props.route ? (
            renderRoute(this.props.route)
        ) : (
            <LoadingScreen />
        )
    }

    render() {
        return (
            <section className="app">
                {this.renderContent()}
            </section>
        )
    }
}

```

至此，已实现异步按需动态加载react组件。完整例子可查看此[项目](https://github.com/wuyaoxing/taskworld)。
