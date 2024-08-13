var choices = [{"Item1":"item_1"},{"Item2":"item_2"},{"Item3":"item_3"},{"Item4":"item_4"},{"Item5":"item_5"},{"Item6":"item_6"}];

var scope = '9a3674243bf54a103b66136aa5e45a86';

var table = 'x_teta_tt_om_enrichment';

var choice_field = 'eproduct_type';

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
