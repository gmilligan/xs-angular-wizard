#xs-angular-wizard-directive
Angular/Bootstrap directive to easily create attractive and practical wizard interface.

###Table of Contents 
* [Module Definition](#module)
* [Wizard Configuration](#configuration)
* [Basic Usage](#usage)
* [Navigation](#navigation)
* [Controller Interaction](#controller)
* [Demo](#demo)

----
<a name="module"></a>
###Module Definition
Include XyberSolve Wizard module `xs.ui.wizard` into your project

Syntax:
```js

    angular.module('app', ['xs.ui.wizard']);
    
```
----

<a name="configuration"></a>
###Configuration
There are several wizard elements that can be toggle to your liking (sample code below). 
The `has-*` attributes can be set to `false` or just left out to hide the associated element.  

 attribute        | functionality
------------------|----------------------------
`has-save`        |  Toggle "Save" on last page, replaces "Next" button. 
`has-cancel`      | Toggle "Cancel" button (left of "Save") on last page only.     
`has-breadcrumbs` | Toggle button group showing page "tags". 
`save-text`       | Text to be displayed on "Save" Button 
`on-page-change`  | Register controller method to call on page change.
`on-save`         | Register controller method to call when "Save" is pressed.
`on-cancel`       | Register controller method to call when "Cancel" is pressed. 

Syntax (below):
* No "cancel" button is shown, has-cancel is left out
* "Save" button will read "Save", which is default

```html
    
    <xs-wizard sub-title="Create New Image"
               has-save="true"
               has-breadcrumbs="true"
               on-page-change="vm.validate(state);"
               on-cancel="vm.cancel();"
               on-save="vm.save();">

```
----

<a name="usage"></a>
###Basic Usage
Markup below will create a 4 page wizard, with pages showing:

1. User Info
2. Order
3. Payment 
4. Purchase

```html

    <xs-wizard sub-title="Create New Image"
               has-save="true"
               has-breadcrumbs="true"
               save-text="Submit Order"
               on-page-change="sample.show(state);"
               on-cancel="imageEdit.cancel();"
               on-save="imageEdit.save();">

        <xs-wizard-page page-tag="User Info">
            <div ...
        </xs-wizard-page>
    
        <xs-wizard-page page-tag="Order">
            <div ...
        </xs-wizard-page>

        <xs-wizard-page page-tag="Payment">
            <div ...
        </xs-wizard-page>
        
        <xs-wizard-page page-tag="Purchase">
            <div ...
        </xs-wizard-page>
        
    </xs-wizard>

```  
----

<a name="navigation"></a>
###Navigation
The wizard supplies (based on configuration)
* "Next" button - go to next page (not displayed on last page)
* "Prev" button - go to previous page (not displayed on first page)
* Breadcrumb buttons - got directly to a specific page 

#####Page 1 - User Info 
![Page 1 - User Info](http://www.xybersolve.com/xs-angular-wizard/screenshots/page-1-user-info.png "Wizard - Page 1")

#####Page 4 - Confirmation
![Page 4 - Confirmation](http://www.xybersolve.com/xs-angular-wizard/screenshots/page-4-confirmation.png "Wizard - Page 1")

----

<a name="controller"></a>
###Controller Interaction

Simplified Controller Syntax:
```javascript

  angular
    .module('app')
    .controller('MyCtrl', ['myService', MyCtrl]);
  
  function MyCtrl(myService){
    var vm = this;
    vm.pageChange = function(state) {
        console.dir(state);
        // state is an object describing page context
        //{state: { previousPage: 2, currentPage: 3 }};
    };
    vm.save = function() {
        console.log('Got Save');
    };
    vm.cancel = function() {
        console.log('Got Cancel');
    };
  }
    
```

Markup Syntax:
```html
    
<div ng-controller="MyCtrl as vm">
    <xs-wizard sub-title="Create New Image"
               has-save="true"
               has-breadcrumbs="true"
               on-page-change="vm.pageChange(state);"
               on-cancel="vm.cancel();"
               on-save="vm.save();">
    ...           

```

----
<a name="demo"></a>
###Demo of Wizard
Here is a demonstration of the wizard in action. "Cancel" button is turned off.

[Demo of Wizard](http://common.xybersolve.com/xs-angular-wizard/demo/xs-wizard-demo.html)

---
###ToDo
* Validation method for page change  - will block page change until requirements are met.
 