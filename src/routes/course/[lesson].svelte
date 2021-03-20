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

  

  function printLesson(): void {
    console.log({lesson, params});
  }

  function getNextLesson(): number {
    return parseInt(params.lesson) + 1
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

<div class="question">
  <Mcq />
</div>

<button on:click={printLesson}>Print data</button>
<a href="course/{getNextLesson()}">Next lesson</a>
