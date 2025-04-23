const adminAuth = (req, res, next) => {
    const token = "abcdefghijk";
    const isAdminAuthorized = token === token;

    if(!isAdminAuthorized){
        res.status(401).send("Unathorized Request");
    } else{
        next()
    }
}

module.exports = {adminAuth}