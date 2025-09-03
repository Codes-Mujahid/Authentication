import flash from 'connect-flash';

export const flashMsg= (req, res,  next)=> {
    res.locals.successMsg= req.flash('success')
    res.locals.errorMsg= req.flash('error')
    next()
}