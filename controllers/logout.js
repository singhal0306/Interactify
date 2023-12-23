exports.logout = (req,res)=>{
    try{
        // res.cookie('jwt', "logout", {
        //     expires: new Date(Date.now() + 2*1000),
        //     httpOnly: true
        // })
        res.clearCookie('jwt')
        res.status(200).redirect('/')    
    }catch(err){
        console.log(err);
    }
}