import { Cohere } from "./index";

const cohere = new Cohere("ntXqcgfwqzSMSHzspSYwpQrhJFg7LBawSzdyQWt9");

const testPrompt: string =
  "Joe went to the store. Joe bought bob a carton of milk. Bob chugged the whole carton of milk in one second. He then had diarreah from the carton of milk. Joe laughed at him. Bob learned never to chug milk from Joe. Bob then bought Joe a gallon milk. Joe left the country. What is the lesson of this story?";
//Because it's async it's not gaurenteed what order it will return stuff in
cohere.generateText(testPrompt);
cohere.summarize("summarize-xlarge", "medium", "medium", testPrompt);
//cohere.summarize()
//spanish testing!
const spanishPrompt: string = "¿Quién es el conejito malo?";
//Spanish Prompt: Who is bad bunny?
cohere.generateText(spanishPrompt);
cohere.generateText(spanishPrompt + " respond in Spanish");
cohere.generateText(spanishPrompt + "responder en español");
