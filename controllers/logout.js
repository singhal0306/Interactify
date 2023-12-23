exports.logout = (req,res)=>{
    res.cookie('jwt', "logout", {
        expires: new Date(Date.now() + 2*1000),
        httpOnly: true
    })
    res.status(200).redirect('/')
}