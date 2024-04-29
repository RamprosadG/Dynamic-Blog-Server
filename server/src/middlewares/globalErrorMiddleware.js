
const GlobalError = (
    err,
    req,
    res,
    next
) => {
    console.log(
        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>global start>>>>>>>>>>>>>>>>>>>>>>>>>>>\n",
        err,
        "\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>global end>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );

    let error = {
        name: err?.name,
        message: err?.message,
        statusCode: 400,
        path: { path: err?.message, message: "" },
    };

   
    res.status(error.statusCode).send(error);
};
module.exports =  GlobalError;