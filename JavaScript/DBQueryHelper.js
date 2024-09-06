var DBQueryHelper = Class.create();
DBQueryHelper.prototype = {
    initialize: function() {},
//Functions to support querying the SN Databases
    /**
     * Retrieves a record from a table as a GlideRecord object
     * 
     * @param {string} tableName - Table to query
     * @param {string} sysId - Record sys_id to query
     * @returns {?GlideRecord object} - The retrieved record as a GlideRecord object or null if invalid inputs or record not found
     **/
    getGlideRecordFromSysId: function(tableName, sysId) {
        if (!gs.tableExists(tableName) || typeof(sysId) !== "string") {
            return null;
        }

        const recordGr = new GlideRecord(tableName);
        if (recordGr.get(sysId)) {
            return recordGr;
        }
        return null;
    },

    /**
     * Retrieves table records form a query
     * 
     * @param {string} tableName - Table to query
     * @param {string} encodedQuery - Encoded query to use for check
     * @returns {?GlideRecord Object} - Returned records as a GlideRecord object
     **/
    getRecords(tableName, encodedQuery) {
        if (!gs.tableExists(tableName) || typeof(encodedQuery) !== "string") {
            return null;
        }

        let recordsGr = new GlideRecord(tableName);
        if (recordsGr.isEncodedQueryValid(encodedQuery)) {
            recordsGr.addEncodedQuery(encodedQuery);
        } else {
            return null;
        }

        recordsGr.query();
        if (recordsGr.hasNext()) {
            return recordsGr;
        } else {
            return null;
        }
    },

	/**
     * Checks if records exist in table from a query
     * 
     * @param {string} tableName - Table to query
     * @param {string} encodedQuery - Encoded query to use for check
     * @returns {?boolean} - If the query against the table returned any records. Null if the table does not exist or the query is invalid
     **/
    checkForRecords: function(tableName, encodedQuery) {
        if (!gs.tableExists(tableName)) {
            return null;
        }

        let recordsGr = new GlideRecord(tableName);
        if (recordsGr.isEncodedQueryValid(encodedQuery)) {
            recordsGr.addEncodedQuery(encodedQuery);
        } else {
            return null;
        }
        recordsGr.setLimit(1);
        recordsGr.query();
        return recordsGr.hasNext();
    },

    type: 'DBQueryHelper'
};