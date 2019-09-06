/* eslint-disable no-magic-numbers, flowtype/require-variable-type */
import { of } from "most";
import {from} from "most";
import {merge} from "most";

import streamSatisfies from "./index";

test("String diagram", done => {
  const left = of("a");
  const right = of("b");

  streamSatisfies(
    "'b'---'a'---|"
  )(
    (given) => (expected) => expect(given).toBe(expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      expect(length).toBe(size);

      done();
    }
  )(
    merge(right, left)
  );
});

test("String diagram", done => {
  const left = of(1);
  const right = of(2);

  streamSatisfies(
    "2---1---|"
  )(
    (given) => (expected) => expect(given).toBe(expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      expect(length).toBe(size);

      done();
    }
  )(
    merge(right, left)
  );
});

test("String diagram", done => {
  const left = of({aaa: "aaa"});
  const right = of({bbb: "bbb"});

  streamSatisfies(
    "{bbb: \"bbb\"}---{aaa: \"aaa\"}---|"
  )(
    (given) => (expected) => expect(given).toEqual(expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      expect(length).toBe(size);

      done();
    }
  )(
    merge(right, left)
  );
});

test("String diagram", done => {
  const left = of("a");
  const right = of("b");

  streamSatisfies(
    "'b'---'a'--->"
  )(
    (given) => (expected) => expect(given).toBe(expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      expect(length).toBe(size);

      done();
    }
  )(
    merge(right, left)
  );
});

test("Array diagram", done => {
  const left = of("a");
  const right = of("b");

  streamSatisfies(
    ["b", "a"]
  )(
    (given) => (expected) => expect(given).toBe(expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      expect(length).toBe(size);

      done();
    }
  )(
    merge(right, left)
  );
});

test("Array diagram", done => {
  const left = of(1);
  const right = of(2);

  streamSatisfies(
    [2, 1]
  )(
    (given) => (expected) => expect(given).toBe(expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      expect(length).toBe(size);

      done();
    }
  )(
    merge(right, left)
  );
});

test("Array diagram", done => {
  const left = of({aaa: "aaa"});
  const right = of({bbb: "bbb"});

  streamSatisfies(
    [{bbb: "bbb"}, {aaa: "aaa"}]
  )(
    (given) => (expected) => expect(given).toEqual(expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      expect(length).toBe(size);

      done();
    }
  )(
    merge(right, left)
  );
});


test("Array diagram with error", done => {
  const stream = from([
    {unction: () => true},
    {unction: () => true},
    null,
  ])
    .map((object) => object.unction());

  streamSatisfies(
    [true, true]
  )(
    (given) => (expected) => expect(given).toBe(expected)
  )(
    (exception) => {
      t.match(exception, TypeError);
      done();
    }
  )(
    ({length}) => (size) => {
      expect(length).toBe(size);

      done();
    }
  )(
    stream
  );
});
