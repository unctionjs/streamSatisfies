/* eslint-disable immutable/no-let, no-magic-numbers, no-eval, flowtype/require-variable-type */

import split from "@unction/split"
import initial from "@unction/initial"
import last from "@unction/last"
import mapValues from "@unction/mapvalues"

export default function streamSatisfies (example: string | Array<mixed>): UnaryFunctionType {
  return function streamSatisfiesExample (assertion: mixed => mixed => boolean): UnaryFunctionType {
    return function streamSatisfiesExampleAssertion (failure: mixed => mixed): UnaryFunctionType {
      return function streamSatisfiesExampleFailureAssertion (finishing: string => number => mixed): UnaryFunctionType {
        return function streamSatisfiesExampleFailureAssertionFinishing (stream: StreamType) {
          const marbles = example instanceof Array ? example : split("---")(example)
          const expectation = example instanceof Array ? marbles : mapValues((source: string): mixed => eval(`(${source})`))(initial(marbles))
          const isCompletable = example instanceof Array ? true : last(marbles) === "|"
          let position = 0

          stream.addListener({
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
