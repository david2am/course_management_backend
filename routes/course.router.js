const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
        console.log(req.query)
	} catch (e) {
		console.error(e)
	}
	
});

module.exports = router;
