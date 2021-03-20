import lessons from './_lessons.js';

const lookup = new Map();
lessons.forEach((lesson) => {
  lookup.set(lesson.lessonNumber, JSON.stringify(lesson));
});

export function get(req, res, next) {
  const { lesson } = req.params;

  console.log(req.params);

  if (lookup.has(lesson)) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(lookup.get(lesson));
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });
    res.end(
      JSON.stringify({
        message: `Not found`,
      })
    );
  }
}
