export function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '980835849033-gq676076kajkisre8o1tm00v05615p50.apps.googleusercontent.com',
                'redirect_uri': 'https://tenny-expense-tracker.vercel.app',
                'response_type': 'token',
                'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/calendar.readonly',
                'include_granted_scopes': 'true',
                'state': 'pass-through value'};

    fetch(`${oauth2Endpoint}?${new URLSearchParams(params)}`, {
        method: 'GET'
    }).then(response => {
       console.log(response.url);
    } ).catch(error => {
        console.error('Error during OAuth 2.0 sign-in:', error);
    }
    );
}