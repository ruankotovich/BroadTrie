{
  "targets": [
    {
      "target_name": "canonicalTrie",
      "cflags": [
        "-fexceptions",
        "-std=c++11"
      ],
      "cflags_cc!": [
        "-fno-exceptions"
      ],
      "sources": [
        "./src/node.cc"
      ]
    }
  ]
}
