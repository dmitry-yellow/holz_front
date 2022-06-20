import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST_API_URL}`,
    headers: {
        'Content-Type': 'application/json',
    }
});
const instance2 = axios.create({
    baseURL: 'http://dindon.bi',
    headers: {
        'Content-Type': 'application/json',
    }
});


export const hotTubAPI = {
    getCalcData: () => instance.get('/~api/json/catalog.mf/getCalcData'),
    getExternalCalcData: (typeId) => instance.get(`/~api/json/catalog.mf/getCalcData/id/${typeId}`),
    getRootData: (typeId) => instance.get(`/~api/json/catalog.mf/getRootData/id/${typeId}`),
    getCartData: (data) =>  instance.post('/~api/json/catalog.mf/getCartData', JSON.stringify(data)),
    generatePdfLink: (data) => {
        const instance = axios.create({
            baseURL: `${process.env.REACT_APP_HOST_API_URL}:3000`,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return instance.post('/download', JSON.stringify(data))
    },
    addToCartFull: (data) => instance2.post('/~api/json/ishop/addToCartFull', JSON.stringify(data)),
    getCartItems: () => instance2.get('/~api/json/ishop/getCartItems'),
};