const buttonData = [
  {
    groupTitle: "Text preprocessing",
    buttons: [
      { text: "To lowercase", disabled: false },
      { text: "Remove punctuation", disabled: false },
      { text: "Lemmatization", disabled: false },
      { text: "Porter Stemmer", disabled: false },
    ],
  },
  {
    groupTitle: "Text tokenization",
    buttons: [
      { text: "By whitespace", disabled: false },
      { text: "Treebank Word Tokenizer", disabled: true },
      { text: "Byte-Pair Encoding (BPE)", disabled: true },
    ],
  },
  {
    groupTitle: "Basic text processing",
    buttons: [
      {
        text: "Parts-of-Speech (POS) Tagging",
        disabled: false,
      },
      {
        text: "Named Entity Recognition (NER)",
        disabled: false,
      },
      { text: "Vectorization (Word2Vec)", disabled: true },
      { text: "Topic analysis", disabled: true },
      { text: "Edit distance", disabled: true },
      { text: "Full-text search", disabled: true },
      { text: "Sentiment analysis", disabled: true },
    ],
  },
  {
    groupTitle: "Language modelling",
    buttons: [{ text: "Summarization", disabled: true }],
  },
];
export { buttonData };
