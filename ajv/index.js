var { get, every } = require('lodash');
var camelcaseKeys = require('camelcase-keys');
var Ajv = require('ajv');
var ajv = new Ajv();

const schedules = [
  {
    "storeKey": null,
    "name": "Global Daily Thaw",
    "uniqueName": "global daily thaw_null",
    "status": "Active",
    "frequencies": [
      {
        "days": [
          "Sun"
        ],
        "frequencyTime": "4:15 AM",
        "isThaw": true,
        "isPrep": false
      },
      {
        "days": [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat"
        ],
        "frequencyTime": "4:45 PM",
        "isThaw": true,
        "isPrep": false
      }
    ],
    "id": "prod-sched-0002"
  },
  {
    "storeKey": "store_test",
    "name": "Local VN Store Daily Prep",
    "uniqueName": "local vn store daily prep_store_test",
    "status": "Active",
    "frequencies": [
      {
        "days": [
          "Thu",
          "Fri",
          "Sat",
          "Sun"
        ],
        "frequencyTime": "3:30 PM",
        "isThaw": false,
        "isPrep": true
      },
      {
        "days": [
          "Mon",
          "Tue",
          "Wed"
        ],
        "frequencyTime": "4:00 PM",
        "isThaw": false,
        "isPrep": true
      }
    ],
    "id": "prod-sched-0003"
  },
  {
    "storeKey": "store_test",
    "name": "Local VN Store Daily Thaw",
    "uniqueName": "local vn store daily thaw_store_test",
    "status": "Active",
    "frequencies": [
      {
        "days": [
          "Mon",
          "Tue",
          "Sat",
          "Sun"
        ],
        "frequencyTime": "6:00 PM",
        "isThaw": true,
        "isPrep": false
      },
      {
        "days": [
          "Sat",
          "Sun"
        ],
        "frequencyTime": "6:45 PM",
        "isThaw": true,
        "isPrep": false
      }
    ],
    "id": "prod-sched-0004"
  }
];

const schema = {
  type: 'object',
  properties: {
    storeKey: { type: ["string", "null"] },
    id: { type: "string"},
    name: { type: 'string', minLength: 1, maxLength: 25 },
    uniqueName: { type: 'string' },
    frequencies: { type: "array" },
    status: { type: 'string' },
  },
  required: [ 'name', 'frequencies', 'status' ],
  additionalProperties: false,
  '$id': 'ProductionSchedule',

  keys: ['id'],
  unique: ['name', 'uniqueName']
};

const newSchedule = {
  "storeKey": null,
  "name": "Global Daily Thaw a",
  "uniqueName": "global daily thaw_null",
  "status": "Active",
  "frequencies": [
    {
      "days": [
        "Mon",
        "Sat",
        "Sun"
      ],
      "frequencyTime": "4:15 AM",
      "isThaw": true,
      "isPrep": false
    },
    {
      "days": [
        "Sun"
      ],
      "frequencyTime": "4:45 PM",
      "isThaw": true,
      "isPrep": false
    }
  ],
  "id": "prod-sched-0004-a"
};

function uniqueValidator(fields, item, array) {
  const valid = ajv.validate(
    { "uniqueItems": true },
    [
      get(item, fields),
      ...array.map(piece => get(piece, fields))
    ]
  );
  if (!valid) return ajv.errors;
  return 'valid';
}

function validator(schema, item, array) {
  const { keys, unique } = schema;

  if (!keys) return { error: 'Keys not found.'};
  const uniqueProps = [keys, ...unique];

  let validateError = null;
  if (array) {
    every(uniqueProps, (prop) => {
      const propValidateRes = uniqueValidator(prop, item, array);
      if (propValidateRes !== 'valid') {
        validateError = ajv.errors;
        return false;
      }
      return true;
    });

    if (validateError) return validateError;
  }

  if (!ajv.validate(schema, item)) return { error: JSON.stringify(ajv.errors) };
  if (!array) return 'valid';

  return 'valid'
}

// console.log(validator(schema, newSchedule, schedules));
const pullItem = {
  "job_log_id": "01",
  "store_key": {
    "store_test": "Rim"
  },
  "item_id": "inv-item-0000010",
  "item_name": "BUTTERMILK 1% 16-1QT CNTRYFR",
  "thaw_uom": "Each",
  "thaw_uom_id": "inv-uom-0001",
  "thaw_time": "01:00",
  "shelf_life": "04:45",
  "on_hand": 0,
  "frequency_time": "09:00 PM",
  "forecast_start_time": "2018-07-26T15:00:00.000Z",
  "forecast_end_time": "2018-07-26T15:59:00.000Z",
  "forecast_quantity": 0,
  "quantity_needed": 0,
  "suggested_pull": 99,
  "actual_pull_ready_time": "2018-07-26T15:00:00.000Z",
  "actual_pull_expired_time": "2018-07-26T19:45:00.000Z",
  "available_quantity": [],
  "minimum_quantity": 99,
  "actual_pull_quantity": null,
  "id": "r-id-1"
};
console.log(camelcaseKeys([pullItem], {exclude: ["store_key"], deep: true, }));