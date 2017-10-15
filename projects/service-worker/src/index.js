if ('serviceWorker' in navigator) {
    console.log('浏览器支持serviceWorker')

    // 开始注册service workers
    navigator.serviceWorker.register('./service-worker.js', {
        scope: './'
    }).then(registration => {
        console.log('service worker注册成功:', registration)

        let serviceWorker
        if (registration.installing) {
            serviceWorker = registration.installing
            console.log('当前注册状态：installing')
        } else if (registration.waiting) {
            serviceWorker = registration.waiting
            console.log('当前注册状态：waiting')
        } else if (registration.active) {
            serviceWorker = registration.active
            console.log('当前注册状态：active')
        }
        if (serviceWorker) {
            console.log(serviceWorker.state)
            serviceWorker.addEventListener('statechange', e => {
                console.log('&emsp;状态变化为' + e.target.state)
            })
        }
    }).catch(error => {
        console.log('service worker注册失败:', error)
    })
} else {
    console.log('浏览器不支持serviceWorker')
}