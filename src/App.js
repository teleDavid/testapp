import logo from './logo.svg';
import './App.css';


//import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
//import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";


var AWS = require('aws-sdk/dist/aws-sdk-react-native');
AWS.config.region = 'eu-west-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:2c838664-16cc-4a7a-80e3-2762d49801f5',
});

var params = {
  Destination: { /* required */
    CcAddresses: [
      /* more items */
    ],
    ToAddresses: [
      'david@telecomstack.com',
      /* more items */
    ]
  },
  Message: { /* required */
    Body: { /* required */
      Html: {
       Charset: "UTF-8",
       Data: "Test Email"
      },
      Text: {
       Charset: "UTF-8",
       Data: "This is an email from amplify"
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: 'Test email'
     }
    },
  Source: 'daneill@telecomstack.com', /* required */
  ReplyToAddresses: [
     'david@telecomstack.com',
    /* more items */
  ],
};


function App() {

  AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
  var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  sendPromise.then(
    function(data) {
      console.log(data.MessageId);
    }).catch(
      function(err) {
      console.error(err, err.stack);
  });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <form classname="App-form" onSubmit={handleSubmit}>
          <button classname="App-button"
            type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
