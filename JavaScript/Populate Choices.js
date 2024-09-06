/*
**********************************************************************************************************************************************************
                                      PLEASE READ THE FOLLOWING BEFORE USE
                                      1. The current scope MUST BE set to Global before running this script in a background script 
                                      2. This script is used to populate choices in a choice list.
                                      3. The script takes in 4 parameters: table, element, object_array, scope
                                        3a. table: the table name where the choice list is located
                                        3b. element: the field name of the choice list
                                        3c. object_array: the array of objects to be inserted as choices in the choice list
                                        3d. scope: the scope sys_id the choices need to be inserted into. If no scope value is provided
                                            it will default to Global (optional)
                                      4. The script will iterate through the object_array and insert the choices into the choice list
                                      5. The script will insert the choices in the order they are in the object_array
                                  
**********************************************************************************************************************************************************

*/
var scope = '9a3674243bf54a103b66136aa5e45a86';
//scope is optional, use if needing to insert choices in a specific scope
var table = 'x_teta_tt_om_enrichment';
//table is the table name where the choice list is located
var choice_field = 'eproduct_type';
//choice_field is the field name of the choice list

var choices = [{"Item1":"item_1"},{"Item2":"item_2"},{"Item3":"item_3"},{"Item4":"item_4"},{"Item5":"item_5"},{"Item6":"item_6"}];
//choices will be the input array of objects to be inserted as choices in the choice list

populateChoices(table, choice_field, choices, scope);


function populateChoices(table, element, object_array,scope) {
  var grChoice = new GlideRecord('sys_choice');
  object_array.forEach(function(object,index) {
    for (var property in object) {
      grChoice.initialize();
      var label = property;
      var value = object[property];
      grChoice.name = table;
      grChoice.element = element;
      grChoice.label = label;
      grChoice.value = value;
      if(!gs.nil(scope)){
        grChoice.scope = scope;
      }
      grChoice.sequence = index;
      grChoice.insert();
    }
  });

}
