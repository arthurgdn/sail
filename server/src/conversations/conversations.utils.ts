import { User } from 'src/auth/user.schema';

export const computeTitle = (members: User[], user: User): string => {
  let title = '';
  for (const member of members) {
    if (member.tag !== user.tag) {
      title += ' ' + member.username + ',';
    }
  }
  return title.slice(0, title.length - 2);
};
