import {createStore} from "vuex";
import ApiService from "@/api-service";


export default createStore({
    state: {
        orderingData: JSON.parse(localStorage.getItem('orderingData')) || [],
        laptops: null,
        smartphones: null,
        powerSupplies: null,
        televisions: null,
        allCategories: []
    },

    mutations: {
        loadOrderingData(state) {
            const storedData = JSON.parse(localStorage.getItem('orderingData')) || [];
            state.orderingData = storedData;
        },

        addToOrdering(state, payload) {

            state.orderingData.push(payload.value);

            let storedData = JSON.parse(localStorage.getItem('orderingData')) || [];
            storedData.push(payload.value);

            localStorage.setItem('orderingData', JSON.stringify(storedData));
        },
        setDataForSpecificCategory(state, {queryParam, value}) {
            if (queryParam === 'laptops') {
                state.laptops = value;
            } else if (queryParam === 'power-supplies') {
                state.powerSupplies = value;
            } else if (queryParam === 'smartphones') {
                state.smartphones = value;
            } else if (queryParam === 'televisions') {
                state.televisions = value;
            }

        },

        setDataForAllCategories(state, value) {
            const data = value.value;
            data.forEach((category) => {
                state.allCategories.push(...category.products);
            });
        }
    },
    actions: {
        addOrderingStuffs(context, payload) {
                context.commit('addToOrdering', payload);
        },

        fetchCategoriesData(context, { queryParam = null }) {
             ApiService.getCategories(queryParam)
                 .then((res) => {
                     if (queryParam != null) {
                         const data = res.data[0]?.products;
                         context.commit('setDataForSpecificCategory', {queryParam, value: data});
                     } else {
                         const data = res.data;
                         context.commit('setDataForAllCategories', {value: data});
                     }
                 });
        }
    },
    getters: {
        getAllCategories(state) {
            return state.allCategories;
        },
        getOrderingData(state) {
            return state.orderingData;
        },
        orderingDataLength(state, getters) {
            return getters.getOrderingData.length;
        },

        getLaptops(state) {
            return state.laptops
        },
        getPowerSupplies(state) {
            console.log('state', state)
            return state.powerSupplies
        },
        getSmartphones(state) {
           return state.smartphones
        },
        getTelevision(state) {
            console.log('state', state)
            return state.televisions
        },
    }
})

