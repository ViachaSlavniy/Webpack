function createAnalytics() {
    const listener = () => {
        counter++
    }
    let counter = 0
    let isDestroed = false
    document.addEventListener('click', listener)

    return {
        destroy() {
            document.removeEventListener('click', listener)
            isDestroed = true
        },
        getClicks() {
            if (isDestroed) {
                return 'Analytics is destroyed'
            }
            return counter
        }
    }
}

window.analytics = createAnalytics()