
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};
//Initialize middleware
app.use(logger);

module.exports=logger;