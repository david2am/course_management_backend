const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
        console.log(req.query)
	} catch (e) {
		console.error(e)
	}
});

router.post('/', async (req, res) => {
	try {
		console.log(req.body)
	} catch (e) {
		console.error(e)
	}	
});

router.get('/:id', async (req, res) => {
	try {
		console.log(req.params.id)
	} catch (e) {
		console.error(e)
	}	
});

router.put('/:id', async (req, res) => {
	try {
		console.log(req.params.id, req.body)
	} catch (e) {
		console.error(e)
	}	
});

router.delete('/:id', async (req, res) => {
	try {
		console.log(req.params.id)
	} catch (e) {
		console.error(e)
	}	
});

module.exports = router;
