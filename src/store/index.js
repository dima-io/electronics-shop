import {createStore} from "vuex";
import ApiService from "@/api-service";


export default createStore({
    state: {
        orderingData: JSON.parse(localStorage.getItem('orderingData')) || [],
        laptops: null,
        smartphones: null,
        powerSupplies: null,
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
        setDataForSpecificCategory(state, {category, value}) {
            if (category === 'laptops') {
                state.laptops = value;
            } else if (category === 'power-supplies') {
                state.powerSupplies = value;
            } else if (category === 'smartphones') {
                state.smartphones = value;
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

        fetchCategoriesData(context, { category = null, queryParam = null }) {
             ApiService.getCategories(queryParam)
                 .then((res) => {
                     if (queryParam !== null && category !== null) {
                         const data = res.data[0]?.products;
                         context.commit('setDataForSpecificCategory', {category, value: data});
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
            return state.powerSupplies
        },
        getSmartphones(state) {
           return state.smartphones
        }
    }
})

