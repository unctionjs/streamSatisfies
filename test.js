/* eslint-disable no-magic-numbers, flowtype/require-variable-type */
import {test} from "tap";
import {of} from "most";
import {from} from "most";
import {merge} from "most";

import streamSatisfies from "./index";

test("String diagram", ({equal, doesNotThrow, end}) => {
  const left = of("a");
  const right = of("b");

  streamSatisfies(
    "'b'---'a'---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size);

      end();
    }
  )(
    merge(right, left)
  );
});

test("String diagram", ({equal, doesNotThrow, end}) => {
  const left = of(1);
  const right = of(2);

  streamSatisfies(
    "2---1---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size);

      end();
    }
  )(
    merge(right, left)
  );
});

test("String diagram", ({same, equal, doesNotThrow, end}) => {
  const left = of({aaa: "aaa"});
  const right = of({bbb: "bbb"});

  streamSatisfies(
    "{bbb: \"bbb\"}---{aaa: \"aaa\"}---|"
  )(
    (given) => (expected) => same(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size);

      end();
    }
  )(
    merge(right, left)
  );
});

test("String diagram", ({equal, doesNotThrow, end}) => {
  const left = of("a");
  const right = of("b");

  streamSatisfies(
    "'b'---'a'--->"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size);

      end();
    }
  )(
    merge(right, left)
  );
});

test("Array diagram", ({equal, doesNotThrow, end}) => {
  const left = of("a");
  const right = of("b");

  streamSatisfies(
    ["b", "a"]
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size);

      end();
    }
  )(
    merge(right, left)
  );
});

test("Array diagram", ({equal, doesNotThrow, end}) => {
  const left = of(1);
  const right = of(2);

  streamSatisfies(
    [2, 1]
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size);

      end();
    }
  )(
    merge(right, left)
  );
});

test("Array diagram", ({same, equal, doesNotThrow, end}) => {
  const left = of({aaa: "aaa"});
  const right = of({bbb: "bbb"});

  streamSatisfies(
    [{bbb: "bbb"}, {aaa: "aaa"}]
  )(
    (given) => (expected) => same(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size);

      end();
    }
  )(
    merge(right, left)
  );
});


test("Array diagram with error", ({equal, match, end}) => {
  const stream = from([
    {unction: () => true},
    {unction: () => true},
    null,
  ])
    .map((object) => object.unction());

  streamSatisfies(
    [true, true]
  )(
    (given) => (expected) => equal(given, expected)
  )(
    (exception) => {
      match(exception, TypeError);
      end();
    }
  )(
    ({length}) => (size) => {
      equal(length, size);

      end();
    }
  )(
    stream
  );
});
