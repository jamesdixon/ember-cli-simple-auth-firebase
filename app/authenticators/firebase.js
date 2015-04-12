import Base from 'simple-auth/authenticators/base';
import Firebase from 'firebase';
import config from '../config/environment';

export default Base.extend({

	init: function() {
		if(config.firebase) {
			this.set('firebase', new Firebase(config.firebase));
		} else {
			throw new Error(new Error("'firebase' not defined in environment"));
		}

		this._super();
	},
	firebase: null,
    restore: function(data) {

    	return new Promise(function(resolve, reject) {

            if (data.token) {

        		this.get('firebase').authWithCustomToken(data.token, function(error, success) {
        			Ember.run(function() {
	            		if(error) {
	            			reject(error);
	            		} else {
	            			resolve(success);
	            		}
	            	});
            	});

            } else {
            	reject(new Error('Unable to restore Firebase session: no token found.'));
            }
        	
        }.bind(this));

    },
    authenticate: function(options) {

        return new Promise(function(resolve, reject) {
        	
	        this.get('firebase').authWithPassword({
	            'email': options.email,
	            'password': options.password
	        }, function(error, authData) {
	            Ember.run(function() {
	                if (error) {
	                    reject(error);
	                } else {
	                    resolve(authData);
	                }
	            });

	        });
        }.bind(this));
    },
    invalidate: function(data) {
   		return new Promise(function(resolve, reject) {
            this.get('firebase').unauth();
    		resolve(data);
	    }.bind(this));
    }
});