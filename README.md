# @unction/streamSatisfies

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> string => (mixed => mixed => boolean) => (string => position => any | any => any) => StreamType => any


Takes a marble string, an assertion, a final state callback, and a stream so that you can assert in tests how a stream will function. Each marble should be deliniated by a `"---"` notation. If the last marble node is a "|" then it will make sure the stream has ended. Each "marble" will be evaluated before being compared.

``` javascript
test(({equal, end}) => {
  const left = xstream.of("a")
  const right = xstream.of("b")

  streamSatisfies(
    "'b'---'a'---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    () => () => end()
  )(
    mergeRight(left)(right)
  )
})

test(({equal, end}) => {
  const left = xstream.of(1)
  const right = xstream.of(2)

  streamSatisfies(
    "2---1---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    () => () => end()
  )(
    mergeRight(left)(right)
  )
})

test(({equal, end}) => {
  const left = xstream.of({aaa: "aaa"})
  const right = xstream.of({bbb: "bbb"})

  streamSatisfies(
    "{bbb: 'bbb'}--{aaa: 'aaa'}--|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    () => () => end()
  )(
    mergeRight(left)(right)
  )
})
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/streamSatisfies.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/streamSatisfies.svg?maxAge=2592000&style=flat-square
