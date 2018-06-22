/**
 * @module Models
 *
 */
import Model from '../utils/model';
import attr from '../utils/attr';
import { ALLOWED_TYPES } from '../utils/define-api';

class Member extends Model {
  static primaryKey = 'id';
  static filterKeys = ['username', 'firstName', 'lastName', 'email', 'memberNumber'];
  static foreignKeys = ['positionId', 'organizationId', 'memberGroupId'];

  static methodsAllowed = Object.values(ALLOWED_TYPES);

  static properties = {
    id: attr('string'),
    username: attr('string'),
    password: attr('string'),
    firstName: attr('string'),
    lastName: attr('string'),
    email: attr('string'),
    image: attr('string'),
    imageUrl: attr('string'),
    imageThumbUrl: attr('string'),
    organizationId: attr('string'),
    memberGroupId: attr('string'),
    positionId: attr('string'),
    memberNumber: attr('string'),
    phone: attr('string'),
    verifiedEmail: attr('boolean'),
    emailVerificationRequired: attr('boolean'),
    usernameUnique: attr('boolean'),
    archivedOn: attr('int'),
    createdOn: attr('int'),
    updatedOn: attr('int'),
    deletedOn: attr('int'),
    sendEmail: attr('boolean'),
    sendText: attr('boolean'),
  };
}

export default Member;
