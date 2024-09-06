// GlideService class to support DB operations
var TTGlideService = function(tableName) {
    return {
        glidify: glidify,
        insert: insert,
        multiple: multiple,
        objectify: objectify,
        remove: remove,
        single: single,
        singleId: singleId,
        update: update,
        type: 'TTGlideService'
    };

    function glidify(object) {
        if (object && object.sys_id.value) {
            var glideRecord = _create();

            if (glideRecord.get(object.sys_id.value)) {
                return glideRecord;
            }
        }
    }

    function insert(record) {
        var glideRecord = _create(true);

        if (glideRecord) {
            glideRecord = _populate(glideRecord, record);

            if (glideRecord) {
                return glideRecord.insert();
            }
        }

        return false;
    }

    function multiple(query, fields, limit) {
        var glideRecord = _create();

        if (query) {
            glideRecord.addQuery(query);
        }

        if (limit > 0) {
            glideRecord.setLimit(limit);
        }

        glideRecord._query();

        if (glideRecord.hasNext()) {
            return _toArray(glideRecord, fields);
        }

        return [];
    }

    function objectify(glideRecord) {
        if (glideRecord instanceof GlideRecord) {
            return _toObject(glideRecord);
        }

        return glideRecord;
    }

    function remove(sysId) {
        var glideRecord = _create();

        if (glideRecord.get(sysId)) {
            return glideRecord.deleteRecord();
        }
    }

    function single(query, fields) {
        var glideRecord = _create();

        glideRecord.setLimit(1);
        glideRecord.addEncodedQuery(query);
        glideRecord._query();

        if (glideRecord._next()) {
            return _toObject(glideRecord, fields);
        }

        return null;
    }

    function singleId(sysId, fields) {
        var glideRecord = _create();

        if (glideRecord.get(sysId)) {
            return _toObject(glideRecord, fields);
        }

        return null;
    }

    function update(sysId, record) {
        var glideRecord = _create();

        if (glideRecord.get(sysId)) {
            glideRecord = _populate(glideRecord, record);

            if (glideRecord) {
                return glideRecord.update();
            }
        }

        return false;
    }

    function _create(initialize) {
        var glideRecord = new GlideRecord(tableName);

        if (initialize) {
            glideRecord.initialize();
        }

        return glideRecord;
    }

    function _populate(glideRecord, record) {
        for (var field in record) {
            if (glideRecord.isValidField(field) && !field.match(/^sys_/)) {
                var element = glideRecord.getElement(field);
                var descriptor = element.getED();

                var value = record[field] != null ? record[field] : '';

                if (descriptor.getInternalType() == 'currency2') {
                    if (!value.toString().match(/^USD;.+/)) {
                        value = 'USD;' + value;
                    }

                    glideRecord[field].setDisplayValue(value);

                } else {
                    glideRecord.setValue(field, value);
                }
            }
        }

        return glideRecord;
    }

    function _toArray(glideRecord, fields) {
        var array = [];

        while (glideRecord._next()) {
            array.push(_toObject(glideRecord, fields));
        }

        return array;
    }

    function _toObject(glideRecord, fields) {
        fields = fields || [];

        if (typeof fields === 'string') {
            fields = fields.split(',');
        }

        var object = {};

        if (fields.length) {
            if (fields.length === 1) {
                object = _setField(object, fields[0], glideRecord);

            } else {
                fields.forEach(function(field) {
                    object = _setField(object, field, glideRecord);
                });
            }

        } else {
            for (var field in glideRecord) {
                object = _setField(object, field, glideRecord);
            }
        }

        return object;
    }

    function _setField(object, field, glideRecord) {
        if (glideRecord.isValidField(field)) {
            var value = glideRecord.getValue(field);
            var displayValue = glideRecord.getDisplayValue(field);

            object[field] = {
                value: value != null ? value : '',
                displayValue: displayValue != null ? displayValue : ''
            };
        }

        return object;
    }
};