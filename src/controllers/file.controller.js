const FileService = require('../services/file.service');

class FileController {
	constructor(fileService = new FileService()) {
		this.service = fileService;
	}
	async put(req, res) {
		try {
			const name = req.params.name; 
			if (name === undefined) res.end('status: error- filename missing');
			const {data, ...meta} = req.file; 
			await this.service.put(name, data, meta);
			res.json({status: 'ok'});
		} catch (err) {
			res.json({status: 'error'});
		}
	}
  
	async get(req, res) {
		try {
			const name = req.params.name;
			const {stream,  meta} = await this.service.get(name);
			console.log(meta);
			res.setHeader('content-type', meta.mimetype);
			res.setHeader('content-length', meta.size); 
			stream.pipe(res);
		} catch (err) {
			res.json({status: 'error, file not found'});
		}
	}
}

module.exports = FileController;