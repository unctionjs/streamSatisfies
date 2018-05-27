/* eslint-disable immutable/no-let, no-magic-numbers, no-eval, flowtype/require-variable-type */
export default function streamSatisfies(example) {
  return function streamSatisfiesExample(assertion) {
    return function streamSatisfiesExampleAssertion(failure) {
      return function streamSatisfiesExampleFailureAssertion(finishing) {
        return function streamSatisfiesExampleFailureAssertionFinishing(stream) {
          const marbles = example instanceof Array ? example : example.split("---");
          const expectation = example instanceof Array ? marbles : Reflect.apply(Array.prototype.slice, marbles, [0, -1]).map(source => eval(`(${source})`));
          const isCompletable = example instanceof Array ? true : marbles[marbles.length - 1] === "|";
          let position = 0;
          return stream.subscribe({
            next(value) {
              assertion(value)(expectation[position]);
              position += 1;
            },

            error(exception) {
              failure(exception);
            },

            complete() {
              if (isCompletable) {
                finishing(expectation)(position);
              } else {
                finishing(expectation)(position);
              }
            }

          });
        };
      };
    };
  };
}
