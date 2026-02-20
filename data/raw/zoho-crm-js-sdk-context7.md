### Zoho CRM JS SDK: Full Initialization With SDKConfig

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/2.0.0/README.md

Initialize the Zoho CRM JavaScript SDK with environment, OAuth token, SDK config, and logger.

```javascript
class SDKInitializer {
  static async initializeSDK() {
    let logger = Logger.getInstance(Levels.ALL);
    let environment = DataCenter.US.PRODUCTION();

    let token = new OAuthBuilder()
      .clientId("clientId")
      .scope("scope")
      .redirectURL("redirectURL")
      .build();

    let sdkConfig = new SDKConfigBuilder()
      .autoRefreshFields(true)
      .pickListValidation(false)
      .cacheStore(true)
      .build();

    (await new InitializeBuilder())
      .environment(environment)
      .token(token)
      .SDKConfig(sdkConfig)
      .logger(logger)
      .initialize();
  }
}
```

--------------------------------

### Zoho CRM JS SDK: OAuth Token Builder

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/2.0.0/README.md

Create an OAuth token using client ID, scopes, and redirect URL.

```javascript
let token = new OAuthBuilder()
  .clientId("clientId")
  .scope("scope")
  .redirectURL("redirectURL")
  .build();
```

--------------------------------

### Zoho CRM JS SDK: CORS Sample Initialization

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/2.0.0/samples/cors-zcrm-apis/README.md

CORS sample showing environment + token + sdk config initialization.

```javascript
let logger = Logger.getInstance(Levels.ALL);
let environment = DataCenter.US.PRODUCTION();

let token = new OAuthBuilder()
  .clientId("1000.xxxx")
  .scope("ZohoCRM.modules.ALL,ZohoCRM.settings.ALL")
  .redirectURL("http://127.0.0.1:5501/redirect.html")
  .build();

let sdkConfig = new SDKConfigBuilder()
  .autoRefreshFields(true)
  .cacheStore(true)
  .pickListValidation(false)
  .build();

(await new InitializeBuilder())
  .environment(environment)
  .token(token)
  .initialize();
```

--------------------------------

### Zoho CRM JS SDK: Create Records Example

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/2.0.0/README.md

Create lead records with standard fields, custom fields, and inspect the API response.

```javascript
let recordOperations = new ZCRM.Record.Operations("Leads");
let request = new ZCRM.Record.Model.BodyWrapper();
let recordsArray = [];

let record = new ZCRM.Record.Model.Record();
record.addFieldValue(ZCRM.Record.Model.Field.Leads.LAST_NAME, "JS SDK");
record.addFieldValue(ZCRM.Record.Model.Field.Leads.FIRST_NAME, "JS");
record.addFieldValue(ZCRM.Record.Model.Field.Leads.COMPANY, "ZCRM");
record.addKeyValue("Custom_field", "Value");

recordsArray.push(record);
request.setData(recordsArray);

let response = await recordOperations.createRecords(request, new HeaderMap());
if (response != null) {
  console.log("Status Code: " + response.getStatusCode());
}
```

--------------------------------

### Zoho CRM JS SDK: Invoke API and Check Status Code

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/samples/cors-zcrm-apis/README.md

Invoke an API operation and inspect the status code from APIResponse.

```javascript
let contactRolesOperations = new ZCRM.ContactRole.Operations();
let response = await contactRolesOperations.getContactRoles();

if (response != null) {
  console.log("Status Code: " + response.getStatusCode());
}
```

--------------------------------

### Zoho CRM JS SDK: Create Lead From Form Data

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/samples/cors-zcrm-apis/index.html

Serialize form data and create a lead through a sample helper.

```javascript
async function createLeadForm() {
  var formObj = {};
  var inputs = $("#leadForm").serializeArray();

  $.each(inputs, function (i, input) {
    formObj[input.name] = input.value;
  });

  await ZCRMSample.Lead.create("Leads", formObj);
  viewRecords();
  return false;
}
```

--------------------------------

### Zoho CRM JS SDK: Update Lead Record

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/samples/cors-zcrm-apis/index.html

Update a lead by record id through a sample helper.

```javascript
async function edit(id) {
  var input = { Last_Name: $("tr[data-id='" + id + "'] td")[1].innerHTML + "1" };
  await ZCRMSample.Lead.update("Leads", id, input);
  viewRecords();
}
```

--------------------------------

### Zoho CRM JS SDK: Fetch and Render Leads

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/samples/cors-zcrm-apis/index.html

Fetch leads and render the list view.

```javascript
async function createListView() {
  document.getElementById("createView").style.display = "none";
  document.getElementById("listview").style.display = "none";

  var html = "<table><tr><th></th><th>Name</th><th>Email</th></tr>";
  html += await ZCRMSample.Lead.get("Leads");
  html += "</table>";

  document.getElementById("listview").innerHTML = html;
}
```

--------------------------------

### Zoho CRM JS SDK: API Response Object Model

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/README.md

Summary of response wrappers and exception classes used by SDK operations.

```APIDOC
APIResponse:
  getObject():
    - ResponseWrapper for successful GET requests
    - ActionWrapper for successful POST/PUT/DELETE requests
    - APIException for failed API calls

SDKException:
  - Thrown for SDK anomalies and unexpected behavior
```

--------------------------------

### Zoho CRM JS SDK: Include SDK via CDN (v1.0.0)

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/README.md

Include the SDK directly in browser pages.

```html
<script src="https://static.zohocdn.com/zohocrm/v8.0/sdk/1.0.0/zohocrmsdk-8-0.js"></script>
```

--------------------------------

### Zoho CRM JS SDK: ZET Project Manifest Configuration

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/2.0.0/README.md

Configure `plugin_manifest.json` with client id and scopes.

```APIDOC
ZET Project Configuration:

1. After `zet init`, a project folder is created.
2. Inside the project folder, locate `plugin_manifest.json`.
3. Update the `client_id` in `plugin_manifest.json` with your registered Zoho Client ID.
4. Add required OAuth scopes to be used by the web app within the same file.

Example `plugin_manifest.json` snippet:

{
  "client_id": "YOUR_ZOHO_CLIENT_ID",
  "scopes": [
    "ZohoCRM.users.ALL",
    "ZohoCRM.settings.ALL"
  ]
}
```

--------------------------------

### Zoho CRM JS SDK: API Console Client Registration Steps

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/2.0.0/README.md

Checklist for registering OAuth client in API console.

```APIDOC
Register Zoho Client:

1. Visit https://api-console.zoho.com/
2. Click 'ADD CLIENT'.
3. Choose 'Client Type' as 'Client-based Applications'.
4. Enter:
   - Client Name
   - Homepage URL
   - Authorized Redirect URIs
   - JavaScript Domain
5. Click 'CREATE'.
```

--------------------------------

### Zoho CRM JS SDK: Redirect URL Token Handling (LocalStorage)

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/samples/create_records_sample/redirect.html

Handle redirect parameters and persist token fields in browser local storage.

```javascript
function getPropertiesFromURL() {
  var props = {};
  var propertyString = window.location.hash || window.location.search;
  if (propertyString) {
    propertyString = typeof propertyString === "string" && propertyString.slice(1);
    if (propertyString) {
      propertyString.split("&").forEach(function (prop) {
        var key = prop.split("=")[0],
          value = prop.split("=")[1];
        props[key] = value;
      });
    }
  }
  return props;
}

function setAccessToken() {
  var hashProps = getPropertiesFromURL();
  if (hashProps) {
    for (var key in hashProps) {
      if (hashProps.hasOwnProperty(key)) {
        var value = key === "api_domain" ? decodeURIComponent(hashProps[key]) : hashProps[key];
        localStorage.setItem(key, value);
      }
    }
  }
  setTimeout(function () {
    window.close();
  }, 0);
}

setAccessToken();
```

--------------------------------

### Zoho CRM JS SDK: SDKConfig With Timeout

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/2.0.0/README.md

Configure auto-refresh, cache, picklist validation, and timeout.

```JavaScript
let sdkConfig = new SDKConfigBuilder()
  .autoRefreshFields(true)
  .pickListValidation(false)
  .cacheStore(true)
  .timeout(1000)
  .build();
```

--------------------------------

### Zoho CRM JS SDK: Mass Update Response Structure

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/README.md

Structure used for mass update responses and API exceptions.

```APIDOC
Mass Update API Response Structures:
  MassUpdateResponseHandler:
    MassUpdateResponseWrapper:
      - Holds a list of MassUpdateResponse interfaces.
    APIException

  MassUpdateResponse Interface:
    MassUpdate
    APIException
```

--------------------------------

### Zoho CRM JS SDK: Deleted Records Response Structure

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/2.0.0/README.md

Response schema for deleted records retrieval.

```APIDOC
Record API Deleted Records Response Structure:
  DeletedRecordsHandler:
    DeletedRecordsWrapper:
      - Holds DeletedRecord list
      - Holds Info object
    APIException
```

--------------------------------

### Zoho CRM JS SDK: Download/File Response Structure

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/README.md

Download response model for file operations.

```APIDOC
Download API Response Structure:
  DownloadHandler:
    FileBodyWrapper
    APIException
```

--------------------------------

### Zoho CRM JS SDK: Transfer Pipeline Response Structure

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/README.md

Response hierarchy for transfer pipeline operations.

```APIDOC
Pipeline API Transfer Pipeline Response Structure:
  TransferPipelineActionHandler:
    TransferPipelineActionWrapper
    APIException

  TransferPipelineActionResponse:
    TransferPipelineSuccessResponse
    APIException
```

--------------------------------

### Zoho CRM JS SDK: Include SDK via CDN (v2.0.0)

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/2.0.0/README.md

CDN path for loading SDK v2.0.0 in browser apps.

```javascript
https://static.zohocdn.com/zohocrm/v8.0/sdk/2.0.0/zohocrmsdk-8-0.js
```

--------------------------------

### Zoho CRM JS SDK: OAuth Scope Requirements by API Area

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/README.md

Scope matrix and environment notes for avoiding OAUTH-SCOPE-MISMATCH.

```APIDOC
Zoho CRM API Scope Requirements:

1. Deal Contact Roles API & Records API:
   - Required Scopes: ZohoCRM.modules.ALL, ZohoCRM.settings.fields.ALL

2. Related Records API:
   - Required Scopes: ZohoCRM.modules.ALL, ZohoCRM.settings.fields.ALL, ZohoCRM.settings.related_lists.ALL

3. Mass Convert API:
   - Required Scopes: ZohoCRM.settings.fields.ALL, ZohoCRM.mass_convert.leads.CREATE, ZohoCRM.mass_convert.leads.READ

Note: Access and refresh tokens are environment-specific and domain-specific.
```

--------------------------------

### Zoho CRM JS SDK: Record API Mass Update Action Response Structure

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/README.md

Action-level response hierarchy for record mass update execution.

```APIDOC
Record API Mass Update Response Structure:

- MassUpdateActionHandler interface:
  - MassUpdateActionWrapper class
    - Holds list of MassUpdateActionResponse instances
  - APIException class

- MassUpdateActionResponse interface:
  - MassUpdateSuccessResponse class
  - APIException class
```

--------------------------------

### Zoho CRM JS SDK: v8 Feature List

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/README.md

High-level list of recently added/improved API capabilities in SDK v8.0.

```APIDOC
Zoho CRM API Features (v8.0 SDK):

- History Tracking Fields API: New fields added.
- Inventory Mass Conversion Status API: Issue fixed.
- Get Related Records Count of a Record: Support added.
- Calls Preference: Support added.
- Record-Level Sharing of Emails: Support added.
- Data Sharing Rules API: Support added.
- Get Rich Text Fields API: Support added.
```

--------------------------------

### Zoho CRM JS SDK: Record API Count Response Structure

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/README.md

Response type map for record count retrieval.

```APIDOC
Record API Count Response Structure:
  CountHandler:
    CountWrapper:
      - Holds a Long count.
    APIException
```

--------------------------------

### Zoho CRM JS SDK: Redirect URL Token Handling (v2 sample)

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/2.0.0/samples/cors-zcrm-apis/redirect.html

Read redirect hash/search parameters and persist token fields in browser storage.

```javascript
function getPropertiesFromURL() {
  var props = {};
  var propertyString = window.location.hash || window.location.search;
  if (propertyString) {
    propertyString = typeof propertyString === 'string' && propertyString.slice(1);
    if (propertyString) {
      propertyString
        .split('&')
        .forEach(function (prop) {
          var key = prop.split('=')[0],
            value = prop.split('=')[1];
          props[key] = value;
        });
    }
  }
  return props;
}

function setAccessToken() {
  var hashProps = getPropertiesFromURL();
  if (hashProps) {
    for (var key in hashProps) {
      if (hashProps.hasOwnProperty(key)) {
        var value = key === 'api_domain' ? decodeURIComponent(hashProps[key]) : hashProps[key];
        localStorage.setItem(key, value);
      }
    }
  }
  setTimeout(function () {
    window.close();
  }, 0);
}

setAccessToken();
```

--------------------------------

### Zoho CRM JS SDK: Include CDN Script Tag (samples)

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/samples/cors-zcrm-apis/README.md

Sample HTML include snippet for SDK script.

```javascript
<script src="https://static.zohocdn.com/zohocrm/v8.0/sdk/1.0.0/zohocrmsdk-8-0.js"></script>
```

--------------------------------

### Zoho CRM JS SDK: Common API Response Handler Structure

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/README.md

General response-handler model for API responses.

```APIDOC
Common API Response Structure:
  ResponseHandler:
    ResponseWrapper
    FileBodyWrapper
    APIException
```

--------------------------------

### Zoho CRM JS SDK: Particular API Action Structure

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/README.md

ActionHandler/ActionWrapper/ActionResponse hierarchy used by particular APIs.

```APIDOC
Particular API Structure:

- ActionHandler interface:
  - ActionWrapper class
  - APIException class

- ActionWrapper class:
  - Contains properties with ActionResponse interface entries

- ActionResponse interface:
  - SuccessResponse class
  - APIException class
```

--------------------------------

### Zoho CRM JS SDK: Common API Action Structure

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/README.md

Action-level common response structure used by multiple APIs.

```APIDOC
Common API Structure:

- ActionHandler class:
  - ActionWrapper class
  - APIException class

- ActionWrapper class:
  - Contains properties with ActionResponse class entries

- ActionResponse class:
  - SuccessResponse class
  - APIException class
```

--------------------------------

### Zoho CRM JS SDK: Delete Lead Record (sample)

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/samples/cors-zcrm-apis/index.html

Delete a lead by record id in sample flow.

```javascript
async function deleteR(id) {
  await ZCRMSample.Lead.delete_0("Leads", id);
  viewRecords();
}
```

--------------------------------

### Zoho CRM JS SDK: Configure API Environment

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/README.md

Select domain/environment for API calls.

```JavaScript
let environment = DataCenter.US.PRODUCTION();
```

--------------------------------

### Zoho CRM JS SDK: Tags API Response Structure

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/1.0.0/README.md

Response model hierarchy specific to Tags API record actions.

```APIDOC
Tags API Response Structure:

- RecordActionHandler interface:
  - RecordActionWrapper class
    - Holds list of RecordActionResponse instances
    - Boolean wfScheduler
    - String successCount
    - Boolean lockedCount
  - APIException class

- RecordActionResponse interface:
  - RecordSuccessResponse class
  - APIException class
```

--------------------------------

### Zoho CRM JS SDK: ZET CLI Commands

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/2.0.0/README.md

Core ZET commands for init/package/run during extension development.

```bash
zet init
```

```bash
zet pack
```

```bash
zet run
```

--------------------------------

### Zoho CRM JS SDK: Initialize Sample App Entry

Source: https://github.com/zoho/zohocrm-javascript-sdk-8.0/blob/main/versions/2.0.0/samples/cors-zcrm-apis/index.html

Entry call that initializes SDK sample runtime.

```javascript
ZCRMSample.init();
```
