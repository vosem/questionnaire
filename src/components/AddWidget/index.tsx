import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';

import { Question } from './types';

import styles from './styles.module.scss';

type Props = {
  data: Array<Question>;
  setData: (value: Array<Question>) => void;
}

const AddWidget = ({ data, setData }: Props): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const regex = new RegExp(/^(.{0,254})$|^(.{0,254})(\?)(.{0,255})$/);

    if (value.match(regex)) {
      setValue(value);
    }
  };

  const handleAdding = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const inputValue = inputRef.current?.value ?? '';

    if (!Boolean(inputValue)) {
      alert("Please enter your question and answer.");

      return;
    }

    const regex = new RegExp(/^.*?\?/);
    const answerRegex = new RegExp(/(")(.)*?\1/g);
    const questionPart = inputValue.match(regex) ?? [];
    const question = questionPart[0] ?? '';

    const answer = inputValue
      .replace(regex, '')
      .trim();

    const answers = answer
        .match(answerRegex)
        ?.map(item => item.slice(1, item.length - 1))
        ?.filter(item => Boolean(item))
        ?? [];

    // restrictions
    const isAnswerCorrect = answer.length <= 255;
    const containsAnswers = answers.length > 0;
    const isQuestionCorrect = Boolean(question) && question.length <= 255;

    if (!isAnswerCorrect || !containsAnswers || !isQuestionCorrect) {
      alert('Please enter question and answer in a valid form.')

      return;
    }

    for (const item in data) {
      if (data[item].question.toLowerCase() === question.toLowerCase()) {
        alert('The question already exists.')

        return;
      }
    }

    const dataCopy = [...data];

    dataCopy.push({
      question,
      answer: answers,
    });

    setData(dataCopy);

    if (inputRef.current) inputRef.current.value = '';

    alert("New question is successfully added.");
  }

  return (
      <div className={styles.Wrapper}>
        <form
          className={styles.Form}
          onSubmit={(e) => handleAdding(e)}
        >
          <input
            type="text"
            ref={inputRef}
            className={styles.Input}
            name="add-question"
            data-testid="add-question"
            maxLength={255}
            onChange={(event) => changeHandler(event)}
            value={value}
            placeholder="Question? “Answer1” “Answer2” “AnswerX”"
          />
          <button>Add question</button>
        </form>
      </div>
  );
};

export default AddWidget;
