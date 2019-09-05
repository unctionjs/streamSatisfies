import {TextType} from "./types";
import {MapperFunctionType} from "./types";
import {PredicateFunctionType} from "./types";

type StreamSubscriptionType<A> = {
  next: (value: A) => void,
  error: (exception: unknown) => void,
  complete: () => void,
}
type StreamType<A> = {
  subscribe: (subscription: StreamSubscriptionType<A>) => void
}

/* eslint-disable no-magic-numbers, no-eval */
export default function streamSatisfies<A, B, C, D> (example: TextType | Array<A | string>) {
  return function streamSatisfiesExample (assertion: MapperFunctionType<B, PredicateFunctionType<A | string>>) {
    return function streamSatisfiesExampleAssertion (failure: MapperFunctionType<unknown, C>) {
      return function streamSatisfiesExampleFailureAssertion (finishing: MapperFunctionType<Array<A | string>, MapperFunctionType<number, D>>) {
        return function streamSatisfiesExampleFailureAssertionFinishing (stream: StreamType<B>): any {
          const marbles: Array<A | string> = typeof example === "string" ? example.split("---").slice(0, -1)
            .map((source: TextType) => eval(`(${source})`)) : example;
          const isCompletable: boolean = typeof example === "string" && marbles[marbles.length - 1] === "|";

          let position = 0;

          return stream.subscribe({
            next (value: B) {
              assertion(value)(marbles[position]);
              position += 1;
            },

            error (exception) {
              failure(exception);
            },

            complete () {
              if (isCompletable) {
                finishing(marbles)(position);
              } else {
                finishing(marbles)(position);
              }
            },
          });
        };
      };
    };
  };
}
