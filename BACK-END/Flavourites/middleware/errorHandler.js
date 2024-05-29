// Custom error handling middleware.
// By default when error caught displays in html format
// We are using custom error

const errorHandler = (error, req, res, next) => {

    const statusCode = req.statusCode ? req.statusCode : 500;

    switch (statusCode) {
        
        case 400:
            res.json({title:"Validation Error", message: error.message});
            break;
        
        case 401:
            res.json({title:"Unauthorized", message: error.message});
            break;
        
        case 403:
            res.json({title:"Forbidden", message: error.message});
            break;
        
        case 404:
            res.json({title:"Not Found", message: error.message});
            break;
        case 500:
            res.json({title:"Server Error", message: error.message});
            break;
    
        default:
            console.log("No errors all good");
            break;
    }
};

module.exports = errorHandler;
