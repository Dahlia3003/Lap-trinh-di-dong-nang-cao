import Realm from 'realm';

class Account extends Realm.Object {}
Account.schema = {
  name: 'Account',
  properties: {
    id: 'int',
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    pictureUrl: 'string',
    token: 'string',
  },
  primaryKey: 'id',
};

export default new Realm({ schema: [Account] });