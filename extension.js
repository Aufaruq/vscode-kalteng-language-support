"use strict"
const vscode = require("vscode")

/**
 *
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  vscode.languages.registerDocumentFormattingEditProvider("kalteng", {
    provideDocumentFormattingEdits(document) {
      // Indentation formatter
      const increaseIndentMatch =
        /(tikamHalus$|amunsik$|yaudaham$|mencoba dolo$|ulihbalik|amun|munhandak|amunsik|kepikiran|jadigasan)/
      const decreaseIndentMatch =
        /(tikamHalus$|udaham$|munhandak|amunsik$|yaudaham|sesudaham)/
      const cmd = []
      let indent = 0
      for (let i = 0; i < document.lineCount; i++) {
        const doc = document.lineAt(i)
        if (doc.text.match(decreaseIndentMatch))
          indent = indent > 0 ? indent - 1 : indent
        cmd.push(
          vscode.TextEdit.replace(
            doc.range,
            doc.text.replace(
              /^\s*/g,
              [...Array(indent)].map(() => "\t").join("")
            )
          )
        )
        if (doc.text.match(increaseIndentMatch)) indent++
      }
      return cmd
    },
  })
}

module.exports = { activate }
