<script context="module" lang="ts">
  export async function preload({params, query}): any {
    const res = await this.fetch(`course/${params.lesson}.json`);
    const data = await res.json();
    return {lesson: data, params};
  }
</script>

<script lang='ts'>
  import Mcq from '../../components/Mcq.svelte';
  
  export let lesson: any;
  export let params: any

  let guesses = {
    total: 0,
    correct: 0,
    incorrect: 0
  };

  function printLesson(): void {
    console.log({lesson, params});
  }

  function getNextLesson(): number {
    return parseInt(params.lesson) + 1
  }

  function handleAnswer(event): void {
    console.log('bing');
    const correct = event.detail.correct
    if (correct) {
      guesses.correct++
    } else {
      guesses.incorrect++
    }
    
    console.log(guesses);
  }

  function handleNext(): void {
    guesses.total++
  }
</script>
  
<style type='text/scss'>
  table {
    table-layout: fixed;
    width: 50%;
    border-collapse: collapse;
    border: 1px solid black;

    thead {
      font-weight: bold;
      border-bottom: 1px solid black
    }

    tr, td {
      border: 1px solid black;
    }
    
    td {
      padding: 2px 5px;
    }
  }

  .question {
    margin: 3rem 0;
  }
</style>

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

<p>Questions answered: {guesses.total}</p>
<p>Questions correct: {guesses.correct}</p>
<p>Questions incorrect: {guesses.incorrect}</p>
<div class="question">
  <Mcq lesson={lesson} on:answer={handleAnswer} on:next={handleNext}/>
</div>

<button on:click={printLesson}>DEBG: Print data</button>

{#if guesses.total > 4}
   <!-- content here -->
   <a href="course/{getNextLesson()}">Next lesson</a>
{/if}

