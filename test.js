/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import {test} from "tap"
import xstream from "xstream"
import mergeRight from "@unction/mergeright"

import streamSatisfies from "./"

test(({equal, end}) => {
  const left = xstream.of("a")
  const right = xstream.of("b")

  streamSatisfies(
    "b---a---|"
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
    "b---a--->"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    () => () => end()
  )(
    mergeRight(left)(right)
  )
})
