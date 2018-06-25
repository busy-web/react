/**
 * @module Models
 *
 */
import Model from '../utils/model';
import attr from '../utils/attr';
import { FIND, FILTER, CREATE, UPDATE } from '../utils/define-api';

class TimeEntry extends Model {
  static methodsAllowed = [ FIND, FILTER, CREATE, UPDATE ];

  static properties = {
    id: attr('string', { primaryKey: true }),

    memberId: attr('string', { foreignKey: true }),
    projectId: attr('string', { foreignKey: true }),
    costCodeId: attr('string', { foreignKey: true }),
    equipmentId: attr('string', { foreignKey: true }),
    positionId: attr('string', { foreignKey: true }),
    startLocationId: attr('string', { foreignKey: true }),
    endLocationId: attr('string', { foreignKey: true }),

    startTime: attr('int', { filter: true }),
    endTime: attr('int', { filter: true }),

    offset: attr('int'),
    metaOffset: attr('int'),
    daylightSavingTime: attr('boolean'),
    metaDaylightSavingTime: attr('boolean'),

    startDeviceTime: attr('int'),
    endDeviceTime: attr('int'),
    startTimeTrusted: attr('int'),
    endTimeTrusted: attr('int'),
    actionType: attr('int'),

    description: attr('string'),

    updatedOn: attr('int', { filter: true }),
    deletedOn: attr('int', { filter: true }),
    createdOn: attr('int', { filter: true }),
  };
}

export default TimeEntry;
