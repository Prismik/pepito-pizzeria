module.exports = {
    getObjectFromId: function getObjectFromId(jsons, key) {
    	if (key == null || key == undefined)
    		return null;

	    for (var i = 0; i != jsons.length; ++i) {
	        if (jsons[i]._id.toString() == key.toString()) {
	            return jsons[i];
	        }
	    }

	    return null;
	}
}