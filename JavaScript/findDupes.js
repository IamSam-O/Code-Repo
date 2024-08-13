var mds = [
  "2d609f9f970539100ebd7d871153af92",
  "fd609f9f970539100ebd7d871153afa0",
  "291bcacd97ef71d00ebd7d871153af8b",
  "a11bcacd97ef71d00ebd7d871153af7f",
  "25609f9f970539100ebd7d871153af94",
  "291bcacd97ef71d00ebd7d871153af80",
  "2d609f9f970539100ebd7d871153af95",
  "ad1bcacd97ef71d00ebd7d871153af81",
  "e5609f9f970539100ebd7d871153af97",
  "251bcacd97ef71d00ebd7d871153af83",
  "e5609f9f970539100ebd7d871153af99",
  "a91bcacd97ef71d00ebd7d871153af84",
  "ed609f9f970539100ebd7d871153af9a",
  "211bcacd97ef71d00ebd7d871153af86",
  "f5609f9f970539100ebd7d871153af9c",
  "a51bcacd97ef71d00ebd7d871153af87",
  "fd609f9f970539100ebd7d871153af9d",
  "2d1bcacd97ef71d00ebd7d871153af88",
  "f5609f9f970539100ebd7d871153af9f",
  "a11bcacd97ef71d00ebd7d871153af8a",
  "e79fcf5f970539100ebd7d871153af52",
  "6b9fcf5f970539100ebd7d871153af23",
  "639fcf5f970539100ebd7d871153af0c",
  "eb9fcf5f970539100ebd7d871153af1c",
  "679fcf5f970539100ebd7d871153af1b",
  "e79fcf5f970539100ebd7d871153af1f",
  "2b9fcf5f970539100ebd7d871153af0d",
  "639fcf5f970539100ebd7d871153af1e",
  "6f9fcf5f970539100ebd7d871153af20",
  "679fcf5f970539100ebd7d871153af26",
  "eb9fcf5f970539100ebd7d871153af27",
  "ef9fcf5f970539100ebd7d871153af24",
  "e39fcf5f970539100ebd7d871153af22",
  "ef9fcf5f970539100ebd7d871153af2f",
  "679fcf5f970539100ebd7d871153af4e",
  "e79fcf5f970539100ebd7d871153af2a",
  "6b9fcf5f970539100ebd7d871153af2e",
  "e39fcf5f970539100ebd7d871153af2d",
  "679fcf5f970539100ebd7d871153af31",
  "6f9fcf5f970539100ebd7d871153af2b",
  "eb9fcf5f970539100ebd7d871153af32",
  "639fcf5f970539100ebd7d871153af51",
  "eb9fcf5f970539100ebd7d871153af4f",
  "ef9fcf5f970539100ebd7d871153af4c",
  "6f9fcf5f970539100ebd7d871153af53",
  "e433c8a4c38bf510d01e69deb00131db",
];

function findDupes(sys_id) {
  var encodedQuery = "metric_definition=" + sys_id;

  var table = "sn_grc_metric_m2m_definition_profile";
  var ignoreArr = [
    "sys_updated_by",
    "sys_created_on",
    "sys_mod_count",
    "sys_updated_on",
    "sys_domain_path",
    "sys_domain",
    "sys_created_by",
  ];
  var test = new recordToJSON().createObjectArr(
    table,
    encodedQuery,
    ignoreArr,
    false
  );

  function findObjectsByProperty(array, property, value) {
    var matches = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i][property] === value) {
        matches.push(array[i]);
      }
    }
    // If there are multiple matches, return the array of matches, otherwise return null
    return matches.length > 1 ? matches : null;
  }

  function flattenArray(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten
      );
    }, []);
  }

  function removeDuplicates(array, property) {
    var seen = {};

    return array.filter(function (item) {
      if (!seen.hasOwnProperty(item[property])) {
        seen[item[property]] = true;
        return true;
      }
      return false;
    });
  }

  var output = test
    .map(function (item, index, array) {
      var profile_sys = item.profile;
      //gs.info(profile_sys)
      var results = findObjectsByProperty(array, "profile", profile_sys);
      return results;
    })
    .filter(function (value) {
      return value !== null;
    });

  var flattenOutput = flattenArray(output);
  var nondupes = removeDuplicates(flattenOutput, "sys_id");
  return nondupes;
}

var output = mds
  .map(function (value) {
    return findDupes(value);
  })
  .filter(function (item) {
    return item.length > 1;
  });

gs.info(JSON.stringify(output));
