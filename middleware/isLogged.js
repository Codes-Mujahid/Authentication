

export const isLogged= (req, res, next)=> {
    if(req.isAuthenticated()) {
        return res.redirect('/profile')
    };

    next()
}