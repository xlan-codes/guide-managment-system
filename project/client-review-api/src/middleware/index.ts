import { handleBodyRequestParsing, handleCompression, handleCors, handleHelmet, handleMorgan  } from "./common";

export default [handleHelmet, handleCors, handleBodyRequestParsing, handleCompression, handleMorgan];