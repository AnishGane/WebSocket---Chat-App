export const sendResponse = (
    res,
    statusCode,
    data = null,
    message
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
}