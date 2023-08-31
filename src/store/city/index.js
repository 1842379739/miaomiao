const state = {
    // 有新的信息就渲染新的信息，没有就默认信息【北京，110100】
    name: window.localStorage.getItem('nowName') || '北京',
    id: window.localStorage.getItem('nowId') || 110100
}

const actions = {

}

const mutations = {
    CITY_INFO(state, payload) {
        state.name = payload.name
        state.id = payload.id
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}