import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  query,
  onSnapshot,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { fbAuth, fbStore } from "../firebase";

const FBContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [aLvl, setALvl] = useState(0);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(fbAuth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(fbAuth, email, password);
  };

  const logout = () => {
    return signOut(fbAuth);
  };

  useEffect(() => {
    onAuthStateChanged(fbAuth, async (currentUser) => {
      if (!currentUser) {
        setALvl(0);
      } else {
        const tokenResult = await currentUser.getIdTokenResult();
        if (tokenResult != null) {
          console.log({ aLvl: tokenResult.claims.aLvl });
          setALvl(tokenResult.claims.aLvl);
        } else {
          setALvl(0);
        }
      }
    });
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fbAuth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getALevel = () => {
    return aLvl;
  };

  // FIRESTORE FUNCTIONS

  const [snapshot, setSnapshot] = useState({ ids: [] });
  const [snapshotDate, setSnapshotDate] = useState(
    new Date().toISOString().substring(0, 10),
  );
  const today = new Date().toISOString().substring(0, 10);

  useEffect(() => {
    const q = query(doc(fbStore, "notes", snapshotDate));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.exists()) {
        setSnapshot({
          ...snapshot.data(),
          ids: Object.keys(snapshot.data()).sort(),
        });
      } else {
        setSnapshot({ ids: [] });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [snapshotDate]);

  const getTodaysReleaseNotes = () => {
    return snapshot.notes;
  };

  const addNewNote = async (newNote) => {
    let snapshot = await getDoc(doc(fbStore, "notes", today));
    let snapshotData;
    let ret;
    if (snapshot.exists()) {
      snapshotData = snapshot.data();
      let id = newNote.id;
      while (Object.keys(snapshotData).includes(id)) {
        id = uuidv4();
      }
      let snapshotUpdate = {};
      snapshotUpdate[id] = newNote;
      snapshotUpdate[id].id = id;
      ret = await updateDoc(doc(fbStore, "notes", today), snapshotUpdate);
    } else {
      snapshotData = {};
      let id = newNote.id;
      snapshotData[id] = newNote;
      ret = await setDoc(doc(fbStore, "notes", today), snapshotData);
    }

    return ret;
  };

  const updateReleaseNote = (note) => {
    updateDoc(doc(fbStore, "notes", snapshotDate), note);
  };

  const bulkImport = async (data, date) => {
    console.log(data);
    return await setDoc(doc(fbStore, "notes", date), data);
  };

  const checkExistance = async (date) => {
    const ufDate = new Date(date);
    const fdate = ufDate.toISOString().substring(0, 10);

    let docSnap = await getDoc(doc(fbStore, "notes", fdate));

    return docSnap.exists();
  };

  return (
    <FBContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,
        getALevel,
        addNewNote,
        snapshot,
        getTodaysReleaseNotes,
        updateReleaseNote,
        bulkImport,
        checkExistance,
        snapshotDate,
        setSnapshotDate,
      }}
    >
      {children}
    </FBContext.Provider>
  );
};

export const FirebaseContext = () => {
  return useContext(FBContext);
};
