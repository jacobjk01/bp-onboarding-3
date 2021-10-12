import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";



export default function Home() {
  const db = firebase.firestore();
  const [user, loading, error]= useAuthState(firebase.auth());
  const [votes, votesLoading, votesError] = useCollection(
    db.collection("votes"),
    {}
  );

  if (!votesLoading && votes) {
    votes.docs.map((doc) => console.log(doc.data()));
  }

  console.log("Loading:", loading, "|", "Current user:", user);

  const addVoteDocument = async (vote: string) => {
    await db.collection("votes").doc(user.uid).set({
      vote,
    })
  }

  type VoteDocument = {
    vote: string;
  }

  return (
    <div className={styles['container']}>
      <h1>Is Jacob the Coolest?</h1>
      <div className={styles['top-row']}>
        <button className={styles['button-left']} onClick={() => addVoteDocument("no")}>
          Jacob is not the Coolest
        </button>
        <h3>
          Not Coolest:{" "}
          {
            votes?.docs?.filter(
              (doc) => (doc.data() as VoteDocument).vote === "no"
            ).length
          }
        </h3>
      </div>
      <div className={styles['bottom-row']}>
        <button className={styles['button-right']} onClick={() => addVoteDocument("yes")}>
          Jacob is the Coolest
        </button>
        <h3>
          Coolest:{" "}
          {
            votes?.docs?.filter(
              (doc) => (doc.data() as VoteDocument).vote === "yes"
            ).length
          }
        </h3>
      </div>
    </div>
  )
  
}
