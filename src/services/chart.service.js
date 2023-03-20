import axiosInstance from "../helpers/axiosInstance";
import { serverEndpoint } from '../utilities/serverEndpoint'

export const getDataChartByDate = async (date) => {
    try {
        console.log("date in service:",date);
        const response = await axiosInstance.get(serverEndpoint + `api/v1/data/chart?date=${date}`)
        return response
    } catch (error) {
        console.log('error in get chart service: ', error);
        return error;
    }
}