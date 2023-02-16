export const onFinishFunction = async () => {

    try {
        const response = await axiosInstance.post()
        return response;
    } catch (error) {
        console.log('error in onFinishFunction : ', error)
        return error;

    }
};