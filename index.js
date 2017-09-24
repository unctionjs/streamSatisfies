/* eslint-disable immutable/no-let, no-magic-numbers, no-eval */

import split from "@unction/split"
import initial from "@unction/initial"
import last from "@unction/last"
import mapValues from "@unction/mapvalues"

export default function streamSatisfies (example: string): Function {
  const marbles = split("--")(example)
  const expectation = mapValues(eval)(initial(marbles))
  const isCompletable = last(marbles) === "|"

  return function streamSatisfiesExample (assertion: mixed => mixed => boolean): Function {
    return function streamSatisfiesExampleAssertion (finishing: string => number => any | Function): Function {
      return function streamSatisfiesExampleAssertionFinishing (stream: StreamType): any {
        let position = 0

        return stream.addListener({
          next (value: mixed) {
            assertion(value)(expectation[position])


            position += 1
          },
          complete (): any {
            if (isCompletable) {
              return finishing(expectation)(position)
            }

            return finishing(expectation)(position)
          },
        })
      }
    }
  }
}
