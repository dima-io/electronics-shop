import {createStore} from "vuex";
import ApiService from "@/api-service";


export default createStore({
    state: {
        orderingData: JSON.parse(localStorage.getItem('orderingData')) || [],
        laptops: null,
        smartphones: null,
        powerSupplies: null,
        televisions: null,
        allCategories: [],
        allBrands: [],
        selectedBrandsByBtnSearch: null
    },

    mutations: {
        loadOrderingData(state) {
            const storedData = JSON.parse(localStorage.getItem('orderingData')) || [];
            state.orderingData = storedData;
        },

        setAllBrands(state, payload) {
            state.allBrands = payload.value;
        },

        selectedBrandsByBtnSearch(state, payload) {
            state.selectedBrandsByBtnSearch = payload.value;
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
        },
        findBrandsByBtnSearTerm(context, { searchedData }) {
            console.log('works')
            context.dispatch('fetchAllBrandsData')
                .then(res => {
                    const data = res.data;
                    const allProducts = data.flatMap(product => product.products);
                    const filteredProducts = allProducts.filter(product =>
                        product.name.toLowerCase().includes(searchedData.toLowerCase())
                    );

                    context.commit('selectedBrandsByBtnSearch', {value: filteredProducts})
                })
        },

        fetchAllBrandsData(context) {
            return ApiService.getBrands()  // Повертаємо проміс
                .then(res => {
                    context.commit('setAllBrands', { value: res });
                    return res;
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
        },
        getTelevision(state) {
            return state.televisions
        },

        getAllBrandsData(state) {
            return state.allBrands
        },

        getSelectedBrandsBySearchBtn(state) {
            return state.selectedBrandsByBtnSearch
        }
    }
})

