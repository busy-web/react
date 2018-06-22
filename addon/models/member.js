/**
 * @module Models
 *
 */
import Model from '../utils/model';
import attr from '../utils/attr';
import { FIND, FILTER, CREATE, UPDATE } from '../utils/define-api';

class Member extends Model {
  static methodsAllowed = [ FIND, FILTER, CREATE, UPDATE ];

  static properties = {
    id: attr('string', { primaryKey: true }),

    organizationId: attr('string', { foreignKey: true }),
    memberGroupId: attr('string', { foreignKey: true }),
    positionId: attr('string', { foreignKey: true }),

    username: attr('string', { filter: true }),
    firstName: attr('string', { filter: true }),
    lastName: attr('string', { filter: true }),
    email: attr('string', { filter: true }),
    memberNumber: attr('string', { filter: true }),

    imageUrl: attr('string'),
    imageThumbUrl: attr('string'),
    password: attr('string'),
    phone: attr('string'),
    usernameUnique: attr('boolean'),
    verifiedEmail: attr('boolean'),
    emailVerificationRequired: attr('boolean'),
    sendEmail: attr('boolean'),
    sendText: attr('boolean'),

    archivedOn: attr('int', { filter: true }),
    updatedOn: attr('int', { filter: true }),
    createdOn: attr('int'),
    deletedOn: attr('int'),
  };
}

export default Member;
