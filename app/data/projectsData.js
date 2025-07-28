import { ref, get } from 'firebase/database';
import { database } from '../lib/firebase';

export async function getProjectById(id) {
  const snapshot = await get(ref(database, `projects/${id}`));
  return snapshot.exists() ? snapshot.val() : null;
}
