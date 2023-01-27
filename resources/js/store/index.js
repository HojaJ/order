import {createStore} from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        dialogFormVisible: false,
        orders:{
            loading: false,
            links:[],
            data:[]
        },
        currentOrder: {
            data:{}
        },
        selectedSort: 'created_at',
        sortOptions: [
            {value: 'created_at', name: 'Latest'},
            {value: 'product_name', name: 'Product Name'},
            {value: 'total_price', name: 'Total Price'},
        ]
    },
    getters: {
    },
    mutations: {
        setOrders: (state, orders) => {
            state.orders.data = orders.data;
            state.orders.links = orders.meta.links;
        },
        openCreateModal: (state) => {
            state.dialogFormVisible = true;
        },
        setOrdersLoading: (state, playload) => {
            state.orders.loading = playload;
        },
        setCurrentOrder: (state, order) => {
            state.currentOrder.data = order;
        },
        closeModal: (state) => {
            state.dialogFormVisible = false;
            state.currentOrder.data = {}
        },
        setSelectedSort: (state, selectedSort) => {
            state.selectedSort = selectedSort;
        }
    },
    actions: {
        getOrders({commit, state}, {url=null} = {}){
            commit('setOrdersLoading', true);
            url = url || "/orders";
            return axiosClient.get(url, { params: {sort: state.selectedSort} }).then((res) => {
                commit('setOrdersLoading', false);
                commit('setOrders',res.data)
            })
        },
        saveOrder({commit}, order){
            let response;
            if(order.id){
                response = axiosClient
                    .put(`orders/${order.id}`, order)
                    .then((res) => {
                        return res.data
                    })
            }else{
                response = axiosClient.post('/orders',order).then((res) => {
                    return res.data
                })
            }
            return response;
        },
        deleteOrder({ dispatch }, id) {
            return axiosClient.delete(`/orders/${id}`).then((res) => {
                dispatch('getOrders')
                return res;
            });
        },
    }
})

export default store;
