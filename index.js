/* eslint-disable immutable/no-let, no-magic-numbers, no-eval, flowtype/require-variable-type */

export default function streamSatisfies (example: string | $ReadOnlyArray<mixed>): UnaryFunctionType {
  return function streamSatisfiesExample (assertion: mixed => mixed => boolean): UnaryFunctionType {
    return function streamSatisfiesExampleAssertion (failure: mixed => mixed): UnaryFunctionType {
      return function streamSatisfiesExampleFailureAssertion (finishing: string => number => mixed): UnaryFunctionType {
        return function streamSatisfiesExampleFailureAssertionFinishing (stream: StreamType): UnaryFunctionType {
          const marbles = example instanceof Array ? example : example.split("---")
          const expectation = example instanceof Array ? marbles : Reflect.apply(Array.prototype.slice, marbles, [0, -1]).map((source: string): mixed => eval(`(${source})`))
          const isCompletable = example instanceof Array ? true : marbles[marbles.length - 1] === "|"
          let position = 0

          return stream.subscribe({
            next (value: mixed) {
              assertion(value)(expectation[position])

              position += 1
            },
            error (exception: Error) {
              failure(exception)
            },
            complete () {
              if (isCompletable) {
                finishing(expectation)(position)
              } else {
                finishing(expectation)(position)
              }
            },
          })
        }
      }
    }
  }
}
