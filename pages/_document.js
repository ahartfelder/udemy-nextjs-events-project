const {
  default: Document,
  Html,
  Head,
  Main,
  NextScript,
} = require("next/document");

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
