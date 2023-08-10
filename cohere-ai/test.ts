import { Cohere } from "./index";

const cohere = new Cohere(
  "ntXqcgfwqzSMSHzspSYwpQrhJFg7LBawSzdyQWt9",
  "Joe went to the store. Joe bought bob a carton of milk. Bob chugged the whole carton of milk in one second. He then had diarreah from the carton of milk. Joe laughed at him. Bob learned never to chug milk from Joe. Bob then bought Joe a gallon milk. Joe left the country",
  true
);
cohere.main();
