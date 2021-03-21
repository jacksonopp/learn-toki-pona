<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  export let lesson: any;

  const dispatch = createEventDispatcher();

  let question: {
    word: {
      word: string;
      meaning: string;
    };
    wordIndex: number;
    answers: {
      word: string;
      index: number;
    }[];
  };

  let isQuestionAnswered = false;
  let isQuestionCorrect = false;

  onMount(() => generateQuestion());

  function generateQuestion(): void {
    console.log('generating question');
    const { word, wordIndex } = chooseWord();
    console.log('chosen word is:', word.word);
    const answers = generateAnswers(wordIndex);
    console.log('answers are:', answers);
    question = {
      word,
      wordIndex,
      answers,
    };
    console.log('full question:', question);
  }

  function randomIndex(useRecursion?: boolean = false, recursionValue?: number): number {
    let ri = Math.floor(Math.random() * lesson.words.length);

    if (!useRecursion) {
      return ri;
    }

    if (ri !== recursionValue) {
      return ri;
    }

    randomIndex(true, recursionValue);
  }

  function chooseWord(): { word: { word: string; meaning: string }; wordIndex: number } {
    let word: string;

    const wordIndex = randomIndex();

    word = lesson.words[wordIndex];

    return { word, wordIndex };
  }

  function generateAnswers(correctWordIndex: number): { word: string; index: number }[] {
    let answers: { word: string; index: number }[] = [];
    let answerIndexes: number[] = [];

    for (let i = 0; i < lesson.words.length; i++) {
      answerIndexes = [...answerIndexes, i];
    }

    answerIndexes = answerIndexes.filter((number) => number !== correctWordIndex);

    answerIndexes = shuffle(answerIndexes).slice(0, 3);

    answerIndexes = [...answerIndexes, correctWordIndex];

    answerIndexes = shuffle(answerIndexes);

    answerIndexes.forEach((i) => {
      answers = [...answers, { word: lesson.words[i].meaning, index: i }];
    });

    return answers;
  }

  function shuffle(a: unknown[]): number[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function handleAnswerClick(i: number): void {
    isQuestionAnswered = true;
    isQuestionCorrect = i === question.wordIndex;
    console.log(isQuestionCorrect ? 'correct' : 'incorrect');
    dispatch('answer', {
      correct: isQuestionCorrect,
    });
  }

  function resetQuestion(next?: boolean): void {
    isQuestionAnswered = false;
    isQuestionCorrect = false;

    if (next) {
      dispatch('next');
      generateQuestion();
    }
  }
</script>

<div class="question">
  {#if question}
    <p class:correct={isQuestionAnswered && isQuestionCorrect} class:incorrect={isQuestionAnswered && !isQuestionCorrect}>{question.word.word}</p>
    <div class="options">
      {#each question.answers as answer}
        <button on:click={() => handleAnswerClick(answer.index)}>{answer.word}</button>
      {/each}
    </div>
  {/if}
</div>

<div class="mcq-buttons">
  {#if isQuestionAnswered}
    <button on:click={() => resetQuestion(true)}>Next Question</button>
    {#if !isQuestionCorrect}
      <button on:click={() => resetQuestion(false)}>Try Again</button>
    {/if}
  {/if}
</div>

<style type="text/scss">
  .question {
    text-align: center;
    background-color: rebeccapurple;
    padding: 1em;
    border-radius: 4px;
    p {
      color: white;

      &.correct {
        background-color: green;
      }
      &.incorrect {
        background-color: red;
      }
    }
  }
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-wrap: wrap;
    gap: 1em;
  }
  button {
    background-color: salmon;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
  }
</style>
