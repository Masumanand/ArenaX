// Firebase Configuration & Service Pattern
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push } from 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "arenax-demo.firebaseapp.com",
  databaseURL: "https://arenax-demo-default-rtdb.firebaseio.com",
  projectId: "arenax-demo",
  storageBucket: "arenax-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

let db = null;

try {
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    const app = initializeApp(firebaseConfig);
    db = getDatabase(app);
  }
} catch (error) {
  console.warn("Firebase initialization skipped or failed. Using local simulation mode.", error);
}

export { db };

export const syncCheer = (matchId, faction) => {
  if (!db) return;
  const cheerRef = ref(db, `matches/${matchId}/cheers/${faction}`);
  // Mocking the sync for now
  set(cheerRef, { count: Math.random() });
};

export const syncHeatmap = (matchId, point) => {
  if (!db) return;
  const heatmapRef = ref(db, `matches/${matchId}/heatmap`);
  push(heatmapRef, point);
};
