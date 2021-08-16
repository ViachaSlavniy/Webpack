import * as $ from 'jquery'

function createAnalytics() {
    const listener = () => {
        counter++
    }
    let counter: number = 0
    let isDestroyed: boolean = false
    $(document).on('click', listener)

    return {
        destroy() {
            $(document).off('click', listener)
            isDestroyed = true
        },
        getClicks(): number | string {
            if (isDestroyed) {
                return 'Analytics is destroyed'
            }
            return counter
        }
    }
}

window['analytics'] = createAnalytics()