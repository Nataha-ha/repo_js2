const state = {
    data: {},
    itemsOnPage: [],
    itemsInCart: [],
};


const getters = {
    getData: state => state.data,
    getItemsOnPage: state => state.itemsOnPage,
    getItemsInCart: state => state.itemsInCart,

};

const actions = {
    requestData({
        commit
    }, page) {
        if (!page) {
            return
        }

        fetch(`/database/page${page}.json`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                commit('setData', data);
            })

    },
    addInCart({
        state,
        commit
    }, id) {
        commit('addIncart', id);
    },

};

const mutations = {
    setData(state, newData) {
        state.data = newData;
        state.itemsOnPage = Object.keys(newData).slice(2);
    },
    addIncart(state, id) {
        state.itemsInCart.push(id);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};