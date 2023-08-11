//One important thing is that on older commits I had interfaces for response objects
//It slowed me down and I already have error handling so I didn't really get point
//If it is important I'm more than happy to refer back

import axios, { AxiosResponse } from "axios";

// Cohere class definition
export class Cohere {
  private apiKey: string;
  private text: string;

  // Constructor for the Cohere class
  constructor(apiKey: string, text: string) {
    this.apiKey = apiKey;
    this.text = text;
  }

  // Method to generate text
  public generateText() {
    const options = {
      method: "POST",
      url: "https://api.cohere.ai/v1/generate",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${this.apiKey}`,
      },
      data: {
        //This has a big impact the truncating and max_tokens
        max_tokens: 50,
        return_likelihoods: "NONE",
        truncate: "END",
        prompt: this.text,
      },
    };

    axios
      .request(options)
      .then((response: AxiosResponse) => {
        const generatedText = response.data.generations[0].text;
        console.log(generatedText);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  // Method to summarize text
  public summarize(
    model: string = "summarize-xlarge",
    length: string = "medium",
    extractiveness: string = "medium"
  ) {
    const options = {
      method: "POST",
      url: "https://api.cohere.ai/summarize",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      data: {
        text: this.text,
        model,
        length,
        extractiveness,
      },
    };

    axios
      .request(options)
      .then((response: AxiosResponse) => {
        const summary = response.data.summary;
        console.log(summary);
      })
      .catch((error: any) => {
        console.error("Error summarizing the text:", error);
      });
  }
}
