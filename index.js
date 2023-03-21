'use strict';

var libQ = require('kew');
var fetch = require('node-fetch');
var fs=require('fs-extra');
var config = new (require('v-conf'))();
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;

//const radio_station = "https://www.radio-en-ligne.fr/nrj"

module.exports = ControllerExamplePlugin;
function ControllerExamplePlugin(context) {
	var self = this;
	this.context = context;
	this.commandRouter = this.context.coreCommand;
	this.logger = this.context.logger;
	this.configManager = this.context.configManager;
}

ControllerExamplePlugin.prototype.onVolumioStart = function()
{
	var self = this;
	var configFile=this.commandRouter.pluginManager.getConfigurationFile(this.context,'config.json');
	this.config = new (require('v-conf'))();
	this.config.loadFile(configFile);

    return libQ.resolve();
}

ControllerExamplePlugin.prototype.onStart = function() {
	var self = this;
    	var defer = libQ.defer();
    
    	fetch('http://localhost:3000/api/v1/replaceAndPlay', {
  		method: 'POST',
 		headers: {
    			'Content-Type': 'application/x-www-form-urlencoded'
  		},
  		body: 'service=webradio&type=webradio&title=Nova%20La%20Nuit&uri=http://nova-ln.ice.infomaniak.ch/nova-ln-128&albumart=https://www.nova.fr/sites/default/files/2020-06/Nova%20la%20Nuit_1.jpg'
		})
    	.then(function(response) {
        	defer.resolve(response);
    	})
    	.catch(function(error) {
        	defer.reject(error);
   	});
   	return defer.promise;
};

ControllerExamplePlugin.prototype.onStop = function() {
    var self = this;
    var defer=libQ.defer();
    defer.resolve();
    return libQ.resolve();
};

ControllerExamplePlugin.prototype.onRestart = function() {
    var self = this;
    // Optional, use if you need it
};

