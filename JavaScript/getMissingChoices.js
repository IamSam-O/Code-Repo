function getMissingChoices() {
    var fields = [];
    var grSD = new GlideRecord('sys_dictionary');
    grSD.addEncodedQuery("sys_created_by=" + gs.getUserName() + "^internal_type=choice");
    grSD.query();
    while (grSD.next()) {
        var obj = {};
        obj.element = grSD.getValue('element');
        obj.table = grSD.getValue('name');
        obj.label = grSD.getValue('column_label');
        fields.push(obj);

    }

    var choicesToPopulate = fields.map(function(obj) {
        var grSysChoice = new GlideRecord('sys_choice');
        grSysChoice.addEncodedQuery("element=" + obj.element);
        grSysChoice.query();
        if (!grSysChoice.next()) {
            return obj;
        }
    }).filter(function(obj) {
        return obj != null;
    });

	return choicesToPopulate;

}

gs.info(JSON.stringify(getMissingChoices(),"\t",2));
