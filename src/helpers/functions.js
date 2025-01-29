export const handleFormErrors = (error, object = true) => {
    switch(error.response.status) {
        case 422:
            if (object)
                return error.response.data.errors[0];

            let errorGutter = [];
            let errorData = error.response.data.errors[0];
            for(let key in errorData)
                errorGutter.push(errorData[key][0]);
            return errorGutter;
        default:
            return {message: error.response.data.message};
    }
}

export const errorResponse = (error) => {
    switch(error.response.status) {
        case 422:
            return error.response.data.errors;
        default:
            return {message: error.response.data.message};
    }
}

export const errorResponseTwo = (error) => {
    switch(error.response.status) {
        case 422:
            let errorGutter = [];
            let errorData = error.response.data.errors[0];
            for(let key in errorData)
                errorGutter.push(errorData[key][0]);
            return errorGutter;
        default:
            return {message: error.response.data.message};
    }
}
