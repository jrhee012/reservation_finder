module.exports = server => {
    server.get('/', (req, res) => {
        console.log(req.body);
        return res.render('pages/home');
    })
};
