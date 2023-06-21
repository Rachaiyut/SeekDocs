exports.allAccess = (req, res) => {
    try{
        res.status(200).send("Public Content.");
    }
    catch(err){
        res.status(404).send({
			message: err.message
		});
    }
};
  
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
  
exports.adminBoard = (req, res) => { 
    res.status(200).send("Admin Content.");
};
  