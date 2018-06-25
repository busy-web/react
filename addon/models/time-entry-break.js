/**
 * @module Models
 *
 */
import Model from '../utils/model';
import attr from '../utils/attr';
import { FIND, FILTER, CREATE, UPDATE } from '../utils/define-api';

class TimeEntryBreak extends Model {
  static methodsAllowed = [ FIND, FILTER, CREATE, UPDATE ];

  static properties = {
    id: attr('string', { primaryKey: true }),

    timeEntryId: attr('string', { foreignKey: true }),
    startLocationId: attr('string', { foreignKey: true }),
    endLocationId: attr('string', { foreignKey: true }),

    startTime: attr('number', { filter: true }),
    endTime: attr('number', { filter: true }),
    paidBreak: attr('boolean', { filter: true, defaultValue: false }),

    startTimeDst: attr('boolean'),
    startMetaOffset: attr('number'),
    startDeviceTime: attr('number'),
    startTimeTrusted: attr('number'),

    endTimeDst: attr('boolean'),
    endMetaOffset: attr('number'),
    endDeviceTime: attr('number'),
    endTimeTrusted: attr('number'),

    actionType: attr('number'),

    updatedOn: attr('int', { filter: true }),
    deletedOn: attr('int', { filter: true }),
    createdOn: attr('int', { filter: true }),
  };
}

export default TimeEntryBreak;
