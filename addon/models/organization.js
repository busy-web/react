/**
 * @module Models
 *
 */
import Model from '../utils/model';
import attr from '../utils/attr';
import { FIND, FILTER, CREATE, UPDATE } from '../utils/define-api';

class Organization extends Model {
  static primaryKey = 'id';
  static filterKeys = ['organizationName'];
  static foreignKeys = ['stripeCustomerId', 'ownedBy'];

  static methodsAllowed = [ FIND, FILTER, CREATE, UPDATE ];

  static properties = {
    id: attr('string', { primaryKey: true }),

    ownedBy: attr('string', { foreignKey: true }),
    stripeCustomerId: attr('string', { foreignKey: true }),

    organizationName: attr('string', { filter: true }),

    imageUrl: attr('string', { restrictSend: true }),
    imageThumbUrl: attr('string', { restrictSend: true }),

    betaTester: attr('boolean'),
    disclaimer: attr('string'),
    overtimeFlag: attr('boolean'),
    requireCostCode: attr('boolean'),
    requireProject: attr('boolean'),
    totalTimeFlag: attr('int'),
    trackCostCode: attr('boolean'),
    trackProject: attr('boolean'),
    trackPaidBreak: attr('boolean'),
    trackBudgets: attr('boolean'),
    trackEquipment: attr('boolean'),
    webGps: attr('boolean'),
    timeRounding: attr('boolean'),
    timeRoundingInterval: attr('int'),
    timeRoundingType: attr('int'),
    safetySignature: attr('boolean'),
    safetySignatureMessage: attr('string'),
    timeAccuracy: attr('boolean'),
    timeAccuracyMessage: attr('string'),
    defaultStartTime: attr('string'),
    defaultEndTime: attr('string'),
    defaultBreakDuration: attr('string'),

    signatureDate: attr('int'),																		// Enable Digital Signatures
    lockOnSelfSignature: attr('boolean'),														// Lock Time Card on Approval
    authoritativeSignature: attr('boolean'),	// Enable Supervisor Signatures

    createdOn: attr('int'),
    updatedOn: attr('int'),
    revokedOn: attr('int'),
    deletedOn: attr('int'),
  };
}

export default Organization;
