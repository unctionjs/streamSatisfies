/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type, no-magic-numbers, flowtype/require-variable-type */
import {test} from "tap"
import xstream from "xstream"
import mergeRight from "@unction/mergeright"

import streamSatisfies from "./index"

test("String diagram", ({equal, doesNotThrow, end}) => {
  const left = xstream.of("a")
  const right = xstream.of("b")

  streamSatisfies(
    "'b'---'a'---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})

test("String diagram", ({equal, doesNotThrow, end}) => {
  const left = xstream.of(1)
  const right = xstream.of(2)

  streamSatisfies(
    "2---1---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})

test("String diagram", ({same, equal, doesNotThrow, end}) => {
  const left = xstream.of({aaa: "aaa"})
  const right = xstream.of({bbb: "bbb"})

  streamSatisfies(
    "{bbb: \"bbb\"}---{aaa: \"aaa\"}---|"
  )(
    (given) => (expected) => same(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})

test("String diagram", ({equal, doesNotThrow, end}) => {
  const left = xstream.of("a")
  const right = xstream.of("b")

  streamSatisfies(
    "'b'---'a'--->"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})

test("Array diagram", ({equal, doesNotThrow, end}) => {
  const left = xstream.of("a")
  const right = xstream.of("b")

  streamSatisfies(
    ["b", "a"]
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})

test("Array diagram", ({equal, doesNotThrow, end}) => {
  const left = xstream.of(1)
  const right = xstream.of(2)

  streamSatisfies(
    [2, 1]
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})

test("Array diagram", ({same, equal, doesNotThrow, end}) => {
  const left = xstream.of({aaa: "aaa"})
  const right = xstream.of({bbb: "bbb"})

  streamSatisfies(
    [{bbb: "bbb"}, {aaa: "aaa"}]
  )(
    (given) => (expected) => same(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})


test("Array diagram with error", ({equal, match, end}) => {
  const stream = xstream
    .from([
      {unction: () => true},
      {unction: () => true},
      null,
    ])
    .map((object) => object.unction())

  streamSatisfies(
    [true, true]
  )(
    (given) => (expected) => equal(given, expected)
  )(
    (exception) => {
      match(exception, TypeError)
      end()
    }
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    stream
  )
})
