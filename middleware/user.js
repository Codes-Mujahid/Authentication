


export const user= (req, res, next) => {
  res.locals.user = req.user; 
  next();
};