//the parameters to wrapper will be req, res (and next by defualt) and additional anonymous function
// so req, res, next can be used in wrapper to call the function

const asyncWrapper = (func) => {
    return async (req, res, next) => {
        try{
            await func(req, res, next);
        }catch(error){
            next(error);
        }
    }
}

module.exports  = asyncWrapper;