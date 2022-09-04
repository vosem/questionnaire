import React, { FormEvent,  useRef } from 'react';

import config from '../db.json';
import styles from './styles.module.scss';
import {Question} from "./types";

type Props = {
  data: Array<Question>;
}

const AskWidget = ({ data }: Props): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const handleQuestioning = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const question = inputRef.current?.value ?? '';

    if (ulRef.current !== null) ulRef.current.innerHTML = '';
    if (ulRef.current === null || !Boolean(question)) return;

    for (const item in data) {
      if (data[item].question.toLowerCase() === question.toLowerCase()) {
        for (const answer in data[item].answer) {
          const li = document.createElement('li');

          li.innerHTML = data[item].answer[answer];
          ulRef.current.appendChild(li);
        }
        return;
      }
    }

    const li = document.createElement('li');

    li.innerHTML = config.defaultAnswer;
    ulRef.current.appendChild(li);
  }

  return (
      <div className={styles.Wrapper}>
        <form
          className={styles.Form}
          onSubmit={(e) => handleQuestioning(e)}
        >
          <input
            type="text"
            ref={inputRef}
            className={styles.Input}
            name="ask-question"
            data-testid="ask-question"
            placeholder="Question?"
            maxLength={255}
          />
          <button>Ask question</button>
        </form>
        <ul className={styles.Ul} ref={ulRef} />
      </div>
  );
};

export default AskWidget;
