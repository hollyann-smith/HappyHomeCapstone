import { deleteSingleChore, getSingleChore } from './choreData';
import { deleteSingleMember, getMemberChores, getSingleMember } from './memberData';

const viewChoreDetails = (choreFirebaseKey) => new Promise((resolve, reject) => {
  getSingleChore(choreFirebaseKey)
    .then((choreObject) => {
      getSingleMember(choreObject?.member_id)
        .then((memberObject) => {
          resolve({ choreObject, ...memberObject });
          console.warn(choreObject, 'choreobject');
          console.warn(memberObject, 'memberobject');
        });
    }).catch((error) => reject(error));
});

const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleMember(memberFirebaseKey), getMemberChores(memberFirebaseKey)])
    .then(([memberObject, memberchoresArray]) => {
      resolve({ ...memberObject, chores: memberchoresArray });
    }).catch((error) => reject(error));
});

const deletememberchores = (memberId) => new Promise((resolve, reject) => {
  getMemberChores(memberId).then((choresArray) => {
    console.warn(choresArray, 'member chores');
    const deleteChorePromises = choresArray.map((chore) => deleteSingleChore(chore.firebaseKey));

    Promise.all(deleteChorePromises).then(() => {
      deleteSingleMember(memberId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewChoreDetails, viewMemberDetails, deletememberchores,
};
