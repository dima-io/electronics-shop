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
        xiaomi: [],
        samsung: [],
        dyson: [],
        baseus: [],
        selectedBrandsByBtnSearch: null,
        fetchBrandById: null
    },

    mutations: {
        loadOrderingData(state) {
            const storedData = JSON.parse(localStorage.getItem('orderingData')) || [];
            state.orderingData = storedData;
        },

        setAllBrands(state, {value, query}) {
            if (query === 'xiaomi') {
                state.xiaomi = value;
            } else if (query === 'samsung') {
                state.samsung = value;
            } else if (query === 'dyson') {
                state.dyson = value;
            } else if (query === 'baseus') {
                state.baseus = value;
            }
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
            state.allCategories = data.flatMap(category => category.products);
        }
    },
    actions: {
        addOrderingStuffs(context, payload) {
                context.commit('addToOrdering', payload);
        },

        fetchCategoriesData(context, { queryParam = null }) {
            console.log('works')
             ApiService.getCategories(queryParam)
                 .then((res) => {
                     console.log('queryParam', queryParam)
                     if (queryParam != null) {
                         console.log('2')
                         const data = res.data[0]?.products;
                         context.commit('setDataForSpecificCategory', {queryParam, value: data});
                     } else {
                         const data = res.data;
                         console.log('1')
                         context.commit('setDataForAllCategories', {value: data});
                     }
                 });
        },
        findBrandsByBtnSearTerm(context, { searchedData }) {
            ApiService.getCategories()
                .then(res => {
                    const data = res.data;
                    const allProducts = data.flatMap(product => product.products);
                    const filteredProducts = allProducts.filter(product =>
                        product.name.toLowerCase().includes(searchedData.toLowerCase())
                    );
                    context.commit('selectedBrandsByBtnSearch', {value: filteredProducts})
                })
        },


        fetchAllBrandsData(context, {query}) {
            return ApiService.getBrands(query)
                .then(res => {
                    const data = res.data[0]?.products;
                    context.commit('setAllBrands', { value: data , query: query});
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
        },

        getDeviceById: (state) => ({ brand, id }) => {
            return state.allCategories.filter(product => product.brand === brand && product.id === +id)
        },

        getXiaomi(state) {
            return state.xiaomi;
        },
        getSamsung(state) {
            return state.samsung;
        },
        getDyson(state) {
            return state.dyson;
        },
        getBaseus(state) {
            return state.baseus;
        },
    }
})

