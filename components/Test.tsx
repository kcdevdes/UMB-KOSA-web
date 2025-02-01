import firestore from '../firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

export default function Home() {
  const [value, setValue] = useState<string>('');

  const onClickUpLoadButton = async () => {
    await addDoc(collection(firestore, `temp`), {
      value,
    });
  };

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <input onChange={(event) => setValue(event.target.value)} />
        <button onClick={onClickUpLoadButton}>전송</button>
      </form>
    </div>
  );
}
