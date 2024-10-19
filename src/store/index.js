import {createStore} from "vuex";
import ApiService from "@/api-service";


export default createStore({
    state: {
        orderingData: JSON.parse(localStorage.getItem('orderingData')) || [],
        laptops: null,
        smartphones: null,
        powerSupplies: null,
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
        }
    },
    actions: {
        addOrderingStuffs(context, payload) {
                context.commit('addToOrdering', payload);
        },

        fetchCategoriesData(context, { category, queryParam }) {
             ApiService.getCategories(queryParam)
                 .then((res) => {
                     const data = res.data[0]?.products;
                     context.commit('setDataForSpecificCategory', {category, value: data});
                 });
        }
    },
    getters: {
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

