/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type, no-magic-numbers */
import {test} from "tap"
import xstream from "xstream"
import mergeRight from "@unction/mergeright"

import streamSatisfies from "./index"

test(({equal, end}) => {
  const left = xstream.of("a")
  const right = xstream.of("b")

  streamSatisfies(
    "'b'--'a'--|"
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
    "2--1--|"
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
    "{bbb: \"bbb\"}--{aaa: \"aaa\"}--|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    () => () => end()
  )(
    mergeRight(left)(right)
  )
})

test(({equal, end}) => {
  const left = xstream.of("a")
  const right = xstream.of("b")

  streamSatisfies(
    "'b'--'a'-->"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    () => () => end()
  )(
    mergeRight(left)(right)
  )
})
