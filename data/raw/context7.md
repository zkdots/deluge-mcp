### Deluge get() Function Example

Source: https://www.zoho.com/deluge/help/functions/map/get

This example demonstrates the practical application of the Deluge get() function. It shows how to initialize a map variable and use get() to retrieve existing and non-existing keys, printing the results.

```Deluge
mapVar = {"Product" : "Creator", "Company" : "Zoho"};
boolVal = mapVar.get("Creator");        //returns null 
newBoolVal = mapVar.get("Product");     //returns Creator 
info boolVal ; 
info newBoolVal ; 
```

--------------------------------

### Deluge frac() Examples

Source: https://www.zoho.com/deluge/help/functions/number/frac

Provides practical examples of using the frac() function in Deluge. It shows how to get the fractional part of both a positive and a negative number, printing the result using 'info'.

```Deluge
inputNumber = 24.6;
info inputNumber.frac(); // Returns 0.6
```

```Deluge
inputNumber = -25.1;
info frac(inputNumber); // Returns -0.1
```

--------------------------------

### Deluge Reverse() Example 1: Basic String Reversal

Source: https://www.zoho.com/deluge/help/functions/string/reverse

Shows a basic example of using the reverse() function to reverse the string 'Zoho Creator' and display the output.

```Deluge
inputText = "Zoho Creator" ;
 outputText = reverse ( inputText ) ;
 info outputText ; // Returns "rotaerC ohoZ"
```

--------------------------------

### Deluge subString Examples

Source: https://www.zoho.com/deluge/help/functions/string/substring

Provides practical examples of using the subString function in Deluge. These examples show how to extract specific parts of a string, including cases where the end index is omitted to get the rest of the string.

```deluge
sourceText = "Welcome to Zoho Deluge";
newText = sourceText.subString(11, 22);
info newText; // returns Zoho Deluge
```

```deluge
Email_Data = "Email: jack@zylker.com";
Email = Email_Data.subString(7);
info Email;   // returns jack@zylker.com
```

```deluge
Date_Time_Data = "15-Aug-1947 12:00:00";
Date = Date_Time_Data.subString(0,11);
info Date;    // returns 15-Aug-1947
```

--------------------------------

### Deluge toStartOfWeek() Example

Source: https://www.zoho.com/deluge/help/functions/datetime/tostartofweek

An example of using the toStartOfWeek() function in Deluge to find the start of the week for a given date. The function returns the date in the format specified in Application Settings.

```Deluge
currentDate = '15-Mar-2019 15:00:00';
startDate= currentDate.toStartOfWeek(); // returns '10-Mar-2019 00:00:00'
```

--------------------------------

### Zoho Deluge: API Integration Example

Source: https://www.zoho.com/deluge/help/script/sign/create-using-template

This example demonstrates how to make an API call using Deluge's `invokeurl` task. It shows how to construct the request, set headers, and process the response, enabling integration with external services.

```deluge
// Make a GET request to an external API
api_response = invokeurl
[
    url: "https://api.example.com/data"
    type: "GET"
    headers: {
        "Authorization": "Bearer YOUR_API_KEY"
    }
];

// Process the JSON response
response_data = fromJSON(api_response);
info response_data.get("some_key");
```

--------------------------------

### Deluge get() Function Example

Source: https://www.zoho.com/deluge/help/functions/list/get

This example demonstrates how to use the get() function in Deluge to retrieve an element from a list. The function takes a list variable and an index value as input and returns the element at that specific index.

```deluge
listVar = {"Creator", "CRM", {"Projects", "Reports"}};
elementValue = listVar.get(2); //returns {"Projects", "Reports"}
```

--------------------------------

### Deluge Basic Execution Example

Source: https://www.zoho.com/deluge/help/map-manipulations

A simple example showcasing the execution flow in Deluge, often used for interactive prompts or basic script execution. This snippet illustrates a common pattern for user interaction or simple output.

```Deluge
execute
__
We're Online!
How may I help you today?
__
____
```

--------------------------------

### Deluge Criteria Syntax Example

Source: https://www.zoho.com/deluge/help/criteria

This example demonstrates the basic syntax for creating a criteria in Deluge to fetch records. It includes two conditions connected by a logical AND operator.

```Deluge
(email == "tony@zylker.com" && phone == "+91xxxxxxxxxx")
```

--------------------------------

### Deluge Example: Uploading File to SDP Cloud Request

Source: https://www.zoho.com/deluge/help/sdp/sdp-invokeurl

An example demonstrating how to use the 'zoho.sdp.invokeUrl' task to fetch a PDF file from a URL and upload it as an attachment to a specific request in SDP Cloud.

```deluge
// Fetch a file from cloud
 pdf_file = invokeurl
 [
 url: "http://www.africau.edu/images/default/sample.pdf"
 type: GET
 ];
 // Create a map to hold the API parameters
 paramsMap = Map();
 paramsMap.put("filename", pdf_file);
 paramsMap.put("addtoattachment", "true");
 // Perform SDP invokeUrl task to upload and associate file to a request
 response = zoho.sdp.invokeurl
 [
 url: "/api/v3/requests/3173000000203001/_uploads"
 type: POST
 parameters: paramsMap
 ];
 info response;

```

--------------------------------

### Deluge mid() Function Example

Source: https://www.zoho.com/deluge/help/functions/string/mid

An example of using the Deluge mid() function to extract a substring from a given text. It shows how to define the source text, call the mid() function with start and end indices, and display the resulting substring.

```deluge
sourceText = "Welcome to Zoho Deluge";
newText = sourceText.mid(11, 22);
info newText; // returns "Zoho Deluge"
```

--------------------------------

### Deluge SFTP Upload and Download Example

Source: https://www.zoho.com/deluge/help/sftp-task

Demonstrates uploading a file to an SFTP server and then downloading it. It includes converting a text response to a file object and logging the process.

```Deluge
// Log initial step
info "SFTP";
info "****";
// Download a sample file from a public URL
sftpTxtFile = invokeurl
[
url : "https://sample-files.com/downloads/documents/txt/simple.txt"
type : GET
];
// Convert the text response into a file object
sftpTxtFile = sftpTxtFile.toFile("sftp.txt");
info sftpTxtFile;
// Upload the file to a secure SFTP server
uploadFtp = sftp
[
action : upload
host : "sftp.examplehost.com"
port : 22
path : ""
files : sftpTxtFile
connection : "sftp_connection"
];
info uploadFtp;
// Download the same file from the SFTP server
downloadFtp = sftp
[
action : download
host : "sftp.examplehost.com"
port : 22
path : "/sftp.txt"
connection : "sftp_connection"
];
info downloadFtp;
// Output the content of the downloaded file for validation
info downloadFtp.getFileContent();

```

--------------------------------

### Deluge Create Record Example

Source: https://www.zoho.com/deluge/help/crm/upsert-record

Example of creating a new record in the 'Leads' module using the Deluge upsert function. It demonstrates how to populate record values and execute the upsert operation.

```Deluge
record_values = Map();
record_values.put("Last_Name","Williams");
record_values.put("Company","Will Tech");
response = zoho.crm.upsert("Leads",record_values);
```

--------------------------------

### Deluge: Example Usage of Extension Property Tasks

Source: https://www.zoho.com/deluge/help/cliq/extension-tasks

Demonstrates the practical application of Deluge tasks for managing Zoho Cliq extension properties, including setting, getting, and deleting a username property.

```Deluge
dataMap = {"username":"scottfisher"};
setResponse = zoho.cliq.extension.setProperties(dataMap, cliq_connection);

getResponse = zoho.cliq.extension.getProperties("username", cliq_connection);

deleteResponse = zoho.cliq.extension.deleteProperty("username", cliq_connection);
```

--------------------------------

### Deluge SFTP Download File

Source: https://www.zoho.com/deluge/help/sftp-task

Example of downloading a file named 'example.png' from a specific path on a remote SFTP server using the SFTP task in Deluge.

```Deluge
// Download a file from SFTP server
downloadSftp = sftp
[
action : download
host : "ftp.examplehost.com"
port : 22
path : "/home/uploads/example.png"
];
info downloadSftp;

```

--------------------------------

### Deluge signum() Function Examples

Source: https://www.zoho.com/deluge/help/functions/number/signum

Provides practical examples of using the signum() function in Deluge with positive, negative, and zero inputs. It shows how to store the result in a variable and display it using the 'info' command.

```Deluge
number = 25.125432 ;
info number.signum(); // Returns 1.0

number = -12;
info signum(number); // Returns -1.0

number = 0 ;
info number.signum(); // Returns 0.0
```

--------------------------------

### Deluge startsWithIgnoreCase() Example

Source: https://www.zoho.com/deluge/help/functions/string/startswithignorecase

Demonstrates how to use the startsWithIgnoreCase() function in Deluge to check if a string starts with a given substring, ignoring case differences. The function returns a boolean value.

```Deluge
Product = "Zoho Creator";
var = startsWithIgnoreCase(Product, "zoho"); //returns true
```

--------------------------------

### Deluge Incoming Webhook Example

Source: https://www.zoho.com/deluge/help/deluge-in-zoho-services/zoho-connect

This example demonstrates how to use Deluge with incoming webhooks in Zoho Connect. It shows how to capture feedback from a Zoho Form and post it as a message in a Zoho Connect Group, with options for advanced formatting.

```Deluge
// Example Deluge script for incoming webhook
// This script assumes data is received from a Zoho Form

// Get data from the form submission
feedbackData = input.get("Feedback");
attendeeName = input.get("Name"); // Assuming 'Name' is a field in the form

// Format the message for Zoho Connect
message = "New feedback from " + attendeeName + ":\n" + feedbackData;

// Post the message to a Zoho Connect Group (replace 'Feedback Group' with your actual group name)
ZohoConnect.postMessage("Feedback Group", message);
```

--------------------------------

### Example of Creating a Record

Source: https://www.zoho.com/deluge/help/creator/create-record-v1

This Deluge code snippet demonstrates how to call the `createRecord` task to add a new task with a name and description to the 'Create_Task' form within the 'Task_Management' application.

```Deluge
response = zoho.creator.v1.createRecord("tony", "Task_Management", "Create_Task", dataMap);
```

--------------------------------

### Get All Field Values from Collection Example in Deluge

Source: https://www.zoho.com/deluge/help/collection-variable

An example demonstrating how to retrieve all 'Employee_ID' field values from the 'employeesJoinedToday' collection and store them in the 'empID' variable.

```deluge
empID = employeesJoinedToday.Employee_ID.getAll();
```

--------------------------------

### Zoho Desk to Zoho Projects Integration

Source: https://www.zoho.com/deluge/help/integration-tasks

Example of creating a task in Zoho Projects based on a ticket in Zoho Desk using the `zoho.projects.createRecord` integration task.

```Deluge
zoho.projects.createRecord("Projects", "Tasks", "Ticket Subject", "Ticket Description");

```

--------------------------------

### Deluge Info Task Example

Source: https://www.zoho.com/deluge/help/differencebetween/alert-info

Illustrates the use of the 'info' task in Deluge for debugging purposes, showing the value of an expression during script execution. The output is visible in logs or pop-ups for developers.

```Deluge
info "The value of the variable is: " + variableName;
```

--------------------------------

### Deluge Arithmetic and String Concatenation Examples

Source: https://www.zoho.com/deluge/help/expression

Demonstrates basic arithmetic operations and string concatenation in Deluge. These are fundamental examples for understanding how Deluge handles numerical and text data.

```Deluge
total = 1 + 2; // adding two arithmetic values
```

```Deluge
name = "John" + "Smith"; // concatenating 2 string values
```

--------------------------------

### Deluge getSuffix() Example

Source: https://www.zoho.com/deluge/help/functions/string/getSuffix

This example demonstrates how to use the getSuffix() function in Deluge to extract characters following a specific substring. The function takes the original string and the search string as arguments.

```Deluge
text = "Create custom apps with Zoho Creator" ;
newText = text.getSuffix("with");
//returns " Zoho Creator"
```

--------------------------------

### Deluge postUrl Task Example

Source: https://www.zoho.com/deluge/help/web-data/posturl

Example of using the postUrl task in Deluge to send data from one Zoho Creator form to another via an HTTP POST request. It demonstrates setting headers and constructing the data payload.

```Deluge
headers = map();
headers.put("content-type", "application/x-www-form-urlencoded");

myMap = map();
myMap.put("authtoken", "<your_API_key>");
myMap.put("scope", "creatorapi");
myMap.put("Name2", input.Name1);
myMap.put("Email2", input.Email1);
myMap.put("Phone2", input.Phone1);

resp = postUrl("https://creator.zoho.com/api/<appowner>/json/App2/form/Form2/record/add/", myMap, headers);
```

--------------------------------

### Fetch Records using invokeUrl in Zoho CRM

Source: https://www.zoho.com/deluge/help/web-data/invokeurl-function

This example demonstrates how to fetch records from the Leads module in Zoho CRM using the invokeUrl function. It specifies the URL, authentication token, and parameters for the GET request.

```Deluge
urlData = "https://crm.zoho.com/crm/internal/json/Leads/getRecords";
authtoken = "xxxxxxxxx";      // refers to your authtoken 
testparams = Map(); 
testparams.put("authtoken", authtoken); 

response = invokeUrl(urlData, "GET", testparams);
```

--------------------------------

### Deluge nextWeekDay() Examples

Source: https://www.zoho.com/deluge/help/functions/number/nextWeekDay

Provides practical examples of using the nextWeekDay() function in Deluge. It shows how to find the next Monday from the current date and how to find the next Tuesday from a specific input date.

```Deluge
info zoho.currentdate.nextWeekDay("Monday"); // Considering current date is 20-Jul-2021, it returns 26-Jul-2021 

inputDate = '20-Jul-2021'; //Is a Tuesday 
info inputDate.nextWeekDay("Tuesday"); //Returns 27-Jul-2021
```

--------------------------------

### Deluge subList() Example

Source: https://www.zoho.com/deluge/help/functions/list/sublist

Demonstrates how to use the subList() function in Deluge to extract elements from a list. The function takes a list variable, a start index, and an end index as arguments. It returns a new list containing elements from the start index up to, but not including, the end index.

```deluge
listVar= {1, 2, 3, 4};
newListVar= listVar.subList(0, 3); // returns {1, 2, 3}
```

--------------------------------

### Deluge truncate() Examples

Source: https://www.zoho.com/deluge/help/functions/number/truncate

Provides practical examples of the Deluge truncate() function. It shows how to truncate a number to the right of the decimal point, truncate to an integer, and truncate to the left of the decimal point.

```Deluge
number = 25.125432 ;
info number.truncate(2); // returns 25.12

number = 9789.852 ;
info number.truncate(0); // returns 9789

number = 9789.852 ;
info number.truncate(-2); // returns 9700
```

--------------------------------

### Deluge Alert Task Example

Source: https://www.zoho.com/deluge/help/differencebetween/alert-info

Demonstrates the use of the 'alert' task in Deluge to display a warning message, such as for invalid reservation dates in a hotel booking form.

```Deluge
alert "Reservation date cannot be earlier than today.";
```

--------------------------------

### Deluge Variable Assignment Example

Source: https://www.zoho.com/deluge/help/variables

Demonstrates how to assign a value to a variable in Deluge. This example shows a simple assignment, which is a fundamental operation for storing data.

```Deluge
tax = 0.1;
```

--------------------------------

### Get Week Number with Default Start Day (Sunday)

Source: https://www.zoho.com/deluge/help/functions/datetime/getweekofyear

This Deluge code snippet demonstrates how to use the getWeekOfYear() function with the default start day of Sunday. It takes a date string and returns the corresponding week number.

```Deluge
currentDate = '7-Feb-2021';
weekNumber = currentDate.getWeekOfYear(); // returns 7 considering "Sunday" as first day of a week
```

--------------------------------

### Deluge size() Function Example

Source: https://www.zoho.com/deluge/help/functions/collection/size

Demonstrates how to use the size() function in Deluge to get the number of elements in a collection. The function returns a NUMBER data type.

```Deluge
productVersion = collection("Creator" : 5, "CRM" : 2, "Mail" : 8);
info productVersion.size( ); // Returns 3
```

```Deluge
products = collection("Creator", "CRM", "Mail");
info products.size( ); // Returns 3
```

--------------------------------

### Create Subscription in Zoho Billing

Source: https://www.zoho.com/deluge/help/billing/create-record

Example of creating a subscription in Zoho Billing using Deluge. It demonstrates how to populate a map with customer ID, auto-collect preference, and plan details, then calls the `zoho.billing.create` function.

```Deluge
values = map();
values.put("customer_id", input.Customer_ID);
values.put("auto_collect", false);
values.put("plan", {"plan_code" : input.Plan_Code});

response = zoho.billing.create("Subscriptions", "66XXXXX66", values, "billing_connection");
```

--------------------------------

### Deluge getPrefixIgnoreCase() Example

Source: https://www.zoho.com/deluge/help/functions/string/getPrefixIgnoreCase

An example of the getPrefixIgnoreCase() function in Deluge, showing how to find the prefix of a text string ignoring case.

```Deluge
inputText = "Split the text and get prefix of \"and\"" ;
newText = inputText .getPrefixIgnoreCase ( "AND" ) ;
info newText ; // Returns "Split the text"
```

--------------------------------

### Deluge floor() Function Example

Source: https://www.zoho.com/deluge/help/functions/number/floor

Demonstrates how to use the floor() function in Zoho Deluge to get the nearest smallest integer from a decimal value. The function can be called as a method on a decimal variable or as a standalone function.

```deluge
number = 10.1;
floorValue = number.floor(); // returns 10
```

```deluge
number = 10.1;
floorValue = floor(number); // returns 10
```

--------------------------------

### Fetch Tasks from Zoho Projects

Source: https://www.zoho.com/deluge/help/projects/get-records

Fetches a specified number of tasks starting from a given index from a Zoho Projects portal. This script requires the portal name, project ID, resource type ('tasks'), start index, number of records to fetch, and the module ('projects').

```deluge
response = zoho.projects.getRecords("zylker", 548XXXXXXXXXXX771, "tasks", 5, 3, "projects");
```

--------------------------------

### Deluge matches() Function Examples

Source: https://www.zoho.com/deluge/help/functions/string/matches

Demonstrates how to use the Deluge `matches()` function to check if a string conforms to a given regular expression pattern. Includes examples for ID validation, currency format checking, and email format validation.

```Deluge
IDValue = "ID004500F";
retValue = matches(IDValue, "[A-Z]{2}[0-9]{6}[A-Z]"); //returns true

num = "$345.78";
ret = matches(num, "\\$[0-9]+\\.[0-9]{2}"); //returns true

useremail = "jane2023@zylker.com";
format_check = matches(useremail,"[a-z 0-9]+\\@[a-z]+\\.[a-z]+"); //returns true
```

--------------------------------

### Deluge get() by Index

Source: https://www.zoho.com/deluge/help/functions/collection/get

Retrieves an element from a collection using its numerical index. The index starts at 0. Accessing an index outside the collection's bounds will result in a runtime error.

```deluge
names = Collection("name10","name2","name6","name1");
first_name = names.get(0); // the value "name10" is assigned to first_name
fifth_name = names.get(4); // Throws a run-time error - "Given index 4 is greater than the list size"
```

--------------------------------

### Create Sales Order using invokeAPI (Zoho Books - Deluge)

Source: https://www.zoho.com/deluge/help/webhook/invokeapitask

This Deluge script demonstrates creating a sales order in Zoho Books using the invokeAPI task with a POST request. It includes formatting data into maps and lists, and setting request parameters, body, and headers.

```deluge
// Create a map that holds the values of the new salesorder that needs to be created
item = Map();
                                                                                                                    item.put("item_id",205788000000122285);
item.put("rate", 120);
item.put("name", "Hard Drive");
item.put("description", "500GB, USB 2.0 interface 1400 rpm, protective hard case.");  

// Format the data as specified in the Zoho Books API
item_list = List();
item_list.add(item);  

data = Map();
data.put("customer_id",205788000000127011);
data.put("line_item", item_list);  

// Supply the parameters to the invokeApi task
response = invokeapi
[
service : ZohoBooks
path : "/books/v3/invoices"
type : POST
parameters : {"organization_id": "10xxx59"}
body : data
headers : {"content-type":"application/x-www-form-urlencoded"}
connection : "zohobooks_connection"
];  

info response.status;
```

--------------------------------

### Fetch, Encode, and Decode File in Deluge

Source: https://www.zoho.com/deluge/help/encryption-tasks/base-64-decode-to-file

This example demonstrates fetching a file from a URL using `invokeUrl`, encoding its content using `zoho.encryption.base64Encode`, and then decoding it back into a file named 'Sample File' using `zoho.encryption.base64DecodeToFile`.

```Deluge
sample_file = invokeUrl
[
url: "http://www.africau.edu/images/default/sample.pdf"
type: GET
];

text_to_decode = zoho.encryption.base64Encode(sample_file);

response = zoho.encryption.base64DecodeToFile(text_to_decode,"Sample File");
```

--------------------------------

### Create Key-Value Collection - Deluge

Source: https://www.zoho.com/deluge/help/datatypes/collection

This Deluge example creates a key-value collection named 'details' and initializes it with 'Name':'Shawn' and 'Gender':'Male'.

```Deluge
details = Collection("Name":"Shawn","Gender":"Male");
```

--------------------------------

### Example Data Map for Record Creation

Source: https://www.zoho.com/deluge/help/creator/create-record-v1

An example of a Deluge data map used to define the field values for creating a new record in Zoho Creator. This map associates field link names with their corresponding values.

```Deluge
dataMap = {"Task_Name":"Priority Task", "Task_Description":"I need help configuring my new toaster"};
```

--------------------------------

### Deluge equals() Function Examples

Source: https://www.zoho.com/deluge/help/functions/common/equals

Examples demonstrating the usage of the Deluge 'equals()' function. It shows comparisons between dates, strings (case-sensitive), and highlights how data type mismatches result in a false return value.

```Deluge
date_equals = '01/01/2017'.equals('01-Jan-2017'); // date_equals is assigned 'true'
text_equals = "Zoho".equals("zoho"); // text_equals is assigned 'false'
```

--------------------------------

### Create and Initialize Collection - Deluge

Source: https://www.zoho.com/deluge/help/datatypes/collection

This snippet shows the Deluge syntax for creating a collection and initializing it with values.

```Deluge
<collection_variable> = Collection(<values>);
```

--------------------------------

### Deluge Automation Example: Discount Calculation

Source: https://www.zoho.com/deluge/help/index

Demonstrates how Deluge can automate business logic, such as applying a discount when a cart value exceeds a certain threshold. This showcases Deluge's ability to perform calculations and conditional actions.

```Deluge
if (cartTotal > 1000) {
  discount = cartTotal * 0.10; // Apply 10% discount
  finalCost = cartTotal - discount;
} else {
  finalCost = cartTotal;
}

```

--------------------------------

### Zoho CRM to Zoho Sign Integration

Source: https://www.zoho.com/deluge/help/integration-tasks

Example of downloading a license agreement from Zoho Sign and attaching it to a Zoho CRM Deals module record using `zoho.sign.downloadDocument` and `zoho.crm.attachFile` tasks.

```Deluge
documentLink = zoho.sign.downloadDocument("Document ID");
zoho.crm.attachFile("Deals", "Deal ID", documentLink, "attachment_name.pdf");

```

--------------------------------

### Deluge previousWeekDay() Function Examples

Source: https://www.zoho.com/deluge/help/functions/number/previousWeekDay

Provides examples of using the previousWeekDay() function in Deluge. The first example uses the current date to find the previous Monday. The second example sets a specific input date and finds the previous Wednesday.

```Deluge
info zoho.currentdate.previousWeekDay("Monday"); //Considering current date is 21-Jul-2021, it returns 19-Jul-2021 
 
inputDate = '21-Jul-2021'; //Is a Wednesday 
info inputDate.previousWeekDay("Wednesday"); //Returns 14-Jul-2021 

```

--------------------------------

### Deluge: Get Start of Month from DateTime

Source: https://www.zoho.com/deluge/help/functions/datetime/tostartofmonth

The toStartOfMonth() function calculates the first day of the month for a given dateTimeValue. It can be called as a method on a dateTime variable or as a standalone function. The function returns the date in the format specified in Application Settings.

```Deluge
currentDate = '15-Mar-2019 15:00:00';
startDate = currentDate.toStartOfMonth(); // returns '01-Mar-2019 00:00:00'
```

```Deluge
currentDate = '15-Mar-2019 15:00:00';
startDate = toStartOfMonth(currentDate); // returns '01-Mar-2019 00:00:00'
```

--------------------------------

### Get Week Number with Custom Start Day (Monday)

Source: https://www.zoho.com/deluge/help/functions/datetime/getweekofyear

This Deluge code snippet shows how to use the getWeekOfYear() function, specifying 'Monday' as the first day of the week. This is applicable to services other than Zoho Creator.

```Deluge
currentDate = '7-Feb-2021';
weekNumber = currentDate.getWeekOfYear("Monday"); // returns 6 considering "Monday" as first day of a week
```

--------------------------------

### Sample Salesforce Failure Response

Source: https://www.zoho.com/deluge/help/salesforce/fetch-records

An example of a failure response from Salesforce due to a malformed query, indicating the error message and error code.

```json
{
"message":"\nSELECT * FROM Account where Name='John'\n ^\nERROR at Row:1:Column:7\nunexpected token: '*'.",
"errorCode":"MALFORMED_QUERY"
}
```

--------------------------------

### Upload and Download Files using FTP

Source: https://www.zoho.com/deluge/help/ftp-task

This Deluge script demonstrates how to upload a text file to an FTP server and then download it. It includes fetching a file from a URL, converting it to a file object, uploading it, and downloading it back, logging each step.

```deluge
// Log initial step  
info "FTP";
info "****";
// Fetch a text file from a public web URL
ftpTxtFile = invokeurl
[
url : "https://sample-files.com/downloads/documents/txt/simple.txt"
type : GET
];
// Convert the content to a file object
ftpTxtFile = ftpTxtFile.toFile("ftp.txt");
info ftpTxtFile;
// Upload the file to the FTP server
uploadFtp = ftp
[
action : upload
host : "ftp.examplehost.com"
port : 21
path : ""
files : ftpTxtFile
connection : "ftp_connection"
];
info uploadFtp;
// Download the same file from the FTP server
downloadFtp = ftp
[
action : download
host : "ftp.examplehost.com"
port : 21
path : "/ftp.txt"
connection : "ftp_connection"
];
info downloadFtp;
// Log the content of the downloaded file
info downloadFtp.getFileContent();

```

--------------------------------

### Deluge isEven Function Example 2

Source: https://www.zoho.com/deluge/help/functions/number/is-even

An example demonstrating the use of the standalone isEven function with a number variable and displaying the boolean result.

```deluge
number=111;
result = isEven(number);
info result; // Returns 'false'
```

--------------------------------

### Deluge toLong() Examples

Source: https://www.zoho.com/deluge/help/functions/common/tolong

Provides practical examples of using the toLong() function in Deluge. It shows how to convert a decimal number and a text string representing a number into a long integer.

```Deluge
marks = 99.9;
marks_text = "100";

info toLong(marks); // Returns 99
info marks_text.toLong(); // Returns 100

```

--------------------------------

### Deluge getSuffixIgnoreCase() Example

Source: https://www.zoho.com/deluge/help/functions/string/getSuffixIgnoreCase

An example demonstrating the usage of the getSuffixIgnoreCase() function in Deluge. It shows how to find the text following 'AND' in a given string, ignoring the case of the search text.

```Deluge
inputText = "Split the text and get suffix of \"and\"" ;
newText = inputText .getSuffixIgnoreCase ( "AND" ) ;
info newText ; // Returns "get suffix of \"and\"
```

--------------------------------

### Deluge subBusinessDay() Examples

Source: https://www.zoho.com/deluge/help/functions/datetime/subBusinessDay

Provides practical examples of the subBusinessDay() function in Deluge. These examples illustrate subtracting business days with custom weekends and holidays, using default weekends, and applying the function to current date and time values.

```Deluge
info '21-Jul-2021'.subBusinessDay(5,{"Sunday"},{'20-Jul-2021','19-Jul-2021'}); // Returns 13-Jul-2021

```

```Deluge
info '21-Jul-2021'.subBusinessDay(5); // Returns 14-Jul-2021 considering Saturday and Sunday as Weekend

```

```Deluge
info zoho.currentdate.subBusinessDay(5,{"Sunday"},{'20-Jul-2021','19-Jul-2021'}); // Considering current date as 21-Jul-2021, it returns 13-Jul-2021

```

```Deluge
info zoho.currenttime.subBusinessDay(5,{"Sunday"},{'20-Jul-2021','19-Jul-2021'}); // Considering current date as 21-Jul-2021, it returns 13-Jul-2021
```

--------------------------------

### Deluge replaceFirstIgnoreCase() Example

Source: https://www.zoho.com/deluge/help/functions/string/replaceFirstIgnoreCase

An example of using the replaceFirstIgnoreCase() function in Deluge. It shows how to replace the first instance of 'ZOHO ' with 'Z' in a given input string, demonstrating case-insensitive replacement.

```Deluge
inputText = "Zoho Creator, Zoho Desk, Zoho CRM";
newText = replaceFirstIgnoreCase(inputText,"ZOHO ","Z"); // returns "ZCreator, Zoho Desk, Zoho CRM"
info newText;
```

--------------------------------

### Deluge: Working with Dates

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates common date operations, such as getting the current date, adding days to a date, and formatting dates.

```deluge
// Getting the current date
currentDate = today();
info "Current Date: " + currentDate;

// Adding 5 days to the current date
futureDate = currentDate.addDay(5);
info "Date after 5 days: " + futureDate;

// Formatting a date
formattedDate = futureDate.toString("MM-dd-yyyy");
info "Formatted Date: " + formattedDate;
```

--------------------------------

### Deluge: Creating a Product

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to create a new product in Zoho CRM, including setting the product name, code, and price.

```deluge
// Creating a new Product
productMap = Map();
productMap.put("Product_Name", "Premium Support Package");
productMap.put("Product_Code", "PSP-001");
productMap.put("Unit_Price", 500.00);
productMap.put("Commission_Rate", 10);

createProductResponse = zoho.crm.createRecord("Products", productMap);
info createProductResponse;
```

--------------------------------

### Zoho Books API Failure Response Examples

Source: https://www.zoho.com/deluge/help/books/fetch-records

These JSON examples illustrate potential failure responses from the Zoho Books API. One shows an error due to an invalid organization ID, and the other indicates an invalid search parameter was provided.

```json
{
"code":6041,
"message":"This user is not associated with the CompanyID/CompanyName:63XX."
}
```

```json
{
"code":2,
"message":"Invalid value passed for filter_by"
}
```

--------------------------------

### Fetch Record IDs in Deluge

Source: https://www.zoho.com/deluge/help/invoice/fetch-records

This Deluge code snippet demonstrates how to fetch records from a specified module and extract their IDs. It iterates through the response, assuming the response variable is named 'response_variable' and the module name is provided as a string. The example shows how to get the module name and then loop through each item to retrieve its ID.

```Deluge
var1 = <response_variable>.get("<module_name>");
// example for <module_name> is contacts
for each var2 in var1
{
info var2.get("<module_name>_id").toLong();
// example for <module_name>_id is contact_id
}
```

--------------------------------

### Calculate Months Between Dates using totalMonths() in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/totalmonth

This Deluge code snippet demonstrates how to use the totalMonths() function to calculate the number of months between a start date and an end date. It shows two common syntaxes for calling the function and provides examples with expected outputs.

```Deluge
startDate = '31-Dec-1989';
endDate = '01-Jan-1990';
newEndDate = '01-Feb-1990';
numberOfMonths = totalMonths(startDate, endDate); // returns 0
numOfMonths = totalMonths(startDate,newEndDate); // returns 1

startDate = '01-Feb-2020';
endDate = '01-Mar-2020';
info totalMonths(startDate, endDate); // returns 1
```

--------------------------------

### Deluge isEven Function Example 1

Source: https://www.zoho.com/deluge/help/functions/number/is-even

An example showing how to use the isEven function with a number variable and display the boolean result.

```deluge
number=1234;
result = number.isEven();
info result; // Returns 'true'
```

--------------------------------

### Deluge addBusinessDay() Examples

Source: https://www.zoho.com/deluge/help/functions/datetime/addbusinessday

Examples demonstrating the usage of the addBusinessDay() function in Deluge. The first example adds one business day to a specific date, and the second adds five business days, specifying Sunday as a weekend and a particular date as a holiday.

```Deluge
currentDate = '15-Mar-2019'; // is a Friday
newDate = currentDate.addBusinessDay(1); // returns '18-Mar-2019' which is Monday
```

```Deluge
newDate = zoho.currentdate.addBusinessDay(5, {"Sunday"}, {'25-May-2020'});
// assuming the current date is 23-May-2020, this task returns '30-May-2020'
```

--------------------------------

### Fetch Transitions for Service Appointments

Source: https://www.zoho.com/deluge/help/fsm/get-transitions

This Deluge script demonstrates how to fetch all possible transitions for a 'Service_Appointments' record with a specific ID using the `zoho.fsm.getTransitions` task. It initializes an empty map for optional data and specifies the FSM connection name.

```Deluge
emptyMap = Map();
response = zoho.fsm.getTransitions("Service_Appointments", 23033XXXXXXXXXXXXXX, emptyMap, "fsm_connection");

info response;
```

--------------------------------

### Accessing Timezone from Parse Phone Number Response

Source: https://www.zoho.com/deluge/help/ai-tasks/parse-phone-number

After using the `zoho.ai.parsePhoneNumber` function, you can access specific details from the returned KEY-VALUE response. This example demonstrates how to retrieve the timezone information using the `get()` function.

```deluge
info response.get("timezone");
```

--------------------------------

### Example: Fetching record IDs based on designation in Deluge

Source: https://www.zoho.com/deluge/help/data-access/fetch-records/fetch-all-field-values

An example demonstrating how to fetch the IDs of records where the 'Designation' is 'Member Technical Staff' and add them to the 'Employee_Name' lookup field.

```Deluge
EmployeeName = Employee[Designation == "Member Technical Staff"].ID.getall();
Employee_Name:ui.add(EmployeeName);
```

--------------------------------

### Configure Basic Authentication in Zoho Deluge

Source: https://www.zoho.com/deluge/help/deluge-connections

This snippet describes the setup for Basic authentication in Zoho Deluge. It requires providing a username and password, which are then automatically encrypted using base64 and passed as a header.

```Deluge
Username and password will be automatically encrypted with base64 algorithm and passed as header in the format: basic <encrypted_username>:<encrypted_password>.
```

--------------------------------

### Deluge replaceAllIgnoreCase() Example

Source: https://www.zoho.com/deluge/help/functions/string/replaceAllIgnoreCase

An example of the replaceAllIgnoreCase() function in Deluge, showing how to replace all occurrences of 'ZOHO ' with 'Z' in a given input string, ignoring case.

```Deluge
inputText = "Zoho Creator, Zoho Desk, Zoho CRM";
newText = replaceAllIgnoreCase(inputText,"ZOHO ","Z"); // returns "ZCreator, ZDesk, ZCRM"
info newText;
```

--------------------------------

### Deluge workDaysList Example

Source: https://www.zoho.com/deluge/help/functions/datetime/work-days-list

An example demonstrating how to use the workDaysList function in Deluge to find workdays between '1-Jan-2020' and '6-Jan-2020', specifying weekends and holidays.

```Deluge
start_date= "1-Jan-2020";
end_date = "6-Jan-2020";
work_days =  start_date.workDaysList(end_date, {"Saturday","Sunday"},{"02-Jan-2020","03-Jan-2020"}); // work_days is assigned the value 'Wed Jan 01 00:00:00 PST 2020,Mon Jan 06 00:00:00 PST 2020,Tue Jan 07 00:00:00 PST 2020'
```

--------------------------------

### Zoho Writer to Zoho People Integration

Source: https://www.zoho.com/deluge/help/integration-tasks

Example of sharing a Zoho Writer document with employees fetched from Zoho People using `zoho.writer.shareDocument` and `zoho.people.getRecords` tasks.

```Deluge
employees = zoho.people.getRecords("Employees");
zoho.writer.shareDocument("Document ID", employees, "email");

```

--------------------------------

### Zoho Creator: Zoho Projects Integration Tasks

Source: https://www.zoho.com/deluge/help/release-notes

Zoho Creator now supports integration tasks for Zoho Projects, specifically 'create project' and 'get portals'. These tasks were previously available in other Zoho services.

```Deluge
// Example of creating a project in Zoho Projects from Zoho Creator
project_details = {
    "projectName": "New Project",
    "projectOwner": "user@example.com"
};
create_project(project_details);

// Example of getting Zoho Projects portals
portals = get_portals();
info portals;
```

--------------------------------

### Sample Salesforce Success Response

Source: https://www.zoho.com/deluge/help/salesforce/fetch-records

A sample JSON response from Salesforce after successfully fetching account records, including 'done', 'records', and 'totalSize' fields.

```json
{
"done":true,
"records":"[{\"Name\":\"Henry\",\"Id\":\"00190000010bZ88AAE\",\"attributes\":
{\"type\":\"Account\",\"url\":\"/services/data/v20.0/sobjects/Account/00190000010bZ88AAE\"},\"Industry\":\"Chemicals\"}]",
"totalSize":1
}
```

--------------------------------

### Deluge: Get Rank of a Number in a Collection (Ascending)

Source: https://www.zoho.com/deluge/help/functions/number/rank

This example shows how to use the rank() function in Deluge with the 'asc' parameter to find the position of a number within a collection when sorted in ascending order. It handles decimal values.

```Deluge
marks = Collection(120.12,65,300.46,600.25,80.5);
order = marks.rank(80.5, "asc"); // the variable order is assigned the value 2 as the elements are sorted in ascending order
```

--------------------------------

### Deluge addDay() Function Examples

Source: https://www.zoho.com/deluge/help/functions/datetime/addday

Provides examples of using the addDay() function in Deluge to add days to both a date and a date-time value. It shows the expected output for each operation.

```Deluge
currentDate = '01-Jan-2019';
currentDateTime = '01-Jan-2019 15:00:00';
newDate = currentDate.addDay(11); 
newDateTime = currentDateTime.addDay(40);
```

--------------------------------

### Update Batch Sequence Example in Deluge

Source: https://www.zoho.com/deluge/help/collection-variable

An example showing how to update the 'Batch_Sequence' field to '118' for all records in the 'employeesJoinedToday' collection.

```deluge
for each emp in employeesJoinedToday {
  emp.Batch_Sequence = 118;
}
```

--------------------------------

### Deluge Example: Daily Work Status

Source: https://www.zoho.com/deluge/help/conditional-statements/condition

An example demonstrating the use of if-else if-else statements to display a message based on the current day of the week.

```deluge
if(zoho.currentdate.weekday()==7)   
{
info "Today is a Holiday";
}
else if(zoho.currentDate.weekday()==6)  
{
info "Today is a half working day";
}
else  
{
info "Today is a working day";
}
```

--------------------------------

### Deluge: Get Rank of a Number in a Collection (Descending)

Source: https://www.zoho.com/deluge/help/functions/number/rank

This example demonstrates how to use the rank() function in Deluge to find the position of a number within a collection when sorted in descending order. The collection must contain numerical values.

```Deluge
marks = Collection(300,455,124,926,780);
order = marks.rank(300); // the variable order is assigned the value 4
```

--------------------------------

### Deluge Integration Example: Zoho Recruit to Zoho Calendar

Source: https://www.zoho.com/deluge/help/index

Illustrates integrating Zoho Recruit with Zoho Calendar. When a candidate is short-listed, their data is automatically pushed to the HR representative's calendar for interview scheduling. This highlights Deluge's cross-product integration capabilities.

```Deluge
// Assuming 'candidate' is a map with candidate details and 'hrRepEmail' is the HR representative's email
interviewEvent = map();
interviewEvent.put("subject", "Interview for " + candidate.get("name"));
interviewEvent.put("when", "2023-10-27T10:00:00Z"); // Example date and time
interviewEvent.put("email", hrRepEmail);

response = zoho.calendar.createEvent(interviewEvent);

```

--------------------------------

### Deluge Integration Example: Zoho BugTracker to Zoho Desk

Source: https://www.zoho.com/deluge/help/index

Shows how Deluge can push bug data from Zoho BugTracker to Zoho Desk for customer ticket management. This demonstrates seamless data transfer between different Zoho services for streamlined workflows.

```Deluge
// Assuming 'bug' is a map with bug details from Zoho BugTracker
newTicket = map();
newTicket.put("subject", "Bug: " + bug.get("title"));
newTicket.put("description", bug.get("details"));
newTicket.put("priority", bug.get("severity")); // Mapping severity to priority

response = zoho.desk.createTicket(newTicket);

```

--------------------------------

### Fetch Tickets Related to a Contact in Zoho Desk

Source: https://www.zoho.com/deluge/help/desk/fetch-related-records

This Deluge script retrieves all 'tickets' associated with a specific 'contact' record in Zoho Desk. It requires the organization ID, submodule name ('tickets'), parent module name ('contacts'), the contact's record ID, and connection details. The example shows how to fetch 10 records starting from index 1.

```deluge
queryValue = {"":""};
response = zoho.desk.getRelatedRecords(641XXXXXX, "tickets", "contacts", 168XXXXXXXXXXXX043, 1, 10, queryValue, "desk_connection");
```

--------------------------------

### Create Index-Value Collection - Deluge

Source: https://www.zoho.com/deluge/help/datatypes/collection

This Deluge example creates an index-value collection named 'gadgets' and initializes it with 'Mobile phone' and 'Laptop'.

```Deluge
gadgets = Collection("Mobile phone","Laptop");
```

--------------------------------

### Deluge: Get Value from Map/List using get

Source: https://www.zoho.com/deluge/help/functions/getjson-and-get

The `get` function in Deluge retrieves values from a key-value collection (map) or an index-value collection (list) using either a key or an index. It can handle various data types for keys.

```Deluge
<variable>  =  <map_or_list>.get(<key_or_index>);
```

--------------------------------

### Deluge containKey() Example

Source: https://www.zoho.com/deluge/help/functions/map/containkey

Demonstrates how to use the containKey() function in Deluge to check for the existence of a key within a map. It shows examples returning both true and false.

```deluge
mapVar = {"Product" : "Creator", "Company" : "Zoho"};
boolVal = mapVar.containKey("product"); //returns false
newBoolVal = mapVar.containKey("Product"); //returns true
```

--------------------------------

### Deluge sendmail Reply-To Address Examples

Source: https://www.zoho.com/deluge/help/misc-statements/send-mail

Demonstrates how to specify multiple reply-to email addresses for the sendmail function in Zoho Deluge. It shows examples using a LIST and comma-separated text values.

```deluge
replyToAddresses = List();
replyToAddresses.add("shawn@zylker.com");
replyToAddresses.add("hailee@zylker.com");
replyToAddresses.add("brent@zylker.com");
```

```deluge
replyToAddresses = "shawn@zylker.com, hailee@zylker.com, brent@zylker.com";
```

```deluge
reply to = "shawn@zylker.com", "hailee@zylker.com", "brent@zylker.com"
```

--------------------------------

### Deluge Example: Sum of Employee Amounts

Source: https://www.zoho.com/deluge/help/data-access/aggregate-records/sum

Provides a practical example of the Deluge sum function. This snippet calculates the total 'amount' from all records in the 'Employees' form where the ID is not 0.

```Deluge
EmployeeDetails = Employees [ ID != 0 ].sum(amount);
```

--------------------------------

### Deluge: Creating a Lead Source

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to create a new lead source in Zoho CRM.

```deluge
// Creating a new Lead Source
leadSourceMap = Map();
leadSourceMap.put("Lead_Source", "Webinar");
leadSourceMap.put("Description", "Leads generated from webinars.");

createLeadSourceResponse = zoho.crm.createRecord("Lead_Sources", leadSourceMap);
info createLeadSourceResponse;
```

--------------------------------

### Get Zoho People Field Label Names

Source: https://www.zoho.com/deluge/help/people/attributes

This snippet guides users on how to obtain the label names for specific fields within a Zoho People form. The process involves accessing form customization settings, selecting a form, and then inspecting the properties of individual fields.

```Deluge
Navigate to Settings -> Forms under Customization.
Select the required form, then click on the specific field to find its label name under field properties.
```

--------------------------------

### Upload File to FTP Server

Source: https://www.zoho.com/deluge/help/ftp-task

This Deluge script provides an example of uploading a file to an FTP server. It specifies the action as 'upload', along with the host, port, path, the file object to be uploaded, and the connection name.

```deluge
// Upload file to FTP server
uploadFtp = ftp
[
action : upload
host : "ftp.examplehost.com"
port : 21
path : "/home/uploads/"
files : textFile
connection : "ftp_connection"
];
info uploadFtp;

```

--------------------------------

### Deluge Number Data Type Example

Source: https://www.zoho.com/deluge/help/datatypes/number

This example demonstrates the declaration and usage of the Number data type in Deluge. It shows how an integer value is assigned to a variable.

```Deluge
Version = 5;
```

--------------------------------

### Deluge round() Function Examples

Source: https://www.zoho.com/deluge/help/functions/number/round

Provides various examples of the Deluge round() function with different numerical expressions and rounding precisions, illustrating its behavior with positive, negative, and zero precision.

```Deluge
number1 = -218.4.round(0); // .4 is dropped as precision is 0 and -218 gets assigned to number1
number2 = 218.5.round(0); // the value 219 gets assigned to number2
number3 = 218.49.round(1); // the value 218.5 gets assigned to number3
number4 = 218.44.round(1); // the value 218.4 gets assigned to number4
number5 = 214.2.round(-1); // the value 210 gets assigned to number5
number6 = 218.2.round(-1); // the value 220 gets assigned to number6
number7 = 218.2.round(-2); // the value 200 gets assigned to number7
number8 = 294.2.round(-2); // the value 300 gets assigned to number8
number9 = 218.222.round(-3); // the value 0 gets assigned to number9
number10 = -150.55.round(-2); // the value -200 gets assigned to number10
number11 = -192.66.round(-1); // the value -190 gets assigned to number11
number12 = 1.4+3.6.round(0); // the value 5.4 gets assigned to number12
number13 = (1.4+3.6).round(0); // the value 5 gets assigned to number13
```

--------------------------------

### Deluge Example: Form Submission Agreement Check

Source: https://www.zoho.com/deluge/help/conditional-statements/condition

An example that prevents form submission if the 'Accept_Agreement' checkbox is not checked, using an if statement.

```deluge
if(!(input.Accept_Agreement))  
{
alert "Please Accept the agreement and press submit";
cancel submit;
}
```

--------------------------------

### Zoho Mail to Zoho Cliq Integration

Source: https://www.zoho.com/deluge/help/integration-tasks

Example of posting email content to a Zoho Cliq channel using the `zoho.cliq.postToChannel` integration task.

```Deluge
zoho.cliq.postToChannel("Channel Name", "Email Subject", "Email Body");

```

--------------------------------

### Deluge isEmpty() Example: List

Source: https://www.zoho.com/deluge/help/functions/collection/isempty

This example demonstrates the usage of the isEmpty() function with a Deluge list. It shows that a list containing elements returns false, as expected.

```Deluge
listVar = {"Projects", "Mail", {"Zoho Creator", "Zoho CRM"}};
info listVar.isEmpty(); //returns false
```

--------------------------------

### Deluge addYear() Examples

Source: https://www.zoho.com/deluge/help/functions/datetime/addyear

Provides practical examples of using the addYear() function in Deluge. It shows how to add years to a date string and a date-time string, illustrating the expected output format.

```Deluge
currentDate = '01-Jan-2019';
currentDateTime = '01-Jan-2019 15:00:00';
newDate = currentDate.addYear(100); // returns '01-Jan-2119 00:00:00'
newDateTime = currentDateTime.addYear(10); // returns '01-Jan-2029 15:00:00'
```

--------------------------------

### Deluge nthSmallest Function Example

Source: https://www.zoho.com/deluge/help/functions/number/nth-smallest

This example demonstrates how to use the nthSmallest function in Deluge. It initializes a collection of numbers, finds the 2nd smallest number, and prints the result.

```deluge
marks = {300,455,124,926,780};
result = marks.nthSmallest(2);
info result;
```

--------------------------------

### Deluge: Creating a Solution

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script shows how to create a new solution in Zoho CRM, including setting the solution title and status.

```deluge
// Creating a new Solution
solutionMap = Map();
solutionMap.put("Solution_Title", "How to reset password");
solutionMap.put("Solution_Content", "Follow these steps to reset your password...");
solutionMap.put("Status", "Approved");

createSolutionResponse = zoho.crm.createRecord("Solutions", solutionMap);
info createSolutionResponse;
```

--------------------------------

### Deluge put() Function Example

Source: https://www.zoho.com/deluge/help/functions/map/put

This example demonstrates how to use the `put()` function in Deluge to add key-value pairs to a map. It shows how a new key-value pair is added and how an existing key's value is overwritten.

```deluge
Products = map(); 

Products.put("Creator", 4);
Products.put("CRM", 3);
Products.put("Creator", 5); 
// Now the map will contain {"Creator" : 5, "CRM" : 3}
```

--------------------------------

### Configure Basic Authentication in Zoho Deluge

Source: https://www.zoho.com/deluge/help/connections

This snippet describes the setup for Basic authentication in Zoho Deluge. It requires providing a username and password, which are then automatically encrypted using base64 and passed as a header.

```Deluge
Username and password will be automatically encrypted with base64 algorithm and passed as header in the format: basic <encrypted_username>:<encrypted_password>.
```

--------------------------------

### Send Email with Basic Details

Source: https://www.zoho.com/deluge/help/misc-statements/send-mail

A basic example of the sendmail task in Zoho Deluge, specifying sender, recipient, CC, reply-to, subject, and message content. It demonstrates sending a simple email.

```deluge
sendmail [
from: zoho.adminuserid
to: "shawn@zylker.com"
cc: "salesmanager@zoho.com"
reply to: "support@zohocreator.com"
subject: "Welcome to Zoho Creator"
message: "<p>Your registration with Basic Plan is successful. You have selected the following Add-on:</p><ul><li>Customer Portal - 500 users</li></ul>"
]
```

```deluge
sendmail
                [
                    from :"John <" + zoho.loginuserid + ">"
                    to :"john@zylker.com"
                    cc:"salesmanager@zoho.com"
                    reply to :"support@zohocreator.com"
                    subject :"Team meeting"
                    message :"Let's meet at 5"
                ]
```

```deluge
sendmail
                [
                    from :"John <" + zoho.adminuserid + ">"
                    to :"john@zylker.com"
                    cc:"salesmanager@zoho.com"
                    reply to :"support@zohocreator.com"
                    subject :"Team meeting"
                    message :"Let's meet at 5"
                ]
```

```deluge
sendmail   
[
from: "Shawn <shawn@zylker.com>"   
to: "john@zylker.com"
cc: "salesmanager@zoho.com"
reply to: "support@zohocreator.com"
subject: "Team meeting"
message: "Let's meet at 5"
]
```

--------------------------------

### Deluge clear() Function Example

Source: https://www.zoho.com/deluge/help/functions/collection/clear

Demonstrates how to use the clear() function in Deluge to empty a collection. The example initializes a collection with product versions and then clears it, showing the resulting empty collection.

```deluge
productVersion = collection("Deluge" : 5, "CRM" : 2, "Mail" : 8);
productVersion.clear();
info productVersion; // Returns {}
```

--------------------------------

### Deluge isEmpty() Example: Map

Source: https://www.zoho.com/deluge/help/functions/collection/isempty

This example illustrates the isEmpty() function with a Deluge map. After reassigning an empty map literal, isEmpty() returns true.

```Deluge
mapVar = Map({"key1":"value1", "key2":"value2"});
mapVar = {};
info mapVar.isEmpty(); //returns true
```

--------------------------------

### Deluge leftpad() Example

Source: https://www.zoho.com/deluge/help/functions/string/leftpad

Demonstrates how to use the leftpad() function in Deluge to left-pad a string with spaces. The function takes the original text and the desired total length as arguments.

```deluge
text = "Left";
newText = text.leftpad(6);
//returns " Left"
```

--------------------------------

### Deluge isOdd Function Example 1

Source: https://www.zoho.com/deluge/help/functions/number/is-odd

An example showing how to use the isOdd function with a number variable. It assigns a number to a variable, calls the isOdd method on it, and then displays the boolean result.

```Deluge
number=1234;
result = number.isOdd();
info result; // Returns 'false'
```

--------------------------------

### Deluge: Using the 'invokeurl' task

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script shows how to make an HTTP request to an external API using the 'invokeurl' task. It demonstrates GET and POST requests.

```deluge
// Example of a GET request
responseGet = invokeurl
[
    url: "https://api.example.com/data",
    type: "GET"
];
info "GET Response: " + responseGet;

// Example of a POST request
postData = "{\"name\": \"Test\", \"value\": 123}";
responsePost = invokeurl
[
    url: "https://api.example.com/submit",
    type: "POST",
    parameters: postData
];
info "POST Response: " + responsePost;
```

--------------------------------

### Deluge isEmpty() Example: Collection

Source: https://www.zoho.com/deluge/help/functions/collection/isempty

This example shows how to use the isEmpty() function with a Deluge Collection. An empty Collection correctly returns true when checked with isEmpty().

```Deluge
collVar = Collection();
info collVar.isEmpty(); //returns true
```

--------------------------------

### Deluge repeat() Function Example

Source: https://www.zoho.com/deluge/help/functions/string/repeat

An example showing how to use the repeat() function in Deluge. It assigns the string 'Zoho' to inputText and then uses repeat(3) to create outputText containing 'Zoho' repeated three times.

```Deluge
inputText = "Zoho";
outputText = inputText.repeat(3);
info outputText; // Returns ZohoZohoZoho
```

--------------------------------

### Deluge removeFirstOccurence() Example

Source: https://www.zoho.com/deluge/help/functions/string/removefirstoccurence

This example demonstrates how to use the removeFirstOccurence() function in Deluge to remove the first occurrence of a specified substring from a string. The function is case-sensitive.

```Deluge
Product="Zoho Creator 5";
newText = Product.removeFirstOccurence("5");
// returns "Zoho Creator "
```

--------------------------------

### Deluge SDP Cloud Invoke URL Syntax

Source: https://www.zoho.com/deluge/help/sdp/sdp-invokeurl

The basic syntax for the 'zoho.sdp.invokeUrl' task in Deluge, outlining the available parameters for making API requests to SDP Cloud.

```deluge
response = invokeUrl
[
 url: <url_value>
 type: [<type_value>]
 headers: [<headers_value>]
 content-type: [<content_type_value>]
 parameters: [<parameters_value>]
 detailed: [<detailed_value>]
 response-format: [<response_format_value>]
 response-decoding: [<encoding_format_value>]
];

```

--------------------------------

### Deluge nthLargest Function Example

Source: https://www.zoho.com/deluge/help/functions/number/nth-largest

This example demonstrates how to use the nthLargest function in Deluge. It initializes a collection of numbers, finds the 5th largest number, and prints the result.

```Deluge
marks = Collection(300,455,124,926,780);
result = marks.nthlargest(5);
info result;
```

--------------------------------

### Fetch Zoho Sign Templates

Source: https://www.zoho.com/deluge/help/script/sign/fetch-templates

Retrieves a list of all templates from Zoho Sign using the `zoho.sign.getTemplates` task. This task can optionally accept query values and a connection name.

```deluge
response = zoho.sign.getTemplates();
```

--------------------------------

### Deluge Boolean Expression Example

Source: https://www.zoho.com/deluge/help/expression

Illustrates the use of a boolean expression in a Deluge conditional statement. This example shows how to compare two variables and execute code based on the result.

```Deluge
if ( a == b ) // (a == b) is a boolean expression
{
<actions_to_be_executed>
}
```

--------------------------------

### Deluge Example: Check if Fetched File is Valid

Source: https://www.zoho.com/deluge/help/functions/common/is-file

An example showing how to fetch a file from a URL using invokeUrl and then use the isFile function to check if it's a valid file object in Deluge.

```Deluge
file_object = invokeUrl
[
    url: "http://www.thenonlinearpath.com/wp-content/uploads/2016/05/GoodVibesOnly.png"
    type: GET
];
if(file_object.isFile()){
    // Do something
}
```

--------------------------------

### Generate Random Number in Deluge

Source: https://www.zoho.com/deluge/help/functions/number/randomnumber

The randomNumber function in Deluge generates a random number between a specified start and end limit. The function returns a decimal if either the start or end limit is a decimal; otherwise, it returns a whole number. The generated number includes the start limit but excludes the end limit.

```Deluge
response1 = randomnumber(1,3);
//returns 1 or 2
info response1;
response2 = randomnumber(1.789,34.54);
//returns a random decimal between 1.789 and 34.53
info response2;
response3 = randomnumber(5,123.4);
//returns a random decimal between 5 and 123.3
info response3;
```

--------------------------------

### Fetch File from Web for Upload

Source: https://www.zoho.com/deluge/help/writer/upload-document

Fetches a file from a specified URL using the `invokeUrl` task, preparing it for upload to Zoho Writer. This is a prerequisite step before calling the `zoho.writer.uploadDocument` function.

```deluge
file_invoked = invokeUrl
[
url: "http://homepages.inf.ed.ac.uk/neilb/TestWordDoc.doc"
type: GET
];
```

--------------------------------

### Deluge Time Data Type Examples

Source: https://www.zoho.com/deluge/help/datatypes/time

Demonstrates how to declare time values using the Deluge programming language in Zoho Creator. It shows examples for both 24-hour and 12-hour formats.

```Deluge
available_from  =  '19:00:00';
closing_at  =  '06:00:00 PM';
```

--------------------------------

### Create SDP Cloud Record using Deluge

Source: https://www.zoho.com/deluge/help/sdp/create-record

This Deluge script demonstrates how to create a new record in the 'Request' module of SDP Cloud. It defines a map with record values and uses the `zoho.sdp.create` task to insert the data.

```Deluge
recordValue = Map();
recordValue.put("subject", "OS installation");
recordValue.put("requester", {"name":"Shawn"});
recordValue.put("category", {"name":"Operating System"});
recordValue.put("subcategory", {"name":"Windows XP"});

response = zoho.sdp.create("Request", recordValue, "", "sdp_connection");
```

--------------------------------

### Deluge addWeek() Examples

Source: https://www.zoho.com/deluge/help/functions/datetime/addweek

Provides examples of using the addWeek() function in Deluge to add weeks to both date and date-time values. It shows the expected output for adding a specific number of weeks.

```Deluge
currentDate = '01-Jan-2019';
currentDateTime = '01-Jan-2019 15:00:00';
newDate = currentDate.addWeek(10); 
newDateTime = currentDateTime.addWeek(55);
```

--------------------------------

### Download File from FTP Server

Source: https://www.zoho.com/deluge/help/ftp-task

This Deluge script demonstrates how to download a file from an FTP server. It includes the action 'download', the host, port, the specific path to the file, and the connection name.

```deluge
// Download file from FTP server
downloadFtp = ftp
[
action : download
host : "ftp.examplehost.com"
port : 21
path : "/home/uploads/example.png"
connection : "ftp_connection"
];
info downloadFtp;

```

--------------------------------

### Deluge isAscii() Examples

Source: https://www.zoho.com/deluge/help/functions/string/isAscii

Provides examples of using the isAscii() function with different text inputs to check for ASCII characters. It shows cases returning true for valid ASCII and empty strings, and false for non-ASCII characters.

```deluge
inputText = "Hello$World123" ;
info inputText.isAscii(); // Returns true 

inputText = "" ;
info inputText.isAscii(); // Returns true 

inputText = "ß" ;
info inputText.isAscii(); // Returns false
```

--------------------------------

### Deluge percentile Function Example

Source: https://www.zoho.com/deluge/help/functions/number/percentile

This example demonstrates how to calculate the 50th percentile of a collection of numbers using the Deluge percentile function. It includes the collection definition and the function call.

```Deluge
marks = Collection(300,455,124,926,780);
info marks.percentile(50); // returns 455
```

--------------------------------

### Deluge isOdd Function Example 2

Source: https://www.zoho.com/deluge/help/functions/number/is-odd

An example demonstrating the use of the isOdd function as a standalone function. It assigns a number to a variable, calls the isOdd function with the variable as an argument, and then displays the boolean result.

```Deluge
number=111;
result = isOdd(number);
info result; // Returns 'true'
```

--------------------------------

### Get Fillable Templates with Custom Settings in Zoho Writer

Source: https://www.zoho.com/deluge/help/writer/get-fillable-template

This Deluge script demonstrates how to fetch a list of fillable templates from Zoho Writer. It utilizes optional settings to specify the offset, limit, sorting criteria (by modified time in descending order), and category (all templates). A Zoho OAuth connection named 'writer_oauth_connection' is required.

```Deluge
optional_settings = Map();
optional_settings.put("offset", "0");
optional_settings.put("limit", "5");
optional_settings.put("sortby", "modified_time");
optional_settings.put("sort_order_by", "descending");
optional_settings.put("category", "all");
response = zoho.writer.getFillableTemplates(optional_settings, "writer_oauth_connection");
info response;
```

--------------------------------

### Deluge: Creating an Opportunity

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to create a new opportunity in Zoho CRM, including setting the opportunity name, stage, and amount.

```deluge
// Creating a new Opportunity
opportunityMap = Map();
opportunityMap.put("Opportunity_Name", "Project Alpha Deal");
opportunityMap.put("Stage", "Qualification");
opportunityMap.put("Amount", 15000.00);
opportunityMap.put("Account_Name", "Global Corp");

createOpportunityResponse = zoho.crm.createRecord("Potentials", opportunityMap);
info createOpportunityResponse;
```

--------------------------------

### Deluge get() Function Syntax

Source: https://www.zoho.com/deluge/help/functions/map/get

This snippet shows the basic syntax for using the get() function in Deluge to retrieve a value from a map variable. It illustrates how to assign the returned value to a variable.

```Deluge
<variable> = <mapVariable>.get(<searchkey>);
```

--------------------------------

### Deluge text() Formatting Examples

Source: https://www.zoho.com/deluge/help/functions/number/text

Demonstrates various formatting applications of the text() function in Deluge, including number padding, currency, date components, and time.

```Deluge
leadingZero = 2434.text("000000000"); // 000002434
```

```Deluge
separateValue = "123123456".text("##,###"); // 123,123,456
```

```Deluge
dayOfYear = "02/04/2020".text("DDD"); // 035
```

```Deluge
monthOfYear = "02/04/2020".text("MM"); // 02
```

```Deluge
dayName = "02/04/2020".text("EEEE"); // Tuesday
```

```Deluge
currencyFormat = "12345654.1234".text("$#,##0.00"); // $12,345,654.12
```

```Deluge
dateFormat = zoho.currenttime.text("MM/dd/YY"); // 02/04/20
```

```Deluge
dateFormat2 = zoho.currentdate.text("MMM dd, yy 'at' hh:mm:ss, E"); // Feb 04, 20 at 12:00:00, Tue
```

```Deluge
noParam = zoho.currenttime.text(); // Run-time error: No. of arguments mismatches for the function text
```

--------------------------------

### Deluge Text Data Type Example

Source: https://www.zoho.com/deluge/help/datatypes/text

This example demonstrates the declaration and assignment of text (string) variables in Deluge. It shows how to store names, addresses, and numeric sequences as strings, enclosed in double quotes.

```Deluge
Name = "John";

Address = "Zoho Corporation, 4141 Hacienda Drive, Pleasanton, California 94588, USA";

Num = "1234567890";
```

--------------------------------

### Fetch Records from SDP Cloud Module

Source: https://www.zoho.com/deluge/help/sdp/get-records

The `zoho.sdp.getRecords` task retrieves records from a specified module in SDP Cloud. It requires the module name, starting index, number of records to fetch, search criteria, account name, and connection details.

```Deluge
response = zoho.sdp.getRecords("Request", 1, 4, search_map, "", "sdp_connection");
```

```Deluge
criteria_map = Map();
criteria_map.put("field", "subject");
criteria_map.put("condition", "is");
criteria_map.put("value", "OS installation");

search_map = Map();
search_map.put("search_criteria", criteria_map);
```

--------------------------------

### Deluge: Initialize a List

Source: https://www.zoho.com/deluge/help/datatypes/list

This example demonstrates how to initialize a list in Deluge with multiple string elements. Lists in Deluge can hold a collection of values, and elements can be of different data types.

```Deluge
ZohoProducts = {"Creator", "CRM", "Projects", "Campaigns"};

```

--------------------------------

### Get Zoho Writer Merge Templates

Source: https://www.zoho.com/deluge/help/writer/get-merge-templates

Lists all merge templates from Zoho Writer, allowing for customization of offset, limit, sorting, and category. This task is based on the Zoho Writer Get Merge Templates API and is applicable to all services except Zoho Creator.

```Deluge
optional_settings = Map();
optional_settings.put("offset", "0");
optional_settings.put("limit", "5");
optional_settings.put("sortby", "modified_time");
optional_settings.put("sort_order_by", "descending");
optional_settings.put("category", "all");
response = zoho.writer.getMergeTemplates(optional_settings, "writer_oauth_connection");
info response;
```

--------------------------------

### Deluge indexOf() Example

Source: https://www.zoho.com/deluge/help/functions/list/indexof

This example demonstrates how to use the indexOf() function in Deluge to find the index of an element within a list. It shows the declaration of a list and the retrieval of the index for a specific element.

```deluge
listVar = {"Creator", "CRM", "Projects"};
firstIndex = listVar.indexOf("Creator"); //returns 0
```

--------------------------------

### Zoho Deluge Failure Response Examples (JSON)

Source: https://www.zoho.com/deluge/help/inventory/create-record

This section provides examples of failure responses from Zoho Deluge API calls in JSON format. It covers scenarios such as an invalid organization ID, missing mandatory parameters, and attempts to create duplicate records.

```JSON
{
"code": 6041,
"message": "This user is not associated with the CompanyID/CompanyName: 58XXXX50."
}
```

```JSON
{
"code": 11,
"message": "The parameter JSONString is mandatory."
}
```

```JSON
{
"code": 3062,
"message": "The customer \"Shawn\" already exists. Please specify a different name."
}
```

--------------------------------

### Generate Application URL

Source: https://www.zoho.com/deluge/help/system-variables

This Deluge script snippet shows how to construct the URL for a Zoho Creator application using predefined variables like zoho.adminuser and zoho.appname.

```Deluge
baseURL = (("http://app.zohocreator.com/" + zoho.adminuser) + "/") + zoho.appname;
```

--------------------------------

### Deluge getPrefix() Example

Source: https://www.zoho.com/deluge/help/functions/string/getPrefix

Demonstrates how to use the getPrefix() function in Deluge to extract characters preceding a specific substring. The function takes the main string and the search string as arguments and returns the preceding characters.

```deluge
text = "Zoho Creator is an online database service, which helps you create custom applications" ;
newText = text.getPrefix(",");
//returns "Zoho Creator is an online database service"
```

--------------------------------

### Deluge subMonth() Example

Source: https://www.zoho.com/deluge/help/functions/datetime/submonth

This example demonstrates how to use the subMonth() function in Deluge to subtract one month from a given date. The function returns the new date in the specified format.

```deluge
currentDate = '01-Jan-2019';
newDate = currentDate.subMonth(1); // returns '01-Dec-2018 00:00:00'
```

--------------------------------

### Deluge: Fetching Lead Sources

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to fetch lead sources from Zoho CRM, filtering them by name.

```deluge
// Fetching lead sources named 'Webinar'
leadSourcesList = zoho.crm.getRecords("Lead_Sources", "all", "Lead_Source.ASC", "Lead_Source=Webinar");

// Displaying the fetched lead sources
info leadSourcesList;
```

--------------------------------

### Deluge: Fetching Campaigns

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script shows how to fetch campaigns from Zoho CRM, filtering them by type and sorting by start date.

```deluge
// Fetching campaigns of type 'Email'
campaignsList = zoho.crm.getRecords("Campaigns", "all", "Start_Date.ASC", "Campaign_Type=Email");

// Displaying the fetched campaigns
info campaignsList;
```

--------------------------------

### Send Offer Letter for Signing

Source: https://www.zoho.com/deluge/help/writer/merge-and-sign

This script demonstrates sending an offer letter for signing. It configures the document with candidate-specific details and sends it to the HR for approval and then to the candidate for signing. The example highlights setting recipient actions and language preferences.

```deluge
document_id = "po5uobda049e029d44b13a9956f6d2cedc67b";

fields = Map(); 
fields.put("Date","27 May 2022"); 
fields.put("Recipients_name","Mikeal"); 
fields.put("Position","Support Engineer");

data_map = Map();
data_map.put("data", fields)
merge_details = Map();
merge_details.put("merge_data", data_map);

String filename = "Offer Letter";

signerList = List(); 
signerObj1 = Map(); 
signerObj1.put("recipient_1","Hr-operations@zylker.com"); 
signerObj1.put("action_type","approve");  //approve|sign|view  
signerObj1.put("language","en"); 

signerObj2 = Map(); 
signerObj2.put("recipient_2","mikeal@test.com"); 
signerObj2.put("action_type","sign");  //approve|sign|view  
signerObj2.put("language","fr");

signerList.add(signerObj1); 
signerList.add(signerObj2);

option_settings = Map();

option_settings.put("sign_in_order","true");
option_settings.put("message", "Kindly read all the details in the document properly and accept it by signing");   
option_settings.put("set_expire", "30");
option_settings.put("reminder_period", "15");

response = zoho.writer.mergeAndSign(document_id, merge_details, filename, signerList, option_settings, "writer_oauth_connection");

info response;

```

--------------------------------

### Deluge distinct() Function Example

Source: https://www.zoho.com/deluge/help/functions/list/distinct

This example demonstrates how to use the distinct() function in Deluge. It initializes a list with duplicate values and then uses distinct() to create a new list with only unique elements.

```deluge
listVar = {"1", 1, 1, 2, 2, 3};
uniqueList = listVar.distinct(); 
Info uniqueList;
//returns {1, 1, 2, 3}
```

--------------------------------

### Fetch File and Get Size in Deluge

Source: https://www.zoho.com/deluge/help/file/get-file-size

This Deluge script demonstrates how to fetch a file from a URL using the invokeUrl task and then get its size in bytes using the getFileSize method. The file size is returned as a TEXT response.

```Deluge
// to fetch file from the cloud using invokeUrl task
 fileVariable = invokeUrl
 [
 url: "
http://insight.dev.schoolwires.com/HelpAssets/C2Assets/C2Files/C2ImportCalEventSample.csv"
 type: GET
];

// to fetch the size of the file
response = fileVariable.getFileSize(); // returns 545 (bytes)
```

--------------------------------

### Deluge addMinutes Date-Time Example

Source: https://www.zoho.com/deluge/help/functions/datetime/addminutes

Provides examples of using the addMinutes function with date-time values in Deluge. It shows how adding minutes affects the date and time, including crossing midnight.

```Deluge
currentDate = '01-Jan-2019';
info currentDate.addMinutes(1); // Returns '01-Jan-2019 00:01:00'
```

```Deluge
currentDate = '01-Jan-2019 23:59:10';
info currentDate.addMinutes(2); // Returns '02-Jan-2019 00:01:10'
```

--------------------------------

### Deluge Map Manipulation Examples

Source: https://www.zoho.com/deluge/help/map-manipulations

Demonstrates basic map operations in Deluge, including creating a map, adding key-value pairs, adding multiple pairs, removing a specific key, and clearing the entire map. These operations are fundamental for data structuring in Deluge.

```Deluge
map1 = map();
map1.put("key1", "value1");
map1.put("key2", "value2");

map2 = map();
map2.put("key3", "value3");
map2.put("key4", "value4");
map1.putAll(map2);

map1.remove("key2");
map1.clear();
```

--------------------------------

### Insert Values into Index-Value Collection - Deluge

Source: https://www.zoho.com/deluge/help/datatypes/collection

This Deluge example demonstrates inserting multiple values ('Hard disk', 'Camera') into an existing index-value collection named 'gadgets'.

```Deluge
gadgets.insert("Hard disk" , "Camera");
```

--------------------------------

### Zoho Books - Get Templates

Source: https://www.zoho.com/deluge/help/books-tasks

Fetches templates from a specified module in Zoho Books. This function is useful for retrieving predefined template structures.

```Deluge
getTemplates("ModuleName");
```

--------------------------------

### Deluge subYear() Example

Source: https://www.zoho.com/deluge/help/functions/datetime/subyear

This example demonstrates how to use the subYear() function in Deluge to subtract one year from a given date. The function returns the modified date-time value.

```Deluge
currentDate = '01-Jan-2019';
newDate = currentDate.subYear(1); // returns '01-Jan-2018 00:00:00'
```

--------------------------------

### Deluge: Example - Setting URL Field

Source: https://www.zoho.com/deluge/help/miscellaneous/access-subform-fields

This Deluge example shows how to set a URL field in a subform using HTML format. It includes optional parameters for title, target, and link name.

```Deluge
row.URL = "<a href=\"https://www.zoho.com\" title = \"Zoho webpage\" target = \"_blank\">zoho</a>";
```

--------------------------------

### Deluge right() Function Example

Source: https://www.zoho.com/deluge/help/functions/string/right

This example demonstrates how to use the Deluge `right()` function to extract the last 7 characters from the string 'Zoho Creator'. The function takes the string and the number of characters to extract as arguments.

```deluge
product_name="Zoho Creator";
text = product_name.right(7); // returns "Creator"
```

--------------------------------

### Deluge addMinutes Time Example (Creator)

Source: https://www.zoho.com/deluge/help/functions/datetime/addminutes

Illustrates the use of the addMinutes function with time values in Deluge, specifically for Zoho Creator. It includes an example of an invalid operation that results in an error due to exceeding the 24-hour range.

```Deluge
// The below code tries to add hours to a "time" value beyond the 24-hour range 
timeValue = '00:00:00';
info timeValue.addMinutes(-4); // throws the error - "Invalid Operation. Value outside 24 hour range"
```

```Deluge
currentTime = '13:15:10';
info currentTime.addMinutes(1);  // Returns '13:16:10'
```

--------------------------------

### Deluge Example: Clearing and Adding Choices

Source: https://www.zoho.com/deluge/help/client-functions/clear

This Deluge example demonstrates the use of the 'clear' task before adding new choices to a 'colors' dropdown field. It checks a 'Get_Bright_Colors' field to determine which set of colors to add, ensuring the 'colors' field is cleared of previous selections first.

```Deluge
if(Get_Bright_Colors)
{
addColors={"white","orange","yellow"}
}
else
{
addColors={"Brown","Black","Grey"};
}

clear colors;
colors:ui.add(addColors);
```

--------------------------------

### Create Zoho FSM Record using Deluge

Source: https://www.zoho.com/deluge/help/fsm/create-record

This Deluge script demonstrates how to create a new record in a specified Zoho FSM module. It utilizes the `zoho.fsm.createRecord()` function, requiring the module name and a map containing the record's details.

```Deluge
emptyMap = Map();

serviceAddress = Map();
serviceAddress.put("id", "1439XXXXXXXX1231");

billingAddress = Map();
billingAddress.put("id", "1439XXXXXXXX1230");

newRecordInfo = Map();
newRecordInfo.put("Summary", "Sample");
newRecordInfo.put("Status", "New");
newRecordInfo.put("Contact", "1439XXXXXXXX1222");
newRecordInfo.put("Territory","1439XXXXXXXX1185");
newRecordInfo.put("Service_Address",serviceAddress);
newRecordInfo.put("Billing_Address",billingAddress);

response = zoho.fsm.createRecord("Requests", newRecordInfo, emptyMap, "fsm_connection");
```

--------------------------------

### Deluge toDateTime Example

Source: https://www.zoho.com/deluge/help/functions/common/to-date-time

This example demonstrates how to use the toDateTime function in Deluge to format a date-time string. It shows converting a string '01-11-2019 13:30:00' into '11-Jan-2019 13:30:00' using a specified format.

```Deluge
currentTime="01-11-2019 13:30:00"; //Assuming, date time format set in application settings is dd-MMM-yyyy.
formatted_date = toDateTime(currentTime,"MM-d-yy"); // formatted_date is assigned the value '11-Jan-2019 13:30:00'
```

--------------------------------

### Zoho Connect - Get Post by Third Party ID (Deluge)

Source: https://www.zoho.com/deluge/help/connect-tasks

Fetches a post using a third-party identifier, enabling integration with external systems that use their own IDs.

```Deluge
postDetails = zoho.connect.get("getPostByTPID", {"tpid": "your_third_party_id"});
```

--------------------------------

### Retrieve Value from Collection using get()

Source: https://www.zoho.com/deluge/help/datatypes/collection

Demonstrates how to fetch a value from a collection using the built-in 'get' function. This can be used for both index-based collections (like arrays) and key-value collections (like maps).

```Zoho Deluge
value = gadgets.get(0);
```

```Zoho Deluge
value = details.get("Name");
```

--------------------------------

### Deluge isNull() Function Examples

Source: https://www.zoho.com/deluge/help/functions/common/isnull

Provides examples of using the isNull function in Deluge to check for null values. It shows how it returns true for empty strings and null, and false for non-null values.

```Deluge
info isNull ("1"); //returns true
info isNull (null); //returns true
info " ".isNull(); //returns false
```

--------------------------------

### Deluge largest() Function Example

Source: https://www.zoho.com/deluge/help/functions/number/largest

This example demonstrates how to use the largest() function in Deluge to find the maximum value in a number list. The function can be called as a method of the list or as a standalone function.

```deluge
numberList = {1, 5, 2, 3};
largestValue= numberList.largest(); // returns 5
```

--------------------------------

### Post List Attachment using Deluge

Source: https://www.zoho.com/deluge/help/cliq/posting-to-zoho-cliq

This example demonstrates posting a message with a list of items to a channel. The 'slides' key is configured with 'type' as 'list' and 'data' as a list of strings.

```Deluge
list_data = {
                        "text":"New interns will be joining from July",
                        "slides":
                        [{
                        "type":"list",
                        "title":"Names",
                        "data":["John","Peter","Kate","James","Hanna"]
                        }]
                        };
response = zoho.cliq.postToChannelAsAdmin("DelugeChannel",list_data);
```

--------------------------------

### Deluge Example: ifNull vs. Standard If-Else

Source: https://www.zoho.com/deluge/help/conditional-statements/condition

Compares the usage of the ifNull function with a standard if-else block for handling null values when retrieving list elements.

```deluge
name = ifNull(nameList.get(10),"Not found");

if(nameList.get(10)==null)  
{
name = "Not Found";  
}
else  
{
name = nameList.get(10);
}
```

--------------------------------

### Zoho Connect: Create Task in Zoho Connect and Projects from Trello

Source: https://www.zoho.com/deluge/help/index

When a post is made from Trello, this automation creates a new task in both Zoho Connect and Zoho Projects. Streamlines task management across platforms.

```Deluge
// Triggered when a new post is made in Trello
trello_post_data = input.TrelloPost;

// Create task in Zoho Connect
connect_task = map();
connect_task.put("title", trello_post_data.get("title"));
connect_task.put("description", trello_post_data.get("description"));
zoho.connect.createTask(connect_task);

// Create task in Zoho Projects
projects_task = map();
projects_task.put("task_name", trello_post_data.get("title"));
projects_task.put("description", trello_post_data.get("description"));
zoho.projects.createTask(projects_task);

info "Tasks created in Zoho Connect and Projects from Trello post.";
```

--------------------------------

### Deluge isEmpty() Example: Text with Space

Source: https://www.zoho.com/deluge/help/functions/collection/isempty

This example checks the isEmpty() function with a text variable containing a space. It demonstrates that a text string with a space is not considered empty and returns false.

```Deluge
textVar = " ";
info textVar.isEmpty(); //returns false
```

--------------------------------

### Zoho Connect to Zoho Cliq Integration

Source: https://www.zoho.com/deluge/help/integration-tasks

Example of posting a custom message to a Zoho Cliq bot when an event is created, using the `zoho.cliq.postToBot` integration task.

```Deluge
zoho.cliq.postToBot("Bot ID", "Event Name", "Event Details");

```

--------------------------------

### Deluge toDate Example with Text Input

Source: https://www.zoho.com/deluge/help/functions/common/todate

Provides an example of using the toDate function with a text expression and a specific dateTimeMapping. It shows how to parse a date string like '01,11,2019 1:30:00 pm' into a date format defined by 'MM,d,yyyy'.

```deluge
dateTimeString = "01,11,2019 1:30:00 pm"; 
info toDate(dateTimeString, "MM,d,yyyy"); 
// MM,d,yyyy is to denote the components in the expression
// So the value for MM is 01 (January), the value for d is 11, and the value for yyyy is 2019
// Assuming that the date time format set in application settings is dd-MMM-yyyy, the value returned is 11-Jan-2019
```

--------------------------------

### Deluge Update Record Example

Source: https://www.zoho.com/deluge/help/crm/upsert-record

Example of updating an existing record in the 'Leads' module using the Deluge upsert function. It shows how to include the record ID in the values map for the update operation.

```Deluge
record_values = Map();
record_values.put("Last_Name","John");
record_values.put("id",2303XXXXXXXXXXXXXXX);
response = zoho.crm.upsert("Leads",record_values);
```

--------------------------------

### Deluge: Creating a Price Book

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to create a new price book in Zoho CRM, including setting the price book name and currency.

```deluge
// Creating a new Price Book
priceBookMap = Map();
priceBookMap.put("PriceBook_Name", "Standard Pricing");
priceBookMap.put("Currency", "USD");
priceBookMap.put("Description", "Standard pricing for all products.");

createPriceBookResponse = zoho.crm.createRecord("Price_Books", priceBookMap);
info createPriceBookResponse;
```

--------------------------------

### Fetch File Content using invokeUrl

Source: https://www.zoho.com/deluge/help/file/get-file-content

This example demonstrates how to fetch a file from the cloud using the invokeUrl task and then retrieve its content using the getFileContent method. It's important to note that this function works best with text-based files.

```Deluge
fileVariable = invokeUrl
[
 url: "http://insight.dev.schoolwires.com/HelpAssets/C2Assets/C2Files/C2ImportCalEventSample.csv"
 type: GET
];
response = fileVariable.getFileContent();
```

--------------------------------

### Deluge Reverse() Example 3: Reversing a List

Source: https://www.zoho.com/deluge/help/functions/string/reverse

Demonstrates the behavior of the reverse() function when a list is provided as input, showing that it reverses the elements and returns a text data type.

```Deluge
inputList = { 1 , 2 , 13 } ; // Input is of List datatype
 outputText = reverse ( inputList ) ; // Returns 31, 2, 1
 info outputText ; // Output is of Text datatype
```

--------------------------------

### Upload File to Zoho WorkDrive using invokeUrl

Source: https://www.zoho.com/deluge/help/deluge-invoke-url

This example shows how to upload a file to Zoho WorkDrive. It first fetches a file using `invokeUrl` and then uses another `invokeUrl` call with a POST request to upload the file to a specified WorkDrive directory, including setting the parent ID and connection.

```deluge
// File Upload to Zoho WorkDrive
fileToUpload = invokeurl
[
url :"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
type :GET
];
info fileToUpload;

// Upload the file to WorkDrive
bodyParam = map();
bodyParam.put("parent_id","0567s97d5252736c84d2981f138baeb237312");
bodyParam.put("content",fileToUpload);
uploadResp = invokeurl
[
url :"https://workdrive.zoho.com/api/v1/upload"
type :POST
body :bodyParam
connection :"workdrive_connection"
];
info uploadResp;

```

--------------------------------

### Search Accounts Starting with 'A' in Zoho CRM

Source: https://www.zoho.com/deluge/help/crm/search-records

This Deluge script searches the 'Accounts' module in Zoho CRM for records where the 'Account_Name' field starts with the letter 'A'. The result is stored in the 'response' variable.

```deluge
response = zoho.crm.searchRecords("Accounts", "(Account_Name:starts_with:A)");
```

--------------------------------

### Navigate Hints in Deluge

Source: https://www.zoho.com/deluge/help/deluge-editor

Toggle between hint tags (placeholders) for parameters in Deluge tasks and functions to assist in easy scripting. This helps in understanding required inputs.

```macOS - Next Hint
⌘ + .
```

```Windows - Next Hint
Ctrl + .
```

```macOS - Previous Hint
⌘ + ,
```

```Windows - Previous Hint
Ctrl + ,
```

--------------------------------

### Deluge Example: Calculate Median Age

Source: https://www.zoho.com/deluge/help/data-access/aggregate-records/median

This example demonstrates how to use the median function in Deluge to retrieve the median value of the 'age' field from the 'Employees' form. It includes a criteria to fetch all records.

```Deluge
EmployeeDetails = Employees [ ID != 0 ].median(age);
```

--------------------------------

### Zoho Flow: Get Purchase Order and Create Tasks

Source: https://www.zoho.com/deluge/help/index

Retrieves a purchase order from Zoho Books and creates corresponding tasks in Zoho Projects. Links procurement with project execution.

```Deluge
purchaseorder = zoho.books.getRecord("PurchaseOrders", "PO_ID");
for each item in purchaseorder.get("items") {
    task = map();
    task.put("task_name", "Process PO Item: " + item.get("item_name"));
    task.put("description", "Handle item from PO " + purchaseorder.get("purchaseorder_number"));
    zoho.projects.createTask(task);
}
info "Tasks created in Zoho Projects for PO: " + purchaseorder.get("purchaseorder_number");
```

--------------------------------

### Fetch Records in Deluge

Source: https://www.zoho.com/deluge/help/fetch-records

This snippet demonstrates how to fetch records using Deluge scripting. It covers basic record fetching, fetching specific field values, and using criteria to filter records.

```Deluge
record = zoho.crm.getRecordById("Contacts", contactId);
// Fetching a specific field's value
firstName = record.get("First Name");
// Fetching all values of a field (example for a multi-select picklist)
picklistValues = record.get("MultiSelectField");
// Criteria to fetch records
contactList = zoho.crm.searchRecords("Contacts", "(Email:equals:test@example.com)");
```

--------------------------------

### Deluge toTime Example with Specific Format and Timezone

Source: https://www.zoho.com/deluge/help/functions/common/totime

Provides a practical example of the toTime function in Deluge. It converts a date-time string with a specific format and timezone ('Europe/Moscow') into a different format, considering the application's default settings.

```Deluge
//Assuming, date time format set in application settings is dd-MMM-yyyy and Time Zone set in application settings is Indian Standard Time (which is 2 hours and 30 minutes ahead of Moscow)
dateTimeString = "01,11,19 1:30:00 pm"; 
info toTime(dateTimeString, "MM,d,yyyy hh:mm:ss a", "Europe/Moscow"); //returns 11-Jan-0019 16:00:00
```

--------------------------------

### HTML: Basic Form Structure

Source: https://www.zoho.com/deluge/help/script/sign/create-using-template

This HTML snippet provides a basic structure for a web form, including input fields for text, email, and a submit button. It serves as a foundation for creating user interfaces that interact with backend logic.

```html
<form action="/submit-form" method="post">
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="name"><br>
  <label for="email">Email:</label><br>
  <input type="email" id="email" name="email"><br><br>
  <input type="submit" value="Submit">
</form>
```

--------------------------------

### Zoho Sheet to Zoho CRM Integration

Source: https://www.zoho.com/deluge/help/integration-tasks

Example of using Zoho Sheet formulas to auto-populate columns based on Zoho CRM data via the `zoho.crm.searchRecords` integration task.

```Deluge
crmData = zoho.crm.searchRecords("Contacts", "(Email:equals:test@example.com)");

```

--------------------------------

### Zoho API Failure Response Example

Source: https://www.zoho.com/deluge/help/books/create-record

A sample JSON structure for a failure response from the Zoho API, specifically indicating an error due to an incorrect organization ID. It includes an error code and a descriptive message.

```JSON
{
"code":6041,
"message":"This user is not associated with the CompanyID/CompanyName:537XX."
}
```

--------------------------------

### Insert Value into Key-Value Collection - Deluge

Source: https://www.zoho.com/deluge/help/datatypes/collection

This Deluge example shows how to insert a key-value pair ('Company':'Zoho') into an existing key-value collection named 'details'.

```Deluge
details.insert("Company":"Zoho");
```

--------------------------------

### Deluge getOccurenceCount() Example

Source: https://www.zoho.com/deluge/help/functions/string/getOccurenceCount

This example demonstrates how to use the getOccurenceCount() function in Deluge to find the number of times a specific word appears in a text. The function is called on the string variable and takes the search string as an argument.

```Deluge
text = "Zoho Creator, an online database service, helps you create custom database applications" ;
count = text.getOccurenceCount("database"); //returns 2
```

--------------------------------

### Extract Keywords using Deluge

Source: https://www.zoho.com/deluge/help/ai-tasks/keyword-extraction

This Deluge script demonstrates the basic usage of the `zoho.ai.extractKeywords` function to extract keywords from a given text. It shows how to call the function and what the expected response format is.

```deluge
query = "An operating system (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.Time-sharing operating systems schedule tasks for efficient use of the system and may also include accounting software for cost allocation of processor time, mass storage, printing, and other resources.For hardware functions such as input and output and memory allocation, the operating system acts as an intermediary between programs and the computer hardware,[1][2] although the application code is usually executed directly by the hardware and frequently makes system calls to an OS function or is interrupted by it. Operating systems are found on many devices that contain a computer – from cellular phones and video game consoles to web servers and supercomputers.";

response = zoho.ai.extractKeywords(query);
```

--------------------------------

### Post Buttons with Actions to Zoho Cliq User

Source: https://www.zoho.com/deluge/help/cliq/posting-to-zoho-cliq

This Deluge script demonstrates how to post a message with three interactive buttons to a specific Zoho Cliq user. Each button is configured with a different action: opening a URL, invoking a function, or starting a chat.

```Deluge
**buttons_data** = {
                                "text":"Buttons",
                                "card":{"theme":"modern-inline"},
                           
                                **"buttons"**:[
                           
                                {
                                "label":"Built-in functions",
                                "type":"+",
                                **"action"**:
                                {"type":"open.url","data":{"web":"https://www.zoho.com/creator/help/"} }
                                },
                                {
                                "label":"Invoke Function",
                                "type":"+",
                                **"action"**:
                                {"type":"invoke.function","data":{"name":"TicketStatus","owner":"shawn@zylker.com"} }
                                },
                                {
                                "label":"Click here to chat",
                                "type":"+",
                                **"action"**:
                                {"type":"system.api","data":{"api":"startchat/123456"} }
                                }
                                ]
                };
                 response = zoho.cliq.postToUser("charlie@zylker.com",buttons_data);
```

--------------------------------

### Zoho Deluge writer.v2.mergeAndSend Syntax

Source: https://www.zoho.com/deluge/help/writer/MergeAndSendV2

This snippet shows the basic syntax for calling the Zoho Deluge writer.v2.mergeAndSend function. It outlines the required parameters: document_id, merge_detail, output_settings, and optional_settings, along with the connection parameter.

```deluge
<response> = zoho.writer.v2.mergeAndSend(<document_id>, <merge_detail>, <output_settings>, <optional_settings>,  <connection>)
```

--------------------------------

### SDP Cloud Integration Tasks

Source: https://www.zoho.com/deluge/help/sdp-tasks

This section outlines common tasks for integrating with SDP Cloud. These tasks include creating, retrieving, updating, and associating records within specified modules, as well as invoking external API endpoints.

```Deluge
Create record: Creates a record in the specified module
Get records: Fetches all the records from the specified module
Update record: Updates the specified record with new values
Get record by ID: Fetches a record from the specified module
Associate: Creates a record in submodule and associates it with the specified parent record
SDP invoke URL: Use the API endpoints provided by SDP Cloud to access and modify your data
```

--------------------------------

### Deluge: Creating an Event

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to create a new event in Zoho CRM, including setting the subject, start time, and end time.

```deluge
// Creating a new Event
eventMap = Map();
eventMap.put("Subject", "Client Meeting");
eventMap.put("Start_DateTime", zoho.datetime.addHours(zoho.now, 1));
eventMap.put("End_DateTime", zoho.datetime.addHours(zoho.now, 2));
eventMap.put("Location", "Office Conference Room");

createEventResponse = zoho.crm.createRecord("Events", eventMap);
info createEventResponse;
```

--------------------------------

### Execute Blueprint Transition for Institution's Students (Deluge)

Source: https://www.zoho.com/deluge/help/creator-blueprint-tasks/execute-transition

This Deluge script fetches all student records associated with a specific institution and then executes the 'Registered and fee paid' transition for each student. This is useful for automating bulk actions within a Zoho blueprint.

```deluge
//fetch records of the students based on institution
                                                                                                Records = Registration [ID == input.ID];
                                                                                                //execute transition for fetched records. 
                                                                                                for each data in Records 
                                                                                                {
                                                                                                thisapp.blueprint.executeTransition("Registration", "Training", "Registered and fee paid", data.ID);
                                                                                                }
                                                                                                
```

--------------------------------

### Deluge: Example - Set Concession Eligibility

Source: https://www.zoho.com/deluge/help/miscellaneous/access-subform-fields

This Deluge example demonstrates setting a 'concession' field to 'yes' if a 'Age' field in the subform is greater than 60. It utilizes the 'row' keyword to access and modify the 'concession' field.

```Deluge
if(row.Age != null)
{
    row.concession = "yes"; // the passenger is now made eligible for a concession
}
```

--------------------------------

### Deluge Editor Preferences Overview

Source: https://www.zoho.com/deluge/help/deluge-preferences

This section provides an overview of the Deluge editor preferences, which include settings for font, word wrap, syntax builder, error highlighter, and shortcuts. These preferences are applied globally across Zoho products and help in efficient scripting.

```Deluge
/*
  Deluge Editor Preferences:
  - Set Font: Customize font family and size.
  - Word Wrap: Enable to wrap long lines of code.
  - Syntax Builder: Assist in writing error-free scripts.
  - Error Highlighter: Detect and highlight coding errors in real-time.
  - Shortcuts: Customize keyboard shortcuts for faster scripting.
  - Reset all to default: Restore all preferences to their default settings.
*/
```

--------------------------------

### Deluge addHour Example: Adding Hours to Date

Source: https://www.zoho.com/deluge/help/functions/datetime/addhour

Provides an example of using the addHour function in Deluge to add one hour to a specific date. It shows the input date and the resulting date-time after the operation.

```deluge
currentDate = '01-Jan-2019';
info currentDate.addHour(1); // Returns '01-Jan-2019 01:00:00'
```

--------------------------------

### Deluge getAsString Example

Source: https://www.zoho.com/deluge/help/functions/collection/get-as-string

Demonstrates how to use the getAsString function in Deluge to retrieve an element from a collection as a text value. It initializes a collection, assigns a string of numbers, and then extracts a specific element by its index.

```Deluge
product_name = Collection();
product_name="123,456,120,120.46";
index2 = product_name.getasstring(2); // The number 120 gets stored in index2 as a 'text' value
```

--------------------------------

### Upload Files to Zoho Recruit using Deluge

Source: https://www.zoho.com/deluge/help/deluge-invoke-url

This Deluge script shows how to upload multiple files, along with associated parameters, to the Candidates module of Zoho Recruit. It involves downloading files using 'invokeurl', defining parameters for the record, and then using 'invokeurl' again with a POST request to upload the files.

```Deluge
// Download the required files from web
cv = invokeurl 
[
url:"https://www.office.xerox.com/latest/SFTBR-04U.PDF"
]; 
cover_letter = invokeurl 
[
url:"https://filesamples.com/samples/document/txt/sample1.txt"
];  

// Create parameter key-value pairs
param1 = {"stringPart":"true", "paramName":"id", "content":"690423000000432208"};
param2 = {"stringPart":"true", "paramName":"type", "content":"Resume"};
param3 = {"stringPart":"true", "paramName":"version", "content":"2"};

// Add the files and parameter key-value pairs to a list
file_list = List();
file_list.add(cv);
file_list.add(cover_letter);
file_list.add(param1);
file_list.add(param2);
file_list.add(param3);

// Perform API call to upload the files to Candidate module of Zoho Recruit

response = invokeurl 
[
url: "https://recruit.zoho.com/recruit/private/json/Candidates/uploadFile"
type: POST
files: file_list
connection: "recruit_oauth_conection"
];
info response;

```

--------------------------------

### Deluge addHour Example: Adding Hours to Current Time

Source: https://www.zoho.com/deluge/help/functions/datetime/addhour

Shows how to add one hour to a current time value using the addHour function in Deluge. The example displays the input time and the resulting time after the addition.

```deluge
currentTime = '13:15:10';
info currentTime.addHour(1);  // Returns '14:15:10'
```

--------------------------------

### Deluge Syntax Builder

Source: https://www.zoho.com/deluge/help/deluge-preferences

The Syntax Builder (formerly Syntax Assist) helps new programmers write error-free scripts by providing predefined values and auto-completion. It can be enabled or disabled, and its behavior varies slightly between Zoho Creator and other Zoho services.

```Deluge
// Syntax Builder helps in error-free scripting.
// Enable Syntax Builder for auto-complete and predefined values.
// setSyntaxBuilder(true);

/*
  Behavior when Syntax Builder is ON:
  - Displayed by default on drag and drop or auto-completion.

  Behavior when Syntax Builder is OFF:
  - Hover over the line number and click the pencil icon to display the builder form.
*/

/*
  Tasks supporting Syntax Builder:
  Info, Alert, Return, If, Conditional If, Set variable, Send mail, Send SMS, OpenUrl, Call function, InvokeUrl, Add record, Integration tasks, Fetch records, Aggregate records, For each records, Delete record
*/
```

--------------------------------

### Fetch Filtered Users with Includes

Source: https://www.zoho.com/deluge/help/one/get-users

Fetches users from Zoho One with specific filters (e.g., user type) and includes additional details like address, custom fields, and email. This example demonstrates fetching confirmed users.

```Deluge
queryParams = Map();
filters = Map();
include = [];
include.add("address");
include.add("custom_fields");
include.add("emails");
include.add("user.location");
include.add("user.extendedinfo");
filters.put("filter_user_type","confirmed");
queryParams.put("include", include);
queryParams.put("filters", filters);
response = zoho.one.getUsers(72XXXXXXX, "1", "200", queryParams, "zoho_one_connection")
```

--------------------------------

### Zoho Books API Success Response Example

Source: https://www.zoho.com/deluge/help/books/fetch-records

This JSON structure represents a successful response from the Zoho Books API when fetching records. It includes a status code, message, the fetched records (e.g., contacts), and pagination/search context information.

```json
{
"code": 0,
"message": "success",
"contacts": [
{
"contact_id": "XXXXXXXXXX05023",
"contact_name": "Will Smith",
"customer_name": "1",
"vendor_name": "1",
"company_name": "",
"website": "",
"language_code": "",
"language_code_formatted": "",
"contact_type": "customer",
"contact_type_formatted": "Customer",
"status": "active",
"customer_sub_type": "business",
"source": "zoho_crm",
"is_linked_with_zohocrm": true,
"payment_terms": 0,
"payment_terms_label": "Due On Receipt",
"currency_id": "XXXXXXXXXX00099",
"twitter": "",
"facebook": "",
"currency_code": "INR",
"outstanding_receivable_amount": 0.0,
"outstanding_receivable_amount_bcy": 0.0,
"outstanding_payable_amount": 0.0,
"outstanding_payable_amount_bcy": 0.0,
"unused_credits_receivable_amount": 0.0,
"unused_credits_payable_amount": 0.0,
"first_name": "",
"last_name": "1",
"email": "",
"phone": "",
"mobile": "",
"created_time": "2018-12-11T15:45:00+0530",
"created_time_formatted": "11/12/2018",
"last_modified_time": "2018-12-11T15:45:04+0530",
"last_modified_time_formatted": "11/12/2018",
"custom_fields": [],
"ach_supported": false,
"has_attachment": false
}
],
"page_context": {
"page": 1,
"per_page": 200,
"has_more_page": false,
"report_name": "Contacts",
"applied_filter": "Status.All",
"sort_column": "contact_name",
"search_criteria": [
{
"column_name": "contact_name",
"search_text": "Will Smith",
"comparator": "equal"
}
]
}
}
```

--------------------------------

### Fetch Groups from Zoho Directory

Source: https://www.zoho.com/deluge/help/directory/get-groups

This script fetches the first 200 groups from a specified Zoho Directory organization. It utilizes the `zoho.directory.getGroups` function, requiring the organization ID, starting index, number of records to fetch, and the connection link name.

```deluge
response = zoho.directory.getGroups(72XXXXXXX,  "1", "200", Map(), "zoho_directory_connection");
```

--------------------------------

### Deluge addHour Example: Adding Hours to DateTime

Source: https://www.zoho.com/deluge/help/functions/datetime/addhour

Demonstrates adding two hours to a date-time value using the addHour function in Deluge. The example shows a date with a time and the output after adding hours, including a day change.

```deluge
currentDate = '01-Jan-2019 23:15:10';
info currentDate.addHour(2); // Returns '02-Jan-2019 01:15:10'
```

--------------------------------

### Create Zoho Calendar Event

Source: https://www.zoho.com/deluge/help/calendar/create-event

This script demonstrates how to create a new event in Zoho Calendar. It includes setting up reminders, attendees, and event details using Deluge's map and list data structures.

```Deluge
reminder1 = Map();
reminder1.put("action", "popup");
reminder1.put("minutes", "-60");
reminders_list = List();
reminders_list.add(reminder1);

dateandtime_map = Map();
dateandtime_map.put("timezone", "Asia/Calcutta");
dateandtime_map.put("start", "20200201T153000+0530");
dateandtime_map.put("end", "20200202T163000+0530");

attendees_list = List();
attendees_list.add({"email":"shawn@zylker.com"});
attendees_list.add({"email":"hailee@zylker.com"});

eventDetails=Map();
eventDetails.put("estatus", "added");
eventDetails.put("title", "Zylker invitation");
eventDetails.put("reminders", reminders_list);
eventDetails.put("dateandtime", dateandtime_map);
eventDetails.put("isallday", "true");
eventDetails.put("attendees", attendees_list);

event=Map();
event.put("eventdata", eventDetails);

response = zoho.calendar.createEvent("18027XXXXXXXXXXXXXXXXXXXXXX5e986", event, "calendar_connection");
```

--------------------------------

### Zoho Bookings: Fetch Workspaces

Source: https://www.zoho.com/deluge/help/bookings-tasks

Fetches all available workspaces within Zoho Bookings. This is a foundational step for many booking-related operations.

```Deluge
getWorkspaces();
```

--------------------------------

### Deluge get() by Key

Source: https://www.zoho.com/deluge/help/functions/collection/get

Retrieves a value from a collection using a specified key. If the key does not exist in the collection, the function returns null.

```deluge
names = Collection("name1":"John","name2":"Bill");
name = names.get("name1"); // the value "John" is assigned to name
name = names.get("name3"); // returns null
```

--------------------------------

### Zoho Recruit: Get Records

Source: https://www.zoho.com/deluge/help/recruit-tasks

Retrieves multiple records from a specified module in Zoho Recruit. This function allows for bulk data fetching.

```Deluge
response = zoho.recruit.getRecords("ModuleName");
info response;
```

--------------------------------

### Get Day of Week using weekday() function

Source: https://www.zoho.com/deluge/help/functions/datetime/getdayofweek

This snippet demonstrates the final syntax for getting the day of the week using the weekday() function, passing the date-time value as a parameter. This is another equivalent way to achieve the functionality.

```Deluge
currentDate = '15-Mar-2019';
dayNumber = weekday( currentDate);
// returns 6 (meaning Friday)
```

--------------------------------

### Fetch Quickbooks Records with Select Columns and Criteria

Source: https://www.zoho.com/deluge/help/quickbooks/fetch-records

This Deluge code snippet demonstrates how to fetch specific records from Quickbooks, including selecting particular fields and applying a filter criteria. It initializes a list for fields, adds desired fields, and then calls the `getRecords` function with the connection details, module, company ID, criteria, and the field list.

```Deluge
fieldList = List();
fieldList.add("FamilyName");
fieldList.add("Id");
fieldList.add("Industry");

response = intuit.quickbooks.getRecords("Quickbooks", "Customer", "1241802285", "DisplayName = 'Henry'", fieldList);
```

--------------------------------

### Deluge addBusinessHour Function Example

Source: https://www.zoho.com/deluge/help/functions/datetime/add-business-hour

This example demonstrates how to use the addBusinessHour function in Deluge to add business hours to a specific date-time. It includes parameters for the number of hours, a list of weekends, a list of holidays, and custom business hours.

```Deluge
meeting_time = "1-Jan-2020 16:00:00".addBusinessHour(2, {"Saturday", "Sunday"}, {'2-Jan-2020','3-Jan-2020'}, {"start":"10","end":"17"}); // meeting_time gets the value '06-Jan-2020 11:00:00' assigned to it.
```

--------------------------------

### Zoho Connect - Add Post (Deluge)

Source: https://www.zoho.com/deluge/help/connect-tasks

Allows posting content to Zoho Connect. Requires specifying the network and content for the post.

```Deluge
response = zoho.connect.post("addPost", {"networkId": "your_network_id", "content": "Your post content"});
```

--------------------------------

### Deluge lastIndexOf() Example

Source: https://www.zoho.com/deluge/help/functions/list/lastindexof

This example demonstrates how to use the lastIndexOf() function in Deluge to find the index of the last occurrence of an element in a list. The function returns the index of the first element if it matches, otherwise it returns -1.

```deluge
listVar = {"Creator", "CRM", "Projects"};
lastIndex = listVar.lastIndexOf("Creator"); //returns 0
```

--------------------------------

### getWeekOfYear Function with Start Day Parameter

Source: https://www.zoho.com/deluge/help/release-notes

The `getWeekOfYear` built-in function in Zoho Creator now supports a `<start_day>` parameter, allowing users to specify the first day of the week. This feature was previously available in other Zoho services.

```Deluge
getWeekOfYear(date_variable, <start_day>);
```

--------------------------------

### Fetch Filtered Users with Includes

Source: https://www.zoho.com/deluge/help/directory/get-users

This Deluge script demonstrates how to fetch users with specific filters and include additional information like address, custom fields, emails, location, and extended user information. It utilizes query parameters to specify these options.

```deluge
queryParams = Map();
filters = Map();
include = [];
include.add("address");
include.add("custom_fields");
include.add("emails");
include.add("user.location");
include.add("user.extendedinfo");
filters.put("filter_user_type","confirmed");
queryParams.put("include", include);
queryParams.put("filters", filters);
response = zoho.directory.getUsers(72XXXXXXX, "1", "200", queryParams, "zoho_directory_connection")
```

--------------------------------

### Compare Number Fields in Deluge

Source: https://www.zoho.com/deluge/help/operators/creator-fields-and-their-applicable-operators

Illustrates the comparison of Number fields, including those derived from Lookup fields, using various relational operators. It shows examples of equality, greater than, and less than comparisons.

```Deluge
info Lookup_field == Number_field ; // Returns false.
info Lookup_field > Number_field ; // Returns true
```

--------------------------------

### Deluge Example: Handling List Index Out of Bounds Error

Source: https://www.zoho.com/deluge/help/misc-statements/try-catch

An example of using try-catch in Deluge to handle a runtime error where an attempt is made to access a list element using an index that is out of bounds. The catch block logs the line number and the error message.

```Deluge
try 
{
products = {"Creator","CRM","Cliq"};
products = products.get(10);
products.add("Sheet");
}
catch(e)
{
info e.lineNo; // Displays line number of the statement that caused the error
info e.message; // Displays the error message
info e; // Displays both line number and error message
}
```

--------------------------------

### Compress a Single File in Deluge

Source: https://www.zoho.com/deluge/help/functions/file/compress

This example demonstrates how to compress a single file fetched from a URL using the 'compress' function in Deluge. The compressed file is named 'compressed_file.zip'.

```Deluge
file1 = invokeUrl
[
   url :"http://www.africau.edu/images/default/sample.pdf"
   type :  GET
];

zip_file = file1.compress("compressed_file");

```

--------------------------------

### Deluge Decimal Data Type Example

Source: https://www.zoho.com/deluge/help/datatypes/decimal

Demonstrates the usage of the decimal data type in Deluge, commonly used for currency and percentage values. It shows a simple assignment of a decimal value.

```Deluge
planPrice = 0.99;
```

--------------------------------

### Search Records in Zoho Desk (Deluge)

Source: https://www.zoho.com/deluge/help/desk/search-records

Fetches records from Zoho Desk that match a specified query. This function requires organization ID, module name, search criteria, and optionally, start index, limit, and connection name.

```deluge
response = zoho.desk.searchRecords(<orgID>, <module_name>, <query>, <fromIndex>, <limit>, <connection>);
```

```deluge
searchValue = {"subject":"Deluge"};
response = zoho.desk.searchRecords(641XXXXXX, "tickets", searchValue, 0, 5, "desk_connection");
```

```deluge
searchValue = {"subject":"Deluge", "phone":"1111*****"};
response = zoho.desk.searchRecords(641XXXXXX, "tickets", searchValue, 0, 5, "desk_connection");
```

--------------------------------

### Open Zoho Creator Form

Source: https://www.zoho.com/deluge/help/openurl

Opens the 'Registration' form from the 'customer-details' application in Zoho Creator. The URL specifies the application and the target form.

```deluge
openUrl("https://app.zohocreator.com/shawn24/customer-details#Form:Registration", "same window");
```

--------------------------------

### Deluge Script to Fetch Deals by Date Range

Source: https://www.zoho.com/deluge/help/deluge-in-zoho-services/zoho-sheet

This Deluge script defines a custom function 'listDEALS_BETWEEN' that accepts start and end dates. It constructs a COQL query to retrieve Deal Name, Amount, and Closing Date from the Deals module within the specified date range using the Invoke URL task and returns the results as a list of maps.

```Deluge
//List is the return data type. StartDate and EndDate are the parameters, whose values will, in turn, be supplied as params while making the CRM API call.
listDEALS_BETWEEN(dateStartDate,dateEndDate) 
{
//Use toString to convert the input dates to accepted date formats in Sheet. 
start_date=StartDate.toString("yyyy-MM-dd"); 
end_date=EndDate.toString("yyyy-MM-dd"); 
//Construct a map with the required deal details in the defined map variable using a select query. The deal details include field names from the Deals module in CRM. 
query_map=Map(); 
query_map.put("select_query","select Deal_Name, Amount, Closing_Date from Deals where Closing_Date between '"+start_date+"' and '"+end_date+"'"); 
//Invoke the Zoho CRM API to fetch the records from the Deals module through a COQL query. The connection you created earlier will be used here. 
response=invokeurl 
[
 url:"https://www.zohoapis.com/crm/v3/coql"
 type:POST
 parameters:query_map.toString()
 connection:"crm_oauth_connection"
]; 
//resultList is the variable to declare a list. 
resultList=List(); 
response_data=response.get("data"); 
//The below "for" statement parses the records inside the Deals module and fetches the specified details 
for eachrecordinresponse_data 
{
 resultMap=Map(); 
 resultMap.put("Deal Name",record.get("Deal_Name")); 
 resultMap.put("Amount",record.get("Amount")); 
 resultMap.put("Closing Date",record.get("Closing_Date")); 
 resultList.add(resultMap);
}
//Returns the response in the format expected by Zoho Sheet. 
returnresultList;
}
```

--------------------------------

### Deluge SFTP Upload File

Source: https://www.zoho.com/deluge/help/sftp-task

Example of uploading a file named 'monthlyreport' to a remote SFTP server using the SFTP task in Deluge.

```Deluge
// Upload a file to SFTP server
uploadSftp = sftp
[
action : upload
host : "sftp.examplehost.com"
port : 22
path : "/exports/"
files : monthlyreport
connection : "sftp_connection"
];
info uploadSftp;

```

--------------------------------

### Deluge toNumber Example: Decimal Conversion

Source: https://www.zoho.com/deluge/help/functions/common/to-number

Shows how the toNumber function converts a decimal value to an integer by truncating the fractional part.

```Deluge
decimal = 123.25;
info  decimal.toNumber(); // Converts the decimal into a number and returns 123
```

--------------------------------

### Zoho Deluge Success Response Format

Source: https://www.zoho.com/deluge/help/workdrive/create-folder

This snippet illustrates the JSON structure of a successful response from Zoho Deluge, detailing attributes of files and folders, including metadata, permissions, and relationships.

```json
{
  "data": {
    "id": "o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a",
    "type": "files",
    "attributes": {
      "is_locked": false,
      "conv_engine_type": 0,
      "type": "folder",
      "created_time_i18": "Aug 26, 4:46 PM",
      "modified_time_in_millisecond": 1566818185150,
      "opened_time": "Aug 26, 4:46 PM",
      "download_url": "https://workdrive.zoho.com/download/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a",
      "comment_badge_count": 0,
      "created_time": "Aug 26, 4:46 PM",
      "lock_status": 2,
      "is_folder": true,
      "resource_type": 1001,
      "display_attr_name": "Folder 2",
      "created_by": "Shawn",
      "display_html_name": "Subfolder",
      "org_id": "af0u7XXXXXXXXXXXXXXXXXXXXXXXXXXXee228",
      "parent_id": "o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX7e30c",
      "name": "Subfolder",
      "permalink": "https://workdrive.zoho.com/folder/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a",
      "favorite": false,
      "new_badge_count": 0,
      "status": 1,
      "modified_time_i18": "Aug 26, 4:46 PM",
      "opened_time_i18": "Aug 26, 4:46 PM",
      "extn": "",
      "description": "",
      "uploaded_time_in_millisecond": 1566818185156,
      "thumbnail_url": "",
      "title": "",
      "files_view_pref": {
        "sort_by": "last_modified",
        "sort_order": "desc",
        "filtered_by": "all",
        "layout": "list"
      },
      "modified_time": "Aug 26, 4:46 PM",
      "library_id": "o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXXe5187",
      "icon_class": "folder",
      "created_time_in_millisecond": 1566818185150,
      "owner": "54750609",
      "creator": "58131170",
      "capabilities": {
        "can_read": true,
        "can_share": true,
        "can_remove_share": false,
        "can_delete": false,
        "can_edit": true,
        "can_create_files": true,
        "can_upload_files": true,
        "can_trash": true,
        "can_rename": true,
        "can_restore": false,
        "can_copy": true,
        "can_move": true,
        "can_zip": true,
        "can_download": true,
        "can_emailattach": true,
        "can_publish": true,
        "can_trash_files": true
      },
      "uploaded_time_i18": "Aug 26, 4:46 PM",
      "is_external_upload": false,
      "opened_time_in_millisecond": 1566818185150,
      "edit_badge_count": 0,
      "share_data": [],
      "uploaded_time": "Aug 26, 4:46 PM",
      "has_folders": false,
      "service_type": "upload",
      "display_url_name": "Folder+2",
      "is_unread": false,
      "modified_by": "Shawn",
      "is_part_of_joined_workspace": false
    },
    "relationships": {
      "folders": {
        "links": {
          "self": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/relationships/folders",
          "related": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/folders"
        }
      },
      "comments": {
        "links": {
          "self": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/relationships/comments",
          "related": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/comments"
        }
      },
      "previewinfo": {
        "links": {
          "self": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/relationships/previewinfo",
          "related": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/previewinfo"
        }
      },
      "unzip": {
        "links": {
          "self": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/relationships/unzip",
          "related": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/unzip"
        }
      },
      "publiclink": {
        "links": {
          "self": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/relationships/publiclink",
          "related": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/publiclink"
        }
      },
      "accesschartdata": {
        "links": {
          "self": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/relationships/accesschartdata",
          "related": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/accesschartdata"
        }
      },
      "resourceproperty": {
        "links": {
          "self": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/relationships/resourceproperty",
          "related": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/resourceproperty"
        }
      },
      "parentfolders": {
        "links": {
          "self": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/relationships/parentfolders",
          "related": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/parentfolders"
        }
      },
      "importfile": {
        "links": {
          "self": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/relationships/importfile",
          "related": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/importfile"
        }
      },
      "versions": {
        "links": {
          "self": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/relationships/versions",
          "related": "https://workdrive.zoho.com/api/v1/files/o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX0756a/versions"
        }
      }
    }
  }
}
```

--------------------------------

### Deluge smallest() Function Example

Source: https://www.zoho.com/deluge/help/functions/number/smallest

Demonstrates how to use the smallest() function in Deluge to find the minimum value in a number list. The function can be invoked directly on the list or as a global function.

```deluge
numberList = {1, 5, 2, 3};
smallestValue= numberList.smallest(); // returns 1
```

--------------------------------

### Fetch File from Web using invokeUrl

Source: https://www.zoho.com/deluge/help/deluge-invoke-url

This snippet demonstrates how to fetch a file, such as an image, from a given URL using the `invokeUrl` task with a GET request. It retrieves the file content which can then be processed or stored.

```deluge
response = invokeUrl
[
url: "http://www.thenonlinearpath.com/wp-content/uploads/2016/05/GoodVibesOnly.png"
type: GET
];

```

--------------------------------

### Create Project in Zoho Projects

Source: https://www.zoho.com/deluge/help/projects/create-project

The `zoho.projects.createProject` task is used to create a new project in a specified Zoho Projects portal. It requires the portal name and a map of project values. An optional connection parameter can also be provided. Be aware of rate limits for repeated executions.

```Deluge
response = zoho.projects.createProject(<portal>, [<values>], [<connection>]);
```

```Deluge
new_project = Map();
new_project.put("name", "Sales");
response = zoho.projects.createProject("zylker", new_project);
```

--------------------------------

### Deluge Function Example: Calculate Days Between Dates

Source: https://www.zoho.com/deluge/help/misc-statements/return-statement

An example of a Deluge custom function that calculates the number of days between two dates. It takes two date parameters, calculates the difference in milliseconds, converts it to days, and returns the result as a long integer.

```deluge
int thisapp.CalculateDays(date sdate, date edate) {
	days = (((edate-sdate)/86400000)).toLong();
	return days;
}
```

--------------------------------

### Compress Multiple Files in Deluge

Source: https://www.zoho.com/deluge/help/functions/file/compress

This example shows how to compress a list of files (a PDF and a JPG) into a single ZIP archive named 'compressed_file.zip' using the Deluge 'compress' function.

```Deluge
// Fetch .pdf file
file1 = invokeUrl
[
   url :"http://www.africau.edu/images/default/sample.pdf"
   type :  GET
];

// Fetch .jpg file
file2 = invokeUrl
[
   url :"https://upload.wikimedia.org/wikipedia/commons/a/a7/Blank_image.jpg"
   type :  GET
];

// Create a list to add files that need to be compressed
filesList = List();
filesList.add(file1);
filesList.add(file2);

// Perform compress function
zip_file =  filesList.compress("compressed_file");

```

--------------------------------

### Deluge: Fetching Opportunities

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to fetch opportunities from Zoho CRM, filtering them by stage and sorting by closing date.

```deluge
// Fetching opportunities in the 'Proposal/Price Quote' stage
opportunitiesList = zoho.crm.getRecords("Potentials", "all", "Closing_Date.ASC", "Stage=Proposal/Price Quote");

// Displaying the fetched opportunities
info opportunitiesList;
```

--------------------------------

### Zoho Recruit: Get Record by ID

Source: https://www.zoho.com/deluge/help/recruit-tasks

Fetches the details of a specific record in Zoho Recruit using its unique ID. This is useful for retrieving individual record information.

```Deluge
recordId = "123456789012345";
response = zoho.recruit.getRecordById("ModuleName", recordId);
info response;
```

--------------------------------

### Deluge Count Example - Counting Phone Numbers

Source: https://www.zoho.com/deluge/help/data-access/aggregate-records/count

This example demonstrates how to use the count function in Deluge to retrieve the number of phone numbers from the 'Employees' form. It fetches all records where the ID is not 0 and counts the values in the 'phone_number' field.

```Deluge
EmployeeDetails = Employees [ ID != 0 ].count(phone_number);
```

--------------------------------

### Fetch Dropbox Files using Deluge

Source: https://www.zoho.com/deluge/help/deluge-invoke-url

This script demonstrates how to fetch a list of files from a specified folder in a connected Dropbox account using the Dropbox API. It requires setting up parameters for the API path and headers, and utilizes the 'invokeUrl' task with a POST request.

```Deluge
// Create a variable to hold the parameters that is required by Dropbox API
raw_data = Map();
raw_data.put("path", "/test_folder");  

// Create a variable to hold the headers that is required by Dropbox API
header_data  = Map(); 
header_data.put("Content-Type", "application/json");  

// Supply the URL, parameters, and headers to the invoke URL task  
response = invokeUrl  
[
url: "https://api.dropboxapi.com/2/files/list_folder"
url: "https://api.dropboxapi.com/2/files/list_folder"
type: POST  
parameters: raw_data.toString()  
headers: header_data
connection: "dropbox_connection"
];

```

--------------------------------

### Deluge Invoke URL Task - Allowed Ports (EU/IN)

Source: https://www.zoho.com/deluge/help/web-data/invokeurl-task/limitations

Details the network ports permitted for the Invoke URL task when invoked from services outside Zoho Creator, specifically for European Union (EU) and India (IN) setups. This list is more restricted than the US/CN setup.

```Deluge
8011
9001
8082
```

--------------------------------

### Deluge: Example - Autopopulate Subform Fields on Form Load

Source: https://www.zoho.com/deluge/help/miscellaneous/insert-subform-row

This Deluge example demonstrates how to autopopulate subform fields when a form loads in Zoho Creator. It shows how to create a new row, assign values to specific fields ('Item Name', 'Quantity'), and then insert this row into the 'Items' subform.

```Deluge
row1 = Products.Items(); 
row1.Item_Name = "Laptop"; 
row1.Quantity = 1; 
input.Items.insert(row1);
```

--------------------------------

### Iterate and Send Email Example in Deluge

Source: https://www.zoho.com/deluge/help/collection-variable

Demonstrates iterating through the 'employeesJoinedToday' collection and sending a personalized email to each employee's email address stored in the 'Email' field.

```deluge
for each employee in employeesJoinedToday {
  sendmail
  [
  from: zoho.adminuser
  to: employee.Email
  subject: "Zylker : Offer Letter"
  message: "Welcome to Zylker. Please find your offer letter attached with this email."
  ]
}
```

--------------------------------

### Deluge: Create and Add Elements to a List

Source: https://www.zoho.com/deluge/help/list-manipulations/create-list

This example shows how to create an empty list variable in Deluge and then add elements to it using the 'add' method. It supports adding elements of different data types.

```deluge
listVar=list();
listVar.add(1);
listVar.add("Harry");
```

--------------------------------

### Zoho Connect - Get Post (Deluge)

Source: https://www.zoho.com/deluge/help/connect-tasks

Retrieves the content of a specific post using its unique ID. This is useful for displaying or processing existing posts.

```Deluge
postDetails = zoho.connect.get("getPost", {"postId": "your_post_id"});
```

--------------------------------

### Deluge: Create a List with Elements

Source: https://www.zoho.com/deluge/help/list-manipulations/create-list

This snippet demonstrates creating a Deluge list and populating it with multiple elements. Elements can be of different data types and enclosed in curly or square brackets.

```deluge
variable = {"element1", "element2", "element3"};
```

```deluge
variable = ["element1", "element2", "element3"];
```

--------------------------------

### Deluge: Creating an Account

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to create a new account in Zoho CRM, including setting the account name and phone number.

```deluge
// Creating a new Account
accountMap = Map();
accountMap.put("Account_Name", "Global Corp");
accountMap.put("Phone", "555-123-4567");
accountMap.put("Website", "www.globalcorp.com");

createAccountResponse = zoho.crm.createRecord("Accounts", accountMap);
info createAccountResponse;
```

--------------------------------

### Zoho Deluge Success Response Example

Source: https://www.zoho.com/deluge/help/billing/update-record

This JSON object represents a successful subscription update in Zoho Deluge. It includes details about the updated subscription, customer information, and transaction status.

```json
{
  "message": "Subscription has been updated successfully.",
  "subscription": {
    "subscription_id": "115888000000047005",
    "payment_terms": 0,
    "interval": 1,
    "product_id": "115888000000037018",
    "payment_terms_label": "Due on Receipt",
    "next_billing_at": "2015-04-10",
    "product_name": "zoho",
    "current_term_starts_at": "2015-03-10",
    "customer": {
      "payment_terms": 0,
      "payment_terms_label": "",
      "zcrm_account_id": "",
      "shipping_address": {
        "zip": "",
        "fax": "",
        "street": "",
        "state": "",
        "country": "",
        "city": ""
      },
      "first_name": "",
      "display_name": "ram",
      "email": "ram.s@gmail.com",
      "company_name": "",
      "zcrm_contact_id": "",
      "last_name": "",
      "customer_id": "115888000000046001",
      "billing_address": {
        "zip": "",
        "fax": "",
        "street": "",
        "state": "",
        "country": "",
        "city": ""
      }
    },
    "interval_unit": "months",
    "updated_time": "2015-03-10T11:06:10+0530",
    "current_term_ends_at": "2015-04-10",
    "amount": 1000,
    "salesperson_name": "",
    "name": "zoho-monthly",
    "reference_id": "",
    "salesperson_id": "",
    "currency_symbol": "Rs.",
    "activated_at": "2015-03-10",
    "currency_code": "INR",
    "custom_fields": "[]",
    "child_invoice_id": "115888000000046015",
    "status": "live",
    "addons": "[]",
    "last_billing_at": "2015-03-10",
    "contactpersons": [
      {
        "phone": "",
        "email": "ram.s@gmail.com",
        "zcrm_contact_id": "",
        "contactperson_id": "115888000000046003",
        "mobile": ""
      }
    ],
    "plan": {
      "tax_name": "",
      "setup_fee": 0,
      "price": 1000,
      "tax_type": "",
      "name": "monthly",
      "tax_id": "",
      "quantity": 1,
      "tax_percentage": "",
      "plan_code": "monthly"
    },
    "created_time": "2015-03-10T11:00:18+0530",
    "taxes": "[]",
    "auto_collect": false
  },
  "code": 0
}
```

--------------------------------

### Iterate and Get IDs from Response

Source: https://www.zoho.com/deluge/help/creator/get-records-v1

Demonstrates how to loop through the response obtained from the `getRecords` task and extract the 'ID' of each fetched record.

```deluge
for each <loop_variable> in <response_variable> 
{
info var.get("ID"); 
}
```

--------------------------------

### Attach Multiple Reports with Criteria in Deluge

Source: https://www.zoho.com/deluge/help/misc-statements/send-mail

This example illustrates attaching multiple reports, each with its own criteria and format, separated by commas in Zoho Deluge. This allows for flexible report bundling.

```Zoho Deluge
view: <Report_Link_Name1> [<criteria1>] as <attachment_format1>, view: <Report_Link_Name2> [<criteria2>] as <attachment_format2>
```

--------------------------------

### Open URL in New Window with Successive Parameter

Source: https://www.zoho.com/deluge/help/release-notes

To ensure that each click opens a URL in a new window, the `openUrl` task in Deluge now supports the `successive=true` parameter. Previously, subsequent clicks would reuse the same new window.

```Deluge
openUrl("your_url", "successive=true");
```

--------------------------------

### Deluge: Get Index of an Element in Collection

Source: https://www.zoho.com/deluge/help/functions/collection/getkey

This Deluge code snippet illustrates how to use the `getKey` function to find the index of a specific element within a collection. It defines a collection of elements and then uses `getKey` to get the index of a particular element.

```Deluge
products = Collection("Creator", "CRM", "Mail");
 indexNum = products.getKey( "CRM" );
 info indexNum; // Returns 1
```

--------------------------------

### Deluge addSeconds Example: Adding Seconds to Time (Zoho Creator)

Source: https://www.zoho.com/deluge/help/functions/datetime/addseconds

Demonstrates the usage of the addSeconds function with time values in Deluge, specifically for Zoho Creator. The examples show adding seconds to a 12-hour format time ('10:00:00 PM') and a 24-hour format time ('13:15:10').

```Deluge
// The below code tries to add hours to a "time" value beyond the 24-hour range 
timeValue = '10:00:00 PM';
info timeValue.addSeconds(4); // Returns '10:00:04 PM'
```

```Deluge
currentTime = '13:15:10';
info currentTime.addSeconds(1000);  // Returns '13:31:50'
```

--------------------------------

### Deluge Example: Book Availability Check

Source: https://www.zoho.com/deluge/help/conditional-statements/condition

This snippet checks the availability of a book in 'Books' and 'OrderedBooks' forms using if-else if statements.

```deluge
inputBook="bloodline";
bookRecords= Books[ BookName == inputBook ];
yetToArrive=OrderedBooks[Book_Name==inputBook];
if(bookRecords.count()>0)
{
info inputBook +" is present";
}
else if(yetToArrive.count() > 0)
{
info inputBook + "is yet to arrive";
}
```

--------------------------------

### Integrate Zoho Creator with External APIs using Deluge

Source: https://www.zoho.com/deluge/help/index

Connect Zoho Creator with external APIs and services to extend functionality using Deluge scripting. This allows syncing data with other systems or fetching live data from external sources.

```Deluge
// Example Deluge code for third-party integrations
// (Specific code depends on the Zoho Creator application structure)
```

--------------------------------

### Deluge Reverse() Example 2: Palindrome Check

Source: https://www.zoho.com/deluge/help/functions/string/reverse

Illustrates how to use the reverse() function to check if a given input string is a palindrome.

```Deluge
inputText = "level" ;
 outputText = reverse ( inputText ) ;
 if ( inputText == outputText )
 {
 info "Palindrome" ;
 }
 else
 {
 info "Not a Palindrome" ;
 }
 // Returns "Palindrome"
```

--------------------------------

### Invoke Zoho API with invokeapi

Source: https://www.zoho.com/deluge/help/webhook/invokeapitask

This snippet demonstrates the basic syntax for using the invokeapi function in Zoho Deluge to interact with Zoho services. It outlines the mandatory and optional parameters required for making an API call.

```Deluge
response = invokeapi
[
service:<service_name>
path:<path_value>
type:<type_value>
parameters:<parameters_value>
body:<body_value>
headers:<headers_value>
connection:<connection_name>
response-format:<response_format_value>
response-decoding:<encoding_format_value>
];
```

--------------------------------

### Compress Files into Directories in Deluge

Source: https://www.zoho.com/deluge/help/functions/file/compress

This Deluge example demonstrates compressing files into a structured ZIP archive. It creates a 'Directory 1.zip' containing a PDF file and another nested directory ('Directory 2') with a JPG file.

```Deluge
// Fetch .pdf file
file1 = invokeUrl
[
   url :"http://www.africau.edu/images/default/sample.pdf"
   type :  GET
];

// Fetch .jpg file
file2 = invokeUrl
[
   url :"https://upload.wikimedia.org/wikipedia/commons/a/a7/Blank_image.jpg"
   type :  GET
];

// Create a map to add files in directory structure
directory2 = Map();
directory2.put(file2.getfilename() ,file2);

directory1 = Map();
directory1.put(file1.getfilename() ,file1);
directory1.put("Directory 2" ,directory2);

// Perform compress function
zip_file =  directory1.compress("Directory 1");

```

--------------------------------

### Create Zoho Books Invoice from Zoho Creator Subform

Source: https://www.zoho.com/deluge/help/books/create-record

This script iterates through a subform in Zoho Creator, collects product details into a list of maps, and then uses this data to create an invoice in Zoho Books. It requires a Zoho Books connection and organization ID.

```deluge
listVar = List();

//iterating each row in the subform
for each  line in Products
{
  mapVar = map();
  mapVar.put("item_id", line.item_id);
  mapVar.put("name", line.name);
  mapVar.put("rate", line.rate);
  mapVar.put("quantity", line.quantity);
  listVar.add(mapVar);
}

values = map();
values.put("customer_id", input.Customer_ID);
values.put("line_items", listVar);

response = zoho.books.createRecord("Invoices", "66XXXXX66", values, "books_connection");
```

--------------------------------

### Deluge Integration Task Structure

Source: https://www.zoho.com/deluge/help/integration-tasks

Demonstrates the standard syntax for using Deluge integration tasks to interact with Zoho services. It outlines the components: service, action, and parameters.

```Deluge
zoho.<service>.<action>(<parameters>);

```

--------------------------------

### Deluge max() Function Example

Source: https://www.zoho.com/deluge/help/functions/number/max

Demonstrates how to use the max() function in Deluge to find the larger of two numbers. It shows both the object-oriented and functional syntax.

```deluge
numOne = 100;
numTwo = 200;
maxValue = numOne.max(numTwo); // returns 200
```

```deluge
numOne = 100;
numTwo = 200;
maxValue = max(numOne, numTwo); // returns 200
```

--------------------------------

### Deluge toNumber Example: Text to Number Conversion

Source: https://www.zoho.com/deluge/help/functions/common/to-number

Illustrates the conversion of a string containing only digits into a number using the toNumber function.

```Deluge
num_text = "1234";
info  num_text.toNumber(); // Returns 1234
```

--------------------------------

### Deluge power() Function Example

Source: https://www.zoho.com/deluge/help/functions/number/power

Demonstrates how to use the power() function in Deluge to calculate the result of a base number raised to a specific power. The function accepts the base number and the power number as arguments.

```deluge
numOne = 3;
numTwo = 2;
newValue = numOne.power(numTwo); // returns 9
```

```deluge
newValue = power(3, 2); // returns 9
```

--------------------------------

### Create Task in Zoho Projects using Deluge

Source: https://www.zoho.com/deluge/help/projects/create

This Deluge script demonstrates how to create a new task record in Zoho Projects. It utilizes the `zoho.projects.create` function, specifying the portal name, project ID, module ('tasks'), and a map containing the task details.

```Deluge
values_map = Map();
values_map.put("name", "Document Review");
response = zoho.projects.create("zylker", 548XXXXXXXXXXX771, "tasks", values_map);
```

--------------------------------

### Add Number as String to Deluge List

Source: https://www.zoho.com/deluge/help/create-list-datatype

Illustrates adding a number to a string list, where the number is treated as a string value. The example adds the number '1'.

```deluge
listVar=list:String();
listVar.add(1);
```

--------------------------------

### Zoho Creator Integration Tasks - Get Records

Source: https://www.zoho.com/deluge/help/creator-tasks

Fetches records from a specified report in Zoho Creator. This is a fundamental operation for retrieving data.

```Deluge
getRecords(reportName);
```

--------------------------------

### Fetch All Records from Zoho Projects Module

Source: https://www.zoho.com/deluge/help/projects/get-records

This Deluge script demonstrates how to fetch all records from a specified module (e.g., 'tasks') within a given Zoho Projects portal and project. It utilizes the `zoho.projects.getRecords` task with basic parameters.

```Deluge
response = zoho.projects.getRecords("zylker", 548XXXXXXXXXXX771, "tasks", 0, 0, "projects");
```

--------------------------------

### Zoho Deluge Failure Response Example

Source: https://www.zoho.com/deluge/help/billing/update-record

This JSON object illustrates a failure response from the Zoho Deluge API, indicating that an action is not permitted due to no changes being made to the plan or addons. It includes an error message and a specific error code.

```json
{
  "message": "The action is not allowed for this profile as there are no changes made in the plan or addons.",
  "code": 26005
}
```

--------------------------------

### Create Zoho Desk Ticket Record

Source: https://www.zoho.com/deluge/help/desk/create-record

This Deluge script demonstrates how to create a new ticket record in Zoho Desk. It defines the ticket details in a key-value pair and uses the `zoho.desk.create` function with the organization ID, module name ('tickets'), record values, and connection name.

```Deluge
recordValue = {"subject" : "Create ticket", "departmentId":"168XXXXXXXXXXXXXX044", "contactId":"1689XXXXXXXXXXXXXX005"};
response = zoho.desk.create(641XXXXXX, "tickets", recordValue, "desk_connection");
```

--------------------------------

### Zoho Books - Get Records

Source: https://www.zoho.com/deluge/help/books-tasks

Fetches records from a specified module in Zoho Books. This function can be used to retrieve multiple records based on various criteria.

```Deluge
getRecords("ModuleName");
```

--------------------------------

### Add Record in Zoho Recruit

Source: https://www.zoho.com/deluge/help/recruit/create-record

This Deluge script demonstrates how to create a new record in the 'Candidates' module of Zoho Recruit using the `zoho.recruit.addRecord` task. It defines a map with candidate details and specifies parameters for duplicate checking and workflow triggering.

```Deluge
candidatesMap = Map();
candidatesMap.put("Last name","Richard");
candidatesMap.put("Email","richard@zoho.com");
candidatesMap.put("Mobile","+91 998877665");
candidatesMap.put("Experience in years","5");
candidatesMap.put("Current Job Title","Assistant Manager");
candidatesMap.put("Skill Set","MCA");
candidatesMap.put("Experience Details","Working in UTS for 5 years");

response= zoho.recruit.addRecord("Candidates", candidatesMap, 0, false, "recruit_connection");
```

--------------------------------

### Deluge: Example - Retrieve Email from Subform

Source: https://www.zoho.com/deluge/help/miscellaneous/access-subform-fields

This example shows how to retrieve an email address from a subform's 'mail' field using the 'row' keyword in Deluge. The retrieved email is stored in the 'emailId' variable, with a null check for safety.

```Deluge
if(row.mail != null)
{
    emailId = row.mail; // the email from the field in the subForm row is now retrieved
}
```

--------------------------------

### Blueprint Tasks: executeTransition and changeStage

Source: https://www.zoho.com/deluge/help/release-notes

Two new tasks have been added to work with Blueprints in Zoho Creator. 'executeTransition' allows executing a transition to move a record between stages, while 'changeStage' allows moving to a new stage without executing a transition.

```Deluge
thisapp.blueprint.executeTransition
thisapp.blueprint.changeStage
```

--------------------------------

### Deluge endsWithIgnoreCase() Example

Source: https://www.zoho.com/deluge/help/functions/string/endswithignorecase

Demonstrates how to use the endsWithIgnoreCase() function in Deluge to check if a string ends with a specific substring, ignoring case.

```Deluge
Product = "Zoho Creator";
boolVal= endsWithIgnoreCase(Product, "creator"); //returns true
```

--------------------------------

### Example: Disable 'Total Amount' Field in Deluge

Source: https://www.zoho.com/deluge/help/client-functions/enable-disable

Demonstrates how to disable the 'Total Amount' field using the Deluge disable task.

```Deluge
disable Total_Amount;
```

--------------------------------

### Deluge min() Function Example

Source: https://www.zoho.com/deluge/help/functions/number/min

Demonstrates how to use the min() function in Deluge to find the smaller of two numbers. The function can be called as a method on a number or as a standalone function.

```deluge
numOne = 100;
numTwo = 200;
minValue = numOne.min(numTwo); // returns 100
```

```deluge
numOne = 100;
numTwo = 200;
minValue = min(numOne, numTwo); // returns 100
```

--------------------------------

### Zoho Books Integration Tasks in Zoho Creator

Source: https://www.zoho.com/deluge/help/release-notes

New integration tasks for Zoho Books are now available in Zoho Creator, including functions to retrieve organizations, templates, and manage subscription statuses. These functions are also supported in other Deluge-enabled Zoho services.

```Deluge
zoho.books.getOrganizations
zoho.books.getTemplates
zoho.books.markStatus
zoho.subscriptions.getOrganizations
```

--------------------------------

### Deluge remove() Function Example

Source: https://www.zoho.com/deluge/help/functions/string/remove

Demonstrates how to use the remove() function in Deluge to remove a substring from a string. The function takes the string and the substring to be removed as arguments.

```deluge
Product="Zoho Creator";
newText = Product.remove("Creator"); // returns "Zoho "
```

--------------------------------

### Create Invoice with Line Items in Zoho Invoice

Source: https://www.zoho.com/deluge/help/invoice/create-record

This Deluge example shows how to create an invoice in Zoho Invoice, including multiple line items. It iterates through a subform, constructs a list of item maps, and then uses `zoho.invoice.create` to generate the invoice.

```Deluge
listVar = List();

//iterating each row in the subform
for each  line in Products
{
  mapVar = map();
  mapVar.put("item_id", line.item_id);
  mapVar.put("name", line.name);
  mapVar.put("rate", line.rate);
  mapVar.put("quantity", line.quantity);
  listVar.add(mapVar);
}

values = map();
values.put("customer_id", input.Customer_ID);
values.put("line_items", listVar);

response = zoho.invoice.create("Invoices", "66XXXXX66", values);
```

--------------------------------

### Fetch Service Details using invokeAPI (Zoho Bookings - Deluge)

Source: https://www.zoho.com/deluge/help/webhook/invokeapitask

This Deluge script uses the invokeAPI task to fetch service details from Zoho Bookings via a GET request. It specifies the service, path, and connection details.

```deluge
response = invokeapi
[
service: ZohoBookings
path: "bookings/v1/json/services"
type: GET
connection: "bookings_connection"
];  

info response;
```

--------------------------------

### Encode File to Base64 in Deluge

Source: https://www.zoho.com/deluge/help/encryption-tasks/base-64-encode

Encodes the content of a file, fetched from a URL, into Base64 format. It first uses invokeUrl to get the file content and then passes it to zoho.encryption.base64Encode.

```Deluge
sample_file = invokeUrl
[
url: "http://www.africau.edu/images/default/sample.pdf"
type: GET
];

response = zoho.encryption.base64Encode(sample_file);
```

--------------------------------

### Create Quickbooks Customer Record

Source: https://www.zoho.com/deluge/help/quickbooks/create-record

This Deluge script demonstrates how to create a new customer record in Quickbooks. It defines customer details, shipping and billing addresses, and then uses the 'intuit.quickbooks.create' function to add the record.

```Deluge
Customer_Details = map();
Customer_Details.put("FamilyName", "George Stepenson");
Customer_Details.put("FullyQualifiedName", "Stepenson ");
Customer_Details.put("DisplayName", "George");

Shipping_Address = map();
Shipping_Address.put("Line1", "312, 10th Avenue");
Shipping_Address.put("Line2", "Rick cross street");
Shipping_Address.put("Line3", "5th Block");
Shipping_Address.put("Country", "USA");

Billing_Address = map();
Billing_Address.put("Line1", "312, 10th Avenue");
Billing_Address.put("Line2", "Rick cross street");
Billing_Address.put("Line3", "5th Block");
Billing_Address.put("Country", "USA");

Customer_Details.put("ShipAddr", Shipping_Address);
Customer_Details.put("BillAddr", Billing_Address);

response = intuit.quickbooks.create("Quickbooks", "Customer", "1241802285", Customer_Details);
```

--------------------------------

### Zoho Creator V1 Integration Tasks - Get Records

Source: https://www.zoho.com/deluge/help/creator-tasks-v1

Fetches records from a specified report in Zoho Creator V1. This task is deprecated.

```Deluge
get records from [report name]
```

--------------------------------

### Deluge subText Example: Invalid Index Order

Source: https://www.zoho.com/deluge/help/functions/string/subtext

Demonstrates an error case for the subText function where the end_index is less than the start_index. This scenario will result in a runtime error.

```Deluge
product_name="Zoho Deluge";
result = product_name.subText(6,4);
info result;
```

--------------------------------

### Create Record in Zoho Creator Development Environment

Source: https://www.zoho.com/deluge/help/creator/create-record

Specifically for creating records within the development environment of Zoho Creator. It uses the same syntax but requires the development version of the application link name.

```Deluge
<variable> = zoho.creator.createRecord(<owner_name>, <app_link_name-development>, <form_link_name>, <input_values>, <other_params>, <connection>);
```

--------------------------------

### Deluge Key-Value Data Type Example

Source: https://www.zoho.com/deluge/help/datatypes

Demonstrates the usage of the Key-Value data type in Deluge, which stores data as pairs of keys and their corresponding values. Keys must be unique, and duplicate keys will overwrite previous values.

```Deluge
ItemQuantity = {"Item" : "Magic_Mouse", "Number" : 23};
```

--------------------------------

### Create Zoho Cliq Record with Static Values

Source: https://www.zoho.com/deluge/help/cliq/create-record

This Deluge script demonstrates how to create a new record in a Zoho Cliq database named 'availabilitydatabase' using static values for 'name', 'empid', and 'availability'. It utilizes the `zoho.cliq.createRecord` function.

```Deluge
values_map=Map();
values_map.put("name","John");
values_map.put("empid","1");
values_map.put("availability","true");

response_map = zoho.cliq.createRecord("availabilitydatabase", values_map, "cliq_connection");

```

--------------------------------

### Create Record in Zoho Inventory Contacts

Source: https://www.zoho.com/deluge/help/inventory/create-record

The `zoho.inventory.createRecord` task is used to create a new record within a specified module in Zoho Inventory. This example demonstrates creating a contact record.

```Deluge
record_value = Map();
record_value.put("contact_name","Shawn");

response = zoho.inventory.createRecord("Contacts", "58XXXX49", record_value);
```

--------------------------------

### Deluge: Custom Function Example

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script defines a custom function that calculates the sum of two numbers. It takes two number arguments and returns their sum.

```deluge
// Custom function to add two numbers
def addNumbers(num1, num2)
{
    sum = num1 + num2;
    return sum;
}

// Calling the custom function
result = addNumbers(10, 20);
info "The sum is: " + result;
```

--------------------------------

### Retrieve Element by Index from List

Source: https://www.zoho.com/deluge/help/functions/getjson-and-get

This Deluge example shows how to access an element from a list using its index. It retrieves a nested list based on the specified index.

```Deluge
listVar = {"Creator", "CRM", {"Projects", "Reports"}};

elementValue = listVar.get(2);                               //returns {"Projects", "Reports"}
```

--------------------------------

### Zoho Creator: toFile Function Support

Source: https://www.zoho.com/deluge/help/release-notes

Zoho Creator now supports the toFile function, which was previously available in other Zoho services. This allows for file handling operations within Zoho Creator scripts.

```Deluge
// Example of using toFile function in Zoho Creator
toFile("path/to/save/file.txt", "content");
```

--------------------------------

### Deluge Duplicate Function with Indices

Source: https://www.zoho.com/deluge/help/functions/collection/duplicate

The duplicate function in Deluge can be used to extract elements from a collection within a specified start and end index. The start index is inclusive, and the end index is exclusive. If indices are not provided, the entire collection is duplicated.

```deluge
products1 = collection("Creator", "CRM", "Books");
info products1.duplicate( 0, 1); // Returns "Creator"
```

--------------------------------

### Deluge: Get Extension Property

Source: https://www.zoho.com/deluge/help/cliq/extension-tasks

Retrieves the value associated with a specific property key in Zoho Cliq extensions. It requires the property key and optionally a connection name.

```Deluge
<variable> = zoho.cliq.extension.getProperties(<property_Key>, <connection>);
```

--------------------------------

### Create Salesforce Account Record

Source: https://www.zoho.com/deluge/help/salesforce/create-record

This Deluge snippet demonstrates how to create a new record in the 'Account' module in Salesforce. It defines a map with account information and uses the 'salesforce.sales.create' function to insert the data.

```Deluge
accountinfo = { "Name" : input.First_Name, "BillingCity" : input.City, "Type" : input.Type, "Industry" : input.Industry};
  
response = salesforce.sales.create("Salesforce", "Account", accountinfo);
```

--------------------------------

### Deluge: Replace First Occurrence of a String

Source: https://www.zoho.com/deluge/help/functions/string/replacefirst

This example demonstrates how to replace the first occurrence of the word 'online' with 'custom' in the string 'Create online database applications'.

```deluge
mainString="Create online database applications";
newText = replaceFirst(mainString, "online", "custom");
// returns Create custom database applications
```

--------------------------------

### Calculate Years Using totalYears() in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/totalyear

The totalYears() function calculates the difference in years between a start and end date-time value. It correctly accounts for leap years, unlike the yearsBetween() function. The function can be called as a method of the start date-time or as a standalone function.

```Deluge
startDate = '1-Jan-2019';
endDate = '31-Dec-2019';
newStartDate = '1-Jan-2019';
newEndDate = '1-Jan-2020';
numberOfYears = totalYears(startDate, endDate); // returns 0
numOfYears = totalYears(newStartDate,newEndDate); // returns 1
```

--------------------------------

### Fetch Zoho Books Templates using Deluge

Source: https://www.zoho.com/deluge/help/books/get-templates

This Deluge script retrieves all templates from a specified Zoho Books module. It requires the module name, organization ID, and a Zoho Books connection name as parameters. The response is a key-value pair containing template details or an error message.

```Deluge
response = zoho.books.getTemplates("Invoices","5379XXXX", "books_connection");
```

--------------------------------

### Deluge len() Function Example

Source: https://www.zoho.com/deluge/help/functions/string/len

Demonstrates how to use the len() function in Deluge to count characters in a string. The function can be called as a method of the string or as a standalone function.

```deluge
text = "Create database applications with Zoho Creator";
count= text.len(); //returns 46
```

```deluge
text = "Create database applications with Zoho Creator";
count= len(text); //returns 46
```

```deluge
text = "Create database applications with Zoho Creator";
count= text.length(); //returns 46
```

```deluge
text = "Create database applications with Zoho Creator";
count= length(text); //returns 46
```

--------------------------------

### Deluge deleteKeys by Index

Source: https://www.zoho.com/deluge/help/functions/collection/deletekeys

Deletes elements from a Deluge collection based on their index values. It takes a list of indices as input, where indexing starts from 0.

```deluge
products = collection("Creator", "CRM", "Mail");
products.deleteKeys({1, 2}); // deletes the elements "CRM" and "Mail"
```

--------------------------------

### Retrieve Value by Key from Map

Source: https://www.zoho.com/deluge/help/functions/getjson-and-get

This Deluge snippet demonstrates retrieving values from a key-value map (dictionary) using the 'get' method. It shows how to access existing keys and what happens when a non-existent key is queried.

```Deluge
mapVar  =  {"Product" : "Creator", "Company" : "Zoho"};

boolVal  =  mapVar.get("creator");                //returns null
newBoolVal = mapVar.get("Product");         //returns "Creator"
```

--------------------------------

### Mark Zoho Writer Document as Ready

Source: https://www.zoho.com/deluge/help/writer/mark-document-ready

Marks a specified Zoho Writer document as ready using its ID and a provided OAuth connection. This task interacts with the Zoho Writer Mark As Ready API.

```Deluge
document_id = "h36bc2a6c50b2754a405880c1d1679a5f5be9";
response = zoho.writer.documents.markAsReady(document_id, "writer_oauth_connection");
info response;
```

--------------------------------

### Fetch All Groups from Zoho One Organization

Source: https://www.zoho.com/deluge/help/one/get-groups

This script fetches the first 200 groups from a specified Zoho One organization. It requires the organization ID, starting index, number of records to fetch, and the connection link name.

```Deluge
response = zoho.one.getGroups(72XXXXXXX,  "1", "200", Map(), "zoho_one_connection")
```

--------------------------------

### Fetch Active Projects from Zoho Projects Portal

Source: https://www.zoho.com/deluge/help/projects/get-project-details

This Deluge script demonstrates how to fetch all active projects from a specified portal in Zoho Projects using the `zoho.projects.getProjectDetails` task. It requires the portal name and optionally accepts a status parameter.

```deluge
response = zoho.projects.getProjectDetails("zylker", "active");
```

--------------------------------

### Fetch All Folder IDs

Source: https://www.zoho.com/deluge/help/mail/get-folders

Iterates through the response from `zoho.mail.getFolders` to extract and display the ID of each fetched folder.

```Deluge
for each var in <response_variable> {
  info var.get("ID");
}
```

--------------------------------

### Blueprint Attributes for Getting Blueprint Details

Source: https://www.zoho.com/deluge/help/release-notes

Introduces three new Blueprint attributes that allow access to details about the current Blueprint, including its name, current stage, and status.

```Deluge
input.Blueprint.Name
input.Blueprint.Current_Stage
input.Blueprint.Status
```

--------------------------------

### Deluge addHour Example: Time Value Beyond 24-Hour Range

Source: https://www.zoho.com/deluge/help/functions/datetime/addhour

Illustrates a scenario in Deluge where adding hours to a time value results in a value outside the 24-hour range, causing a runtime error. This example is specific to Zoho Creator's time data type.

```deluge
// The below code tries to add hours to a "time" value beyond the 24-hour range 
timeValue = '10:00:00 PM';
info timeValue.addHour(4); // throws the error - "Invalid Operation. Value outside 24 hour range"
```

--------------------------------

### Fetch Designations from Zoho Directory

Source: https://www.zoho.com/deluge/help/directory/get-designations

This script retrieves the designations for the first 200 users from a specified Zoho Directory organization. It requires a valid organization ID and a connection link name.

```deluge
response = zoho.directory.getDesignations(72XXXXXXX, "1", "200", "zoho_directory_connection");
```

--------------------------------

### Add Months to Date in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/addmonth

This example demonstrates how to add a specified number of months to a date using the addMonth() function in Deluge. It shows the syntax and expected output.

```Deluge
currentDate = '01-Jan-2019';
newDate = currentDate.addMonth(11); 
// returns '01-Dec-2019 00:00:00'
```

--------------------------------

### Deluge workDaysList Syntax

Source: https://www.zoho.com/deluge/help/functions/datetime/work-days-list

This is the general syntax for the workDaysList function in Deluge. It takes start date, end date, an optional weekends list, and an optional holidays list as parameters.

```Deluge
<variable> = <start_date>.workDaysList(<end_date>,<weekends_list>,<holiday_list>);
```

--------------------------------

### Deluge addSeconds Example: Adding Seconds to Date-Time

Source: https://www.zoho.com/deluge/help/functions/datetime/addseconds

Provides examples of using the addSeconds function to add seconds to a date-time value in Deluge. It shows how adding 70 seconds to '01-Jan-2019' results in '01-Jan-2019 00:01:10', and adding 2 seconds to '01-Jan-2019 23:15:10' results in '01-Jan-2019 23:15:12'.

```Deluge
currentDate = '01-Jan-2019';
info currentDate.addSeconds(70); // Returns '01-Jan-2019 00:01:10'
```

```Deluge
currentDate = '01-Jan-2019 23:15:10';
info currentDate.addSeconds(2); // Returns '01-Jan-2019 23:15:12'
```

--------------------------------

### Deluge: Creating a Lead Status

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to create a new lead status in Zoho CRM.

```deluge
// Creating a new Lead Status
leadStatusMap = Map();
leadStatusMap.put("Lead_Status", "Contacted");
leadStatusMap.put("Sequence", 3);

createLeadStatusResponse = zoho.crm.createRecord("Lead_Statuses", leadStatusMap);
info createLeadStatusResponse;
```

--------------------------------

### Calculate Time Difference using timeBetween

Source: https://www.zoho.com/deluge/help/functions/datetime/time-between

The timeBetween function calculates the time difference between a start and end date-time. The difference is returned in HH:mm:ss format. Ensure the end time is after the start time. The function accepts date-time values or text representations of dates and times.

```Deluge
start = "6-Jan-2020 10:10:12";
 end = '7-Jan-2020 11:20:12';
 difference = start.timeBetween(end); 
// difference is assigned the value '25:10:2'
```

```Deluge
start = '6-Jan-2020 10:10:12';
 end = '7-Jan-2020 11:20:12';
 difference = start.timeBetween(end); 
// difference is assigned the value '25:10:2'
```

--------------------------------

### Zoho Deluge Success Response Example

Source: https://www.zoho.com/deluge/help/subscriptions/update-record

This JSON object represents a successful subscription update in Zoho Deluge. It includes details about the updated subscription, customer information, and transaction status.

```json
{
  "message": "Subscription has been updated successfully.",
  "subscription": {
    "subscription_id": "115888000000047005",
    "payment_terms": 0,
    "interval": 1,
    "product_id": "115888000000037018",
    "payment_terms_label": "Due on Receipt",
    "next_billing_at": "2015-04-10",
    "product_name": "zoho",
    "current_term_starts_at": "2015-03-10",
    "customer": {
      "payment_terms": 0,
      "payment_terms_label": "",
      "zcrm_account_id": "",
      "shipping_address": {
        "zip": "",
        "fax": "",
        "street": "",
        "state": "",
        "country": "",
        "city": ""
      },
      "first_name": "",
      "display_name": "ram",
      "email": "ram.s@gmail.com",
      "company_name": "",
      "zcrm_contact_id": "",
      "last_name": "",
      "customer_id": "115888000000046001",
      "billing_address": {
        "zip": "",
        "fax": "",
        "street": "",
        "state": "",
        "country": "",
        "city": ""
      }
    },
    "interval_unit": "months",
    "updated_time": "2015-03-10T11:06:10+0530",
    "current_term_ends_at": "2015-04-10",
    "amount": 1000,
    "salesperson_name": "",
    "name": "zoho-monthly",
    "reference_id": "",
    "salesperson_id": "",
    "currency_symbol": "Rs.",
    "activated_at": "2015-03-10",
    "currency_code": "INR",
    "custom_fields": "[]",
    "child_invoice_id": "115888000000046015",
    "status": "live",
    "addons": "[]",
    "last_billing_at": "2015-03-10",
    "contactpersons": [
      {
        "phone": "",
        "email": "ram.s@gmail.com",
        "zcrm_contact_id": "",
        "contactperson_id": "115888000000046003",
        "mobile": ""
      }
    ],
    "plan": {
      "tax_name": "",
      "setup_fee": 0,
      "price": 1000,
      "tax_type": "",
      "name": "monthly",
      "tax_id": "",
      "quantity": 1,
      "tax_percentage": "",
      "plan_code": "monthly"
    },
    "created_time": "2015-03-10T11:00:18+0530",
    "taxes": "[]",
    "auto_collect": false
  },
  "code": 0
}
```

--------------------------------

### Deluge left() Function Example

Source: https://www.zoho.com/deluge/help/functions/string/left

Demonstrates how to use the left() function in Deluge to extract the first four characters from the string 'Zoho Creator'. This function is useful for substring operations.

```Deluge
product_name="Zoho Creator";
newText = product_name.left(4); // returns "Zoho"
```

--------------------------------

### Deluge workday() Function Example 1

Source: https://www.zoho.com/deluge/help/functions/datetime/workday

Calculates the date after adding one business day to a specified date string. The result is returned as a date string.

```Deluge
currentDate = '15-Mar-2019';
newDate = currentDate.workday(1); // returns '18-Mar-2019';
```

--------------------------------

### Zoho Creator Integration Tasks - Get Record by ID

Source: https://www.zoho.com/deluge/help/creator-tasks

Fetches a specific record from Zoho Creator using its unique identifier. Essential for accessing individual data entries.

```Deluge
getRecordById(reportName, recordId);
```

--------------------------------

### Deluge: Insert Element into Collection

Source: https://www.zoho.com/deluge/help/functions/collection/insert

This example demonstrates how to insert a new element into an existing collection variable in Deluge. The 'insert' function appends the specified element to the collection.

```Deluge
products = collection("Creator", "CRM", "Campaigns");
products.insert("Analytics"); // inserts "Analytics" to the existing collection
```

--------------------------------

### Get Sign Templates with Custom Settings in Zoho Writer

Source: https://www.zoho.com/deluge/help/writer/get-sign-templates

This Deluge script retrieves sign templates from Zoho Writer, allowing customization of the offset, limit, sorting criteria, and category. It requires a valid Zoho OAuth connection for authentication.

```Deluge
optional_settings = Map();
optional_settings.put("offset", "0");
optional_settings.put("limit", "5");
optional_settings.put("sortby", "modified_time");
optional_settings.put("sort_order_by", "descending");
optional_settings.put("category", "all");
response = zoho.writer.getSignTemplates(optional_settings, "writer_oauth_connection");
info response;
```

--------------------------------

### Deluge cosh() Function Example

Source: https://www.zoho.com/deluge/help/functions/number/cosh

Demonstrates how to use the cosh() function in Deluge to calculate the hyperbolic cosine of a number. The function can be called as a method on a number or as a standalone function.

```deluge
number = 0;
coshValue = number.cosh(); // returns 1.0
```

```deluge
number = 0;
coshValue = cosh(number); // returns 1.0
```

--------------------------------

### Zoho Projects Integration Tasks

Source: https://www.zoho.com/deluge/help/projects-tasks

This section outlines common integration tasks for Zoho Projects using Deluge. It covers operations like fetching portal and project details, creating projects, and managing records within specified modules, including creating, updating, and associating time logs.

```Deluge
Get Portals: Fetches the details of your portals
Get Project Details: Fetches projects from the specified portal
Create Project: Creates a project
Get Records: Fetches records from the specified module
Get Record By ID: Fetches the details of the specified record
Create: Creates a record
Update: Updates the specified record
Associate Logs: Creates and associates a time log to the specified record
Update Associated Logs: Updates the specified time log
```

--------------------------------

### Deluge subText Example: Basic Substring Extraction

Source: https://www.zoho.com/deluge/help/functions/string/subtext

Shows a standard usage of the subText function to extract a portion of a string. The function returns characters from the start_index up to, but not including, the end_index.

```Deluge
product_name="Zoho Deluge";
result = product_name.subText(0,4);
info result;
```

--------------------------------

### Add Timestamp as Number to Deluge List

Source: https://www.zoho.com/deluge/help/create-list-datatype

Demonstrates adding a date string to a float list, which converts it to its numerical equivalent. The example shows '1-Jan-2019' being added.

```deluge
var = List:float();
var.add('1-Jan-2019'); // adds 1546329600000
```

--------------------------------

### Extract Minute from Time using getMinutes() (Zoho Creator Only)

Source: https://www.zoho.com/deluge/help/functions/datetime/minute

Demonstrates the `getMinutes()` function for time data types in Deluge, applicable only in Zoho Creator. This example shows how to extract the minute from a given time string.

```Deluge
currentTime = '13:15:10';
info currentTime.getMinutes();  // Returns 15
```

--------------------------------

### Load URL into Iframe

Source: https://www.zoho.com/deluge/help/openurl

Loads different URLs into a specified iframe based on a condition. This example shows how to load Zoho Creator or Zoho CRM URLs into an iframe named 'frameName' depending on the 'Product' variable.

```deluge
if (Product=="Creator")  
{
openUrl("https://www.zoho.com/creator", "iframe", "frameName");  
}
else if (Product == "CRM")  
{
openUrl("https://www.zoho.com/crm", "iframe", "frameName");
}
```

--------------------------------

### Zoho Deluge Success Response Example (JSON)

Source: https://www.zoho.com/deluge/help/inventory/create-record

This JSON structure represents a successful response from a Zoho Deluge API call, specifically for adding a contact. It includes a success code, a confirmation message, and detailed information about the created contact.

```JSON
{
"code": 0,
"message": "The contact has been added.",
"contact": {
"contact_id": "478XXXXXXXXXXX001",
"contact_name": "Shawn",
"company_name": "",
"first_name": "",
"last_name": "",
"designation": "",
"department": "",
"website": "",
"language_code": "",
"language_code_formatted": "",
"contact_salutation": "",
"email": "",
"phone": "",
"mobile": "",
"portal_status": "disabled",
"is_client_review_asked": false,
"has_transaction": false,
"contact_type": "customer",
"customer_sub_type": "business",
"owner_id": "",
"owner_name": "",
"source": "api",
"documents": [
],
"twitter": "",
"facebook": "",
"is_crm_customer": false,
"is_linked_with_zohocrm": false,
"primary_contact_id": "",
"zcrm_account_id": "",
"zcrm_contact_id": "",
"crm_owner_id": "",
"payment_terms": 0,
"payment_terms_label": "Due On Receipt",
"credit_limit_exceeded_amount": 0.0,
"currency_id": "478XXXXXXXXXXX099",
"currency_code": "INR",
"currency_symbol": "Rs.",
"price_precision": 2,
"exchange_rate": "",
"can_show_customer_ob": true,
"can_show_vendor_ob": true,
"opening_balance_amount": 0.0,
"opening_balance_amount_bcy": "",
"outstanding_ob_receivable_amount": 0.0,
"outstanding_ob_payable_amount": 0.0,
"outstanding_receivable_amount": 0.0,
"outstanding_receivable_amount_bcy": "",
"outstanding_payable_amount": 0.0,
"outstanding_payable_amount_bcy": "",
"unused_credits_receivable_amount": 0.0,
"unused_credits_receivable_amount_bcy": "",
"unused_credits_payable_amount": 0.0,
"unused_credits_payable_amount_bcy": "",
"unused_retainer_payments": 0.0,
"status": "active",
"payment_reminder_enabled": true,
"is_sms_enabled": true,
"is_client_review_settings_enabled": false,
"custom_fields": [
],
"custom_field_hash": {
},
"contact_category": "",
"sales_channel": "direct_sales",
"ach_supported": false,
"billing_address": {
"address_id": "478XXXXXXXXXXX003",
"attention": "",
"address": "",
"street2": "",
"city": "",
"state_code": "",
"state": "",
"zip": "",
"country": "",
"phone": "",
"fax": ""
},
"shipping_address": {
"address_id": "478XXXXXXXXXXX005",
"attention": "",
"address": "",
"street2": "",
"city": "",
"state_code": "",
"state": "",
"zip": "",
"country": "",
"phone": "",
"fax": ""
},
"contact_persons": [
],
"addresses": [
],
"pricebook_id": "",
"pricebook_name": "",
"default_templates": {
"invoice_template_id": "",
"invoice_template_name": "",
"bill_template_id": "",
"bill_template_name": "",
"estimate_template_id": "",
"estimate_template_name": "",
"creditnote_template_id": "",
"creditnote_template_name": "",
"purchaseorder_template_id": "",
"purchaseorder_template_name": "",
"salesorder_template_id": "",
"salesorder_template_name": "",
"paymentthankyou_template_id": "",
"paymentthankyou_template_name": "",
"invoice_email_template_id": "",
"invoice_email_template_name": "",
"estimate_email_template_id": "",
"estimate_email_template_name": "",
"creditnote_email_template_id": "",
"creditnote_email_template_name": "",
"purchaseorder_email_template_id": "",
"purchaseorder_email_template_name": "",
"salesorder_email_template_id": "",
"salesorder_email_template_name": "",
"paymentthankyou_email_template_id": "",
"paymentthankyou_email_template_name": "",
"payment_remittance_email_template_id": "",
"payment_remittance_email_template_name": ""
},
"associated_with_square": false,
"cards": [
],
"checks": [
],
"bank_accounts": [
],
"vpa_list": [
],
"notes": "",
"created_time": "2019-08-29T15:51:04+0530",
"last_modified_time": "2019-08-29T15:51:04+0530",
"tags": [
],
"zohopeople_client_id": ""
},
"instrumentation": {
"query_execution_time": 59,
"request_handling_time": 1049,
"response_write_time": 82,
"page_context_write_time": 0
}
}
```

--------------------------------

### Fetch Records from Candidates Module (Zoho Recruit)

Source: https://www.zoho.com/deluge/help/recruit/fetch-records

Fetches records from the 'Candidates' module in Zoho Recruit. It allows specifying the range of records to fetch, sorting order, and the connection name. The response includes various fields of the candidate records.

```deluge
response = zoho.recruit.getRecords("Candidates" , 0, 20, "ALL", "Last Name", "asc", "recruit_connection");
```

--------------------------------

### Compare Boolean Fields in Deluge

Source: https://www.zoho.com/deluge/help/operators/creator-fields-and-their-applicable-operators

Explains the comparison of Boolean fields, such as Decision Box fields, using equality and inequality operators. It provides examples of comparing true and false values.

```Deluge
info Decision_box_1 == Decision_box_2; //Returns false
info Decision_box_1 != Decision_box_2; // Returns true
```

--------------------------------

### Zoho Books - Get Records By ID

Source: https://www.zoho.com/deluge/help/books-tasks

Fetches a specific record from a specified module in Zoho Books using its unique ID. This is useful for retrieving details of a single record.

```Deluge
getRecordById("ModuleName", recordId);
```

--------------------------------

### Create Zoho Cliq Record with Dynamic Values

Source: https://www.zoho.com/deluge/help/cliq/create-record

This Deluge script, intended for a Bot's message handler, creates a record in 'availabilitydatabase'. It dynamically sets the 'availability' field based on user input ('YES' sets it to true, otherwise false) and includes 'name' and 'empid'. The response from `zoho.cliq.createRecord` is returned.

```Deluge
response=Map();

values_map=Map();
values_map.put("name","Shawn");
values_map.put("empid","2");
dynamic_value=false;

if(message.equalsIgnoreCase("YES")){
dynamic_value=true;
}

values_map.put("availability",dynamic_value);
text = zoho.cliq.createRecord("availabilitydatabase", values_map, "cliq_connection");
response.put("text",text);
return response;

```

--------------------------------

### Zoho Deluge Failure Response Example

Source: https://www.zoho.com/deluge/help/subscriptions/update-record

This JSON object illustrates a failure response from the Zoho Deluge API, indicating that an action is not permitted due to no changes being made to the plan or addons. It includes an error message and a specific error code.

```json
{
  "message": "The action is not allowed for this profile as there are no changes made in the plan or addons.",
  "code": 26005
}
```

--------------------------------

### Fetch Users from Zoho Directory

Source: https://www.zoho.com/deluge/help/directory/get-users

This Deluge script fetches a specified number of users from a Zoho Directory organization. It requires the organization ID, page number, number of records per page, query parameters, and the Zoho Directory connection name.

```deluge
response = zoho.directory.getUsers(72XXXXXXX, "1", "200", Map(), "zoho_directory_connection");
```

--------------------------------

### Deluge: Get Field Names

Source: https://www.zoho.com/deluge/help/miscellaneous

This Deluge snippet retrieves the names of all fields associated with a particular context, likely a form or module. This is useful for dynamic field processing.

```Deluge
getFieldNames();
```

--------------------------------

### Deluge: Send Mail for Each Iteration

Source: https://www.zoho.com/deluge/help/list-manipulations/for-each-element

This Deluge example shows how to iterate through a list of teams and send an email to the 'EmailID' associated with each team. It uses the 'sendMail' task within the loop.

```Deluge
teamList = {"Zoho Creator", "Zoho CRM"};

for each temp in teamList
{
sendMail
[
from: zoho.adminuserid
to: Employees[Team = temp].EmailID.getall();
Subject: "Working day for "+temp
Message: "Coming Saturday will be a working day"
];
}
```

--------------------------------

### Deluge toNumber Example: Alphanumeric Text Error

Source: https://www.zoho.com/deluge/help/functions/common/to-number

Demonstrates that the toNumber function will throw an error if the input text contains non-numeric characters.

```Deluge
alpha_text = "134A123B";
info  alpha_text.toNumber(); // Returns error
```

--------------------------------

### Zoho Deluge Success Response Example

Source: https://www.zoho.com/deluge/help/desk/get-records

This is a sample JSON structure representing a successful response when retrieving contact data. It contains an array of contact objects, each with details like firstName, lastName, email, and a unique ID.

```JSON
{
"data": [
{
"firstName": "Ben",
"lastName": "Williams",
"email": "ben@zylker.com",
"secondaryEmail": null,
"mobile": null,
"phone": "+1 678 XXX XXXX",
"type": null,
"ownerId": "168XXXXXXXXXXXX005",
"accountId": "168XXXXXXXXXXXX097",
"photoURL": null,
"zohoCRMContact": {
"id": "230XXXXXXXXXXXXX044",
"type": "new"
},
"customerHappiness": {
"badPercentage": "0",
"okPercentage": "0",
"goodPercentage": "0"
},
"webUrl": "https://desk.zoho.com/support/smith/ShowHomePage.do#Contacts/dv/bf5c8fXXXXXXXXXXXXXXXXX411872c0a55fabae67fb0",
"id": "168XXXXXXXXXXXX001"
},
{
"firstName": "Tom",
"lastName": "Lewis",
"email": "tom@zylker.com",
"secondaryEmail": null,
"mobile": null,
"phone": "+1 678 XXX XXXX",
"type": null,
"ownerId": "168XXXXXXXXXXXX002",
"accountId": null,
"photoURL": null,
"zohoCRMContact": {
"id": "230XXXXXXXXXXXXX020",
"type": "contacts"
},
"customerHappiness": {
"badPercentage": "0",
"okPercentage": "0",
"goodPercentage": "0"
},
"webUrl": "https://desk.zoho.com/support/smith/ShowHomePage.do#Contacts/dv/bf5c8fXXXXXXXXXXXXXXXXX6519df7cc50d48844902f0",
"id": "168XXXXXXXXXXXX040"
}
]
}
```

--------------------------------

### Create Lead in Zoho CRM using Deluge

Source: https://www.zoho.com/deluge/help/crm/create-record

This Deluge script demonstrates how to create a new lead record in Zoho CRM. It defines a map with lead information and then uses the `zoho.crm.createRecord` function to add the lead.

```Deluge
leadinfo = {
 "Company" : "Zylker",
 "Last_Name" : "Williams",
 "Phone" : "+1 678 XXX XXXX",
 "Email" : "will@zylker.com",
 "PO_Box" : "XXXXX",
 "Country" : "US"
};
response = zoho.crm.createRecord("Leads", leadinfo);
```

--------------------------------

### Example: Update Zoho Books Invoice Record

Source: https://www.zoho.com/deluge/help/books/update-record

This Deluge script demonstrates how to update an existing invoice record in Zoho Books. It includes creating a map for line items with updated rates and quantities, and then calling the updateRecord function.

```Deluge
invoiceMap=map();
itemList=List();
item1=map();
item1.put("item_id","XXXXXXXXXXXX04015");
item1.put("rate", "500");
item1.put("quantity", 12);
itemList.add(item1);

item2=map();
item2.put("item_id","XXXXXXXXXXXX04015");
item2.put("rate", "550");
item2.put("quantity", 12);
itemList.add(item2);

invoiceMap.put("line_items", itemList);
response= zoho.books.updateRecord("Invoices", "5379XXXX", "XXXXXXXXXXXX11003", invoiceMap, "books_connection");

```

--------------------------------

### Fetch Records with Static Criteria in Deluge

Source: https://www.zoho.com/deluge/help/cliq/get-records

This Deluge script demonstrates how to fetch records from a specified Zoho Cliq database using a static 'availability==true' criteria. It utilizes the `zoho.cliq.getRecords` function and shows how to define the query map and connection.

```Deluge
query_map=Map();
query_map.put("criteria","availability==true");

response_map=zoho.cliq.getRecords("availabilitydatabase",query_map, "cliq_connection");
```

--------------------------------

### Deluge Conversion Functions: toList, toMap

Source: https://www.zoho.com/deluge/help/functions/conversion

Provides examples of Deluge functions for converting data into list and map formats. These functions are useful for structuring and accessing data collections in Deluge.

```deluge
toList(input_value)
toMap(input_value)
```

--------------------------------

### Get Sign Templates in Zoho Writer

Source: https://www.zoho.com/deluge/help/writer/get-sign

Retrieves a list of sign templates from Zoho Writer based on specified optional settings and a Zoho OAuth connection. This function is applicable to all services except Zoho Creator.

```deluge
optional_settings = Map();
optional_settings.put("offset", "0");
optional_settings.put("limit", "5");
optional_settings.put("sortby", "modified_time");
optional_settings.put("sort_order_by", "descending");
optional_settings.put("category", "all");
response = zoho.writer.getSignTemplates(optional_settings, "writer_oauth_connection");
info response;
```

--------------------------------

### Fetch Records by Blueprint Name and Change Stage

Source: https://www.zoho.com/deluge/help/creator-blueprint-tasks/blueprint-attributes

This Deluge example demonstrates how to fetch records that match a specific blueprint name and then change their blueprint stage. It utilizes a custom function `thisapp.blueprint.changeStage` to perform the stage update.

```deluge
// Fetch the specified record 
variable = client[Blueprint.Name = "New_client"]; 
for each record in variable 
{
updateStatus = thisapp.blueprint.changeStage("client", "New_client", "Pending", record.ID);
}
```

--------------------------------

### Zoho Recruit: Screen Resumes Based on Criteria

Source: https://www.zoho.com/deluge/help/index

Screens resumes based on custom criteria in Zoho Recruit. Automatically categorizes candidates as unqualified or rejected based on data completeness.

```Deluge
candidate = zoho.recruit.getCandidate("CANDIDATE_ID");
if (candidate.get("phone") == null || candidate.get("email") == null) {
    candidate.put("status", "Unqualified");
} else if (candidate.get("skills") == null) {
    candidate.put("status", "Rejected");
}
candidate.update();
info "Candidate " + candidate.get("candidate_name") + " status updated.";
```

--------------------------------

### Deluge Info Task: Display Text and Numbers

Source: https://www.zoho.com/deluge/help/debug/info

Demonstrates how to use the 'info' task in Deluge to display literal string values and numerical values. This is a basic debugging technique to check output.

```deluge
info "Hello World"; //Returns Hello World
info 1; //Returns 1
```

--------------------------------

### Zoho Invoice Integration Tasks - Get Records

Source: https://www.zoho.com/deluge/help/invoice-tasks

Fetches records from a specified module within Zoho Invoice. This function is essential for retrieving data for further processing or display.

```Deluge
getRecords(moduleName)
```

--------------------------------

### Zoho CRM Integration Tasks - Get Organization Information

Source: https://www.zoho.com/deluge/help/crm-vertical-solutions-tasks

Retrieves general information about the Zoho organization. This can include details like organization ID, name, and currency.

```Deluge
get_organization_information();
```

--------------------------------

### Deluge Key-Value Data Type Example

Source: https://www.zoho.com/deluge/help/datatypes/key-value

Demonstrates the creation and usage of a Key-Value data type in Zoho Deluge. Keys are unique and can be used to access or overwrite values. Both keys and values can be of any data type.

```Deluge
ZohoProduct = {"Product" : "Creator", "Version" : 5};
// Example operations:
// put("NewKey", "NewValue");
// get("Product");
// containKey("Version");
// keys();
// size();
```

--------------------------------

### Deluge Boolean Data Type Example

Source: https://www.zoho.com/deluge/help/datatypes/boolean

Demonstrates the usage of the boolean data type in Deluge. It shows how to assign 'false' and 'true' to variables, highlighting that boolean values should not be enclosed in quotes and are case-insensitive.

```Deluge
job_experience = false;

Salary_negotiable = true;
```

--------------------------------

### Zoho Sheet: Fetch Tasks and Apply Conditional Formatting

Source: https://www.zoho.com/deluge/help/index

Fetches task lists from Zoho Projects and applies conditional formatting in Zoho Sheet to highlight high-priority tasks. Visualizes task urgency.

```Deluge
tasks = zoho.projects.getTasks("PROJECT_ID");
for each task in tasks {
    if (task.get("priority") == "High") {
        // Apply conditional formatting to the cell containing task priority
        info "High priority task found: " + task.get("task_name");
    }
}
```

--------------------------------

### Zoho Books - Get Organizations

Source: https://www.zoho.com/deluge/help/books-tasks

Fetches all organizations associated with the user in Zoho Books. This function is a fundamental operation for accessing user-specific data within the Zoho ecosystem.

```Deluge
getOrganizations();
```

--------------------------------

### Get Seconds from Time (Method Chaining - Zoho Creator)

Source: https://www.zoho.com/deluge/help/functions/datetime/getseconds

Retrieves the seconds from a time value using the getSeconds() method. This functionality is currently available only for Zoho Creator.

```Deluge
timeValue = '10:00:00 PM';
info timeValue.getSeconds();
```

--------------------------------

### Deluge unixEpoch Function Usage

Source: https://www.zoho.com/deluge/help/functions/datetime/unix-epoch

Demonstrates how to use the unixEpoch function in Deluge to convert date-time strings to milliseconds since the Unix epoch, with examples for different time zones.

```Deluge
currentDate = "03-Feb-2020 03:48:12";
indiaTime  =  currentDate.unixEpoch("Asia/Calcutta"); // 1580681892000
gmtMinus8  =  currentDate.unixEpoch("GMT-8"); // 1580730492000
default  =  currentDate.unixEpoch(); // 1580730492000
utcPlus8  =  currentDate.unixEpoch("UTC+8"); // 1580701692000
gmt  =  currentDate.unixEpoch("GMT"); // 1580701692000
indiaGMT  =  currentDate.unixEpoch("GMT+5:30"); // 1580681892000
est  =  currentDate.unixEpoch("EST"); // 1580719692000
sst  =  currentDate.unixEpoch("SST"); // 1580662092000
invalidTZ  =  currentDate.unixEpoch("Hello"); // Invalid timezone. So, defaulted to GMT. 1580701692000
```

--------------------------------

### JavaScript: Form Validation Example

Source: https://www.zoho.com/deluge/help/script/sign/create-using-template

This JavaScript code snippet demonstrates client-side form validation. It checks if the email field is valid before allowing the form submission, enhancing user experience by providing immediate feedback.

```javascript
document.querySelector('form').addEventListener('submit', function(event) {
  const emailInput = document.getElementById('email');
  const emailValue = emailInput.value;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailPattern.test(emailValue)) {
    alert('Please enter a valid email address.');
    event.preventDefault(); // Prevent form submission
  }
});
```

--------------------------------

### Deluge: Creating a Task

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script illustrates how to create a task record in Zoho CRM, including setting the subject, due date, and status.

```deluge
// Creating a new Task
taskMap = Map();
taskMap.put("Subject", "Follow up with client");
taskMap.put("Due_Date", zoho.currentdate.addDay(3));
taskMap.put("Status", "Not Started");
taskMap.put("Priority", "High");

createTaskResponse = zoho.crm.createRecord("Tasks", taskMap);
info createTaskResponse;
```

--------------------------------

### Zoho Books - Create Record

Source: https://www.zoho.com/deluge/help/books-tasks

Creates a new record in a specified module within Zoho Books. This operation requires the module name and the data for the new record.

```Deluge
createRecord("ModuleName", recordData);
```

--------------------------------

### Fetch Records by Task Name Criteria

Source: https://www.zoho.com/deluge/help/creator/get-records

Fetches records from the 'All_Tasks' report in the 'Task_Management' application where the 'Task_Name' field equals 'ServiceTask'. This example demonstrates searching with a specific string value.

```deluge
response = zoho.creator.getRecords("John","Task_Management","All_Tasks","Task_Name == \"ServiceTask\"", 1, 200, "creator_oauth_connection");
```

--------------------------------

### Get Seconds from Time (Function Call - Zoho Creator)

Source: https://www.zoho.com/deluge/help/functions/datetime/getseconds

Retrieves the seconds from a time value using the getSeconds() function. This functionality is currently available only for Zoho Creator.

```Deluge
currentTime = '13:15:10';
info currentTime.getSeconds();
```

--------------------------------

### Deluge: Get Records from Zoho FSM Module

Source: https://www.zoho.com/deluge/help/fsm/get-records

Fetches records from a specified Zoho FSM module using the `zoho.fsm.getRecords` task. This task allows specifying the module name, page number, number of records per page, optional parameters for sorting or filtering, and a connection name.

```Deluge
response = zoho.fsm.getRecords("Requests", 1, 4, optionalDataMap, "fsm_connection");
```

--------------------------------

### Get Minutes from Date-Time (Deluge)

Source: https://www.zoho.com/deluge/help/functions/datetime/getminutes

Extracts the minute component from a given date-time value using the getMinutes() method or function. This is useful for time-based calculations or data extraction.

```Deluge
<variable> = <dateTimeValue>.getMinutes();

```

```Deluge
<variable> = getMinutes(<dateTimeValue>);

```

```Deluge
<variable> = <dateTimeValue>.minute();

```

```Deluge
<variable> = minute(<dateTimeValue>);

```

```Deluge
currentDate = '01-Jan-2019';
info currentDate.getMinutes(); // Returns 0

```

```Deluge
currentDate = '01-Jan-2019 23:15:10';
info currentDate.minute(); // Returns 15

```

--------------------------------

### Deluge: Creating a Contact

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to create a new contact in Zoho CRM, including setting the last name and email.

```deluge
// Creating a new Contact
contactMap = Map();
contactMap.put("Last_Name", "Smith");
contactMap.put("First_Name", "Jane");
contactMap.put("Email", "jane.smith@example.com");
contactMap.put("Account_Name", "Global Corp");

createContactResponse = zoho.crm.createRecord("Contacts", contactMap);
info createContactResponse;
```

--------------------------------

### Deluge find() Function Example

Source: https://www.zoho.com/deluge/help/functions/string/find

Demonstrates how to use the find() function in Deluge to locate the first occurrence of a character within a string. The function is case-sensitive and returns the index or -1 if not found.

```Deluge
text = "Hello world, welcome to the universe";
firstIndex = text.find("e"); //returns 1
```

--------------------------------

### Automate HR Processes in Zoho People with Deluge

Source: https://www.zoho.com/deluge/help/index

Automate various HR processes in Zoho People using Deluge scripting. Examples include updating candidate statuses, managing travel expenses, sending reports, and updating employee leave balances.

```Deluge
// Example Deluge code for automating HR processes
// (Specific code depends on the Zoho People application structure)
```

--------------------------------

### HTML Text Formatting in Deluge

Source: https://www.zoho.com/deluge/help/data-access/update-records

Demonstrates how to format text as HTML links in Deluge. This includes optional parameters for title, link name, and target.

```Deluge
<html>
<a href = "<URL>" title = "<TITLE>" target = "_blank"><linkname></a>
</html>
```

--------------------------------

### Zoho Deluge Success Response Example

Source: https://www.zoho.com/deluge/help/books/fetch-record-by-id

This snippet shows the JSON structure of a successful response when retrieving contact information in Zoho Deluge. It includes detailed fields for contact data, addresses, custom fields, and instrumentation details.

```json
{
  "code":0,
  "contact":{
    "is_crm_customer":false,
    "addresses":[
    ],
    "notes":"",
    "documents":[
    ],
    "owner_id":"",
    "is_linked_with_zohocrm":false,
    "is_client_review_settings_enabled":false,
    "pan_no":"",
    "billing_address":{
      "zip":"",
      "country":"",
      "address":"",
      "city":"",
      "phone":"",
      "address_id":"XXXXXXXXXXXX92277",
      "attention":"",
      "street2":"",
      "state":"",
      "state_code":"",
      "fax":""
    },
    "default_templates":{
      "invoice_email_template_id":"",
      "salesorder_email_template_id":"",
      "salesorder_template_id":"",
      "creditnote_email_template_id":"",
      "creditnote_template_name":"",
      "paymentthankyou_email_template_name":"",
      "estimate_template_id":"",
      "paymentthankyou_template_id":"",
      "salesorder_email_template_name":"",
      "salesorder_template_name":"",
      "invoice_email_template_name":"",
      "creditnote_email_template_name":"",
      "invoice_template_id":"",
      "paymentthankyou_email_template_id":"",
      "invoice_template_name":"",
      "estimate_template_name":"",
      "estimate_email_template_id":"",
      "creditnote_template_id":"",
      "paymentthankyou_template_name":"",
      "estimate_email_template_name":""
    },
    "source":"api",
    "outstanding_receivable_amount_bcy":0.0,
    "language_code":"",
    "twitter":"",
    "zcrm_contact_id":"",
    "unused_credits_receivable_amount_bcy":100.0,
    "gst_no":"",
    "tax_reg_no":"",
    "contact_category":"",
    "associated_with_square":false,
    "place_of_contact":"",
    "contact_persons":[
    ],
    "pricebook_id":"",
    "outstanding_receivable_amount":0.0,
    "gst_treatment":"",
    "created_time":"2017-02-24T12:31:14+0530",
    "owner_name":"",
    "zcrm_account_id":"",
    "custom_fields":[
    ],
    "vat_reg_no":"",
    "unused_credits_receivable_amount":100.0,
    "has_transaction":true,
    "outstanding_payable_amount_bcy":0.0,
    "tax_id":"XXXXXXXXXXXX10079",
    "pricebook_name":"",
    "price_precision":2,
    "tags":[
    ],
    "primary_contact_id":"",
    "country_code":"",
    "checks":[
    ],
    "unused_credits_payable_amount_bcy":0.0,
    "company_name":"",
    "tax_treatment":"",
    "crm_owner_id":"",
    "status":"active",
    "cards":[
    ],
    "contact_id":"XXXXXXXXXXXX92275",
    "payment_terms":0,
    "currency_code":"INR",
    "outstanding_payable_amount":0.0,
    "contact_type":"customer",
    "unused_credits_payable_amount":0.0,
    "shipping_address":{
      "zip":"",
      "country":"",
      "address":"",
      "city":"",
      "phone":"",
      "address_id":"XXXXXXXXXXXX92279",
      "attention":"",
      "street2":"",
      "state":"",
      "state_code":"",
      "fax":""
    },
    "contact_name":"updated24-Feb-2017 123114",
    "website":"",
    "is_client_review_asked":false,
    "last_modified_time":"2017-02-24T12:31:18+0530",
    "language_code_formatted":"",
    "currency_symbol":"Rs.",
    "ach_supported":false,
    "facebook":"",
    "tax_name":"GST12",
    "vendor_portal_url":"",
    "unused_retainer_payments":0.0,
    "contact_salutation":"",
    "tax_percentage":12.0,
    "bank_accounts":[
    ],
    "currency_id":"XXXXXXXXXXXX00099",
    "is_taxable":true,
    "payment_terms_label":"Due On Receipt",
    "payment_reminder_enabled":true
  },
  "instrumentation":{
    "query_execution_time":359,
    "response_write_time":260,
    "page_context_write_time":0,
    "request_handling_time":191
  },
  "message":"success"
}
```

--------------------------------

### Zoho Deluge Success Response Example

Source: https://www.zoho.com/deluge/help/invoice/update-record

This snippet shows a typical successful response from the Zoho Deluge API, detailing saved contact information. It includes status codes, timing instrumentation, and comprehensive contact details like addresses, contact persons, and custom fields.

```json
{
"code":0,
"instrumentation":{
"response_write_time":77,
"query_execution_time":48,
"page_context_write_time":0,
"request_handling_time":379
},
"message":"Contact information has been saved.",
"contact":{
"is_crm_customer":false,
"addresses":[
],
"notes":"",
"documents":[
],
"owner_id":"",
"is_linked_with_zohocrm":false,
"is_client_review_settings_enabled":false,
"billing_address":{
"zip":"",
"country":"",
"address":"",
"city":"",
"phone":"",
"address_id":"13144XXXXXXXXXXXX",
"attention":"",
"street2":"",
"state":"",
"state_code":"",
"fax":""
},
"default_templates":{
"invoice_email_template_id":"",
"creditnote_email_template_id":"",
"creditnote_template_name":"",
"paymentthankyou_email_template_name":"",
"estimate_template_id":"",
"paymentthankyou_template_id":"",
"invoice_email_template_name":"",
"creditnote_email_template_name":"",
"invoice_template_id":"",
"paymentthankyou_email_template_id":"",
"invoice_template_name":"",
"estimate_template_name":"",
"estimate_email_template_id":"",
"creditnote_template_id":"",
"paymentthankyou_template_name":"",
"estimate_email_template_name":""
},
"source":"api",
"outstanding_receivable_amount_bcy":0.0,
"language_code":"",
"twitter":"",
"zcrm_contact_id":"",
"unused_credits_receivable_amount_bcy":0.0,
"contact_category":"",
"associated_with_square":false,
"contact_persons":[
{
"can_invite":true,
"mobile":"",
"is_added_in_portal":false,
"last_name":"Bee",
"contact_person_id":"13144XXXXXXXXXXXX",
"is_primary_contact":true,
"is_portal_invitation_accepted":false,
"skype":"",
"zcrm_contact_id":"",
"phone":"",
"salutation":"",
"designation":"",
"photo_url":"https://secure.gravatar.com/avatar/00000000000000000000000000000000?&d=mm",
"department":"",
"fax":"",
"first_name":"Bettie",
"email":""
},
{
"can_invite":true,
"mobile":"",
"is_added_in_portal":false,
"last_name":"Kaye",
"contact_person_id":"13144XXXXXXXXXXXX",
"is_primary_contact":false,
"is_portal_invitation_accepted":false,
"skype":"",
"zcrm_contact_id":"",
"phone":"",
"salutation":"",
"designation":"",
"photo_url":"https://secure.gravatar.com/avatar/00000000000000000000000000000000?&d=mm",
"department":"",
"fax":"",
"first_name":"Carol",
"email":""
}
],
"pricebook_id":"",
"outstanding_receivable_amount":0.0,
"created_time":"2017-11-30T16:08:55+0530",
"owner_name":"",
"zcrm_account_id":"",
"custom_fields":[
],
"unused_credits_receivable_amount":0.0,
"has_transaction":false,
"pricebook_name":"",
"price_precision":2,
"primary_contact_id":"13144XXXXXXXXXXXX",
"checks":[
],
"company_name":"Billie Beth",
"crm_owner_id":"",
"status":"active",
"cards":[
],
"contact_id":"13144XXXXXXXXXXXX",
"payment_terms":0,
"currency_code":"INR",
"contact_type":"customer",
"shipping_address":{
"zip":"",
"country":"",
"address":"",
"city":"",
"phone":"",
"address_id":"13144XXXXXXXXXXXX",
"attention":"",
"street2":"",
"state":"",
"state_code":"",
"fax":""
},
"contact_name":"Billie Beth",
"website":"",
"is_client_review_asked":false,
"last_modified_time":"2017-11-30T16:15:49+0530",
"language_code_formatted":"",
"currency_symbol":"Rs.",
"ach_supported":false,
"facebook":"",
"vendor_portal_url":"",
"unused_retainer_payments":0.0,
"contact_salutation":"",
"bank_accounts":[
],
"currency_id":"13144XXXXXXXXXXXX",
"payment_terms_label":"Due On Receipt",
"payment_reminder_enabled":true
}
}
```

--------------------------------

### Extract Multiple Entities using findNamedEntities

Source: https://www.zoho.com/deluge/help/ai-tasks/find-named-entities

This Deluge example shows how to extract multiple entity types (e.g., 'person' and 'skills') from a text. It involves creating a list of entity types and passing it to the `zoho.ai.findNamedEntities` function, categorizing the results.

```Deluge
text = "Hello, I'm Shawn. My interests are data science and Internet Of Things";
entity_types=List();
entity_types.add("person");
entity_types.add("skills");

response = zoho.ai.findNamedEntities(text,entity_types);
```

--------------------------------

### Generate Fillable Link with JSON Data

Source: https://www.zoho.com/deluge/help/writer/GenerateFillableLink

This Deluge script demonstrates how to generate a fillable link by providing merge data as a JSON object. It includes setting invoice details and enabling or disabling test mode.

```Deluge
document_id = "po5uobda049e043544b13a9956f6d2cedc67b";
                mp = Map();
                mp.put("InvoiceNo","34267");
                mp.put("InvoiceDate","24 Apr 2024");
                mp.put("InvoiceAmount","$300");
                data_map = Map();
                data_map.put("data", mp);
                merge_detail = Map();
                merge_detail.put("merge_data", data_map);
                optional_settings = Map();
                optional_settings.put("test_mode", false);
                response = zoho.writer.generateFillableLink(document_id, merge_detail, optional_settings, "writer_oauth_connection" );
                info response;
```

--------------------------------

### Upload File to Dropbox using Deluge

Source: https://www.zoho.com/deluge/help/deluge-invoke-url

This script shows how to upload a file to Dropbox using the Dropbox API. It first retrieves a file (e.g., a PDF) using a GET request and then uploads it using a POST request to the Dropbox upload endpoint. It includes custom headers for specifying the file path and upload mode.

```deluge
fileToUpload = invokeurl
[
 url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
 type: GET
];

hd = {"path":"/dummy.pdf","mode":"add","autorename":true,"mute":false,"strict_conflict":false};
driveheaders = Map();
driveheaders.put("Dropbox-Api-Arg",hd);

uploadResp = invokeurl
[
 url: "https://content.dropboxapi.com/2/files/upload"
 type: POST
 body: fileToUpload
 headers:driveheaders
 connection : "dropbox_connection"
];
info uploadResp;
```

--------------------------------

### Fetch Records from Zoho Desk Module

Source: https://www.zoho.com/deluge/help/desk/get-records

This Deluge function retrieves records from a specified Zoho Desk module. It requires the organization ID, module name, and optionally accepts parameters for the starting index, number of records to fetch, query values for secondary information, and the connection name.

```Deluge
response = zoho.desk.getRecords(<orgId>, <module_name>, <fromIndex>, <limit>, <query_value>, <connection>);
```

```Deluge
queryValue = {"" : ""};
response = zoho.desk.getRecords(641XXXXXX, "contacts", 1, 10, queryValue, "desk_connection");
```

--------------------------------

### Attach Multiple Record Templates as Attachments in Deluge (Form Workflow)

Source: https://www.zoho.com/deluge/help/misc-statements/send-mail

This example demonstrates attaching multiple record templates in specified formats, separated by commas, within a form workflow using Zoho Deluge. This enables bundling various template types.

```Zoho Deluge
template: <record_template1> as <attachment_format1>, template: <record_template2> as <attachment_format2>
```

--------------------------------

### Zoho CRM Integration Tasks - Get All Module Metadata

Source: https://www.zoho.com/deluge/help/crm-vertical-solutions-tasks

Retrieves the metadata for all available modules within Zoho CRM. This provides a comprehensive overview of the CRM's data structure.

```Deluge
get_all_module_metadata();
```

--------------------------------

### Deluge removeLastOccurence() Example

Source: https://www.zoho.com/deluge/help/functions/string/removelastoccurence

Demonstrates how to use the removeLastOccurence() function in Deluge to remove the last occurrence of a substring from a string. The function is case-sensitive and returns the modified string.

```deluge
Product="Create an app using Zoho Creator app builder";
newText = Product.removeLastOccurence("app");   
// returns "Create an app using Zoho Creator builder"
```

--------------------------------

### Zoho Creator: Invoke URL Task - File Download Limit (Non-Creator)

Source: https://www.zoho.com/deluge/help/release-notes

In services other than Zoho Creator, downloading files larger than 5 MB with an invoke URL task is no longer permitted. This limit may be subject to further reductions.

```Deluge
// Attempting to download a file via invoke URL (subject to size limit in non-Creator services)
invokeurl
[
    url:"https://example.com/largefile.zip"
];
```

--------------------------------

### Fetch Comments for a Task in Zoho Projects

Source: https://www.zoho.com/deluge/help/projects/get-records

Retrieves comments associated with a specific task in Zoho Projects. It uses a map to pass task ID, start index, and the number of comments to fetch. The script requires portal name, project ID, resource type ('comments'), a data map, and the module ('projects').

```deluge
data_map = Map();
data_map.put("taskid", "548XXXXXXXXXXX888");
data_map.put("index", "1");
data_map.put("range", "3");
response = zoho.projects.getRecords("zylker", 548XXXXXXXXXXX771, "comments", data_map, 0, "projects");
```

--------------------------------

### Zoho Deluge Success Response Example

Source: https://www.zoho.com/deluge/help/desk/create-related-record

This JSON structure represents a successful response, detailing the fields of a newly created record in a Zoho submodule. It includes custom fields, owner information, time-related data, cost details, and parent record associations.

```JSON
{
"customFields": {
"bugTimeLogID": null,
"Date and Time Completed": null
},
"ownerId": "168XXXXXXXXXXXX005",
"requestChargeType": "Customer Service",
"executedTime": "2019-02-16T07:38:48.000Z",
"hoursSpent": "0",
"minutesSpent": "0",
"secondsSpent": "0",
"agentCostPerHour": null,
"additionalCost": null,
"totalCost": "0.0",
"description": null,
"requestId": null,
"createdTime": "2019-02-26T04:19:24.000Z",
"createdBy": "168XXXXXXXXXXXX005",
"departmentId": "168XXXXXXXXXXXX907",
"parent": {
"associatedTicketId": "null",
"id": "168XXXXXXXXXXXX043",
"type": "TASKS"
},
"invoiceId": null,
"id": "168XXXXXXXXXXXX001",
"taskId": "168XXXXXXXXXXXX043"
}
```

--------------------------------

### Get Keys from Map in Deluge

Source: https://www.zoho.com/deluge/help/functions/map/keys

The keys() function retrieves all keys from a given map variable and returns them as a list. This is useful for iterating over map entries or accessing specific keys.

```deluge
mapVar = {"Product" : "Zoho Creator", "Version" : 5};
listVar = mapVar.keys();
info listVar;
//returns Product,Version
```

```deluge
mapVar = {{"Creator", "CRM"} : "Products", "Zoho" : "Company"};
listVar = mapVar.keys();
info listVar;
//returns {"Creator", "CRM"}, Zoho
```

```deluge
mapVar = {1 : "Number", "a" : "Alphabet"};
listVar = mapVar.keys();
info listVar;
//returns 1,a
```

--------------------------------

### Zoho CRM Integration Tasks - Get Module Metadata

Source: https://www.zoho.com/deluge/help/crm-vertical-solutions-tasks

Fetches the metadata for a specific module within Zoho CRM. This includes information about fields, relationships, and other module properties.

```Deluge
get_module_metadata(module_name);
```

--------------------------------

### Deluge Example: Find First Available Technician

Source: https://www.zoho.com/deluge/help/misc-statements/break

Illustrates using the 'break' statement in Deluge to find and display the name of the first available technician from a collection of technician data. The loop terminates after the first match.

```Deluge
technician1 = Collection();
technician1.insert("name":"Alberto");
technician1.insert("status":"unavailable");

technician2 = Collection();
technician2.insert("name":"Bruno");
technician2.insert("status":"available");

technician3 = Collection();
technician3.insert("name":"A3");
technician3.insert("status":"available");

technicians = Collection();
technicians.insert(technician1);
technicians.insert(technician2);
technicians.insert(technician3);

for each technician in technicians
{
    if(technician.get("status") == "available") 
    {
        info technician.get("name") + " is available";
        break;
    }
}
```

--------------------------------

### Fetch Designations from Zoho One

Source: https://www.zoho.com/deluge/help/one/get-designations

This Deluge script fetches the designations of users from a Zoho One organization. It requires the organization ID, a starting record number, the number of records to fetch, and the connection link name.

```deluge
response = zoho.one.getDesignations(72XXXXXXX, "1", "200", "zoho_one_connection");
```

--------------------------------

### Deluge containValue() Example

Source: https://www.zoho.com/deluge/help/functions/map/containvalue

Demonstrates the usage of the containValue() function in Deluge. It shows how to check if a map contains a specific value, returning true or false accordingly. The function is case-sensitive.

```Deluge
mapVar = {"Product" : "Creator", "Company" : "Zoho"};
boolVal = mapVar.containValue("creator"); //returns false
newBoolVal = mapVar.containValue("Creator"); //returns true
```

--------------------------------

### Fetch Users from Zoho One

Source: https://www.zoho.com/deluge/help/one/get-users

Fetches users from a specified Zoho One organization. Supports pagination and can retrieve up to 200 records per page. Requires organization ID and connection name.

```Deluge
response = zoho.one.getUsers(72XXXXXXX, "1", "200", Map(), "zoho_one_connection");
```

--------------------------------

### Deluge: Try-Catch Block

Source: https://www.zoho.com/deluge/help/miscellaneous

This Deluge snippet demonstrates error handling using a try-catch block. It allows for graceful management of exceptions during script execution.

```Deluge
try
{
    // Code that might cause an error
}
catch <errorVariable>
{
    // Code to handle the error
}
```

--------------------------------

### Open Zoho Creator Form in Popup Window with Custom Size and Style

Source: https://www.zoho.com/deluge/help/openurl

Opens a Zoho Creator form in a popup window with specified dimensions and background color. This allows for interactive elements without navigating away from the current page.

```Deluge
openUrl("#Form:Orders?zc_BgClr=#34ebd2","popup window","height=510px,width=420px");
```

--------------------------------

### Deluge isValidObject Usage

Source: https://www.zoho.com/deluge/help/functions/common/is-valid-object

Demonstrates how to use the isValidObject function in Deluge to check if a variable is not null or empty. It shows examples of assigning the boolean result to a variable.

```deluge
is_valid="Zoho".isValidObject(); // is_valid will be assigned 'true'
value = '';
isValid= value.isValidObject(); // isValid will be assigned 'false', since the value is empty.
```

--------------------------------

### Fetch CSV from Cloud Storage and Insert into Zoho Sheet

Source: https://www.zoho.com/deluge/help/sheet/insert-csv

This script fetches CSV data from a cloud storage URL using the invokeUrl task and then inserts this data into a specified Zoho Sheet worksheet ('Sheet2'). The insertion starts from the first row and first column.

```Deluge
csv_data=invokeUrl
[
  url: "http://insight.dev.schoolwires.com/HelpAssets/C2Assets/C2Files/C2ImportCalEventSample.csv"
  type: GET
];
response = zoho.sheet.insertCSV("eev4nXXXXXXXXXXXXXXXXXXXXXXXXXXXcff41","Sheet2",csv_data, 1, 1, "Sheet_connection");
```

--------------------------------

### Get Minutes from Time (Deluge - Zoho Creator Only)

Source: https://www.zoho.com/deluge/help/functions/datetime/getminutes

Retrieves the minute component from a time value. This functionality is specifically supported for the TIME data type within Zoho Creator.

```Deluge
<variable> = <timeValue>.getMinutes();

```

```Deluge
<variable> = getMinutes(<timeValue>);

```

```Deluge
timeValue = '10:00:00 PM';
info timeValue.getMinutes(); // Returns 0

```

```Deluge
currentTime = '13:15:10';
info currentTime.getMinutes();  // Returns 15

```

--------------------------------

### Deluge Invoke URL Task - Allowed Ports (Zoho Creator)

Source: https://www.zoho.com/deluge/help/web-data/invokeurl-task/limitations

Outlines the broad range of network ports that the Invoke URL task can utilize when executed directly from Zoho Creator across all geographical setups. This allows for greater flexibility in connecting to external services.

```Deluge
80 to 65535
```

--------------------------------

### Fetch Records by Blueprint Stage and Execute Transition

Source: https://www.zoho.com/deluge/help/creator-blueprint-tasks/blueprint-attributes

This Deluge code fetches records based on a specific blueprint stage ('Out for delivery') and then executes a predefined transition using the `thisapp.blueprint.executeTransition` function. This is useful for automating workflow processes.

```deluge
variable = orders[Blueprint.Currentstage = "Out for delivery"];
for each order in variable
{
performTransition =  thisapp.blueprint.executeTransition("orders", "delivery process","update delivery date", orders.ID);
}
```

--------------------------------

### Formatting URL Field for Display in Deluge

Source: https://www.zoho.com/deluge/help/composite-fields-usage

Provides an example of how to format a URL field in Deluge using HTML to include a hyperlink with a title and target attribute. This allows for richer display of URL data.

```Deluge
input.URL = "<a href=\"https://www.zoho.com\" title = \"Zoho webpage\" target = \"_blank\">zoho</a>";
```

--------------------------------

### Post Third-Party Tweet to Zoho Connect Group

Source: https://www.zoho.com/deluge/help/connect/add-post

This example demonstrates posting content from a third-party service (like a tweet) to a Zoho Connect group. It extends the basic post by including `tpEntityId` and `tpMetaDetails` in the `contentMap` for custom identification and metadata.

```deluge
metaDetails = {"Charts":"4", "Books":"10"};
contentMap = {"message":"Stock Details of Stationery Store", "title":"Stationery Store", "tpEntityId":"TPEntity001", "tpMetaDetails":metaDetails };
postDetails = zoho.connect.addPost("status", 105000017039001, 105000207776548, contentMap);
```

--------------------------------

### Deluge: Fetching Solutions

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script shows how to fetch solutions from Zoho CRM, filtering them by status and sorting by solution title.

```deluge
// Fetching approved solutions
solutionsList = zoho.crm.getRecords("Solutions", "all", "Solution_Title.ASC", "Status=Approved");

// Displaying the fetched solutions
info solutionsList;
```

--------------------------------

### Count Faces in an Image using Zoho AI

Source: https://www.zoho.com/deluge/help/ai-tasks/detect-face

This Deluge script shows how to use zoho.ai.detectFace to count the number of faces in an image. It first downloads an image using invokeurl and then processes the response to extract the 'numFacesFound' attribute using the get() function.

```deluge
image_file  =  invokeurl
   [ 
       url : "https://ylpapp.isb.edu/user/Passport_photo_samples/Sample-9---wrong.jpg"
   ];
response  =  zoho.ai.detectFace(image_file,  false);
number_of_faces  =  response.get("numFacesFound");
```

--------------------------------

### Fetch Zoho Sheet Records by Criteria (Deluge)

Source: https://www.zoho.com/deluge/help/sheet/get-records

This script demonstrates how to fetch records from a Zoho Sheet based on specified criteria. It uses the `zoho.sheet.getRecords` function with parameters for criteria, start index, and count. The criteria are formatted as a string with escaped quotes.

```deluge
queryValue = Map();
queryValue.put("criteria","\"Lead Source\"=\"Trade Show\"");
queryValue.put("records_start_index","1");
queryValue.put("count","25");

response = zoho.sheet.getRecords("eev4nXXXXXXXXXXXXXXXXXXXXXXXXXXXcff41", "Sheet1", queryValue, "sheet_connection");
```

--------------------------------

### Deluge Example: Terminate Loop on Value Match

Source: https://www.zoho.com/deluge/help/misc-statements/break

Demonstrates using the 'break' statement in Deluge to stop a 'for each' loop when a specific value ('Red') is encountered in a list. It prints elements until the condition is met.

```Deluge
colors = List();
colors.add("Green");
colors.add("Red");
colors.add("Blue");
colors.add("Teal");
for each rec in colors
{
 if(rec == "Red")
 {
 break;
 }
 info rec;
}
```

--------------------------------

### Get Seconds from Date-Time (Function Call)

Source: https://www.zoho.com/deluge/help/functions/datetime/getseconds

Retrieves the seconds from a date-time value using the getSeconds() function. The date-time value can be specified with or without a time component.

```Deluge
currentDate = '01-Jan-2019';
info currentDate.getSeconds();
```

--------------------------------

### Deluge subText Example: Negative End Index

Source: https://www.zoho.com/deluge/help/functions/string/subtext

Illustrates the behavior of the subText function when a negative value is provided for the end_index. The negative index is ignored, and the substring is returned from the start_index to the end of the string.

```Deluge
product_name="Zoho Deluge";
result = product_name.subText(5,-12); 
info result;
```

--------------------------------

### Format Date-Time to Text with toString

Source: https://www.zoho.com/deluge/help/functions/common/tostring

This example demonstrates using the toString function to format a date-time expression into a specific string format and convert it to a specified time zone. It utilizes the optional dateTimeFormat and timeZone parameters.

```deluge
dateValue = '01-Jan-2019 10:15:30';
info toString(dateValue, "MMM dd, yy 'at' hh:mm:ss, E", "Europe/Moscow"); 
// Returns Jan 01, 19 at 07:45:30, Fri
```

--------------------------------

### Fetch Visitor Session Value - Deluge

Source: https://www.zoho.com/deluge/help/salesiq/visitorsession-get

Fetches a value stored using the `zoho.salesiq.visitorsession.set` task for a specific key within a Zoho Sales IQ session. Requires portal name, key, and connection link name.

```Deluge
response = zoho.salesiq.visitorsession.get("portal_1", "name", "salesIqConnection");
```

--------------------------------

### Get Seconds from Date-Time (Method Chaining)

Source: https://www.zoho.com/deluge/help/functions/datetime/getseconds

Retrieves the seconds from a date-time value using the getSeconds() method. The date-time value can be specified with or without a time component.

```Deluge
currentDate = '01-Jan-2019 23:15:10';
info currentDate.second();
```

--------------------------------

### Fetch Record from Zoho Billing

Source: https://www.zoho.com/deluge/help/billing/fetch-record-by-id

This Deluge code snippet demonstrates how to fetch a record from Zoho Billing by providing the module name, organization ID, record ID, and the connection name.

```Deluge
response = zoho.billing.retrieve("hostedpages", "10982991", "1687000000116001", "billing_connection");
```

--------------------------------

### Zoho CRM Integration Tasks - Get Organization Variable

Source: https://www.zoho.com/deluge/help/crm-vertical-solutions-tasks

Retrieves the value of a custom variable that has been set for the organization. This allows access to stored configuration or state.

```Deluge
get_organization_variable(variable_name);
```

--------------------------------

### Get Day of Week using weekday() method

Source: https://www.zoho.com/deluge/help/functions/datetime/getdayofweek

This snippet illustrates the usage of the weekday() method, which is an alias for getDayOfWeek(). It also takes a date-time value and returns the corresponding day of the week.

```Deluge
currentDate = '15-Mar-2019';
dayNumber = currentDate.weekday();
// returns 6 (meaning Friday)
```

--------------------------------

### Fetch Records within a Range in Deluge

Source: https://www.zoho.com/deluge/help/fetch-records/fetch-collection-records

Retrieves records that match a criteria and fall within a specified index range. The start and end indices define the inclusive range.

```Deluge
<variable> = <form_link_name> [<criteria>] range from <start_index> to <end_index>;
```

--------------------------------

### Deluge: Creating a Campaign

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script shows how to create a new marketing campaign in Zoho CRM, including setting the campaign name, type, and status.

```deluge
// Creating a new Campaign
campaignMap = Map();
campaignMap.put("Campaign_Name", "Summer Sale 2024");
campaignMap.put("Campaign_Type", "Email");
campaignMap.put("Status", "Planning");
campaignMap.put("Expected_Revenue", 50000);

createCampaignResponse = zoho.crm.createRecord("Campaigns", campaignMap);
info createCampaignResponse;
```

--------------------------------

### Zoho Creator: Integration with V2 APIs

Source: https://www.zoho.com/deluge/help/release-notes

Zoho Creator integration tasks have been updated to support Zoho Creator V2 APIs. Existing V1 integration tasks are automatically restructured to the new format.

```Deluge
// Existing V1 format
zoho.creator.getRecord(formName, recordId);

// Restructured V2 format
zoho.creator.v1.getRecord(formName, recordId);
```

--------------------------------

### Send Email with Report Attachment

Source: https://www.zoho.com/deluge/help/misc-statements/send-mail

This example shows how to send an email with a report as an attachment. The report is generated based on specific criteria (Status == 'Converted') and sent as a PDF to a designated email address.

```deluge
sendmail   
[
from: zoho.adminuserid   
to: input.team_email   
subject: "Today's Deals"
message: "Please find the PDF attachment for today's deals"
Attachments :view: Leads_Report [Status=="Converted"] as PDF   
]
```

--------------------------------

### Deluge Number and Text Concatenation

Source: https://www.zoho.com/deluge/help/operators/creator-fields-and-their-applicable-operators

Shows how to concatenate a number field with a text field using the '+' operator in Deluge. An example illustrates combining an address number and street name.

```Deluge
Info Number + ", " + Single_line_field; // Returns, 101, Elliot Avenue
```

--------------------------------

### Deluge: Example - Auto-Select 'White'

Source: https://www.zoho.com/deluge/help/client-functions/select-deselect

This Deluge code snippet demonstrates how to automatically select the 'White' option in a 'Color_selection' field if no color has been previously selected. It checks if the field is null before applying the select task.

```Deluge
if(Color_selection ==null)
{
Color_selection.select("White");
}
```

--------------------------------

### Deluge subMinutes Function for Time (Zoho Creator)

Source: https://www.zoho.com/deluge/help/functions/datetime/subminutes

Illustrates the application of the subMinutes function in Deluge for time values, specifically within Zoho Creator. Examples show how to handle subtracting minutes, including cases that might involve wrapping around midnight or using negative values to add minutes.

```Deluge
// The below code tries to add hours to a "time" value beyond the 24-hour range 
timeValue = '00:00:00';
info timeValue.subMinutes(-4); // Returns '00:04:00'
```

```Deluge
currentTime = '13:15:10';
info currentTime.subMinutes(1);  // Returns '13:14:10'
```

--------------------------------

### Deluge: Control Flow - Continue

Source: https://www.zoho.com/deluge/help/miscellaneous

This Deluge snippet demonstrates the 'continue' statement, which skips the rest of the current loop iteration and proceeds to the next.

```Deluge
for each item in list
{
    if (condition)
    {
        continue;
    }
    // Rest of the loop code
}
```

--------------------------------

### Zoho Sales IQ Visitor Session - Get Data

Source: https://www.zoho.com/deluge/help/salesiq-tasks

This function retrieves temporarily stored data based on a visitor's chat conversation in Zoho Sales IQ. It enables accessing context previously set during the session.

```Deluge
data = visitor.session.get("key");
// Example: customerName = visitor.session.get("customer_name");
// print customerName;
```

--------------------------------

### Deluge weekday() Function Usage

Source: https://www.zoho.com/deluge/help/functions/datetime/weekday

Demonstrates how to use the weekday() function in Deluge to get the day of the week from a date-time value. It shows different syntax options and how to assign the result to a variable.

```deluge
currentDate = '15-Mar-2019';
dayNumber = currentDate.weekday(); // returns 6 (meaning Friday)
```

```deluge
currentDate = '15-Mar-2019';
dayNumber = weekday(currentDate); // returns 6 (meaning Friday)
```

```deluge
currentDate = '15-Mar-2019';
dayNumber = currentDate.getDayOfWeek(); // returns 6 (meaning Friday)
```

```deluge
currentDate = '15-Mar-2019';
dayNumber = getDayOfWeek(currentDate); // returns 6 (meaning Friday)
```

--------------------------------

### Fetch Time Entries Related to a Task in Zoho Desk with Sorting

Source: https://www.zoho.com/deluge/help/desk/fetch-related-records

This Deluge script fetches 'timeEntry' records related to a 'task' in Zoho Desk, sorted by 'executedTime' in descending order. It demonstrates fetching 3 records starting from index 1, along with specifying query parameters for sorting.

```deluge
queryValue = {"orderBy":"DESC"};
response = zoho.desk.getRelatedRecords(641XXXXXX, "timeEntry", "tasks", 168XXXXXXXXXXXX043, 1, 3, queryValue, "desk_connection");
```

--------------------------------

### Convert URL to PDF and Rename File in Deluge

Source: https://www.zoho.com/deluge/help/functions/file/convert-to-pdf

This Deluge script shows how to convert a publicly accessible URL into a PDF file and then rename the resulting file using Deluge scripting.

```deluge
// Step 1: Specify the URL to convert
url = "https://www.zoho.com/deluge/";
// Step 2: Convert the URL content to a PDF file
file = zoho.file.convertToPDF(url);
// Step 3: Log file details and confirm file object
info file;
info file.isFile();
// Step 4: Rename the generated PDF file
file.setFileName("CRMAccounts");
// Step 5: Log the updated file object with the new name
info file;
```

--------------------------------

### Deluge isAscii() Syntax

Source: https://www.zoho.com/deluge/help/functions/string/isAscii

Demonstrates the two ways to use the isAscii() function in Deluge: as a method on a text variable or as a standalone function.

```deluge
<variable> = <inputText>.isAscii();
```

```deluge
<variable> = isAscii(<inputText>);
```

--------------------------------

### Add Months to DateTime in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/addmonth

This example shows how to add a specified number of months to a date-time value using the addMonth() function in Deluge. It illustrates the function's behavior with time components.

```Deluge
currentDateTime = '01-Jan-2019 15:00:00';
newDateTime = currentDateTime.addMonth(13); 
// returns '01-Feb-2020 15:00:00'
```

--------------------------------

### Create and Send Document using Zoho Sign Template

Source: https://www.zoho.com/deluge/help/script/sign/create-using-template

This script creates a document using a specified template ID and configures it with recipient information and field data before sending. It utilizes maps and lists to structure the data required by the Zoho Sign API.

```Deluge
actionMap =  Map();  
fieldTextData = Map();  
fieldTextData.put("TextField_1", "Document to Review");  
   
actionMap.put("field_data",{"field_text_data":fieldTextData});  
   
eachActionMap1 = Map();  
eachActionMap1.put("recipient_name","James");  
eachActionMap1.put("recipient_email","james@zoho.com");  
eachActionMap1.put("action_type","SIGN");  
eachActionMap1.put("action_id","32076000000002014");  
eachActionMap1.put("role","Reviewer");  
eachActionMap1.put("verify_recipient","false");  
   
eachActionMap2 = Map();  
eachActionMap2.put("recipient_name","Tony");  
eachActionMap2.put("recipient_email","tony@zoho.com");  
eachActionMap2.put("action_type","SIGN");  
eachActionMap2.put("action_id","32076000000014006");  
eachActionMap2.put("role","Manager");  
eachActionMap2.put("verify_recipient","false");  
   
fieldList = List();  
fieldList.add(eachActionMap1);  
fieldList.add(eachActionMap2);  
   
actionMap.put("actions",fieldList);  
   
submitMap = Map();  
submitMap.put("templates",actionMap);  
   
parameters =  Map();  
parameters.put("is_quicksend","true");  
parameters.put("data",submitMap);  
   
response  = zoho.sign.createUsingTemplate(32076000000002011, parameters); 
```

--------------------------------

### Zoho Invoice Integration Tasks - Get Record By ID

Source: https://www.zoho.com/deluge/help/invoice-tasks

Fetches the details of a specific record in Zoho Invoice using its unique identifier. This is useful for accessing information about a single entry.

```Deluge
getRecordById(moduleName, recordId)
```

--------------------------------

### Deluge: Skip loop iteration with continue

Source: https://www.zoho.com/deluge/help/misc-statements/continue

This Deluge code demonstrates how to use the 'continue' statement to skip an iteration of a 'for each' loop when a specific condition is met. In this example, it skips processing when the color 'Red' is encountered.

```Deluge
colors = List();
colors.add("Green");
colors.add("Red");
colors.add("Blue");
colors.add("Red");
colors.add("Teal");
for each rec in colors
{
 if(rec == "Red")
 {
  continue;
 }
 info rec;
}
```

--------------------------------

### Generate Fillable Link for Service Requests

Source: https://www.zoho.com/deluge/help/writer/GenerateFillableLink

This Deluge script shows how to generate fillable links for a list of service requests. It populates fields like 'Service', 'Technician', 'Request Created', and 'Status' for each record.

```Deluge
document_id = "po5uobda049e043544b13a9956f6d2cedc67b";
                mp = Map();
                mp.put("Service", "Laptop Request");
                mp.put("Technician", "Zylker");
                mp.put("Request Created", "Jan 10, 2024");
                mp.put("Status", "Completed");
                data_map = Map();
                data_map.put("data", fields)
                merge_detail = Map();
                merge_detail.put("merge_data", data_map);
                optional_settings = Map();
                optional_settings.put("test_mode", false);
                response = zoho.writer.generateFillableLink(document_id, merge_detail, optional_settings, "writer_oauth_connection" );
                info response;
```

--------------------------------

### Build Custom Widgets and Pages in Zoho Creator with Deluge

Source: https://www.zoho.com/deluge/help/index

Use Deluge scripts to fetch and display data dynamically in custom pages and widgets within Zoho Creator. This allows building interactive dashboards and interfaces with data from various sources.

```Deluge
// Example Deluge code for custom widgets and pages
// (Specific code depends on the Zoho Creator application structure)
```

--------------------------------

### Zoho Deluge Collection Functions Overview

Source: https://www.zoho.com/deluge/help/functions/collection

This section lists various collection functions available in Zoho Deluge. These functions allow developers to manipulate and manage data collections efficiently. Examples include adding, removing, sorting, and checking for elements within collections.

```Deluge
clear
containsKey
containsValue
delete
deleteAll
deleteKey
deleteKeys
distinct
duplicate
get
getKey
getLastKey
insert
insertAll
intersect
isEmpty
keys
size
sort
sortKey
update
values
notContains
```

--------------------------------

### Create Zoho Calendar Event with Deluge

Source: https://www.zoho.com/deluge/help/deluge-in-zoho-services/zoho-connect

This Deluge script constructs a map to store response data and creates a new event in Zoho Calendar. It processes trigger data to extract event details like title, start time, end time, and all-day status, then formats them for the Zoho Calendar API.

```Deluge
//Construct a map to store the response
returnMap = Map();
title = triggerData.get("payload").get("title");
start_time_in_ms = triggerData.get("payload").get("startTimeInMillis").toNumber();
start_time = toString(start_time_in_ms,"yyyyMMdd'T'HHmmss","US/Pacific");
end_time_in_ms = triggerData.get("payload").get("endTimeInMillis").toNumber();
end_time = toString(end_time_in_ms,"yyyyMMdd'T'HHmmss","US/Pacific");
dateandtime_map = Map();
dateandtime_map.put("timezone","US/Pacific");
dateandtime_map.put("start",start_time);
dateandtime_map.put("end",end_time);isallday = triggerData.get("payload").get("isAllDay");
reminder1 = Map();
reminder1.put("action","popup");
reminder1.put("minutes","-60");
reminders_list = List();
reminders_list.add(reminder1);
eventDetails = Map();
eventDetails.put("estatus","added");
eventDetails.put("title",title);
eventDetails.put("reminders",reminders_list);
eventDetails.put("dateandtime",dateandtime_map);
eventDetails.put("isallday",isallday);
event = Map();
event.put("eventdata",eventDetails);
calendar_res = zoho.calendar.createEvent("fd8790c915414fbebc4abafbedf118f1",event,"calendar");
return returnMap;
```

--------------------------------

### Attach Multiple Files from Different Collection Variables in Deluge

Source: https://www.zoho.com/deluge/help/misc-statements/send-mail

This example demonstrates attaching files from various collection variables by separating the entries with commas in Zoho Deluge. This allows for attaching files held across different record sets.

```Zoho Deluge
file: <collection_variable1>.<file_upload_field>, file: <collection_variable2>.<file_upload_field>
```

--------------------------------

### Get Day of Week using getDayOfWeek() function

Source: https://www.zoho.com/deluge/help/functions/datetime/getdayofweek

This snippet shows an alternative way to use the getDayOfWeek function by passing the date-time value as an argument. It achieves the same result of returning the day of the week.

```Deluge
currentDate = '15-Mar-2019';
dayNumber = getDayOfWeek( currentDate);
// returns 6 (meaning Friday)
```

--------------------------------

### Create Interactive Widgets in Zoho Cliq with Deluge

Source: https://www.zoho.com/deluge/help/index

Build interactive modular interfaces (widgets) directly within the Zoho Cliq app using Deluge scripting. These widgets can display data, enable user actions, and automate processes.

```Deluge
// Example Deluge code for creating interactive widgets in Zoho Cliq
// (Specific code depends on the Zoho Cliq application structure)
```

--------------------------------

### Deluge: Post to Zoho Connect

Source: https://www.zoho.com/deluge/help/connect/add-post

This Deluge code snippet demonstrates how to post various types of content (status, event, task) to a Zoho Connect group. It utilizes the `zoho.connect.addPost` function, requiring parameters such as type, scope ID, partition ID, and a content map.

```deluge
<variable> = zoho.connect.addPost(<type>, <scopeID>, <partitionID>, <contentMap>, <connectionName>);
```

--------------------------------

### Deluge Collection Data Type Example

Source: https://www.zoho.com/deluge/help/datatypes

Illustrates the use of the Collection data type in Deluge, which can store either a list of elements or key-value pairs. A single collection variable cannot hold both types of data simultaneously.

```Deluge
materials = Collection("Mobile phone","Laptop","Adapter");
```

--------------------------------

### Collect Signatures in Specific Order for Purchase Order

Source: https://www.zoho.com/deluge/help/writer/merge-and-sign

This example shows how to collect signatures in a specific order for a purchase order. It involves merging data for multiple items and sending the document sequentially to a sales manager for approval and then to a client for signing. The script configures reminder periods and messages for the signing process.

```deluge
document_id = "po5uobda049e029d44b13a9956f6d2cedc67b"; 

fieldsList = List();

fieldsmap1 = Map(); 
fieldsmap1.put("Purchsed_Date","27 May 2022"); 
fieldsmap1.put("Product_name","Samsung series s8"); 
fieldsmap1.put("Price","50000");

fieldsmap2 = Map(); 
fieldsmap2.put("Purchsed_Date","30 May 2022"); 
fieldsmap2.put("Product_name","Apple 15 pro max"); 
fieldsmap2.put("Price","10000");

fieldsList.add(fieldsmap1);
fieldsList.add(fieldsmap2);

data_map = Map();
data_map.put("data", fields)
merge_details = Map();
merge_details.put("merge_data", data_map);

String filename = "Sales Invoice";

signerList = List(); 
signerObj1 = Map(); 
signerObj1.put("recipient_1","approval-manager@zylker.com"); 
signerObj1.put("action_type","approve");  //approve|sign|view  
signerObj1.put("language","en"); 

signerObj2 = Map(); 
signerObj2.put("recipient_2","client-manager@test.com"); 
signerObj2.put("action_type","sign");  //approve|sign|view  
signerObj2.put("language","en");

signerList.add(signerObj1); 
signerList.add(signerObj2);

option_settings = Map();

option_settings.put("sign_in_order","true");
option_settings.put("message", "Details regarding latest purchase order");   
option_settings.put("reminder_period", "15");

response = zoho.writer.mergeAndSign(document_id, merge_details, filename, signerList, option_settings, "writer_oauth_connection");

info response;



```

--------------------------------

### Deluge workday() Function Example 2

Source: https://www.zoho.com/deluge/help/functions/datetime/workday

Calculates a future date by adding 5 business days to the current date, specifying Sunday as a weekend and providing a holiday. The result is a date value.

```Deluge
newDate = zoho.currentdate.workday(5, {"Sunday"}, {'25-May-2020'});
// assuming the current date is 23-May-2020, this task returns '30-May-2020'
```

--------------------------------

### Get Salesforce Record ID

Source: https://www.zoho.com/deluge/help/salesforce/create-record

This Deluge code snippet shows how to retrieve the ID of a newly created record from the Salesforce response. It uses the '.get("id")' method on the response variable.

```Deluge
<variable> = <response_variable>.get("id");
```

--------------------------------

### Get Available Slots from Zoho Bookings

Source: https://www.zoho.com/deluge/help/bookings/get-available-slots

This Deluge script fetches available time slots from Zoho Bookings for a specified service, staff member, and date. It requires a valid OAuth connection to the Zoho Bookings service.

```Deluge
response = zoho.bookings.getAvailableSlots(3883XXXXXXXXXXX7032, 3883XXXXXXXXXXX7008, "18-10-2019", "bookings_oauth_connection");
```

--------------------------------

### Deluge: Get Field Value

Source: https://www.zoho.com/deluge/help/miscellaneous

This snippet shows how to retrieve the value of a specific field using Deluge. This is commonly used to access and process data from forms or records.

```Deluge
getFieldValue(<fieldName>);
```

--------------------------------

### Format Key-Value Data for invokeAPI (Deluge)

Source: https://www.zoho.com/deluge/help/webhook/invokeapitask

Demonstrates the Deluge syntax for formatting key-value data to be sent in the body of an invokeAPI request. Covers FILE, TEXT/MAP, and LIST data types with their respective parameter requirements.

```deluge
<variable> = {{"param-name": <key>, "param-value": <File>}};
```

```deluge
<variable> = {{"param-name": <key>, "param-value": <value>, "content-type":"<content_type_value>", "encoding-type":"<encoding_type_value>"}};
```

```deluge
list_ = List();
list_variable.add({"param-name": <key>, "param-value": <File_1>});
list_variable.add({"param-name": <key>, "param-value": <File_2>});
list_variable.add({"param-name": <key>, "param-value": <text_value>, "content-type":"<content_type_value>", "encoding-type":"<encoding_type_value>"});
list_variable.add({"param-name": <key>, "param-value": <map_value>, "content-type":"<content_type_value>", "encoding-type":"<encoding_type_value>"});
```

--------------------------------

### Extract Minute from DateTime using minute()

Source: https://www.zoho.com/deluge/help/functions/datetime/minute

Demonstrates how to use the `minute()` function to get the minute value from a date-time variable in Deluge. The function can be called as a method on the date-time object or as a standalone function.

```Deluge
currentDate = '01-Jan-2019 23:15:10';
info currentDate.minute(); // Returns 15
```

```Deluge
currentDate = '01-Jan-2019';
info minute(currentDate); // Returns 00
```

--------------------------------

### Zoho CRM API Names Retrieval

Source: https://www.zoho.com/deluge/help/script/crm/api-names

This section details the steps to retrieve API names for Zoho CRM modules, fields, and related lists. It involves navigating through the CRM setup to the Developer Space and API names section.

```Instructions
1. Navigate to the setup icon on the top right corner.
2. Click on APIs under Developer Space.
3. Click on the API names tab.
4. To get the API names for the fields associated to the module, click on the module name.
```

--------------------------------

### Fetch Records from Zoho Books (Deluge)

Source: https://www.zoho.com/deluge/help/books/fetch-records

This Deluge script retrieves records from a specified module in Zoho Books. It utilizes the `zoho.books.getRecords` function, allowing filtering via a key-value search parameter. Ensure you have a valid Zoho Books connection configured.

```Deluge
searchParam = {"contact_name":"Will"};
response = zoho.books.getRecords("Contacts", "53XXXXXX", searchParam, "books_connection");
```

--------------------------------

### Search Quickbooks Records by Criteria in Deluge

Source: https://www.zoho.com/deluge/help/quickbooks/search-records

This Deluge snippet demonstrates how to search for records in Quickbooks based on a specified criteria. It utilizes the `intuit.quickbooks.searchRecords` function, taking the Quickbooks connection name, company ID, and a SQL-like query string as parameters. The example searches for all fields ('*') from the 'Customer' module where the 'DisplayName' is 'Henry'.

```Deluge
response = intuit.quickbooks.searchRecords("Quickbooks", "1241802285", "SELECT * FROM Customer WHERE DisplayName='Henry'");
```

--------------------------------

### Execute XPath on XML

Source: https://www.zoho.com/deluge/help/xml-manipulation/executexpath

Fetches the title of a CD from an XML file using the executeXpath() function. It first retrieves the XML content using invokeurl and then applies the XPath expression '/CATALOG/CD/TITLE' to extract the desired information.

```Deluge
xmlResp = invokeurl 
[
url : "https://www.w3schools.com/xml/cd_catalog.xml" 
type : GET 
] ;
info xmlResp.executexpath("/CATALOG/CD/TITLE");
```

--------------------------------

### Get List Size in Deluge

Source: https://www.zoho.com/deluge/help/functions/list/size

The size() function in Deluge returns the number of elements present in a given list. It is a straightforward method to count items in a list variable.

```deluge
listVar = {"Projects", "Mail", {"Zoho Creator", "Zoho CRM"}};
countElements = listVar.size(); //returns 3
```

--------------------------------

### Fetch Filtered Records from Zoho Projects Module

Source: https://www.zoho.com/deluge/help/projects/get-records

This Deluge script shows how to fetch records from a Zoho Projects module based on specific criteria, such as task priority. It uses a `Map` to define the filter parameters (e.g., `priority` set to 'high') and passes it to the `zoho.projects.getRecords` task.

```Deluge
data_map = Map();
data_map.put("priority", "high");
response = zoho.projects.getRecords("zylker", 548XXXXXXXXXXX771, "tasks", data_map, 0, "projects");
```

--------------------------------

### Zoho One User Management with Deluge

Source: https://www.zoho.com/deluge/help/one-tasks

Perform user management operations like adding, updating, getting, activating, and deactivating users within Zoho One using Deluge scripts. These operations typically require user IDs and organization details.

```Deluge
add_user(user_details);
update_user(user_id, new_details);
get_user(user_id);
get_users();
activate_user(user_id);
deactivate_user(user_id);
```

--------------------------------

### Fetch Zoho Creator Records with Condition

Source: https://www.zoho.com/deluge/help/creator/get-records-v1

Retrieves records from a Zoho Creator application based on a specified condition. It requires the owner's name, application link name, view link name, and the search condition.

```deluge
response = zoho.creator.v1.getRecords("tony","Employee_Management","Employees","Department.Name == \"Electrical\"");
```

--------------------------------

### Deluge subMinutes Function for Date-Time

Source: https://www.zoho.com/deluge/help/functions/datetime/subminutes

Demonstrates the usage of the subMinutes function in Deluge to subtract minutes from a date-time value. It covers both direct method calls and static function calls, along with examples showing the expected output.

```Deluge
currentDate = '02-Jan-2019';
info currentDate.subMinutes(1); // Returns '01-Jan-2019 23:59:00'
```

```Deluge
currentDate = '01-Jan-2019 23:59:10';
info currentDate.subMinutes(2); // Returns '01-Jan-2019 23:57:10'
```

--------------------------------

### Send Email Using Fetched Visitor Data - Deluge

Source: https://www.zoho.com/deluge/help/salesiq/visitorsession-get

Retrieves a visitor's email and name from a Sales IQ session using `zoho.salesiq.visitorsession.get` and then sends an email to the visitor using the `sendmail` task. It demonstrates accessing nested data from the response.

```Deluge
visitor_email = zoho.salesiq.visitorsession.get("portal_1", "email", "salesIqConnection").get("data").get("email");
vistor_name = zoho.salesiq.visitorsession.get("portal_1", "name", "salesIqConnection").get("data").get("name");

sendmail
[
from: zoho.adminuserid
to: visitor_email
subject: "Help resources"
message: "Hello, " + visitor_name + ". Please find the help resources in the attachments.<br>Thank you,<br>Shawn"
attachments: file: help_resource
];
```

--------------------------------

### Generate SHA256 Hash (Binary)

Source: https://www.zoho.com/deluge/help/encryption/sha256

Generates a SHA256 hash for the input text 'hello' in binary format. The input data cannot exceed 1MB when 'binary' is specified.

```Deluge
response = zoho.encryption.sha256("hello", "binary");
```

--------------------------------

### Get Month from DateTime in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/getmonth

The getMonth() function extracts the numerical representation of the month from a given date-time value. It can be called as a method of the date-time object or as a standalone function.

```Deluge
currentDate = '08-Jan-2019';
monthNumber = currentDate.getMonth(); // returns 1
```

```Deluge
currentDate = '08-Jan-2019';
monthNumber = getMonth(currentDate); // returns 1
```

```Deluge
currentDate = '08-Jan-2019';
monthNumber = currentDate.month(); // returns 1
```

```Deluge
currentDate = '08-Jan-2019';
monthNumber = month(currentDate); // returns 1
```

--------------------------------

### Deluge: Handle Runtime Error when Number Not Found

Source: https://www.zoho.com/deluge/help/functions/number/rank

This example illustrates a scenario where the rank() function in Deluge will throw a runtime error because the specified number does not exist in the collection. It highlights the importance of ensuring the number is present.

```Deluge
marks = Collection(120.12,65,300.46,600.25,80.5);
order = marks.rank(100); // A run-time error ('List contains invalid(TEXT) entries hence' can not be cast to 'valid list and perform desired operations') will be thrown as there is no such element
```

--------------------------------

### Deluge putAll Task Example

Source: https://www.zoho.com/deluge/help/map-manipulations/put-all-keys

This Deluge code snippet demonstrates how to use the putAll task to merge two map variables. It adds all key-value pairs from 'city_list2' into 'city_list1'. If duplicate keys exist, the value from 'city_list2' will overwrite the existing value in 'city_list1'.

```Deluge
city_list1 = {"Anchorage":"99501","Phoenix":"85001"};
city_list2 = {"Little Rock":"72201","Beverly Hills":"90213"};
city_list1.putAll(city_list2);
info city_list1; //Returns {"Anchorage":"99501","Phoenix":"85001","Little Rock":"72201","Beverly Hills":"90213"}
```

--------------------------------

### Zoho Connect - Fetch Networks and Groups (Deluge)

Source: https://www.zoho.com/deluge/help/connect-tasks

Fetches all networks and groups associated with the user's Zoho Connect account. This is a foundational step for many integration tasks.

```Deluge
myNetworks = zoho.connect.get("networks");
myGroups = zoho.connect.get("groups");
```

--------------------------------

### Insert Record and Return ID in Zoho Deluge

Source: https://www.zoho.com/deluge/help/data-access/add-record

This Deluge script demonstrates inserting a record into the 'Add_Product' form and then using the 'info' statement to display the ID of the newly inserted record. This is useful for tracking or referencing the created record.

```deluge
response = insert into Add_Product 
[
    Product_Name = "Book"
    Selling_Price = 150
    Product_Code = 1120
    In_Stock = 20
];
info response; //Response 435913XXXXXXX490014
```

--------------------------------

### Get First Record Field Value in Deluge

Source: https://www.zoho.com/deluge/help/collection-variable

Retrieves the value of a specific field from the first record in a collection variable. It stores the retrieved value in a new variable.

```deluge
empID = employeesJoinedToday.Employee_ID;
```

--------------------------------

### Deluge: Fetch Records with Users, Subform, and Lookup Criteria

Source: https://www.zoho.com/deluge/help/composite-fields-usage

This Deluge code example shows how to fetch records based on criteria involving subfields from 'Users' (e.g., User_name), 'Subform' (e.g., a specific field), and 'Lookup' (e.g., a linked record's field) composite fields.

```Deluge
variable = <form_link_name> [(<Users_field>.User_name == <value>) && (<Subform_field>.<field> == <value>) && (<Lookup_field>.<field> == <value>)];
```

--------------------------------

### Encode URL String with urlEncode() in Deluge

Source: https://www.zoho.com/deluge/help/functions/encryption/urlencode

The urlEncode() function in Zoho Deluge encodes a given text string for use in URLs. It replaces spaces with '%20'. This example demonstrates how to use it to encode a URL.

```deluge
urlString = zoho.encryption.urlEncode("https://www.zoho.com/creator");  
// returns "http%3A%2F%2Fwww.zoho.com%2Fcreator"
```

--------------------------------

### Deluge Client Functions: Add, Append, Select, Deselect

Source: https://www.zoho.com/deluge/help/client-functions

Provides examples of Deluge client functions for managing list items or form fields. This includes adding new items, appending to existing ones, selecting specific items, and deselecting them.

```deluge
add("fieldName", "value");
append("fieldName", "value");
select("fieldName", "value");
deselect("fieldName", "value");
```

--------------------------------

### Zoho Creator: Invoke URL Task - File Download Limit

Source: https://www.zoho.com/deluge/help/release-notes

In Zoho Creator, downloading files larger than 50 MB using the invoke URL task is no longer permitted. This limit may be subject to further reductions.

```Deluge
// Attempting to download a file via invoke URL (subject to size limit)
invokeurl
[
    url:"https://example.com/largefile.zip"
];
```

--------------------------------

### Deluge: Replace First Occurrence using Regex

Source: https://www.zoho.com/deluge/help/functions/string/replacefirst

This example shows how to use a regular expression to replace a domain name in an email address. The regex '\\@[a-z]{6}\\.[a-z]{3}' matches the pattern of the old domain, and it's replaced with '@zylkertech.com'.

```deluge
useremail = "nancy@zylker.com";
newdomain_email = replaceFirst(useremail,"\\@[a-z]{6}\\.[a-z]{3}","@zylkertech.com");
//returns nancy@zylkertech.com
```

--------------------------------

### Deluge aesDecode128 Decryption Example

Source: https://www.zoho.com/deluge/help/functions/encryption/aesdecode128

Demonstrates how to use the `zoho.encryption.aesDecode128` function to decrypt a value. It requires an encryption key, the encrypted value, and optionally an initialization vector (IV) and an iteration count. The function returns the original decrypted text.

```Deluge
info zoho.encryption.aesDecode("passkey", "yf/u6N0HjKWXFFHIEKzG23+CM+BoL4RBPNb4mc0G3hw5q6xPe9KSpUd62Z5sjjSE"); // Returns "This is a secret"

encryption = zoho.encryption.aesDecode128("passkey", "pWBt7NM4llIu0n9gES91lR5fXNaAG/mx5UNPtJY0Bv8=", "a00000000000000b", 201);
info encryption;                  // Returns "This is a secret"
```

--------------------------------

### Get Day of Week using getDayOfWeek()

Source: https://www.zoho.com/deluge/help/functions/datetime/getdayofweek

This snippet demonstrates how to use the getDayOfWeek() method to retrieve the day of the week from a date-time value. It takes a date-time value as input and returns a number representing the day.

```Deluge
currentDate = '15-Mar-2019';
dayNumber = currentDate.getDayOfWeek(); 
// returns 6 (meaning Friday)
```

--------------------------------

### Deluge: Fetch Field Display Names using Zoho Creator API

Source: https://www.zoho.com/deluge/help/miscellaneous/getfieldnames

This Deluge script shows how to retrieve the display names of all fields from a specified Zoho Creator form within an application using the Zoho Creator API. It constructs the API URL with application and form link names, along with an authentication token, and then invokes the URL to get the response.

```deluge
appLinkName = "app1";
formLinkName = "form1";
authtoken = "54927XXXXXXXXXXXXXXXXXXXXXX924e3";
url = "https://creator.zoho.com/api/json/" + appLinkName + "/"+ formLinkName + "/fields?authtoken=" + authtoken;
response = invokeUrl
[
url: url
type: GET
];
```

--------------------------------

### Deluge: Fetching Products

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to fetch products from Zoho CRM, filtering them by commission rate and sorting by product name.

```deluge
// Fetching products with Commission Rate > 10
productsList = zoho.crm.getRecords("Products", "all", "Product_Name.ASC", "Commission_Rate > 10");

// Displaying the fetched products
info productsList;
```

--------------------------------

### Deluge: Detect Faces in an Image

Source: https://www.zoho.com/deluge/help/ai-tasks/detect-face

This Deluge script demonstrates how to use the zoho.ai.detectFace task to detect all faces in a given image URL. It fetches the image using invokeUrl and processes it to return the bounding box coordinates for each detected face.

```Deluge
image_file  =  invokeurl
    [
         url : "https://c0.wallpaperflare.com/preview/52/764/33/twin-boys.jpg"
      ];

 response  =   zoho.ai.detectFace(image_file, false);
```

--------------------------------

### UnixEpoch Function - Get Seconds Since Epoch

Source: https://www.zoho.com/deluge/help/release-notes

The unixEpoch built-in function is now supported in Zoho Deluge. This function returns the number of seconds that have elapsed since 00:00:00 UTC on January 1, 1970.

```Deluge
epochSeconds = unixEpoch(zoho.currentdatetime);
info epochSeconds;
```

--------------------------------

### Zoho Deluge Success Response Example

Source: https://www.zoho.com/deluge/help/desk/update-related-record

This JSON object represents a successful response after updating a record in a Zoho Deluge submodule. It details the new values of the updated record, including custom fields, owner information, and time-related data.

```json
{
  "customFields": {
    "bugTimeLogID": null,
    "Date and Time Completed": null
  },
  "ownerId": "168XXXXXXXXXXXX005",
  "requestChargeType": "Customer Service",
  "executedTime": "2019-02-16T07:38:48.000Z",
  "hoursSpent": "4",
  "minutesSpent": "23",
  "secondsSpent": "21",
  "agentCostPerHour": "3.0",
  "additionalCost": "10.0",
  "totalCost": "23.17",
  "description": "Time Entry description",
  "requestId": null,
  "createdTime": "2019-02-26T04:19:24.000Z",
  "createdBy": "168XXXXXXXXXXXX005",
  "departmentId": "168XXXXXXXXXXXX907",
  "parent": {
    "associatedTicketId": "400XXXXXXXXXXX017",
    "id": "168XXXXXXXXXXXX043",
    "type": "TASKS"
  },
  "invoiceId": "400XXXXXXXXXXX212",
  "id": "168XXXXXXXXXXXX001",
  "taskId": "168XXXXXXXXXXXX043"
}
```

--------------------------------

### Conditional Concession Eligibility based on Age in Deluge

Source: https://www.zoho.com/deluge/help/data-access/accessing-form-fields

This Deluge example demonstrates setting a 'concession' field to 'yes' if the 'Age' field is not null, typically triggered by a client action like 'On User Input'.

```Deluge
if(input.Age!=null)
{
	input.concession = "yes"; // the passenger is now made eligible for a concession.
}
```

--------------------------------

### Deluge: Create Notecard with Text Content

Source: https://www.zoho.com/deluge/help/notebook/create-notecard

Creates a new notecard in Zoho Notebook with plain text content. Requires specifying the content, content type as 'text', and optional connection details.

```Deluge
 // Create a KEY-VALUE variable to hold version notes
 note = map();
 note.put("appName", "Zoho CRM");
 note.put("deviceName", "Shawn's Iphone");
 
 // Create a KEY-VALUE variable to hold the parameters specified in Zoho Notebooks API
 dataMap = map();
 dataMap.put("version_notes", note);
 
 // Execute the integration task to create a notecard in Zoho Notebook with TEXT content
 response = zoho.notebook.createNotecard("Note content", "text", dataMap, "notebook_connection");
```

--------------------------------

### Zoho Writer Sign Document Task Syntax

Source: https://www.zoho.com/deluge/help/writer/sign-documents

This snippet shows the basic syntax for the zoho.writer.signDocument task in Deluge. It details the expected parameters and their data types for sending a document for signing.

```Deluge
<response> = zoho.writer.signDocument(<document_id>, <service>, <recipients>, <signed_document_name>, <input_map>, <connection>);
```

--------------------------------

### Get Seconds from Date-Time Value in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/second

This snippet demonstrates how to retrieve the seconds component from a date-time value using the 'second()' or 'getSeconds()' functions in Deluge. It covers both method chaining and direct function calls.

```Deluge
currentDate = '01-Jan-2019';
info currentDate.getSeconds();
```

```Deluge
currentDate = '01-Jan-2019 23:15:10';
info currentDate.second();
```

```Deluge
<variable> = <dateTimeValue>.second();
```

```Deluge
<variable> = second(<dateTimeValue>);
```

```Deluge
<variable> = <dateTimeValue>.getSeconds();
```

```Deluge
<variable> = getSeconds(<dateTimeValue>);
```

--------------------------------

### Fetch Zoho Projects Portals - Deluge

Source: https://www.zoho.com/deluge/help/projects/get-portals

This Deluge script retrieves the details of all portals within your Zoho Projects account. It utilizes the `zoho.projects.getPortals` function, which can optionally accept a connection name. The function returns a key-value pair containing portal information.

```Deluge
response = zoho.projects.getPortals();
```

--------------------------------

### Zoho Projects Success Response Format

Source: https://www.zoho.com/deluge/help/projects/create

This snippet shows the JSON structure for a successful response when retrieving task information. It includes details like milestone ID, links, task details, and status.

```JSON
{
"tasks": [
{
"milestone_id": "548XXXXXXXXXXX092",
"link": {
"timesheet": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX771/tasks/548XXXXXXXXXXX011/logs/"
},
"self": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX771/tasks/548XXXXXXXXXXX011/"
}
},
"is_comment_added": false,
"duration": "0",
"last_updated_time_long": 1566296841000,
"is_forum_associated": false,
"details": {
"owners": [
{
"name": "Unassigned"
}
]
},
"id": 548XXXXXXXXXXX011,
"key": "OR1-T6",
"created_person": "Shawn",
"created_time_long": 1566296841183,
"created_time": "08-20-2019",
"is_reminder_set": false,
"is_recurrence_set": false,
"created_time_format": "08-20-2019 03:57:21 PM",
"subtasks": false,
"work": "0:00",
"isparent": false,
"duration_type": "days",
"work_type": "work_hrs_per_day",
"task_followers": {
"FOLUSERS": "",
"FOLLOWERSIZE": -1,
"FOLLOWERS": [
]
},
"completed": false,
"priority": "None",
"created_by": "58131170",
"percent_complete": "0",
"last_updated_time": "08-20-2019",
"name": "Document Review",
"id_string": "548XXXXXXXXXXX011",
"last_updated_time_format": "08-20-2019 03:57:21 PM",
"tasklist": {
"name": "General",
"id": "548XXXXXXXXXXX003"
},
"order_sequence": 2,
"status": {
"name": "Open",
"id": "548XXXXXXXXXXX001",
"type": "open",
"color_code": ""
}
}
]
}
```

--------------------------------

### Deluge: Get Keys from Collection

Source: https://www.zoho.com/deluge/help/functions/collection/keys

The 'keys' function in Deluge retrieves all keys from a collection of key-value pairs or elements. It returns these keys as a LIST. This is useful for iterating over or accessing specific data within a collection.

```Deluge
productVersion = collection("Creator" : 5, "CRM" : 2, "Mail" : 8);
info productVersion.keys(); // returns "Creator", "CRM", "Mail"
```

```Deluge
products = collection("Creator", "CRM", "Mail");
info products.keys(); // returns "Creator", "CRM", "Mail"
```

--------------------------------

### Subtract Days from Date in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/subday

This example demonstrates how to use the subDay() function to subtract one day from a given date. The function returns the new date in the default format.

```Deluge
currentDate = '01-Jan-2019';
newDate = currentDate.subDay(1); // returns '31-Dec-2018 00:00:00'
```

--------------------------------

### Fetch More Than 1000 Zoho Sheet Records (Deluge)

Source: https://www.zoho.com/deluge/help/sheet/get-records

This example shows how to retrieve more than 1000 records from a Zoho Sheet by making multiple calls. It fetches the first 1000 records in one call and the subsequent 500 records in a second call, using `records_start_index` and `count` parameters.

```deluge
queryData = Map();
queryData.put("records_start_index",1);
queryData.put("count",1000);
response1 = zoho.sheet.getRecords("eev4nXXXXXXXXXXXXXXXXXXXXXXXXXXXcff41", "Sheet1", queryData, "sheet_connection");
info response1;

queryData = Map();
queryData.put("records_start_index", 1001);
queryData.put("count", 500);
response2 = zoho.sheet.getRecords("eev4nXXXXXXXXXXXXXXXXXXXXXXXXXXXcff41", "Sheet1", queryData, "sheet_connection");
info response2;
```

--------------------------------

### Deluge intersect Function Example

Source: https://www.zoho.com/deluge/help/functions/collection/intersect

Demonstrates how to use the intersect function in Deluge to find common elements between two collections. It takes two collection variables as input and returns a new collection containing only the elements present in both.

```deluge
products1 = collection("Creator", "CRM", "Books");
products2 = collection("Creator", "CRM", "Mail");
info products1.intersect( products2 ); // returns "Creator", "CRM"
```

--------------------------------

### Get Zoho Calendar UID

Source: https://www.zoho.com/deluge/help/cliq/zoho-calendar-attributes

This snippet explains how to retrieve the unique identifier (UID) for a Zoho Calendar by navigating through the Zoho Calendar settings. It outlines the steps required to access and view the Calendar UID.

```Deluge
To get the UID of a calendar,
  1. Navigate to the **set up** icon on the top right corner.
  2. Click on **My Calendars** under Calendars.
  3. Click on the calendar's name whose UID needs to be fetched.
  4. Click on the Calendar UID button.
  5. You can find the Calendar UID here.
```

--------------------------------

### Declare Collection Variable in Deluge

Source: https://www.zoho.com/deluge/help/collection-variable

Demonstrates how to declare a collection variable in Deluge to fetch records from a form based on a criteria. The example shows fetching employees who joined today.

```Deluge
employeesJoinedToday = Employees [Joining_Date == zoho.currentdate];
```

--------------------------------

### Zoho Projects Success Response

Source: https://www.zoho.com/deluge/help/projects/create-project

This JSON structure represents a successful response from the Zoho Projects API, detailing various attributes of a project, including its ID, name, status, owner, and related resource links.

```json
{
"projects": [
{
"is_strict": "no",
"project_percent": "0",
"role": "admin",
"bug_count": {
"closed": 0,
"open": 0
},
"IS_BUG_ENABLED": true,
"owner_id": "58XXXX70",
"taskbug_prefix": "SA1",
"link": {
"activity": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX005/activities/"
},
"document": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX005/documents/"
},
"forum": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX005/forums/"
},
"timesheet": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX005/logs/"
},
"task": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX005/tasks/"
},
"folder": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX005/folders/"
},
"milestone": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX005/milestones/"
},
"bug": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX005/bugs/"
},
"self": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX005/"
},
"tasklist": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX005/tasklists/"
},
"event": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX005/events/"
},
"user": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX005/users/"
},
"status": {
"url": "https://projects.zoho.com/restapi/portal/zylker/projects/548XXXXXXXXXXX005/statuses/"
}
},
"custom_status_id": "548XXXXXXXXXXX089",
"milestone_count": {
"closed": 0,
"open": 0
},
"updated_date_long": 156XXXXXXX812,
"show_project_overview": false,
"task_count": {
"closed": 0,
"open": 0
},
"updated_date_format": "08-13-2019 04:32:05 PM",
"workspace_id": "o5cfkXXXXXXXXXXXXXXXXXXXXXXXXXXX99595",
"custom_status_name": "zp.projstatus.active",
"bug_defaultview": "6",
"billing_status": "Billable",
"id": 548XXXXXXXXXXX005,
"key": "TE-3",
"is_chat_enabled": true,
"custom_status_color": "#33927d",
"owner_name": "Shawn",
"created_date_long": 1565694125812,
"created_date_format": "08-13-2019 04:32:05 PM",
"profile_id": 548XXXXXXXXXXX320,
"enabled_tabs": [
"dashboard",
"projectfeed",
"tasks",
"bugs",
"milestones",
"calendar",
"documents",
"timesheet",
"invoices",
"users",
"reports"
],
"name": "Sales",
"is_public": "no",
"id_string": "548XXXXXXXXXXX005",
"created_date": "08-13-2019",
"updated_date": "08-13-2019",
"bug_prefix": "SA1-I",
"cascade_setting": {
"date": false,
"percentage": false,
"workHours": false,
"logHours": false,
"plan": true
},
"layout_details": {
"task": {
"name": "default",
"id": "548XXXXXXXXXXX005"
},
"project": {
"name": "zp.customfields.defaultlayout",
"id": "548XXXXXXXXXXX008"
}
},
"status": "active"
}
]
}
```

--------------------------------

### Deluge: Convert Lead with New Deal

Source: https://www.zoho.com/deluge/help/crm/convert-lead

This Deluge script converts a lead by its ID and creates a new deal with specified details. It uses a Map to store deal information like 'Deal_Name', 'Closing_Date', and 'Stage'. The response contains IDs of the newly created records.

```deluge
deal_values = Map();
deal_values.put("Deal_Name","Jake");
deal_values.put("Closing_Date","2018-12-06");
deal_values.put("Stage","Closed Won");
response = zoho.crm.convertLead(2303XXXXXXXXXXXXXXX,{"Deals":deal_values});
```

--------------------------------

### Fetch Records from Zoho Creator

Source: https://www.zoho.com/deluge/help/creator/get-records

This Deluge task retrieves records from a specified Zoho Creator report. It requires the owner's name, application link name, report link name, and optionally accepts criteria, a starting index, a record limit, and a connection link name.

```Deluge
response = zoho.creator.getRecords("Shawn","Task_Management", "All_Tasks", "", 1, 200, "creator_oauth_connection");
```

--------------------------------

### Get New Record ID in Deluge

Source: https://www.zoho.com/deluge/help/inventory/create-record

This Deluge script snippet demonstrates how to retrieve the ID of a newly created record from an API response. It uses a placeholder for the response variable and module name to provide a general solution.

```Deluge
<variable> = <response_variable>.get("<module_name>").get("<module_name>_id") ;  
// example for <module_name> is contact and example for <module_name>_id is contact_id
```

--------------------------------

### Create Zoho Sign Document with Single File

Source: https://www.zoho.com/deluge/help/script/sign/upload-document

Uploads a single file to Zoho Sign using the `zoho.sign.createDocument` task. It requires the file content, an empty data map (or a map with optional data), and a Zoho Sign OAuth connection name.

```Deluge
// Fetch file from cloud
pdf_file = invokeUrl
[
 url: "http://www.africau.edu/images/default/sample.pdf"
 type: GET
];

// Create an empty map to skip the <data_map> parameter
dataMap = Map();

// Perform create document task to upload the file to Zoho Sign
response =  zoho.sign.createDocument(pdf_file, dataMap, "sign_oauth_connection");
```

--------------------------------

### Fetch Documents from Zoho Writer

Source: https://www.zoho.com/deluge/help/writer/get-documents

The `zoho.writer.getDocuments` task retrieves documents from Zoho Writer. It requires parameters for filtering and sorting, and a Zoho OAuth connection for authentication. The response includes metadata about the fetched documents.

```Deluge
response = zoho.writer.getDocuments("all",0,2,"created_time","writer_oauth_connection");
```

--------------------------------

### Retrieve Employee ID from JSON

Source: https://www.zoho.com/deluge/help/functions/getjson-and-get

This example shows how to parse a JSON string to extract a specific value, the employee ID, using Deluge's JSON parsing capabilities. It demonstrates accessing nested JSON objects.

```Deluge
employeeDetail = "{\"response\" : {\"employee\": {\"id\" : \"EMP-001\", \"role\" : \"Developer\"}}}";

info employeeDetail.getJSON("response").getJSON("employee").getJSON("id");   // returns EMP-001
```

--------------------------------

### Zoho Sheet Tasks in Deluge

Source: https://www.zoho.com/deluge/help/sheet-tasks

This section outlines common operations that can be performed on Zoho Sheets using Deluge. These include fetching worksheets, creating, getting, and updating records, finding and replacing text, and inserting CSV data.

```Deluge
Get Sheets: Fetches worksheets from the specified file
Create Records: Inserts data into the specified worksheet
Get Records: Fetches data from the specified worksheet
Update Records: Updates rows with new values
Find: Finds the specified text
Replace: Finds the specified text and replaces all its occurrences with a new text
Insert CSV: Inserts comma-separated values into the specified worksheet
```

--------------------------------

### Post Status to Zoho Connect Group

Source: https://www.zoho.com/deluge/help/connect/add-post

This snippet shows how to post a simple status message to a Zoho Connect group. It requires the message content, group scope ID, and partition ID. The `contentMap` holds the message and an optional title.

```deluge
contentMap = {"message":"This is a test message", "title":"This is a test title"}
postDetails = zoho.connect.addPost("status", 105000017039001, 105000207776548, contentMap);
```

--------------------------------

### Deluge: Fetching Lead Statuses

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to fetch lead statuses from Zoho CRM, filtering them by status name.

```deluge
// Fetching lead statuses named 'Contacted'
leadStatusesList = zoho.crm.getRecords("Lead_Statuses", "all", "Lead_Status.ASC", "Lead_Status=Contacted");

// Displaying the fetched lead statuses
info leadStatusesList;
```

--------------------------------

### Deluge: Insert Key-Value Pair into Collection

Source: https://www.zoho.com/deluge/help/functions/collection/insert

This example shows how to insert a new key-value pair into a collection variable that stores key-value pairs in Deluge. The 'insert' function adds the new pair or updates the value if the key already exists.

```Deluge
productVersion = collection("Creator" : 5);
productVersion.insert("CRM" : 5); // inserts the new key value pair to the existing collection
```

--------------------------------

### Create Zoho Sign Document with Multiple Files

Source: https://www.zoho.com/deluge/help/script/sign/upload-document

Uploads multiple files as a single document to Zoho Sign using the `zoho.sign.createDocument` task. It involves fetching files, adding them to a list, and providing a map for request details along with the connection name.

```Deluge
// Fetch files from cloud
file1 = invokeurl
[
url :"http://www.africau.edu/images/default/sample.pdf"
type :GET
];
file2 = invokeurl
[
url :"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
type :GET
];

// Create a list to store the files that will be uploaded
filesList = list();
filesList.add(file1);
filesList.add(file2);

// Create a map to store request name
dataMap = Map();
dataMap.put("requests", {"request_name":"My request"});
requestMap =map();
requestMap.put("data", dataMap);

// Perform create document task to upload the files
response = zoho.sign.createDocument(filesList, requestMap, "sign_oauth_connection");
```

--------------------------------

### Deluge: Delete Collection Element by Index

Source: https://www.zoho.com/deluge/help/functions/collection/deletekey

Deletes an element from a Deluge collection based on its numerical index. Indexing starts from 0. A runtime error will occur if the index is out of bounds.

```Deluge
products = collection("Creator", "CRM", "Campaigns");
products.deleteKey(1); // deletes the element "CRM"
```

--------------------------------

### Filter Customer Portal Users from Email List

Source: https://www.zoho.com/deluge/help/misc-statements/get-specified-portal-user-profile

This Deluge example shows how to process a list of email addresses and identify which ones belong to customer portal users. It iterates through the list, uses `thisapp.portal.profileForUser()` to check each email, and stores the valid portal user emails in a new list.

```Deluge
//List of Email IDs to process
 email_list = {"shawn@zylker.com", "hailee@zylker.com", "harry@zylker.com", "kate@zylker.com"};

 //List to store portal users
 portal_users = List();

 // Iterate through the list of email addresses
 for each email in email_list
 {

 //Check if email address is a customer portal user
 result = thisapp.portal.profileForUser( email );
 if(result != "")
 {
 portal_users.add(email);
 }
 }
 info portal_users;
```

--------------------------------

### Fetch File and Get File Name in Deluge

Source: https://www.zoho.com/deluge/help/file/get-file-name

This Deluge code snippet demonstrates how to fetch a file from a URL using the `invokeUrl` task and then extract its name using the `getFileName` method. It's applicable across Zoho services for files obtained via `invokeUrl`.

```Deluge
// to fetch file from the cloud using invokeUrl task
fileVariable = invokeUrl
[
 url: "https://sample-videos.com/img/Sample-png-image-100kb.png"
 type: GET
];

// to fetch the name of the file
response = fileVariable.getFileName(); // returns Sample-png-image-100kb.png
```

--------------------------------

### Deluge: Conditional Selection of Field Choices

Source: https://www.zoho.com/deluge/help/client-functions/selectall-deselectall

This example demonstrates using Deluge to conditionally select all choices in a 'Games' multi-select field based on a 'Register_all' decision box. If 'Register_all' is checked, the 'Games' field will have all its options selected.

```Deluge
if(Register_all)
{
Games.selectall();
}
```

--------------------------------

### Zoho Writer v2 mergeAndStore Function

Source: https://www.zoho.com/deluge/help/writer/merge-and-store-v2

The `zoho.writer.v2.mergeAndStore` function merges and stores documents in Zoho WorkDrive. It requires a document ID, merge details, output settings, and optionally, additional settings and a connection.

```deluge
response = zoho.writer.v2.mergeAndStore(<document_id>, <merge_detail>, <output_settings>, <optional_settings>, <connection>)
```

--------------------------------

### Fetch Record by ID using zoho.sdp.getRecordById

Source: https://www.zoho.com/deluge/help/sdp/get-record-by-id

The `zoho.sdp.getRecordById` task retrieves a specific record from a module within SDP Cloud using its unique identifier. It requires the module name, record ID, application account name, and a connection name. The response contains the fetched record's details.

```Deluge
response = zoho.sdp.getRecordById("Request", 317XXXXXXXXXX655, "", "sdp_connection");
```

--------------------------------

### Zoho Deluge: Date and Time Operations

Source: https://www.zoho.com/deluge/help/script/sign/create-using-template

This section shows how to perform various date and time operations in Zoho Deluge. It includes creating dates, formatting them, and calculating differences between dates, essential for scheduling and time-based logic.

```deluge
// Get current date and time
now = now();
info now;

// Format date
formatted_date = zoho.currentdate.toString("yyyy-MM-dd");
info formatted_date;

// Create a date
my_date = date("2023-10-27");
info my_date;

// Add days to a date
new_date = my_date.addDay(5);
info new_date;

// Calculate difference between dates
days_diff = new_date.daysBetween(my_date);
info days_diff;
```

--------------------------------

### Attach Multiple Files from File Upload Fields in Deluge

Source: https://www.zoho.com/deluge/help/misc-statements/send-mail

This example shows how to attach multiple files from different file upload fields by separating them with commas in Zoho Deluge. This is useful for forms with multiple file inputs.

```Zoho Deluge
file: input.<file_upload_field1>, file: input.<file_upload_field2>
```

--------------------------------

### Deluge: Fetching Price Books

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to fetch price books from Zoho CRM, filtering them by currency and sorting by price book name.

```deluge
// Fetching price books in USD currency
priceBooksList = zoho.crm.getRecords("Price_Books", "all", "PriceBook_Name.ASC", "Currency=USD");

// Displaying the fetched price books
info priceBooksList;
```

--------------------------------

### Attach Multiple Record Templates in Deluge (Custom Function)

Source: https://www.zoho.com/deluge/help/misc-statements/send-mail

This example shows how to attach multiple record templates using custom functions in Zoho Deluge, specifying the template, form, record ID variable, and format for each, separated by commas. The <record_id_variable> can be a variable holding the record ID or a fetch records task.

```Zoho Deluge
template: <record_template1>: <form_link_name1> <record_id_variable1> as <attachment_format1>, template: <record_template2>: <form_link_name2> <record_id_variable2> as <attachment_format2>
```

--------------------------------

### Fetch Zoho Books Estimates by Contact Name and Amount (Deluge)

Source: https://www.zoho.com/deluge/help/books/fetch-records

This Deluge script fetches 'Estimate' records from Zoho Books where the 'contact_name' is 'Shawn Smith' and the 'total' amount exceeds 20000. It utilizes the zoho.books.getRecords function with specific parameters and a provided connection alias.

```deluge
encoded_name = encodeUrl("Shawn Smith");
response = zoho.books.getRecords("Estimates", "53XXXXXX", "contact_name="+ encoded_name+ "&total_greater_than=20000", "books_connection");
info response;
```

--------------------------------

### Focus Field Based on Condition in Deluge

Source: https://www.zoho.com/deluge/help/client-functions/focus

This Deluge code snippet demonstrates how to use the 'focus' task to direct the cursor to a specific field ('invoice') if a condition is met, or to the 'next_field' otherwise. This is useful for guiding user input after scanning data.

```deluge
if(<condition>) 
 {
    focus invoice; 
  }
else 
 {
    focus next_field; 
  }
```

--------------------------------

### Deluge lastIndexOf() Example

Source: https://www.zoho.com/deluge/help/functions/string/lastindexof

Demonstrates how to use the `lastIndexOf()` function in Deluge to find the index of the last occurrence of a character within a string. The function is case-sensitive and returns -1 if the character is not found.

```Deluge
text="Hello world, welcome to the universe";
lastIndex = text.lastIndexOf("e"); //returns 35
```

--------------------------------

### Associate Record in SDP Cloud using Deluge

Source: https://www.zoho.com/deluge/help/sdp/associate

The `zoho.sdp.associate` task in Deluge is used to create a new record in a specified submodule (Notes or Worklogs) and associate it with a parent record in the SDP Cloud Request module. It requires the submodule name, parent record ID, data map for the new record, application account name, and a connection name.

```Deluge
note_value = Map();
note_value.put("description", "A new request has been initiated");
response = zoho.sdp.associate("Notes", 317XXXXXXXXXX348, note_value, "", "sdp_connection");
```

--------------------------------

### Get Merge Fields from Zoho Writer Document

Source: https://www.zoho.com/deluge/help/writer/get-merge-fields

This Deluge script demonstrates how to use the `zoho.writer.getMergeFields` task to fetch all merge fields from a specified Zoho Writer document. It requires the document ID and a valid OAuth connection name.

```deluge
response = zoho.writer.getMergeFields("al296XXXXXXXXXXXXXXXXXXXXXXXXXXXa516c", "writer_oauth_connection");

// The 'response' variable will contain the list of merge fields.
```

--------------------------------

### Deluge atan2() Function Example

Source: https://www.zoho.com/deluge/help/functions/number/atan2

Demonstrates the usage of the atan2() function in Deluge to calculate the angle of a point. The function takes y-axis and x-axis values as input and returns the angle in radians.

```deluge
number = 1;
atan2Value = number.atan2(2); // returns 0.4636476090008061
```

--------------------------------

### Create Customer in Zoho Billing

Source: https://www.zoho.com/deluge/help/billing/create-record

This Deluge snippet shows how to create a new customer record in Zoho Billing. It involves creating a map with the customer's display name and email, and then using the `zoho.billing.create` function.

```Deluge
values=map();
values.put("display_name","john");
values.put("email","john@zylker.com");

response = zoho.billing.create("Customers", "66XXXXX66​", values, "billing_connection");
```

--------------------------------

### Zoho Deluge Failure Response - No Application Found

Source: https://www.zoho.com/deluge/help/creator/get-record-by-id

This JSON format indicates a failure due to an incorrect or non-existent application name. It returns an error code and a descriptive message.

```json
{
"code": 2892,
"message": "No application named <application_name> found. Please check and try again."
}
```

--------------------------------

### Activate User in Zoho One

Source: https://www.zoho.com/deluge/help/one/activate-user

This script activates a user in Zoho One. It requires the organization ID, user ID, and the Zoho One connection name. The response variable will hold the details of the activated user.

```deluge
response = zoho.one.activateUser(72XXXXXXX, 1510XXXXXXXX, "zoho_one_connection");
```

--------------------------------

### Download Image from Zoho Creator and Detect Faces

Source: https://www.zoho.com/deluge/help/ai-tasks/detect-face

This Deluge script demonstrates how to download an image from a Zoho Creator field using the invokeurl API and then apply the zoho.ai.detectFace task. It requires specifying account owner, application link name, report link name, record ID, and field link name. A Zoho OAuth connection with appropriate scopes is necessary.

```deluge
image_file  =  invokeurl
    [ 
    url: "https://creator.zoho.com/api/v2/<account_owner_name>/<app_link_name>/report/<report_link_name>/<record_ID>/<field_link_name>/download"
    type : GET
    connection: "creator_oauth_connection"
    ];

attribute_list  =  List();
attribute_list.add("gender");
attribute_list.add("emotion");
attribute_list.add("pose");

response  =  zoho.ai.detectFace(image_file,  false,  attribute_list);
```

--------------------------------

### Create and Associate Time Log in Zoho Projects

Source: https://www.zoho.com/deluge/help/projects/associate-logs

The zoho.projects.associateLogs task creates a time log and associates it with a specified record (task or bug) in Zoho Projects. It requires portal name, project ID, module name, record ID, and a map of values for the log. A connection parameter can also be optionally provided.

```Deluge
response = zoho.projects.associateLogs(<portal>, <project_id>, <module>, <record_id>, <values>, [<connection>]);
```

```Deluge
logs_value = Map();
logs_value.put("date", "08-12-2019");
logs_value.put("bill_status", "Billable");
logs_value.put("hours", "01:11");
response = zoho.projects.associateLogs("zylker", 548XXXXXXXXXXX771, "tasks", 548XXXXXXXXXXX885, logs_value);
```

--------------------------------

### Create Team Folder in Zoho WorkDrive (Deluge)

Source: https://www.zoho.com/deluge/help/workdrive/create-team-folder

The `zoho.workdrive.createTeamFolder` task is used to create a new team folder within Zoho WorkDrive. It requires the folder name, parent team ID, a description, a boolean indicating if the folder is public within the team, and the OAuth connection name.

```Deluge
response = zoho.workdrive.createTeamFolder("Marketing", "af0u7XXXXXXXXXXXXXXXXXXXXXXXXXXXee228", "This is a team folder", false, "workdrive_oauth_connection");
```

--------------------------------

### Zoho Deluge: Image Field Formatting

Source: https://www.zoho.com/deluge/help/collection-variable

Explains the format for Image field values, including optional parameters for title, linkname, and target. The image URL must be provided even if the 'Browse Options -Link' field property is not selected.

```Deluge
Image| Text| Value must be specified in the following format (title, linkname and target are optional params) :<a href= "http://<LINKNAME>" title ="<TITLE>" target = "_blank"><img src = "<URL>" title ="<TITLE>"></img></a>You must specify the image url as the value, even if the "Browse Options -Link" field property is not selected.
```

--------------------------------

### Navigate to Connections Page in Deluge Editor

Source: https://www.zoho.com/deluge/help/deluge-editor

This snippet explains how to access the Connections page within the Deluge Editor. It details two methods: clicking 'Connections' on the top right or typing '<connection>' in the editor and selecting 'Manage'.

```Deluge
Click "Connections" on the top right corner to navigate to the Connections page.
You can also type <connection> in the Deluge editor and click on it to get the list of available connections in the service. Clicking on **Manage** will open the Connections page.
```

--------------------------------

### Get Hour from Date-Time (Deluge)

Source: https://www.zoho.com/deluge/help/functions/datetime/gethour

Extracts the hour component from a date-time value using either the getHour() method or the hour() method. The date-time value can be provided with or without a time component.

```deluge
currentDate = '01-Jan-2019';
info currentDate.getHour(); // Returns 0
```

```deluge
currentDate = '01-Jan-2019 23:15:10';
info currentDate.hour(); // Returns 23
```

--------------------------------

### Deluge Invoke URL Task - Allowed Ports (US/CN)

Source: https://www.zoho.com/deluge/help/web-data/invokeurl-task/limitations

Specifies the network ports that are allowed for the Invoke URL task when executed from services outside of Zoho Creator, specifically for US and China (CN) setups. These ports are necessary for external service communication.

```Deluge
8011
9001
8082
3003
2719
8088
8243
8800
8001
8081
4433
3000
8080
8085
54895
82
30618
8000
8443
9090
8090
```

--------------------------------

### Fetch Records from Zoho Sheet

Source: https://www.zoho.com/deluge/help/sheet/get-records

This Deluge script demonstrates how to fetch records from a specified worksheet in a Zoho Sheet file using the `zoho.sheet.getRecords` task. It includes setting up a query map and specifying the connection.

```deluge
queryData = Map();
response = zoho.sheet.getRecords("eev4nXXXXXXXXXXXXXXXXXXXXXXXXXXXcff41","Sheet1", queryData, "sheet_connection");
```

--------------------------------

### Deluge: Send JSON Text to Merge Fields

Source: https://www.zoho.com/deluge/help/writer/merge-and-send

This example demonstrates how to supply JSON data stored as a text string to merge fields in documents and email the results. A map is created to hold the subject and the JSON text, which is then passed to the `zoho.writer.mergeAndSend` function.

```deluge
// Assign the JSON data in TEXT format to the variable - json_text
json_text = "{\"data\":[{\"Name\":\"Shawn\",\"Age\":\"20\"},{\"Name\":\"Kate\",\"Age\":\"29\"}]}";


// Construct a KEY-VALUE variable to hold the merge data and subject of the email
merge_values = Map();
merge_values.put("subject", "Merge and send Deluge task");
merge_values.put("merge_data", json_text);


// Perform the Merge and Send task 
response = zoho.writer.mergeAndSend("al296XXXXXXXXXXXXXXXXXXXXXXXXXXXa516c", "inline", "shawn@zylker.com", merge_values, "writer_oauth_connection");
```

--------------------------------

### Create Empty Collection - Deluge

Source: https://www.zoho.com/deluge/help/datatypes/collection

This snippet demonstrates the Deluge syntax for creating an empty collection variable.

```Deluge
<collection_variable> = Collection();
```

--------------------------------

### Get File Type using getFileType() in Deluge

Source: https://www.zoho.com/deluge/help/file/get-file-type

This Deluge code snippet demonstrates how to fetch a file from a URL using the invokeUrl task and then determine its file type using the getFileType() method. The response will be the MIME type of the file.

```Deluge
// to fetch file from the cloud using invokeUrl task
 fileVariable = invokeUrl
 [
  url: "https://sample-videos.com/img/Sample-png-image-100kb.png"
  type: GET
 ];
 // to fetch the file type
 response = fileVariable.getFileType(); // returns image/png
```

--------------------------------

### Deluge Boolean and Text Concatenation

Source: https://www.zoho.com/deluge/help/operators/creator-fields-and-their-applicable-operators

Illustrates the concatenation of a Boolean (Decision Box) field with a text field using the '+' operator in Deluge. The example shows how 'true' or 'false' is appended to the text.

```Deluge
info decision_box + single_line; // Returns truetext
```

--------------------------------

### Deluge New Statements and AI Tasks

Source: https://www.zoho.com/deluge/help/release-notes

New statements like try-catch, break, and continue have been added to Deluge, enhancing control flow. Additionally, AI tasks for object detection and keyword extraction are now supported.

```Deluge
try {
  // code block
} catch (error) {
  // error handling
}
```

```Deluge
break;
```

```Deluge
continue;
```

```Deluge
detectObject(image_data)
```

```Deluge
extractKeywords(text_data)
```

--------------------------------

### Zoho FSM Integration Tasks

Source: https://www.zoho.com/deluge/help/fsm-tasks

This snippet outlines common Zoho FSM integration tasks for managing records and transitions. These operations are crucial for interacting with Zoho's business applications.

```Deluge
Create Record: Creates a record in the specified module
Get Records: Fetches records from the specified module
Get Record By ID: Fetches the details of the specified record
Get Related Records: Fetches records from the submodule related to the specified record
Search Records: Fetches records based on criteria
Update Record: Updates the specified record with new values
Get Transitions: Fetch all the possible transitions (statuses) the record in the specified module can take from its current status.
Update Transitions: Update the status of the record in the specified transactional module.
```

--------------------------------

### Fetch All Records from Zoho Inventory Module (Deluge)

Source: https://www.zoho.com/deluge/help/inventory/get-records

This Deluge script demonstrates how to fetch all records from a specified module in Zoho Inventory. It requires the module name and the organization ID.

```Deluge
response = zoho.inventory.getRecords("invoices", "58XXXX49");
```

--------------------------------

### Create Multiple Records in Zoho Creator

Source: https://www.zoho.com/deluge/help/creator/create-record

This Deluge script shows how to create multiple records simultaneously in a Zoho Creator form. It involves creating individual record maps, adding them to a list, and then passing the list to the `zoho.creator.createRecord` function.

```deluge
// Create a KEY-VALUE variable to hold the input values of first record
record1 = Map();
record1.put("Task_Name", "Priority Task");
record1.put("Task_Description", "I need help configuring my new toaster");
// Create a KEY-VALUE variable to hold the input values of second record
record2 = Map();
record2.put("Task_Name", "Support Ticket 1");
record2.put("Task_Description", "Toaster Configurations");
// Create a LIST variable to hold the details of the records that need to be created
records_list = List();
records_list.add(record1);
records_list.add(record2);
// Create an empty KEY-VALUE variable to skip the other_params parameter
otherParams = Map();
//Write create records integration task to add the input data into the specified form
response = zoho.creator.createRecord("Shawn", "Task_Management", "Tasks", records_list, otherParams, "creator_oauth_connection");
```

--------------------------------

### Deluge hoursBetween Example 1: Calculate Hours Between Dates

Source: https://www.zoho.com/deluge/help/functions/datetime/hoursbetween

Calculates the total number of hours between two specific date-time values, '18-Dec-2019 09:00:00' and '19-Dec-2019 10:00:00'. The result is 25 hours.

```Deluge
start_time = '18-Dec-2019 09:00:00';
end_time = '19-Dec-2019 10:00:00';
total_hours = hoursBetween(start_time, end_time);
// The value of total_hours is 25
```

--------------------------------

### Zoho Deluge Failure Response Example (Invalid Org ID)

Source: https://www.zoho.com/deluge/help/invoice/update-record

This snippet illustrates a failure response from the Zoho Deluge API, specifically when an incorrect organization ID is provided. It includes an error code and a descriptive message indicating the association issue.

```json
{
"code":6041,
"message":"This user is not associated with the CompanyID/CompanyName:537XX."
}
```

--------------------------------

### Deluge startsWith() String Check

Source: https://www.zoho.com/deluge/help/functions/string/startswith

The startsWith() function in Deluge checks if a given string begins with a specified search string. It is case-sensitive and returns a boolean value.

```Deluge
Product="Zoho Creator";
var = startsWith(Product, "Zoho"); //returns true

Product="Zoho Creator";
var = startsWith(Product, "zoho"); //returns false
```

--------------------------------

### Fetch Workspaces from Zoho Bookings

Source: https://www.zoho.com/deluge/help/bookings/get-workspaces

This Deluge script retrieves all workspaces from a Zoho Bookings account. It requires a valid OAuth connection to the Zoho Bookings API.

```deluge
response = zoho.bookings.getWorkspaces("bookings_oauth_connection");
```

--------------------------------

### Deluge Time Functions: Get Time Components

Source: https://www.zoho.com/deluge/help/functions/time

These Deluge functions extract specific components of a datetime value, such as the hour, minute, or second. They are useful for parsing and utilizing parts of a date or time.

```deluge
getHour(datetime)
getMinutes(datetime)
getSeconds(datetime)
```

--------------------------------

### Zoho Directory Integration Tasks - User Management

Source: https://www.zoho.com/deluge/help/directory-tasks

This snippet covers common user management operations within Zoho Directory using Deluge. It includes adding, updating, fetching, activating, and deactivating users, as well as managing user group memberships.

```Deluge
// Add User: Adds a specified user to an organization
// Example: addUser("John Doe", "john.doe@example.com", "Sales");

// Update User: Updates the details of a user with new values
// Example: updateUser("user_id", {"email": "new.email@example.com"});

// Get User: Fetches a user using its ID
// Example: getUser("user_id");

// Get Users: Fetches all the users
// Example: getUsers();

// Activate User: Activates a user using its ID
// Example: activateUser("user_id");

// Deactivate User: Deactivates a user using its ID
// Example: deactivateUser("user_id");

// Add User to a Group: Adds a user to a specified group
// Example: addUserToGroup("user_id", "group_id");

// Get Groups for User: Fetches groups of a user using its ID
// Example: getGroupsForUser("user_id");

// Remove User from a Group: Removes a user from the specified group
// Example: removeUserFromGroup("user_id", "group_id");
```

--------------------------------

### Deluge: Get Key of a Value in Collection

Source: https://www.zoho.com/deluge/help/functions/collection/getkey

This Deluge code snippet demonstrates how to use the `getKey` function to retrieve the key associated with a specific value in a collection. It shows the declaration of a collection with key-value pairs and then uses `getKey` to find the key for a given value.

```Deluge
productVersion = collection("Creator" : 5, "CRM" : 2, "Mail" : 8);
 product =  productVersion.getKey( 5 );
 info product; // Returns "Creator"
```

--------------------------------

### Fetch Post Content using Deluge

Source: https://www.zoho.com/deluge/help/connect/get-post

This Deluge code snippet demonstrates how to fetch the content of a specific post using the `zoho.connect.getPost` function. It requires the `scopeID` and `streamID` of the post, and optionally accepts a `connectionName`.

```deluge
postDetails = zoho.connect.getPost(105000017039001, 105000209401145);
```

--------------------------------

### Fetch Groups with Email Addresses from Zoho One Organization

Source: https://www.zoho.com/deluge/help/one/get-groups

This script fetches groups along with their email addresses from a Zoho One organization. It demonstrates how to use the 'include' parameter to specify 'emails' for retrieval. The parameters include organization ID, index, count, query parameters with includes, and the connection link name.

```Deluge
queryParams = Map();
filters = Map();
include = [];
include.add("emails");
queryParams.put("include", include);
response = zoho.one.getGroups(72XXXXXXX,  "1", "200", queryParams, "zoho_one_connection")
```

--------------------------------

### Zoho Projects API Failure Response - Invalid Domain

Source: https://www.zoho.com/deluge/help/projects/create-project

This JSON structure indicates a failure response from the Zoho Projects API due to an invalid portal name. It includes an error code and a descriptive message.

```json
{
"error": {
"code": 6504,
"message": "Domain Not Available"
}
}
```

--------------------------------

### Get Zoho Cliq Chat ID using Deluge

Source: https://www.zoho.com/deluge/help/cliq/zoho-cliq-integration-attributes

This script retrieves the unique Chat ID of a recipient in Zoho Cliq. It requires executing a command after saving the provided Deluge script.

```Deluge
<variable> = chat.get("id");
```

--------------------------------

### Prepare Data for Record Update

Source: https://www.zoho.com/deluge/help/creator/update-record-v1

This Deluge code snippet demonstrates how to create a data map, which is a key-value pair structure used to specify the fields and their updated values for the `updateRecord` task in Zoho Creator.

```Deluge
dataMap = {"Task_Description":"Toaster Configuration"};
```

--------------------------------

### Fetch Zoho Desk Record by ID using Deluge

Source: https://www.zoho.com/deluge/help/desk/fetch-record-by-id

This Deluge script demonstrates how to fetch a specific record from a Zoho Desk module using its unique identifier. It requires the organization ID, module name, record ID, and an optional connection name.

```Deluge
response = zoho.desk.getRecordById(641XXXXXX, "tickets", 168XXXXXXXXXXXX001, "desk_connection");
```

--------------------------------

### Fetch Groups using Deluge

Source: https://www.zoho.com/deluge/help/connect/fetch-my-groups

This Deluge code snippet demonstrates how to fetch all groups under a specified network using the 'zoho.connect.myGroups' function. It requires a Scope ID and optionally accepts a connection name.

```Deluge
groupDetails = zoho.connect.myGroups(105000017039001);
```

--------------------------------

### Create Notecard in Zoho Notebook

Source: https://www.zoho.com/deluge/help/notebook-tasks

This snippet demonstrates how to create a notecard within Zoho Notebook using Deluge. It specifies the content for the new notecard.

```Deluge
create notecard with "Your notecard content here"
```

--------------------------------

### Deluge: Create Notecard with HTML Content

Source: https://www.zoho.com/deluge/help/notebook/create-notecard

Creates a new notecard in Zoho Notebook using HTML formatted content. The content type must be set to 'html', and the HTML tags will be rendered within the notecard.

```Deluge
 // Create a TEXT variable to hold the input HTML content
 htmlcontent = "<h1>New Notecard</h1><p>This notecard is created using Deluge task.</p>";
 
 // Create a KEY-VALUE variable to hold version notes
 note = map(); 
 note.put("appName", "Zoho CRM"); 
 note.put("deviceName", "Shawn's Iphone"); 
 
 // Create a KEY-VALUE variable to hold the parameters specified in Zoho Notebooks API
 dataMap = map(); 
 dataMap.put("version_notes", note); 
 
 // Execute the integration task to create a notecard in Zoho Notebook with HTML content
 response = zoho.notebook.createNotecard(htmlcontent, "html",  dataMap, "notebook_connection");
```

--------------------------------

### Zoho Deluge invokeUrl Task Syntax

Source: https://www.zoho.com/deluge/help/deluge-invoke-url

The basic syntax for the invokeUrl task in Zoho Deluge allows for making HTTP requests. It supports various parameters to configure the request, including URL, method type, headers, body, and response handling.

```deluge
response = invokeUrl 
[
 url: <url_value>
 type: [<type_value>]
 headers: [<headers_value>]
 body: [<body_value>]
 parameters: [<parameters_value>]
 files: [<files_value>]
 connection: [<connection_name>]
 detailed: [<detailed_value>]
 response-format: [<response_format_value>]
 response-decoding: [<encoding_format_value>]
];
```

--------------------------------

### Deluge hoursBetween Example 2: Hours Calculation Ignoring Minutes/Seconds

Source: https://www.zoho.com/deluge/help/functions/datetime/hoursbetween

Calculates the number of hours between '18-Dec-2019 07:00:00' and '18-Dec-2019 08:59:59'. The function returns 1 hour, as it does not account for the difference in minutes and seconds.

```Deluge
start_time = '18-Dec-2019 07:00:00';
end_time = '18-Dec-2019 08:59:59';
total_hours = hoursBetween(start_time, end_time);
// The value of total_hours is 1
```

--------------------------------

### Fetch Records from Zoho Recruit

Source: https://www.zoho.com/deluge/help/recruit/fetch-records

The `zoho.recruit.getRecords` task retrieves records from a specified module in Zoho Recruit. It allows for filtering by index, selecting specific columns, and sorting the results. A Zoho Recruit connection is required.

```Deluge
<variable> = zoho.recruit.getRecords(<module_name>, <fromIndex>, <toIndex>, <(selectColumns)>, <sortColumnString>, <sortOrderString>, <connection>);
```

--------------------------------

### Upload File to Zoho WorkDrive using Deluge

Source: https://www.zoho.com/deluge/help/docs/upload-files

This Deluge script demonstrates how to upload a file to a specified folder in Zoho WorkDrive. It utilizes the `zoho.workdrive.uploadFile` task, requiring the file content, destination folder ID, desired file name, a boolean to handle existing files, and the WorkDrive connection name.

```Deluge
myurl = encodeUrl("book1.pdf");
sample_file = invokeUrl
            [
               url: "http://www.africau.edu/images/default/sample.pdf" 
               type: GET
            ];
response = zoho.workdrive.uploadFile(sample_file, "g4xh1XXXXXXXXXXXXXXXXXXXXXXXXXXXb0d05", myurl , false, "workdrive_connection");
```

--------------------------------

### Create Appointment in Zoho Bookings using Deluge

Source: https://www.zoho.com/deluge/help/bookings/create-appointment

This Deluge code snippet demonstrates how to book an appointment in Zoho Bookings. It utilizes the `zoho.bookings.createAppointment` function, specifying all required parameters such as service ID, date-time, customer information, staff or resource ID, time zone, and connection details.

```Deluge
response = zoho.bookings.createAppointment(<service_id>, <appointment_date_time>, <customer_details>, <staff_id/resource_id>, <time_zone>, <is_staff>, <connection>);
```

--------------------------------

### Create Record in Zoho People

Source: https://www.zoho.com/deluge/help/people/create-record

This Deluge script demonstrates how to create a new record in a specified Zoho People form. It involves defining a map with field values and then calling the `zoho.people.create` function.

```Deluge
values_map = Map();
values_map.put("EmployeeID", "12311");
values_map.put("FirstName", "Richard");
values_map.put("LastName", "Patrick");
values_map.put("EmailID", "richard@zylker.com");

response = zoho.people.create("P_Employee", values_map);
```

--------------------------------

### Deluge: Create Notecard with Image Content

Source: https://www.zoho.com/deluge/help/notebook/create-notecard

Creates a new notecard in Zoho Notebook with an image file. The content type should be 'resource', and the image file is typically fetched using the `invokeurl` task.

```Deluge
 // Perform invoke URL task to fetch the image file with which the notecard needs to be created
 imageFile = invokeurl
 [
url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz4pZuwLofV4goZVT0e2R3K5bElhWk3oMDuUgP3XT9p9d4_Tkv4g"
type: GET
];

 // Create a KEY-VALUE variable to hold version notes
 note = map(); 
 note.put("appName", "Zoho CRM"); 
 note.put("deviceName", "Shawn's Iphone"); 
 
 // Create a KEY-VALUE variable to hold the parameters specified in Zoho Notebooks API
 dataMap = map(); 
 dataMap.put("version_notes", note); 
 
 // Execute the integration task to create a notecard in Zoho Notebook with an image
 response = zoho.notebook.createNotecard(imageFile, "resource", dataMap, "notebook_connection");
```

--------------------------------

### Get Record ID from Zoho Deluge Response

Source: https://www.zoho.com/deluge/help/invoice/create-record

This script demonstrates how to extract the ID of a newly created record from a response object in Zoho Deluge. It accesses the module name and its corresponding ID field.

```deluge
variable = response_variable.get("<module_name>").get("<module_name>_id"> ;  
// example for <module_name> is contact and example for <module_name>_id is contact_id
```

--------------------------------

### Fetch Record by ID from Zoho Recruit

Source: https://www.zoho.com/deluge/help/recruit/fetch-record-by-id

This Deluge script demonstrates how to fetch a record from the 'Candidates' module in Zoho Recruit using its ID and a specified connection. The `zoho.recruit.getRecordbyId` function is used for this purpose.

```Deluge
response= zoho.recruit.getRecordById("Candidates" ,1687000000106001, "recruit_connection");
```

--------------------------------

### Get Map Size in Deluge

Source: https://www.zoho.com/deluge/help/functions/map/size

The size() function in Zoho Deluge is used to determine the number of key-value pairs within a map variable. It takes a map as input and returns a number representing its size.

```deluge
mapVar = {"Product" : "Zoho Creator", "Version" : 5};
size = mapVar.size(); // returns 2
```

--------------------------------

### Deluge: Creating a New Record

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script shows how to create a new record in a Zoho CRM module. It constructs a map with the field values and uses the 'createRecord' function.

```deluge
// Creating a new Contact record
contactMap = Map();
contactMap.put("Last_Name", "Doe");
contactMap.put("Email", "john.doe@example.com");
contactMap.put("Company", "Example Corp");

createResponse = zoho.crm.createRecord("Contacts", contactMap);
info createResponse;
```

--------------------------------

### Detect Emotion from Image in Zoho Creator

Source: https://www.zoho.com/deluge/help/ai-tasks/detect-face

This script downloads an image from a Zoho Creator record, detects the emotion of the prominent face using `zoho.ai.detectFace`, and populates a specified field with the predicted emotion. It requires the `invokeurl` task and a valid OAuth connection.

```deluge
// url - Contains the download file API I URL to download the uploaded image 
// account_owner_name - Replace with the  user name of the Creator account. 
// app_link_name - Replace with the link name of the target application. 
// report_link_name - Replace with the link name of the target report. 
// record_ID - Replace with the ID of the record from which you want to download the file. 
// field_link_name - Replace with the link name of the target file upload or image field. 

 image_file  =  invokeurl 
     [ 
       url: "https://creator.zoho.com/api/v2/<account_owner_name>/<app_link_name>/report/<report_link_name>/<record_ID>/<field_link_name>/download" 
       type : GET 
       connection: "zoho_oauth_connection" 
      ]; 
       
// Create a variable to store the data of prominent face 
detect_emotion  =  zoho.ai.detectFace(image_file,true,{"emotion"}).getJson("data").getJson("emotion").getJson("prediction"); 

// Specify a form field where the emotion needs to be populated. 
// Replace "predicted_emotion" with your single line field_link_name . 
 input.predicted_emotion  =  detect_emotion; 

```

--------------------------------

### Deluge: Get Value from JSON/Map using getJson

Source: https://www.zoho.com/deluge/help/functions/getjson-and-get

The `getJson` function in Deluge retrieves a value from a JSON formatted text or a key-value collection using a specified key. It is designed to work with text data.

```Deluge
<variable>  =  <json_or_map_text>.getJson(<key>);
```

--------------------------------

### Deluge: Get Hour from DateTime

Source: https://www.zoho.com/deluge/help/functions/datetime/hour

Extracts the hour from a date-time value using either the `.hour()` method or the `hour()` function. The date-time value can be provided with or without a time component. The returned hour is a NUMBER.

```deluge
currentDate = '01-Jan-2019';
info currentDate.getHour(); // Returns 00
```

```deluge
currentDate = '01-Jan-2019 23:15:10';
info currentDate.hour(); // Returns 23
```

```deluge
currentDate = '01-Jan-2019';
info hour(currentDate); // Returns 00
```

```deluge
currentDate = '01-Jan-2019 23:15:10';
info hour(currentDate); // Returns 23
```

```deluge
currentDate = '01-Jan-2019';
info getHour(currentDate); // Returns 00
```

```deluge
currentDate = '01-Jan-2019 23:15:10';
info getHour(currentDate); // Returns 23
```

--------------------------------

### Configure API Key Authentication in Zoho Deluge

Source: https://www.zoho.com/deluge/help/deluge-connections

This snippet details the configuration for API Key authentication when setting up a custom service. It involves specifying parameter types (Query string, Form Data, Header) and providing the actual parameter name and a display name for authentication.

```Deluge
Param Type: Query string, Form Data, and Header
Actual Parameter: Name of the key (as specified in the API documentation of the desired service) against which the parameter needs to be sent
Parameter Display Name: Display name for the parameter.
```

--------------------------------

### Configure API Key Authentication in Zoho Deluge

Source: https://www.zoho.com/deluge/help/connections

This snippet details the configuration for API Key authentication when setting up a custom service. It involves specifying parameter types (Query string, Form Data, Header) and providing the actual parameter name and a display name for authentication.

```Deluge
Param Type: Query string, Form Data, and Header
Actual Parameter: Name of the key (as specified in the API documentation of the desired service) against which the parameter needs to be sent
Parameter Display Name: Display name for the parameter.
```

--------------------------------

### Get Day from Date-Time in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/getday

The getDay() function in Deluge extracts the day of the month from a provided date-time value. It can be called as a method of the date-time object or as a standalone function. The function returns the day as a number.

```Deluge
currentDate = '08-Jan-2019';
date = currentDate.getDay(); // returns 8
```

```Deluge
currentDate = '08-Jan-2019';
date = getDay(currentDate); // returns 8
```

```Deluge
currentDate = '08-Jan-2019';
date = currentDate.day(); // returns 8
```

```Deluge
currentDate = '08-Jan-2019';
date = day(currentDate); // returns 8
```

--------------------------------

### Deluge: New convertToPDF Task for PDF Generation

Source: https://www.zoho.com/deluge/help/release-notes

Introduces a new Deluge task, convertToPDF, for generating PDF files from HTML code or public URLs within Zoho applications. This task simplifies the creation of PDF documents directly from Deluge scripts.

```Deluge
convertToPDF("<html><body><h1>Hello World</h1></body></html>");
convertToPDF("http://example.com/page.html");
```

--------------------------------

### Manage Portal User Tasks in Deluge

Source: https://www.zoho.com/deluge/help/portal-user-tasks

This section details various tasks that can be performed to manage portal users using the Deluge programming language. These include assigning profiles, deleting users, and fetching user details.

```Deluge
assign_profile_to_portal_user(user_id, profile_name);
delete_portal_user(user_id);
determine_profile_of_logged_in_portal_user();
fetch_email_address_of_logged_in_customer_portal_user();
fetch_profile_name_of_logged_in_portal_user();
fetch_profile_name_of_portal_user(user_id);
get_username_of_logged_in_portal_user();
```

--------------------------------

### Deluge values() - Get values from collection

Source: https://www.zoho.com/deluge/help/functions/collection/values

The values() function in Deluge retrieves all values from a collection. This can be used on collections that store key-value pairs or simple lists of elements. The function returns these values as a LIST.

```deluge
productVersion = collection("Creator" : 5, "CRM" : 2, "Mail" : 8);
info  productVersion.values( ); // Returns 5, 2, 8
```

```deluge
products = collection("Creator", "CRM", "Mail");
info  products.values( ); // Returns "Creator", "CRM", "Mail"
```

--------------------------------

### Deluge: Creating a Vendor

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script shows how to create a new vendor record in Zoho CRM, including setting the vendor name and email.

```deluge
// Creating a new Vendor
vendorMap = Map();
vendorMap.put("Vendor_Name", "Tech Solutions Inc.");
vendorMap.put("Email", "info@techsolutions.com");
vendorMap.put("Phone", "123-456-7890");

createVendorResponse = zoho.crm.createRecord("Vendors", vendorMap);
info createVendorResponse;
```

--------------------------------

### Zoho SalesIQ Plugs with Deluge

Source: https://www.zoho.com/deluge/help/index

Plugs in Zoho SalesIQ are reusable custom function snippets created using Deluge. They offer flexibility by providing access to various functionalities like OTP verification, third-party integrations, and custom logic implementation, enhancing the capabilities of SalesIQ's codeless bot.

```Deluge
/* Example of a Deluge plug for OTP verification in Zoho SalesIQ */
function sendOTP(mobileNumber) {
  // Generate a random OTP
  otp = randomString(6, "0-9");
  
  // Store OTP temporarily (e.g., in a map or a temporary field)
  session.put("otp_" + mobileNumber, otp);
  
  // Send OTP via SMS (using a hypothetical SMS gateway integration)
  response = zoho.sms.send("Your OTP is: " + otp, mobileNumber);
  
  return response;
}

function verifyOTP(mobileNumber, enteredOTP) {
  // Retrieve the stored OTP
  storedOTP = session.get("otp_" + mobileNumber);
  
  // Compare stored OTP with entered OTP
  if (storedOTP == enteredOTP) {
    return "Success";
  } else {
    return "Failure";
  }
}
```

--------------------------------

### Zoho CRM Integration Tasks - Get User Data

Source: https://www.zoho.com/deluge/help/crm-vertical-solutions-tasks

Fetches information about users associated with a Zoho extension or vertical solution. This task is crucial for managing user data within integrated systems.

```Deluge
get_user_data();
```

--------------------------------

### Get Contact ID from Zoho API Response

Source: https://www.zoho.com/deluge/help/books/create-record

This Deluge script demonstrates how to retrieve the 'contact_id' from a successful Zoho API response object. It accesses nested JSON data to extract the specific ID.

```Deluge
contact_id = zoho_response.get("contact").get("contact_id");
// Example usage: print(contact_id);
```

--------------------------------

### Deluge: Fetching Tasks

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to fetch tasks from Zoho CRM, filtering them by status and sorting by due date.

```deluge
// Fetching tasks with Status 'Not Started'
tasksList = zoho.crm.getRecords("Tasks", "all", "Due_Date.ASC", "status=Not Started");

// Displaying the fetched tasks
info tasksList;
```

--------------------------------

### Fetch Groups with Email Addresses using Include

Source: https://www.zoho.com/deluge/help/directory/get-groups

This Deluge script retrieves groups along with their email addresses from Zoho Directory. It demonstrates how to use the 'include' parameter with the `zoho.directory.getGroups` function to specify the data to be fetched.

```deluge
queryParams = Map();
filters = Map();
include = [];
include.add("emails");
queryParams.put("include", include);
response = zoho.directory.getGroups(72XXXXXXX,  "1", "200", queryParams, "zoho_directory_connection")
```

--------------------------------

### Deluge toStartOfWeek() Syntax

Source: https://www.zoho.com/deluge/help/functions/datetime/tostartofweek

Demonstrates the syntax for using the toStartOfWeek() function in Deluge, showing how to assign the result to a variable. It accepts a dateTimeValue as input.

```Deluge
<variable> = <dateTimeValue>.toStartOfWeek();
(OR)
<variable> = toStartOfWeek(<dateTimeValue>);
```

--------------------------------

### Deluge insertAll: Add Elements to Collection

Source: https://www.zoho.com/deluge/help/functions/collection/insertall

Demonstrates how to use the insertAll function in Deluge to add a list of elements to an existing collection. Ensure the collection is initialized to hold elements.

```deluge
products = collection("Creator", "CRM", "Campaigns");
products.insertAll({"Analytics", "Connect"}); // inserts "Analytics" and "Connect" to the existing collection
```

--------------------------------

### Fetch All Subfolder IDs

Source: https://www.zoho.com/deluge/help/mail/get-folders

Iterates through the fetched folders and their subfolders to extract and display the IDs of all subfolders. It handles cases where a folder might not have subfolders.

```Deluge
for each folder in <response_variable> {

  //Fetch the list of subfolders of the folder in the current iteration
  subfolders_list = folder.get("CHILDREN");
  
  // Check if the subfolders list is not empty
  if(subfolders_list!= null)
 {

  //Iterate through the list of subfolders and fetch their IDs
  for each child_folder in subfolders_list
  {
  info child_folder.get("ID") ;
  }
  
  }
}
```

--------------------------------

### Fetch Records with Specific Columns (Zoho Recruit)

Source: https://www.zoho.com/deluge/help/recruit/fetch-records

Fetches records from the 'Candidates' module in Zoho Recruit, allowing the selection of specific columns like 'Email' and 'Last Name'. It also supports specifying the record range, sorting order, and connection name.

```deluge
response = zoho.recruit.getRecords("Candidates", 1,4, "(Last Name,Email,Mobile)", "Email", "desc", "recruit_connection");
```

--------------------------------

### Deluge: Add elements to a list variable

Source: https://www.zoho.com/deluge/help/list-manipulations/add

This Deluge code snippet demonstrates how to initialize a list variable and add both integer and string elements to it using the 'add' task.

```Deluge
listVar = List();
listVar.add(1);
listVar.add("Harry");
```

--------------------------------

### Zoho Creator: Built-in Functions - Sinh, Asinh, Cosh, etc.

Source: https://www.zoho.com/deluge/help/release-notes

Several mathematical built-in functions, including sinh, asinh, cosh, acosh, tanh, atanh, atan2, and yearsDiff, are now available in Zoho Creator, expanding its calculation capabilities.

```Deluge
// Example using sinh function
result = sinh(1.5);
info result;
```

```Deluge
// Example using yearsDiff function
date1 = zoho.currentdate.addDay(-365);
date2 = zoho.currentdate;
years = yearsDiff(date1, date2);
info "Difference in years: " + years;
```

--------------------------------

### Zoho FSM Integration Tasks in Deluge

Source: https://www.zoho.com/deluge/help/release-notes

Introduces five new Deluge tasks for integrating with Zoho FSM (Field Service Management). These tasks allow for record creation, retrieval, and searching within Zoho FSM directly from Deluge scripts.

```Deluge
Create Record
Get Records
Get Record by ID
Get Related Records
Search Record
Update Record
```

--------------------------------

### Conditionally Enable/Disable Field in Zoho Deluge

Source: https://www.zoho.com/deluge/help/client-functions/enable-disable

This example shows how to conditionally enable or disable a field based on the value of another field. It's commonly used in forms to dynamically adjust input options for users.

```deluge
if ( category == "experienced") 
{
 enable experience_in_years;
}
else 
{
 disable experience_in_years;
}
```

--------------------------------

### Deluge Client Functions: Alert and Reload

Source: https://www.zoho.com/deluge/help/client-functions

Shows how to use Deluge client functions to display alert messages to the user and to reload the current page or a specific section.

```deluge
alert("This is a message.");
reload();
```

--------------------------------

### Deluge: Add Key-Value to Map

Source: https://www.zoho.com/deluge/help/map-manipulations/put

This Deluge code snippet demonstrates how to initialize a map variable and then use the 'put' task to add a key-value pair. It also shows how to add a key with a list of values.

```deluge
companyDetails=map();
companyDetails.put( "Name","Zoho" );
```

```deluge
companyDetails.put("Team",{"Zoho Creator","Zoho Chat","Zoho CRM"});
```

--------------------------------

### Deluge Add Record Syntax

Source: https://www.zoho.com/deluge/help/data-access/add-record

This Deluge syntax demonstrates how to insert a new record into a specified form in Zoho Creator. It includes placeholders for the form link name and field link names with their corresponding values.

```Deluge
variable = insert into <form_link_name>
[
  <field_link_name> = <expression>
  <field_link_name> = <expression>
  <field_link_name> = <expression>
];

```

--------------------------------

### Zoho Deluge: String Manipulation and Formatting

Source: https://www.zoho.com/deluge/help/script/sign/create-using-template

This snippet demonstrates common string manipulation techniques in Zoho Deluge, including concatenation, substring extraction, and case conversion. It's useful for data cleaning and preparing text for display or further processing.

```deluge
// Concatenate strings
info "Hello" + " " + "World";

// Extract substring
info substr("Zoho Deluge", 0, 4);

// Convert to uppercase
info upper("deluge");

// Convert to lowercase
info lower("DELUGE");

// Replace substring
info replace("Zoho Deluge", "Deluge", "Scripting");

// Trim whitespace
info trim("  Zoho  ");
```

--------------------------------

### Get Month from Date-Time in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/month

The month() function in Deluge extracts the numerical representation of the month from a provided date-time value. It can be called as a method on the date-time object or as a standalone function. The function returns the month as a number.

```Deluge
currentDate = '14-Dec-2023';
monthNumber = currentDate.month();
info monthNumber; //Returns 12
```

--------------------------------

### Update Zoho FSM Record Transition

Source: https://www.zoho.com/deluge/help/fsm/update-transitions

This Deluge script demonstrates how to update the status of a record in a Zoho FSM module, such as 'Service Appointments', to a new transition state. It utilizes the `zoho.fsm.updateTransitions()` task, specifying the module, record ID, transition information, and connection details.

```Deluge
emptyMap = Map();
transitionInfo = Map();
transitionInfo = {"blueprint":[{"transition_id":"2373000000169069","data":{"Notes":"Customer not present at the location"}}]];

response = zoho.fsm.updateTransitions("Service_Appointments", 23033XXXXXXXXXXXXXX, transitionInfo, emptyMap, "fsm_connection");
info response;

info response;
```

--------------------------------

### Get Content-Type from Response Header in Deluge

Source: https://www.zoho.com/deluge/help/deluge-invoke-url

This snippet demonstrates how to extract the 'content-type' value from a response header obtained from an API call. It accesses the nested structure of the response object to retrieve the specific header information.

```deluge
<variable> = response.get("responseHeader").get("content-type") ;
```

--------------------------------

### Get Minimum Age from Employees Form

Source: https://www.zoho.com/deluge/help/data-access/aggregate-records/minimum

This Deluge script retrieves the minimum value of the 'age' field from the 'Employees' form. It fetches all records where the ID is not 0 and applies the minimum function to the 'age' field. The result is stored in the 'EmployeeDetails' variable.

```deluge
EmployeeDetails = Employees [ ID != 0 ].minimum(age);
```

--------------------------------

### Fetch Salesforce Record by ID using Deluge

Source: https://www.zoho.com/deluge/help/salesforce/fetch-record-by-id

This Deluge snippet demonstrates how to retrieve a specific record from a Salesforce module (e.g., 'Account') by providing the Salesforce connection name, module name, and the record's ID. It returns the record data as a map.

```Deluge
response = salesforce.sales.getRecordById("Salesforce", "Account", "00190000010bRIMAA2");
```

--------------------------------

### Deluge: Iterate CSV File Values

Source: https://www.zoho.com/deluge/help/list-manipulations/for-each-element

This Deluge code snippet demonstrates downloading a zip file containing a CSV, extracting the CSV, and then iterating through each value in the CSV file using the 'for each' task. It prints each value to the info log.

```Deluge
csv_file_zip = invokeurl
[
url: "https://www.stats.govt.nz/assets/Uploads/Business-financial-data/Business-financial-data-June-2021-quarter/Download-data/wholesale-trade-survey-june-2021-quarter-csv.zip"
type: GET
];

csv_file = csv_file_zip.extract().get("wholesale-trade-survey-jun-2021-quarter-csv.csv");

for each val in csv_file
{
info val;
}
```

--------------------------------

### Get Zoho Cliq ZUID using Deluge

Source: https://www.zoho.com/deluge/help/cliq/zoho-cliq-integration-attributes

This Deluge script is used to obtain the ZUID (Zoho Unique Identifier) of a recipient. Similar to retrieving the Chat ID, this involves saving the script and then executing a command.

```Deluge
<variable> = chat.get("members").get(0).get("id");
```

--------------------------------

### Build Low-Code Apps in Zoho Cliq with Deluge

Source: https://www.zoho.com/deluge/help/index

Build low-code apps and extensions within Zoho Cliq using Deluge scripting. This allows centralizing data and automating workflows directly within the team communication app.

```Deluge
// Example Deluge code for building low-code apps in Zoho Cliq
// (Specific code depends on the Zoho Cliq application structure)
```

--------------------------------

### Salesforce Integration Tasks in Zoho Creator

Source: https://www.zoho.com/deluge/help/salesforce-tasks

This section outlines common tasks for integrating with Salesforce using Zoho Creator. These operations include fetching records by various criteria, creating new records, and updating existing ones.

```Deluge
Get Records: Fetches records from the specified module
Search Records: Fetches records based on criteria
Get Record By ID: Fetches the details of the specified record
Create: Creates a record in the specified module
Update: Updates the specified record
```

--------------------------------

### Automate CRM Dashboard Archiving to PDF via URL in Deluge

Source: https://www.zoho.com/deluge/help/functions/file/convert-to-pdf

This Deluge script automates the process of converting a live CRM dashboard URL into a PDF, renaming it with a standard convention, and emailing it to a sales manager.

```deluge
// Define the URL of the public CRM dashboard (make sure it’s accessible if hosted internally)
dashboard_url = "https://crm.zoho.com/reports/monthly-dashboard?month=April&year=2025";
// Convert the live dashboard page to a PDF file
pdf_file = zoho.file.convertToPDF(dashboard_url);
// Verify the file object
if (pdf_file.isFile())
{
// Construct a meaningful filename based on the report context
    report_name = "CRM_Monthly_Report_April_2025";
    
// Rename the file for easy identification
    pdf_file.setFileName(report_name);
// (Optional) Save the file to WorkDrive, attach to an email, or upload to a record
// Example: Send email to manager with attached file
    sendmail
    [
        from: zoho.adminuserid
        to: "sales.manager@company.com"
        subject: "Monthly CRM Report - April 2025"
        message: "Attached is your monthly CRM performance dashboard."
        attachments: pdf_file
    ];
    info "PDF report generated and emailed successfully.";
}
else
{
    info "PDF generation failed. Please check the URL or network accessibility.";
}
```

--------------------------------

### Retrieve Mobile IDs from Nested JSON

Source: https://www.zoho.com/deluge/help/functions/getjson-and-get

This example illustrates how to access deeply nested values within a JSON structure in Deluge. It specifically retrieves the 'mobileID' from a nested 'Id' object within a list of employee records.

```Deluge
resp = {"data" : [{"Id":{"mobileID" : 1001, "laptopID" : 2002}, "firstname":"John", "lastName":"Day"},  {"Id":{"mobileID" : 3003, "laptopID" : 4004}, "firstname":"Patricia","lastname":"Boyle"}]};

data = resp.getJson("data");
employeeList = data.toJSONList();

idList = Collection();

for each employee in employeeList
{
    idList.insert(employee.getJson("Id").get("mobileID"));
}

info idList;       //returns 1001, 3003
```

--------------------------------

### Create Zoho Books Contact

Source: https://www.zoho.com/deluge/help/books/create-record

This script creates a new contact record in Zoho Books by populating a map with contact details such as name, company, GST number, and email. It requires a Zoho Books connection and organization ID.

```deluge
contactMap=map();
contactMap.put("contact_name","Bowman and Co 3");
contactMap.put("company_name","Bowman and Co 3");
contactMap.put("gst_no","07CQZCD1111I4Z7");
contactMap.put("gst_treatment","business_gst");
contactMap.put("first_name","Will");
contactMap.put("last_name","Smith");
contactMap.put("contact_type","vendor");
contactMap.put("pan_no","ABCDE1234F");
contactMap.put("email","willsmith@bowmanfurniture.com");
contactMap.put("phone","+1-925-921-XXXX");
response= zoho.books.createRecord("Contacts", "5379XXXX", contactMap, "books_connection");
```

--------------------------------

### Zoho Creator: Deluge Scripting - Function Argument Format

Source: https://www.zoho.com/deluge/help/release-notes

Zoho Creator has updated the syntax for several built-in functions, offering an alternative format for function arguments. This change improves flexibility and consistency with other Zoho services.

```Deluge
// Old format
isBlank("input");

// New supported format
"input".isBlank();
```

```Deluge
// Old format
daysBetween("date1", "date2");

// New supported format
"date1".daysBetween("date2");
```

--------------------------------

### Zoho Connect: Format Data for Posting

Source: https://www.zoho.com/deluge/help/index

Formats data to be posted into the specific format required by Zoho Connect. Ensures compatibility with the platform's posting requirements.

```Deluge
data_to_post = {"title": "My Post", "content": "This is the content of the post."};
formatted_data = zoho.connect.formatPost(data_to_post);
// Post the formatted data using Zoho Connect API
info "Data formatted for Zoho Connect posting.";
```

--------------------------------

### Retrieve Message Stream ID using Deluge

Source: https://www.zoho.com/deluge/help/connect-integration-help

This Deluge code example illustrates how to obtain the Stream ID of a message using the `zoho.connect.getPost()` method. The Stream ID is used for actions such as commenting on messages in Zoho Connect.

```Deluge
zoho.connect.getPost()
```

--------------------------------

### Deluge: Execute Code Snippet

Source: https://www.zoho.com/deluge/help/deluge-tasks

This snippet demonstrates a basic execution block in Deluge, often used for running custom scripts or functions within Zoho applications. It's a fundamental part of Deluge scripting for automation and customization.

```Deluge
execute
__
We're Online!
How may I help you today?
__
____
```

--------------------------------

### Fetch Zoho Projects Record by ID

Source: https://www.zoho.com/deluge/help/projects/get-record-by-id

Fetches a specific record from a given module within Zoho Projects using its ID. Requires portal name, project ID, and module name. An optional record ID can be provided for more specific retrieval. Note the rate limiting for this task.

```Deluge
response = zoho.projects.getRecordById("zylker", 548XXXXXXXXXXX771, "tasks", 548XXXXXXXXXXX019);
```

--------------------------------

### Create Record in Zoho Creator

Source: https://www.zoho.com/deluge/help/creator/create-record

Adds one or more records to a specified Zoho Creator form using field values. It requires owner name, application link name, form link name, input values, optional parameters, and a connection.

```Deluge
<variable> = zoho.creator.createRecord(<owner_name>, <app_link_name>, <form_link_name>, <input_values>, <other_params>, <connection>);
```

--------------------------------

### Get Hour from Time (Deluge - Zoho Creator Only)

Source: https://www.zoho.com/deluge/help/functions/datetime/gethour

Extracts the hour component from a time value using either the getHour() method or the hour() method. This functionality is currently supported only for the TIME data type in Zoho Creator.

```deluge
timeValue = '10:00:00 PM';
info timeValue.getHour(); // Returns 10
```

```deluge
currentTime = '13:15:10';
info currentTime.getHour();  // Returns 13
```

--------------------------------

### Fetch All Fields in Zoho Writer (Deluge)

Source: https://www.zoho.com/deluge/help/writer/get-all-fields

This Deluge script demonstrates how to fetch all fields from a specified Zoho Writer document using the `zoho.writer.getAllFields` task. It requires the document ID and an OAuth connection name.

```Deluge
response = zoho.writer.getAllFields("al296XXXXXXXXXXXXXXXXXXXXXXXXXXXa516c", "writer_oauth_connection");
```

--------------------------------

### Fetch Field Value with Descending Sort (Deluge)

Source: https://www.zoho.com/deluge/help/fetch-records/fetch-field-values

Retrieves the value of a specified field from the first record, sorted in descending order based on another field, that matches the criteria. Useful for getting the latest or highest values.

```Deluge
<variable> = <form_link_name> [<criteria>].<field_link_name> sort by <field_link_name> desc;
```

--------------------------------

### Deluge: Get maximum value from a form

Source: https://www.zoho.com/deluge/help/data-access/aggregate-records/maximum

This Deluge script demonstrates how to use the maximum() aggregate function to fetch the largest value of the 'age' field from the 'Employees' form. It includes a criteria to fetch all records where the ID is not 0.

```Deluge
EmployeeDetails = Employees [ ID != 0 ].maximum(age);
```

--------------------------------

### Deluge: Display Subform Field Values with Info/Alert

Source: https://www.zoho.com/deluge/help/old-to-new-framework

Illustrates the difference in displaying subform field values using 'info' or 'alert' tasks in ZC5 compared to ZC4. ZC5 displays all values, while ZC4 only shows the first record's value.

```Deluge
fetchedRecords =
FormName[ID!=0];
for each rec in
fetchedRecords
{
info
rec.subform.number_field;
}
```

--------------------------------

### Deluge toTime Function Usage

Source: https://www.zoho.com/deluge/help/functions/common/totime

Demonstrates the basic syntax for using the toTime function in Deluge. It shows how to assign the result of the conversion to a variable.

```Deluge
<variable> = <expression>.toTime(<dateTimeMapping>, <timeZone>);
```

--------------------------------

### Create Record in Zoho Books using Deluge

Source: https://www.zoho.com/deluge/help/books/create-record

This Deluge task allows you to create a new record within a specified module in Zoho Books. It requires the module name, organization ID, a data map containing field values, and an optional Zoho Books connection.

```Deluge
variable = zoho.books.createRecord(<module_name>, <org_ID>, <data_map>, <connection>);
```

--------------------------------

### Deluge Reverse String Syntax

Source: https://www.zoho.com/deluge/help/functions/string/reverse

Demonstrates the two ways to call the reverse() function in Deluge: as a method of the input text or as a standalone function.

```Deluge
<variable> = <inputText>.reverse();
```

```Deluge
<variable> = reverse(<inputText>);
```

--------------------------------

### Fetch and Post High-Priority Tasks with Deluge Scheduler

Source: https://www.zoho.com/deluge/help/deluge-in-zoho-services/zoho-connect

This Deluge script demonstrates how to fetch tasks with high priority and a specific status from Zoho Connect, process them, and post a summary to a group. It requires a Zoho OAuth connection with specific scopes for tasks and posts.

```Deluge
returnMap=Map();
//Invoke the Zoho Connect task to fetch all the tasks with high priority and in to be reviewed status.
response=invokeurl
[
url:"https://connect.zoho.com/pulse/api/allTasks"
type:GET
parameters:{"scopeID":"526492000000002008","priorities":"High","percentages":"90"} connection:"createtask"
];
taskl=response.get("allTasks");
contentList=List();
//Go over each task to fetch tasks with required criteria
for each recintaskl.get("tasks")
{
contentList.add(rec.get("title"));
}
contentMap=Map();
contentMap.put("message","These are the following tasks with high priority : "+contentList);
contentMap.put("title","Kindly check and complete the following tasks");
postingroup=zoho.connect.addPost("status",526492000000002008,526492000000026001,contentMap,"createtask");
returnreturnMap;
```

--------------------------------

### Deluge: Conditional Deselection of Field Choices

Source: https://www.zoho.com/deluge/help/client-functions/selectall-deselectall

This Deluge code example illustrates how to conditionally deselect all choices in a 'Games' multi-select field if a 'Reset_selection' decision box is checked. This allows users to easily clear all selections in the 'Games' field.

```Deluge
if(Reset_selection)
{
Games.deselectall();
}
```

--------------------------------

### Search Records in Zoho Recruit Candidates Module

Source: https://www.zoho.com/deluge/help/recruit/search-records

Fetches records from the 'Candidates' module in Zoho Recruit based on a specified state ('California'), a range of indices (1 to 3), and selected columns ('Last Name', 'Email'). This demonstrates the basic usage of the zoho.recruit.searchRecords task.

```Deluge
response = zoho.recruit.searchRecords("Candidates", "State|=|California", 1, 3, "Last Name,Email");
```

--------------------------------

### New Built-in Functions Available in Zoho Creator

Source: https://www.zoho.com/deluge/help/release-notes

Several built-in functions previously available in other Zoho services are now accessible within Zoho Creator. These include functions for text conversion, date calculations, and list manipulation.

```Deluge
toText | equals | workDaysList | monthsDiff() | yearsDiff() | yearFraction | getDate | getDateTime
```

--------------------------------

### Deluge toDate Function Syntax

Source: https://www.zoho.com/deluge/help/functions/common/todate

Demonstrates the two primary syntaxes for using the toDate function in Deluge. The first assigns the result to a variable, while the second directly calls the function. Both require an expression and optionally accept a dateTimeMapping.

```deluge
<variable> = <expression>.toDate(<dateTimeMapping>);
```

```deluge
<variable> = toDate(<expression>, <dateTimeMapping>);
```

--------------------------------

### Zoho Deluge: URL Field Formatting

Source: https://www.zoho.com/deluge/help/collection-variable

Details the required format for URL values, including optional title, linkname, and target parameters. Saving a URL directly without the specified format results in a null value.

```Deluge
Url| Text| Value must be specified in the following format (title, linkname and target are optional params) :<a href= "<URL>" title = "<TITLE>" target = "_blank"><linkname></a>If a url is specified directly, the URL field will get saved with a null value.
```

--------------------------------

### Post File to Zoho Cliq Bot

Source: https://www.zoho.com/deluge/help/cliq/posting-to-zoho-cliq

This Deluge script shows how to post a file to a Zoho Cliq bot. It uses the 'invokeUrl' task to fetch a PDF file from a given URL and then posts it to the 'Bookaholics' bot.

```Deluge
file_object = invokeUrl
                 [
                 url: "https://www.readingstudios.com/uploads/5/2/4/6/52467441/artemis_fowl.pdf"
                 type: GET
                 ];
                 response = zoho.cliq.postToBot("Bookaholics",file_object);
```

--------------------------------

### Zoho Recruit: Upload Document

Source: https://www.zoho.com/deluge/help/recruit-tasks

Uploads a document to Zoho Recruit. This is typically used for attaching files to specific records.

```Deluge
recordId = "123456789012345";
documentPath = "path/to/your/document.pdf";
response = zoho.recruit.uploadDocument("ModuleName", recordId, documentPath);
info response;
```

--------------------------------

### Get Zoho People Form Label Names

Source: https://www.zoho.com/deluge/help/people/attributes

This snippet explains how to find the label names for forms within Zoho People. It involves navigating through the settings to the Forms customization section and selecting the desired form to view its properties.

```Deluge
Navigate to Settings -> Forms under Customization.
Select the required form to view its label name under form properties.
```

--------------------------------

### Iterate CRM Records and Get Owner Name

Source: https://www.zoho.com/deluge/help/functions/getjson-and-get

This Deluge script iterates through records fetched from Zoho CRM and extracts the 'name' from the nested 'Owner' object for each record. It showcases accessing nested data within CRM responses.

```Deluge
for each  rec  in  resp 
{
  info  rec.get("Owner").get("name");
 }
```

--------------------------------

### Zoho WorkDrive Create Folder Task

Source: https://www.zoho.com/deluge/help/docs-tasks

This task allows for the creation of a new subfolder within a specified location in Zoho WorkDrive. It helps in organizing files and data.

```Deluge
Create Folder: Creates a subfolder
```

--------------------------------

### Get Seconds from Time Value in Deluge (Zoho Creator Only)

Source: https://www.zoho.com/deluge/help/functions/datetime/second

This snippet shows how to extract the seconds from a time value using 'second()' or 'getSeconds()' in Deluge. This functionality is specifically available for time data types within Zoho Creator.

```Deluge
timeValue = '10:00:00 PM';
info timeValue.getSeconds();
```

```Deluge
currentTime = '13:15:10';
info currentTime.getSeconds();
```

```Deluge
<variable> = <timeValue>.second();
```

```Deluge
<variable> = second(<timeValue>);
```

```Deluge
<variable> = <timeValue>.getSeconds();
```

```Deluge
<variable> = getSeconds(<timeValue>);
```

--------------------------------

### Deluge subString Function Syntax

Source: https://www.zoho.com/deluge/help/functions/string/substring

Demonstrates the two ways to call the subString function in Deluge: as a method of a text variable or as a standalone function. It highlights the parameters: source_text, start_index, and the optional end_index.

```deluge
<variable> = <source_text>.subString(<start_index>, [<end_index>]);
```

```deluge
<variable> = subString(<source_text>, <start_index>, [<end_index>]);
```

--------------------------------

### Sample Success Response JSON

Source: https://www.zoho.com/deluge/help/invoice/fetch-records

This JSON structure represents a successful API response, typically returned after fetching a list of items. It includes a status code, a success message, and pagination details. The 'items' array contains individual records, each with various properties like creation time, item ID, name, and rate.

```JSON
{
"code": 0,
"message": "success",
"page_context": {
"per_page": 200,
"sort_column": "rate",
"applied_filter": "Status.All",
"has_more_page": false,
"page": 1,
"report_name": "Items",
"sort_order": "A",
"search_criteria": [
{
"comparator": "equal",
"column_name": "name",
"search_text": "Pendrive"
}
]
},
"items": [
{
"created_time": "2019-01-02T19:33:12+0530",
"reorder_level": "",
"last_modified_time": "2019-02-09T14:34:43+0530",
"item_id": "30870XXXXXXXXXXXXX",
"tax_name": "",
"is_linked_with_zohocrm": true,
"purchase_rate": 400.0,
"description": "",
"item_name": "02-Mar-2018 06:03:12",
"has_attachment": false,
"source": "api",
"zcrm_product_id": "23033XXXXXXXXXXXXX",
"tax_id": "",
"purchase_description": "",
"image_name": "",
"unit": "",
"product_type": "goods",
"rate": 350.0,
"name": "Pendrive",
"tax_percentage": 0,
"sku": "",
"status": "active"
},
{
"created_time": "2018-03-02T19:35:43+0530",
"reorder_level": "",
"last_modified_time": "2018-06-29T14:34:44+0530",
"item_id": "30870XXXXXXXXXXXXX",
"tax_name": "",
"is_linked_with_zohocrm": true,
"purchase_rate": 600.0,
"description": "",
"item_name": "02-Mar-2018 06:05:43",
"has_attachment": false,
"source": "api",
"zcrm_product_id": "23033XXXXXXXXXXXXX",
"tax_id": "",
"purchase_description": "",
"image_name": "",
"unit": "",
"product_type": "goods",
"rate": 500.0,
"name": "Pendrive",
"tax_percentage": 0,
"sku": "",
"status": "active"
}
]
}
```

--------------------------------

### Fetch File using invokeUrl in Deluge

Source: https://www.zoho.com/deluge/help/datatypes/file-data-type

This Deluge script demonstrates how to fetch a file from a given URL using the invokeUrl task. The fetched file is stored in a variable of type FILE.

```Deluge
// to fetch file from the cloud using invokeUrl task
 file_variable  =  invokeUrl
 [
  url: "https://sample-videos.com/img/Sample-png-image-100kb.png"
  type: GET
 ];

```

--------------------------------

### Fetch Records from Zoho Billing

Source: https://www.zoho.com/deluge/help/billing/fetch-records

This Deluge task fetches records from a specified module in Zoho Billing. It requires the module name, organization ID, pagination details (per page and page number), and a Zoho Billing connection link name.

```Deluge
response = zoho.billing.getList("Customers", "66XXXXX66", 2, 1, "billing_connection");
```

--------------------------------

### Zoho Recruit: Search Records

Source: https://www.zoho.com/deluge/help/recruit-tasks

Fetches records from Zoho Recruit based on specified criteria. This enables targeted data retrieval.

```Deluge
criteria = "(Status:equals:Active)";
response = zoho.recruit.searchRecords("ModuleName", criteria);
info response;
```

--------------------------------

### Deluge: Get Hour from Time (Zoho Creator)

Source: https://www.zoho.com/deluge/help/functions/datetime/hour

Extracts the hour from a time value using either the `.getHour()` method or the `getHour()` function. This functionality is specifically available for the TIME data type in Zoho Creator. The returned hour is a NUMBER.

```deluge
timeValue = '10:00:00 PM';
info timeValue.getHour(); // Returns 10
```

```deluge
currentTime = '13:15:10';
info currentTime.getHour();  // Returns 13
```

```deluge
timeValue = '10:00:00 PM';
info getHour(timeValue); // Returns 10
```

```deluge
currentTime = '13:15:10';
info getHour(currentTime);  // Returns 13
```

--------------------------------

### Fetch XML Data using getUrl

Source: https://www.zoho.com/deluge/help/web-data/geturl

This Deluge snippet demonstrates how to use the deprecated getUrl task to fetch XML data from a specified URL. The response is stored in the 'xmlResp' variable.

```deluge
xmlResp = getUrl("https://www.w3schools.com/xml/cd_catalog.xml");
```

--------------------------------

### Get Current Date-Time in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/now

The 'now' function in Deluge retrieves the current date-time value. The format of the returned value is determined by the Application settings. You can further process this value using the toString() function to convert it to a specific format or time zone.

```deluge
currentDateTime = now;
```

--------------------------------

### Deluge: Get Last Index of an Element in Collection

Source: https://www.zoho.com/deluge/help/functions/collection/getlastkey

This Deluge code snippet illustrates how to use the `getLastKey` function to retrieve the index of the last occurrence of a specific element within a collection. It returns the index (a number) or -1 if the element is not found.

```Deluge
products = collection("Creator", "CRM", "Creator");
info products.getLastKey( "Creator" ); // Returns 2
```

--------------------------------

### Deluge: Get Last Key of a Value in Collection

Source: https://www.zoho.com/deluge/help/functions/collection/getlastkey

This Deluge code snippet demonstrates how to use the `getLastKey` function to find the key associated with the last occurrence of a specific value within a collection. It returns the key or null if the value is not found.

```Deluge
productVersion = collection("Creator" : 5, "CRM" : 2, "Mail" : 5);
info productVersion.getLastKey( 5 ); // Returns "Mail"
```

--------------------------------

### Deluge Dynamic Parameter Usage in Invoke URL

Source: https://www.zoho.com/deluge/help/connections

Demonstrates how to use dynamic parameters, like '{domain}', within the 'invokeurl' task in Deluge scripts. The parameter is replaced with a user-supplied value during execution, allowing for dynamic endpoint construction.

```Deluge
response = invokeurl
                                                                                                                 [
                                                                                                                 url: "https://{domain}.my.salesforce.com/services/data/v56.0/sobjects/Merchandise__c/updated/v2/read"
                                                                                                                 type: GET
                                                                                                                 connection: "salesforce_connection"
                                                                                                                 ];
```

--------------------------------

### Detect Objects in Image using Deluge

Source: https://www.zoho.com/deluge/help/ai-tasks/detect-object

This Deluge script demonstrates how to use the zoho.ai.detectObject task to identify and locate objects within an image. It first fetches an image using the invokeUrl task and then passes the image file to the detectObject function. The response contains details about detected objects, their bounding box coordinates, and confidence scores.

```Deluge
image = invokeurl 
[
url : "https://st.focusedcollection.com/18590116/i/1800/focused_220909150-stock-photo-group-business-people-working-office.jpg"
];

response = zoho.ai.detectObject(image);
```

--------------------------------

### Fetch Zoho Books Record by ID using Deluge

Source: https://www.zoho.com/deluge/help/books/fetch-record-by-id

This Deluge script demonstrates how to fetch a specific record from a Zoho Books module using its unique ID. It utilizes the `zoho.books.getRecordsByID` function, requiring the module name, organization ID, record ID, and a valid Zoho Books connection.

```Deluge
response = zoho.books.getRecordsById("Contacts", "5379XXXX", "XXXXXXXXXXXX92275", "books_connection");
```

--------------------------------

### Zoho CRM Bulk Record Creation

Source: https://www.zoho.com/deluge/help/crm-tasks

This snippet demonstrates creating multiple records simultaneously in Zoho CRM using Deluge. It improves efficiency when adding large datasets.

```Deluge
bulk_create_data = [{"Last Name": "Lead 1", "Company": "Company A"}, {"Last Name": "Lead 2", "Company": "Company B"}];
create_multiple = zoho.crm.create("Leads", bulk_create_data);
info create_multiple;
```

--------------------------------

### Deluge: Bulk Create Records in Zoho CRM

Source: https://www.zoho.com/deluge/help/crm/bulk-create-records

This Deluge code demonstrates how to create multiple records in Zoho CRM using the `zoho.crm.bulkCreate` task. It involves preparing a list of data maps, where each map represents a record with its field API names and values, and then passing this list to the bulk create function.

```Deluge
createList = List();
recordMap1 = {"Company":"Zylker", "Last_Name":"Daly", "First_Name":"Paul", "Email":"p.daly@zylker.com"};
recordMap2 = {"Company":"Tycoon", "Last_Name":"Richard", "First_Name":"Brian", "Email":"brian@villa.com"};
createList.add(recordMap1);
createList.add(recordMap2);
leadInfo = zoho.crm.bulkCreate("Leads", createList);
```

--------------------------------

### Deluge: isBlank(), isNull(), isEmpty() Function Comparison

Source: https://www.zoho.com/deluge/help/functions/common/isnull-isblank-isempty-difference

This snippet demonstrates the behavior of Deluge's isBlank(), isNull(), and isEmpty() functions across various input types, including strings with spaces, empty strings, null values, empty lists, lists with values, and maps.

```Deluge
/*
Input: " " (text containing only spaces)
Expected Output:
isBlank(): true
isNull(): false
isEmpty(): true
*/

/*
Input: "" (empty text)
Expected Output:
isBlank(): true
isNull(): true
isEmpty(): null
*/

/*
Input: null
Expected Output:
isBlank(): false
isNull(): true
isEmpty(): null
*/

/*
Input: {} (empty list)
Expected Output:
isBlank(): true
isNull(): false
isEmpty(): true
*/

/*
Input: {" "} or {""} (list values)
Expected Output:
isBlank(): false
isNull(): false
isEmpty(): false
*/

/*
Input: {" " : " "} or {"" : ""} (map values)
Expected Output:
isBlank(): false
isNull(): null
isEmpty(): false
*/

// Example usage (actual function calls would depend on context):
// info " " + isBlank(" ") + ", " + isNull(" ") + ", " + isEmpty(" ");
// info "" + isBlank("") + ", " + isNull("") + ", " + isEmpty("");
// info null + isBlank(null) + ", " + isNull(null) + ", " + isEmpty(null);
// info {} + isBlank({}) + ", " + isNull({}) + ", " + isEmpty({});
// info {" "} + isBlank({" "}) + ", " + isNull({" "}) + ", " + isEmpty({" "});
// info {" " : " "} + isBlank({" " : " "}) + ", " + isNull({" " : " "}) + ", " + isEmpty({" " : " "});

```

--------------------------------

### Focus Composite Field Subfield - Deluge

Source: https://www.zoho.com/deluge/help/client-functions/focus

This Deluge code snippet illustrates how to focus on a subfield within a composite field. It requires specifying the subfield along with the main field name, for example, focusing on the 'prefix' subfield of a 'Name' composite field.

```Deluge
focus Name.prefix;
```

--------------------------------

### Deluge isFile Function Syntax

Source: https://www.zoho.com/deluge/help/functions/common/is-file

Demonstrates the syntax for using the isFile function in Deluge, both as a method of a file object and as a standalone function.

```Deluge
<variable> = <file_object>.isFile();
```

```Deluge
<variable> = isFile(<file_object>);
```

--------------------------------

### Post Table Attachment using Deluge

Source: https://www.zoho.com/deluge/help/cliq/posting-to-zoho-cliq

This script demonstrates how to post a message with a table attachment to a chat window. It requires a nested collection to define the table data, including headers and rows.

```Deluge
table_data = {
                        "text":"New interns will be joining these teams from July",
                        "slides":
                        [{
                        "type":"table",
                        "title":"Details",
                        "data":{
                        "headers":["Name","Team"],
                        "rows":[{"Name":"John","Team":"Marketing"},
                               {"Name":"Charlie","Team":"Sales"}
                               ]
                        }
                        }]
                        };
response = zoho.cliq.postToChat("2230642502700000000",table_data);
```

--------------------------------

### Calculate Months Difference using monthsDiff() in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/monthsdiff

The monthsDiff() function in Deluge calculates the number of months between a start date-time and an end date-time. It considers the number of days in each month for accurate calculation. The function can be called directly or as a method of a date-time variable.

```Deluge
startDate = '31-Dec-1989';
endDate = '01-Jan-1990';
newEndDate = '01-Feb-1990';
numberOfMonths= monthsDiff(startDate, endDate); // returns 0
numOfMonths = monthsDiff(startDate, newEndDate); // returns 1
```

```Deluge
startDate = '01-Feb-2020';
endDate = '01-Mar-2020';
info monthsDiff(startDate, endDate); // returns 1
```

--------------------------------

### Upload Document to Zoho Writer

Source: https://www.zoho.com/deluge/help/writer/upload-document

Uploads a document to Zoho Writer using the `zoho.writer.uploadDocument` task. This task requires the document content, desired file name, target folder ID, an optional password for protected files, and a Zoho OAuth connection.

```deluge
response = zoho.writer.uploadDocument(file_invoked, "sample file", "al296XXXXXXXXXXXXXXXXXXXXXXXXXXXa516c", "", "writer_oauth_connection");
```

--------------------------------

### Zoho Connect - Add Users to Group (Deluge)

Source: https://www.zoho.com/deluge/help/connect-tasks

Adds users to a specified group using their email addresses. Requires the group ID and a list of email addresses.

```Deluge
response = zoho.connect.post("addUsersToGroup", {"groupId": "your_group_id", "users": ["user1@example.com", "user2@example.com"]});
```

--------------------------------

### Compare Old and New Field Values with 'old' Keyword

Source: https://www.zoho.com/deluge/help/data-access/old

This Deluge code snippet shows how to compare the previous value of the 'plan' field (obtained using 'old.plan') with the current input value ('input.plan'). If the values differ, it logs an informational message indicating that the plan has been changed.

```deluge
if(old.plan != input.plan)
{
info "Plan has been changed";
}
```

--------------------------------

### Compare List Fields in Deluge

Source: https://www.zoho.com/deluge/help/operators/creator-fields-and-their-applicable-operators

Demonstrates the comparison of List fields (e.g., Check Box, Multi Select) with Text and other List fields. It highlights how comparisons are made based on the presence of values or exact order.

```Deluge
info Zoho_Products == Keyword ; // Returns true, as the value of Keyword is listed in Zoho_Products.
info Zoho_Products == Keyword ; // Returns false, as they are not in the exact same order.
```

--------------------------------

### Zoho Writer Integration Tasks in Deluge

Source: https://www.zoho.com/deluge/help/release-notes

Provides a list of new Deluge tasks for integrating with Zoho Writer. These tasks facilitate document management operations such as merging, signing, storing, and managing templates.

```Deluge
Get all fields
Merge and Sign
Merge and Store V2
Merge and Invoke
Mark or Unmark Document as favorite
Rename Document
Enable or Disable Track Changes
Add or Update Description
Lock or Unlock Documents
Mark Document as Ready
Mark or Revert Final Documents
Get Merge Templates
Get Sign Templates
Get Fillable Templates
```

--------------------------------

### Get Current Date in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/today

The 'today' function in Deluge returns the current date value, setting the time component to 00:00:00. The output format is determined by your service settings. You can further manipulate the output using the toString() function to specify format and time zone.

```Deluge
currentDate = today;  // returns 23-Oct-2023 (The current date value in the format specified in your service settings)
```

--------------------------------

### Deluge Sum Function Syntax

Source: https://www.zoho.com/deluge/help/data-access/aggregate-records/sum

Demonstrates the basic syntax for using the sum function in Deluge to aggregate data. It shows how to assign the result to a variable and specifies the form, criteria, and field to sum.

```Deluge
<variable> = <form_link_name> [<criteria>].sum(<field_link_name>);
```

--------------------------------

### Plain Text Formatting in Deluge

Source: https://www.zoho.com/deluge/help/data-access/update-records

Explains the use of plain text format for URLs in Deluge, which can only be used in specific workflow events like 'On success', 'On create', 'On edit', and 'On create or edit'.

```Deluge
"URL as such can be provided as a text enclosed with double quotes."
```

--------------------------------

### Fetch Most Recent Record's Field Value

Source: https://www.zoho.com/deluge/help/fetch-records/fetch-collection-records

This Deluge script demonstrates how to retrieve a specific field's value from the most recently added record in a form. It uses a filter to select records and sorts them by 'Added_Time' in descending order to get the latest entry.

```deluge
EmployeeDetails = Employees [ ID != 0] sort by Added_Time desc;
info EmployeeDetails.<field_link_name>;
```

--------------------------------

### Activate Zoho Directory User

Source: https://www.zoho.com/deluge/help/directory/activate-user

Activates a specified user within a Zoho Directory organization. Requires the organization ID, user ID, and the name of the Zoho Directory connection.

```deluge
response = zoho.directory.activateUser(72XXXXXXX, 1510XXXXXXXX, "zoho_directory_connection");
```

--------------------------------

### Deluge: Fetch Unique Field Values with Distinct

Source: https://www.zoho.com/deluge/help/data-access/aggregate-records/distinct

The distinct function in Deluge is used to get a list of unique values for a specified field from records fetched using a criteria. The criteria is mandatory and the function can be applied to all field types. The returned value is a List.

```Deluge
EmployeeDetails = Employees [ ID != 0 ].distinct(age);
```

--------------------------------

### Calculate Days Between Dates in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/daysbetween

The daysBetween function in Deluge calculates the number of days between two specified date-time values. It accepts a start date and an end date as arguments and returns the difference as a number. An alternative function, days360, can also be used for the same purpose.

```Deluge
startDate = '1-Jan-2019';
endDate = '31-Dec-2019';
numberOfDays = daysBetween(startDate, endDate); // returns 364

newStartDate = '1-Jan-2020';
newEndDate = '31-Dec-2020';
numOfDays = daysBetween(newStartDate, newEndDate); // returns 365
```

--------------------------------

### Zoho Creator: sendMail Task - Multiple Attachments

Source: https://www.zoho.com/deluge/help/release-notes

The sendMail task in Zoho Creator now supports supplying a LIST of files to send multiple attachments, a feature previously available in other Zoho services.

```Deluge
// Sending multiple attachments using sendMail
file_list = List("file1.pdf", "file2.txt");
sendMail(
    from : "sender@example.com",
    to : "recipient@example.com",
    subject : "Email with attachments",
    message : "Please find the attached files.",
    file : file_list
);
```

--------------------------------

### Fetch First 100 Records

Source: https://www.zoho.com/deluge/help/creator/get-records

Retrieves the first 100 records from the 'All_Tasks' report in the 'Task_Management' application without any specific search criteria. This is useful for paginating through large datasets.

```deluge
response = zoho.creator.getRecords("Shawn","Task_Management","All_Tasks","",1,100, "creator_oauth_connection");
```

--------------------------------

### Deluge repeat() Function Syntax

Source: https://www.zoho.com/deluge/help/functions/string/repeat

Demonstrates the two ways to call the repeat() function in Deluge: as a method of a text variable or as a standalone function. Both achieve the same result of repeating a given text.

```Deluge
<variable> = <inputText>.repeat(<repeatCount>);
```

```Deluge
<variable> = repeat(<inputText>, <repeatCount>);
```

--------------------------------

### Deluge Image Field Formatting

Source: https://www.zoho.com/deluge/help/criteria

Explains the format for 'Image' fields in Deluge, demonstrating how to create an anchor tag that links to an image URL and includes optional title and target attributes.

```deluge
// Image field with linkname, title, and target
"<a href=\"http://example.com\" title=\"Image Title\" target=\"_blank\"><img src=\"http://example.com/image.jpg\" title=\"Image Title\"></img></a>"
```

--------------------------------

### Create Folder in Zoho Mail (Deluge)

Source: https://www.zoho.com/deluge/help/mail/create-folder

This Deluge script demonstrates how to create a new folder in Zoho Mail. It utilizes the `zoho.mail.createFolder` task, specifying the folder name, parent folder ID (0 for top-level), and the OAuth connection name.

```Deluge
response = zoho.mail.createFolder("Folder1", 0, "mail_oauth_connection");
```

--------------------------------

### Deluge: Fetching Accounts

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to fetch accounts from Zoho CRM, filtering them by industry and sorting by account name.

```deluge
// Fetching accounts in the 'Technology' industry
accountsList = zoho.crm.getRecords("Accounts", "all", "Account_Name.ASC", "Industry=Technology");

// Displaying the fetched accounts
info accountsList;
```

--------------------------------

### Insert CSV Data into Multiple Rows of Zoho Sheet

Source: https://www.zoho.com/deluge/help/sheet/insert-csv

This script inserts CSV data into a specified worksheet ('Sheet1') of a Zoho Sheet file. The data is provided as a string where '\n' denotes a new row. The insertion starts from the first row and first column.

```Deluge
response = zoho.sheet.insertCSV("eev4nXXXXXXXXXXXXXXXXXXXXXXXXXXXcff41","Sheet1","Advertisement,200,High**\n**Trade Show,100,High", 1, 1, "Sheet_connection");
```

--------------------------------

### Zoho Flow: Fetch Tasks and Create New Task

Source: https://www.zoho.com/deluge/help/index

Fetches all tasks from a previous task list in Zoho Projects and creates a new task based on them. Useful for task duplication or batch creation.

```Deluge
previous_tasks = zoho.projects.getTasks("OLD_TASK_LIST_ID");
for each task in previous_tasks {
    new_task = map();
    new_task.put("task_name", "Follow-up on: " + task.get("task_name"));
    new_task.put("description", task.get("description"));
    zoho.projects.createTask(new_task);
}
info "New tasks created based on previous task list.";
```

--------------------------------

### Execute Deluge Blueprint Transition

Source: https://www.zoho.com/deluge/help/creator-blueprint-tasks/execute-transition

This Deluge task executes a specified transition within a blueprint for a given record in Zoho Creator. It requires the form link name, blueprint link name, transition link name, and the record ID.

```Deluge
thisapp.blueprint.executeTransition("orderManagement", "orderFlow", "delivered", input.ID);
```

--------------------------------

### Calculate Years Difference using yearsDiff() in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/yearsdiff

The yearsDiff() function in Deluge calculates the number of years between a start date-time and an end date-time. It considers the actual number of days in each year for the calculation. The function can be called directly with two date-time arguments or as a method of a date-time variable.

```Deluge
startDate = '1-Jan-2019';
endDate = '31-Dec-2019';
newStartDate = '1-Jan-2019';
newEndDate = '1-Jan-2020';
numberOfYears= yearsDiff(startDate, endDate); 
numOfYears = yearsDiff(newStartDate, newEndDate);
```

--------------------------------

### Fetch Records with Dynamic Criteria in Deluge

Source: https://www.zoho.com/deluge/help/cliq/get-records

This Deluge script shows how to fetch records from a Zoho Cliq database based on dynamic user input. It checks if the user message contains 'YES' to set the 'availability' criteria to true or false, then uses `zoho.cliq.getRecords` to retrieve the matching records.

```Deluge
response  = Map();
dynamic_value = false;

if(message.containsIgnoreCase("YES"))
{
dynamic_value = true;
}

query = "availability=="+dynamic_value;
text = zoho.cliq.getRecords("availabilitydatabase", {"criteria":query}, "cliq_connection");
response.put("text",text);
return response;
```

--------------------------------

### Extract Files from Zip using Deluge

Source: https://www.zoho.com/deluge/help/functions/file/extract

This Deluge code snippet demonstrates how to fetch a zip file from a URL using the invokeUrl task and then extract its contents using the extract() function. The extracted files are stored in a collection.

```Deluge
zip = invokeUrl
[
    url :"https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip"
    type :  GET
];
file_collection = zip.extract(); 
// The response will be a collection like the below. It may appear that the key and value are the same but the key is TEXT type and the value is a FILE OBJECT.
{
"sample.txt":"sample.txt"
}
```

--------------------------------

### Calculate Year Fraction Between Two Dates in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/yearfraction

The yearFraction function calculates the time period between two dates in decimal format. It divides the number of days between the dates by 365. The function handles date-time values and returns a negative value if the start date is after the end date.

```Deluge
date1 = '17-Jan-2019';
date2 = '29-Jan-2019';
yf = date1.yearFraction(date2);
info yf;                                                           // returns 0.03287671232876712
```

```Deluge
date3 = '24-Jun-1997';
date4 = '24-Mar-2001 10:10:37';
yearfractionvalue = date3.yearFraction(date4);
info yearfractionvalue;                                             // returns 3.7519608384069003
```

```Deluge
partpaymentdate = '03-Apr-2020';
enddate = '25-May-2035';
yfvalue = partpaymentdate.yearFraction(enddate);
info yfvalue;                                                    // returns decimal value 15.150684931506849
```

--------------------------------

### Deluge Client Functions: Focus, Hide, Show, Enable, Disable

Source: https://www.zoho.com/deluge/help/client-functions

Demonstrates Deluge client functions for manipulating UI elements, including focusing, hiding, showing, enabling, and disabling them. These functions are essential for creating interactive user interfaces in Zoho applications.

```deluge
focus("fieldName");
show("fieldName");
hide("fieldName");
enable("fieldName");
disable("fieldName");
```

--------------------------------

### Deluge sendmail Function Syntax

Source: https://www.zoho.com/deluge/help/misc-statements/send-mail

This snippet shows the basic syntax for the sendmail function in Zoho Deluge. It outlines the required and optional parameters for sending emails, including sender, recipient, subject, message, and attachments.

```deluge
sendmail
[
from: <from_address>
to: <to_address>
cc: <cc>
bcc: <bcc>
reply to: <reply_to_address>
subject: <subject>
message: <message>
content type: <content_type>
attachments: <attachment>
]
```

--------------------------------

### Insert CSV Data into Zoho Sheet

Source: https://www.zoho.com/deluge/help/sheet/insert-csv

The `zoho.sheet.insertCSV` task inserts CSV data into a specified worksheet of a Zoho Sheet file. It requires the resource ID of the sheet, the worksheet name, the CSV data, the starting row and column, and a connection name. The function returns the status of the operation.

```deluge
response = zoho.sheet.insertCSV("eev4nXXXXXXXXXXXXXXXXXXXXXXXXXXXcff41","Sheet1","Ben,ben@zylker.com,Trade Show,350,High", 1, 1, "Sheet_connection");
```

--------------------------------

### Zoho Projects Failure Response Formats

Source: https://www.zoho.com/deluge/help/projects/create

This snippet illustrates various JSON structures for failure responses in Zoho Projects API. It covers errors related to invalid project IDs, portal names, portal IDs, and missing mandatory input parameters.

```JSON
{
"error": {
"code": 6404,
"message": "Resource Not Found"
}
}
```

```JSON
{
"error": {
"code": 6504,
"message": "Domain Not Available"
}
}
```

```JSON
{
"error": {
"code": 6500,
"message": "General Error"
}
}
```

```JSON
{
"error": {
"code": 6831,
"message": "Input Parameter Missing"
}
}
```

--------------------------------

### Zoho WorkDrive Create Team Folder Task

Source: https://www.zoho.com/deluge/help/docs-tasks

This task facilitates the creation of a team folder in Zoho WorkDrive, enabling collaborative file management for teams.

```Deluge
Create Team Folder: Creates a team folder
```

--------------------------------

### Fetch User Networks in Deluge

Source: https://www.zoho.com/deluge/help/connect/fetch-my-networks

This Deluge code snippet demonstrates how to fetch the list of networks a user is associated with using the `zoho.connect.myNetworks()` function. The result is stored in the `networkDetails` variable.

```Deluge
networkDetails = zoho.connect.myNetworks();
```

--------------------------------

### Create Zoho Bookings Appointment

Source: https://www.zoho.com/deluge/help/bookings/create-appointment

This Deluge script creates a new appointment in Zoho Bookings. It requires service ID, appointment time, customer details (as a Map), staff ID, timezone, a boolean indicating if the staff ID belongs to the service module, and the OAuth connection name.

```Deluge
// Create a KEY-VALUE variable to hold the customer details
customerDetails = Map();
customerDetails.put("name", "Laura");
customerDetails.put("email", "laura@gmail.com");
customerDetails.put("phone_number", "9999999999");
 
//Execute the bookings integration task to create an appointment
response = zoho.bookings.createAppointment(3883XXXXXXXXXXX7032, "18-Oct-2019 12:15:00", customerDetails, 3883XXXXXXXXXXX7008, "Asia/Calcutta", true, "bookings_oauth_connection");

```

--------------------------------

### Define Deluge Custom Function for Deals

Source: https://www.zoho.com/deluge/help/deluge-in-zoho-services/zoho-sheet

This outlines the process of creating a custom Deluge function to retrieve deal information. It includes naming the function, setting the return type to 'list', and defining 'StartDate' and 'EndDate' arguments of type 'date'.

```Deluge
Function Name: DEALS_BETWEEN
Result Type: list
Arguments:
  StartDate: date
  EndDate: date
```

--------------------------------

### Calculate Years Between Dates in Deluge

Source: https://www.zoho.com/deluge/help/functions/datetime/yearsbetween

This Deluge code snippet demonstrates how to use the yearsBetween() function to calculate the number of years between two specified dates. It shows two examples: one where the dates are within the same year (resulting in 0 years) and another where the dates span across a year boundary (resulting in 1 year).

```Deluge
startDate = '1-Jan-2019';
endDate = '31-Dec-2019';
newStartDate = '1-Jan-2020';
newEndDate = '31-Dec-2020';
numberOfYears= yearsBetween(startDate, endDate); // returns 0
numOfYears = yearsBetween(newStartDate, newEndDate); // returns 1
```

--------------------------------

### Compare Text Fields in Deluge

Source: https://www.zoho.com/deluge/help/operators/creator-fields-and-their-applicable-operators

Demonstrates how to compare Text fields, including File Upload fields, with other Text fields using equality and inequality operators. It shows how file names are used for comparison.

```Deluge
info file_upload == single_line_field; //Returns true, as the value in the single line field and the value of the file upload field, are matched.
```

--------------------------------

### Extract Top Keywords with Specific Model and Length in Deluge

Source: https://www.zoho.com/deluge/help/ai-tasks/keyword-extraction

This Deluge script shows how to extract a specified number of top keywords, using a particular model type, and setting a maximum keyword length. It illustrates advanced usage of the `zoho.ai.extractKeywords` function.

```deluge
query = "An operating system (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.Time-sharing operating systems schedule tasks for efficient use of the system and may also include accounting software for cost allocation of processor time, mass storage, printing, and other resources.For hardware functions such as input and output and memory allocation, the operating system acts as an intermediary between programs and the computer hardware,[1][2] although the application code is usually executed directly by the hardware and frequently makes system calls to an OS function or is interrupted by it. Operating systems are found on many devices that contain a computer – from cellular phones and video game consoles to web servers and supercomputers.";

response = zoho.ai.extractKeywords(query,3,"RANKED_KEYWORDS_WITH_CATEGORY",2);
```

--------------------------------

### Post Message to Zoho Cliq Bot as Admin in Deluge

Source: https://www.zoho.com/deluge/help/cliq/post-to-bot-as-admin

This Deluge code snippet demonstrates how to post a message to a specified bot in Zoho Cliq, acting as an administrator. It utilizes the `zoho.cliq.postToBotAsAdmin` function, requiring the bot's name, the message content, and a valid Zoho Cliq connection name.

```Deluge
response = zoho.cliq.postToBotAsAdmin("ZohoDeluge", "Hello", "cliq_connection");
```

```Deluge
response = zoho.cliq.postToBotAsAdmin("ZohoDeluge",{"text":"Hello"}, "cliq_connection");
```

--------------------------------

### Focus Field in Subform Row - Deluge

Source: https://www.zoho.com/deluge/help/client-functions/focus

This Deluge code snippet shows how to set the focus on a field within a specific row of a subform. It requires using the 'row.' prefix to reference the subform field and is typically used in subform workflows to guide user input, such as shifting focus to the 'Card Number' field when 'Card' is selected as the payment mode.

```Deluge
if(Payment_Mode == "Card") 
 {
    focus row.Card_Number;
  }
```

--------------------------------

### Add Notes to a Lead in Zoho CRM using Deluge

Source: https://www.zoho.com/deluge/help/crm/create-record

This Deluge script shows how to add a note to a specific lead in Zoho CRM. It creates a map containing the note details, including the parent lead ID, and then uses `zoho.crm.createRecord` to associate the note with the lead.

```Deluge
notesMap = { "Parent_Id" :"2303XXXXXXXXXX", "Note_Title" :"Title",
"Note_Content" :"Note_Description", "$se_module" : "Leads"};
response = zoho.crm.createRecord("Notes", notesMap);
```

--------------------------------

### Perform Dynamic Calculations in Zoho Creator with Deluge

Source: https://www.zoho.com/deluge/help/index

Perform complex calculations and update results in real-time within Zoho Creator using Deluge scripting. This is useful for calculating totals, discounts, taxes, or other dynamic values.

```Deluge
// Example Deluge code for dynamic calculations
// (Specific code depends on the Zoho Creator application structure)
```

--------------------------------

### Zoho Projects API Failure Response - Missing Parameter

Source: https://www.zoho.com/deluge/help/projects/create-project

This JSON structure represents a failure response from the Zoho Projects API when a mandatory input parameter is missing. It provides an error code and a specific message.

```json
{
"error": {
"code": 6831,
"message": "Input Parameter Missing"
}
}
```

--------------------------------

### Send Document for Signature Collection using Zoho Deluge

Source: https://www.zoho.com/deluge/help/writer/v2-sign-document

This Deluge script demonstrates how to use the `zoho.writer.v2.signDocument` function to send a document for signature collection. It includes setting up recipients, attachments, and optional parameters like sequential signing and reminders.

```deluge
document_id = "f1nb************63d72";
signed_document_name = "Signed_document";
recipients_list = List();
recipients_map_1 = Map();
recipients_map_1.put("recipient_1","john@zylker.com");
recipients_map_1.put("recipient_name","john");
recipients_map_1.put("action_type","approve");
recipients_map_1.put("language","en");
recipients_list.add(recipients_map_1);
downloadFile1 = invokeurl
[
url :"https://www.africau.edu/images/default/sample.pdf"
type :GET
];
downloadFile2 = invokeurl
[
url :"https://www.africau.edu/images/default/sample.pdf"
type :GET
];
attachments_list = List();
attachments_list.add(downloadFile1);
attachments_list.add(downloadFile2);
optional_settings = Map();
optional_settings.put("attachments",attachments_list);
optional_settings.put("subject","Reg Document Sign");
optional_settings.put("message","Please find the document to be signed here");
optional_settings.put("is_sequential","true");
optional_settings.put("reminder_period","1");
optional_settings.put("expire_in","2");
response = zoho.writer.v2.signDocument(document_id,recipients_list,signed_document_name,optional_settings,"writerconnection");
info response;
```

--------------------------------

### Create Customer Payment in Zoho Invoice

Source: https://www.zoho.com/deluge/help/invoice/create-record

This Deluge script illustrates how to create a customer payment record in Zoho Invoice. It defines a map with payment details such as customer ID, payment mode, amount, and date, and then calls `zoho.invoice.create` to submit the payment.

```Deluge
CusPayMap=map();
CusPayMap.put("customer_id","13144XXXXXXXXXXXX");
CusPayMap.put("payment_mode","cheque");
CusPayMap.put("amount","450");
CusPayMap.put("date","2017-01-01");
response =zoho.invoice.create("Customerpayments", "5368XXXX",CusPayMap);
```

--------------------------------

### Zoho Books: Apply Discount on Sales Order

Source: https://www.zoho.com/deluge/help/index

Applies a discount to a sales order in Zoho Books if it exceeds a certain limit. This automates promotional offers.

```Deluge
salesorder = Salesorder.get("SO_ID");
if (salesorder.get("total") > 1000) {
    salesorder.put("discount", 5); // Apply 5% discount
    salesorder.update();
    info "Discount applied to Sales Order: " + salesorder.get("salesorder_number");
}
```

--------------------------------

### Upload File to Zoho Recruit Record using Deluge

Source: https://www.zoho.com/deluge/help/recruit/create-record-upload-document

This Deluge script demonstrates how to upload a file to a specific record within Zoho Recruit. It utilizes the `zoho.recruit.uploadFile` function, specifying the record ID, file input, file type, target module, and the Zoho Recruit connection name.

```Deluge
response = zoho.recruit.uploadFile("1687000000116035", input.file, "Others", "Candidates", "recruit_connection");
```

--------------------------------

### Post Image Attachment using Deluge

Source: https://www.zoho.com/deluge/help/cliq/posting-to-zoho-cliq

This script shows how to post a message with an image attachment to a specified channel. The 'slides' key is used, with the 'type' set to 'images' and 'data' containing the image URL.

```Deluge
image_data = {
                        "text":"Image",
                        "slides":
                        [{
                        "type":"images",
                        "data":["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz4pZuwLofV4goZVT0e2R3K5bElhWk3oMDuUgP3XT9p9d4_Tkv4g"]
                        }]
                        };
response = zoho.cliq.postToChannel("DelugeChannel",image_data);
```

--------------------------------

### Zoho Deluge Failure Response - Domain Not Available

Source: https://www.zoho.com/deluge/help/projects/associate-logs

This JSON structure signifies a 'Domain Not Available' error, which occurs when an invalid portal name is used in the API request.

```json
{
"error": {
"code": 6504,
"message": "Domain Not Available"
}
}
```

--------------------------------

### Image Field Formatting in Deluge

Source: https://www.zoho.com/deluge/help/data-access/add-record

Explains the required format for specifying image URLs in Deluge, including optional title, linkname, and target parameters, and emphasizes the need for a public image URL.

```Deluge
// Format: <a href="http://<LINKNAME>" title="<TITLE>" target="_blank"><img src="<URL>" title="<TITLE>"></img></a>
// Ensure the image URL points to a public image.
```

--------------------------------

### Deluge getPrefixIgnoreCase() Syntax

Source: https://www.zoho.com/deluge/help/functions/string/getPrefixIgnoreCase

Demonstrates the two possible syntaxes for using the getPrefixIgnoreCase() function in Deluge to retrieve characters preceding a search string.

```Deluge
<variable> = <inputText>.getPrefixIgnoreCase(<searchText>);
```

```Deluge
<variable>=getPrefixIgnoreCase(<inputText>,<searchText>);
```

--------------------------------

### Fetch and Display Employee Names (Deluge)

Source: https://www.zoho.com/deluge/help/data-access/for-each-record

This script fetches all records from the 'Employees' form and displays the 'Name' field for each record. It utilizes a for-each loop to iterate through the collection.

```deluge
for each EmployeeDetails in Employees  
{
  info EmployeeDetails.Name;
}
```

--------------------------------

### Zoho Creator: Built-in Functions - Truncate, Signum, Degrees, etc.

Source: https://www.zoho.com/deluge/help/release-notes

Several mathematical and string manipulation built-in functions, including truncate, signum, degrees, radians, ltrim, and rtrim, are now available in all services except Zoho Creator.

```Deluge
// Example using truncate function (available in most services except Creator)
number = 123.456;
truncated_number = truncate(number, 2);
info "Truncated number: " + truncated_number;
```

```Deluge
// Example using ltrim function (available in most services except Creator)
text = "   Hello World   ";
trimmed_text = ltrim(text);
info "Trimmed text: " + trimmed_text;
```

--------------------------------

### Deluge: Sending an Email

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script shows how to send an email using the 'sendmail' task. It specifies the recipient, subject, and content of the email.

```deluge
// Sending an email notification
sendmail
[
    "recipient": "user@example.com",
    "from": "noreply@yourcompany.com",
    "subject": "Task Reminder",
    "content": "This is a reminder for your upcoming task."
];
```

--------------------------------

### Deluge: Iterate Through a List

Source: https://www.zoho.com/deluge/help/list-manipulations/for-each-element

This Deluge code snippet demonstrates how to iterate through a list of strings using the 'for each' task. It prints each element of the 'numbers' list to the info log.

```Deluge
numbers = {"One", "Two", "Three"};
for each item in numbers
{
info item;
}
```

--------------------------------

### Deluge Sendmail Task Syntax Assist

Source: https://www.zoho.com/deluge/help/release-notes

The 'sendmail' Deluge task now supports adding 'cc', 'bcc', and 'reply-to' fields using the syntax assist form, in addition to the existing 'from', 'to', 'subject', and 'message' fields.

```Deluge
sendmail(
  from : 'sender@example.com',
  to : 'recipient@example.com',
  cc : 'cc@example.com',
  bcc : 'bcc@example.com',
  replyTo : 'replyto@example.com',
  subject : 'Email Subject',
  message : 'Email Body'
)
```

--------------------------------

### Deluge CSV File Iteration with For Each

Source: https://www.zoho.com/deluge/help/release-notes

The 'for each element' Deluge task can now iterate over the contents of CSV files, providing a more streamlined way to process CSV data within Deluge scripts.

```Deluge
for each row in csv_file {
  // process row data
}
```

--------------------------------

### Zoho Recruit: Add Record

Source: https://www.zoho.com/deluge/help/recruit-tasks

Creates a new record within Zoho Recruit. This function is essential for populating the system with new data.

```Deluge
record = map();
// Add field values to the map
// record.put("fieldname", "value");
response = zoho.recruit.addRecord("ModuleName", record);
info response;
```

--------------------------------

### Zoho Bookings: Create Appointment

Source: https://www.zoho.com/deluge/help/bookings-tasks

Creates a new appointment in Zoho Bookings. This function typically requires details about the service, staff, customer, and time slot.

```Deluge
createAppointment(appointmentDetails);
```

--------------------------------

### Extract English Text from Image using OCR

Source: https://www.zoho.com/deluge/help/ai-tasks/recognize-text

This Deluge script demonstrates how to fetch an image file from a URL and then use the zoho.ai.recognizeText task to extract English text using the OCR model. It specifies the file, model type, and language for the OCR process.

```deluge
image = invokeurl
[
url: "https://www.mmppicture.co.in/wp-content/uploads/2020/08/Action-Hero-Text-PNG-1080x842.jpg"
type: GET
];

info zoho.ai.recognizeText(image,"OCR","eng");
```

--------------------------------

### Deluge AI Tasks Added to Zoho Creator

Source: https://www.zoho.com/deluge/help/release-notes

Artificial intelligence tasks, previously available in other Zoho services, are now supported in Zoho Creator. These include object detection and keyword extraction from text.

```Deluge
detectObject(image_data)
```

```Deluge
extractKeywords(text_data)
```

--------------------------------

### Deluge: Updating a Solution

Source: https://www.zoho.com/deluge/help/script/sign/get-template-by-id

This Deluge script demonstrates how to update an existing solution in Zoho CRM by its ID, changing its status and content.

```deluge
// Updating an existing Solution with ID '5566778899001'
solutionId = "5566778899001";
updateSolutionMap = Map();
updateSolutionMap.put("Status", "Draft");
updateSolutionMap.put("Solution_Content", "Updated steps for password reset...");

updateSolutionResponse = zoho.crm.updateRecord("Solutions", solutionId, updateSolutionMap);
info updateSolutionResponse;
```