
const utils = (function(){

	const makeApiCall = function(method, url, body, headers){
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			Object.keys(headers).forEach(function(headerKey){
				xhr.setRequestHeader(headerKey, headers[headerKey])
			});
			xhr.onload = function(res){
				const headers = xhr.getAllResponseHeaders();
				const headersArray = headers.trim().split(/[\r\n]+/);
				const headerMap = {};
				headersArray.forEach(function (line) {
				  const parts = line.split(': ');
				  const header = parts.shift();
				  const value = parts.join(': ');
				  headerMap[header] = value;
				});
				if(headerMap['content-type'] === 'application/json'){
					resolve(JSON.parse(res.target.response));
				}
				else{
					resolve(res.target.response);
				}
			}

			xhr.onerror = function(err){
				reject(err);
			}
			xhr.send(body);
		});
	}

	const loadNasaImage = function(date){
		let url = `https://api.nasa.gov/planetary/apod?api_key=8tKXFJvk4bzxmNizdRyj62p8ouqTEIo4LCoJO7FP&date=${date}`;
		return makeApiCall('GET', url, null, {'Cache-Control': 'max-age=3600'});
	};

	return {
		makeApiCall,
		loadNasaImage
	};
})();

export default utils;