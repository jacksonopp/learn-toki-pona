<script context="module" lang="ts">
  export async function preload({ params }): Promise<any> {
    const res = await this.fetch(`course/${params.lesson}.json`);
    const data = await res.json();
    return { lesson: data, params };
  }
</script>

<script lang="ts">
  import Mcq from '../../components/Mcq.svelte';

  export let lesson: any;
  export let params: any;

  let hasQuizStarted = false;

  let guesses = {
    total: 0,
    correct: 0,
    incorrect: 0,
  };

  function getNextLesson(): number {
    return parseInt(params.lesson) + 1;
  }

  function handleAnswer(event): void {
    console.log('bing');
    const correct = event.detail.correct;
    if (correct) {
      guesses.correct++;
    } else {
      guesses.incorrect++;
    }

    console.log(guesses);
  }

  function handleNext(): void {
    guesses.total++;
  }

  function handleLessonQuizChange(): void {
    hasQuizStarted = !hasQuizStarted;
  }

  function resetQuiz(): void {
    guesses.total = 0;
    guesses.incorrect = 0;
    guesses.correct = 0;
    handleLessonQuizChange()
  }
</script>

{#if !hasQuizStarted}
  <!-- content here -->
  <div>
    <h1>Lesson {params.lesson}</h1>
    <h2>{lesson.title}</h2>
    <table>
      <thead>
        <tr>
          <td>word</td>
          <td>meaning</td>
        </tr>
      </thead>
      <tbody>
        {#each lesson.words as word}
          <tr>
            <td>{word.word}</td>
            <td>{word.meaning}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <button on:click={handleLessonQuizChange}>Start Quiz</button>
{:else}
  <!-- else content here -->
  <p>Questions answered: {guesses.total}</p>
  <p>Questions correct: {guesses.correct}</p>
  <p>Questions incorrect: {guesses.incorrect}</p>
  <div class="question">
    <button on:click={resetQuiz}>&larr; Go back to lesson</button>
    <Mcq {lesson} on:answer={handleAnswer} on:next={handleNext} />
  </div>
  {#if guesses.total > 4}
    <!-- content here -->
    <a href="course/{getNextLesson()}">Next lesson</a>
  {/if}
{/if}

<style type="text/scss">
  table {
    table-layout: fixed;
    width: 50%;
    border-collapse: collapse;
    border: 1px solid black;

    thead {
      font-weight: bold;
      border-bottom: 1px solid black;
    }

    tr,
    td {
      border: 1px solid black;
    }

    td {
      padding: 2px 5px;
    }
  }

  .question {
    margin: 3rem 0;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    button {
      
    }
  }
</style>
