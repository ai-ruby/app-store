import axios from 'axios'
import qs from 'qs';

export default async (url = '', data = {}, type = 'GET') => {
    type = type.toUpperCase()
    let response
    if (type === 'GET') {
        try {
            response = await axios.get(url, { params: data })
        } catch (error) {
            throw new Error(error)
        }
    } else {
        try {
            response = await axios.post(url, qs.stringify(data))
        } catch (error) {
            throw new Error(error)
        }
    }

    return new Promise((resolve, reject) => {
        if (response.status === 200) {
            resolve(response.data)
        } else {
            reject(response.data)
        }
    })
}
