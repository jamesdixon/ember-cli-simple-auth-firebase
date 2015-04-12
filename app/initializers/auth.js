import FirebaseAuthenticator from '../authenticators/firebase';

export default {
	name: 'firebase-auth',
	before: 'simple-auth',
	initialize: function(container, app) {
		container.register('authenticator:firebase', FirebaseAuthenticator);
	}
}