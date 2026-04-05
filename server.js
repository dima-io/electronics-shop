import db from '../db.json';

export default {

    getBrands(queryParam = '') {
        let brands = db.brands;
        if (queryParam) {
            brands = brands.filter(b =>
                b.name.toLowerCase().includes(queryParam.toLowerCase())
            );
        }
        return Promise.resolve({ data: brands });
    },

    getCategories(queryParam) {
        let categories = db.categories;
        if (queryParam) {
            categories = categories.filter(c =>
                c.name.toLowerCase().includes(queryParam.toLowerCase())
            );
        }
        return Promise.resolve({ data: categories });
    }
}