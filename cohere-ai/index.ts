//Make it eventually have two constructors and either pass in 3 or 5 arguments 3 would be generate 5 wouold be the summary witht the options
import axios, { AxiosResponse } from "axios";

interface Generation {
  id: string;
  text: string;
}

interface CohereResponse {
  id: string;
  generations: Generation[];
  prompt: string;
  meta: {
    api_version: {
      version: string;
    };
  };
}

export class Cohere {
  private apiKey: string;
  private text: string;

  constructor(apiKey: string, text: string) {
    this.apiKey = apiKey;
    this.text = text;
  }

  get options() {
    return {
      method: "POST",
      url: "https://api.cohere.ai/v1/generate",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${this.apiKey}`,
      },
      data: {
        //This right here is pretty important
        max_tokens: 50,
        return_likelihoods: "NONE",
        //It does truncate it so tell me if you would rather it throw an error?
        truncate: "END",
        prompt: this.text,
      },
    };
  }

  //Generate text
  public generateText() {
    axios
      .request<CohereResponse>(this.options)
      .then((response: AxiosResponse<CohereResponse>) => {
        const generatedText = response.data.generations[0].text;
        console.log(generatedText);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  //Summarize the text (Greater than 250 characters)
  public async summarize(
    model: string = "summarize-xlarge",
    length: string = "medium",
    extractiveness: string = "medium"
  ) {
    try {
      const response = await axios.post(
        //Make sure this is indeed the correct url chatgpt generated it
        "https://api.cohere.ai/summarize",
        {
          text: this.text,
          model: model,
          length: length,
          extractiveness: extractiveness,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const summary = response.data.summary;
      console.log(summary);
    } catch (error) {
      console.error("Error summarizing the text:", error);
    }
  }
}
