import axios from "axios";

const instance = axios.create({
  baseURL: `${ process.env.REACT_APP_HOST_API_URL }`,
  headers: {
    'Content-Type': 'application/json',
  }
});


export const hotTubAPI = {
  getCalcData: () => instance.get('/~api/json/catalog.mf/getCalcData'),
  getRootData: () => instance.get('/~api/json/catalog.mf/getRootData'),
  generatePdfLink: (data) => {
    const instance = axios.create({
      baseURL: `http://35.158.251.132:3000`,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return instance.post('/download', JSON.stringify(data))
  }

};