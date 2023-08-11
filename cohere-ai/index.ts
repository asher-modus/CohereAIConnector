//Decided not to use interfaces for ai response objects... I can if you want me to

import axios, { AxiosResponse } from "axios";

// Cohere class definition
export class Cohere {
  private apiKey: string;

  // Constructor for the Cohere class
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Method to generate text
  public generateText(text: string) {
    if (text.trim().length === 0) {
      throw new Error("Empty string input");
    }
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
        max_tokens: 1000,
        return_likelihoods: "NONE",
        truncate: "END",
        prompt: text,
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
    extractiveness: string = "medium",
    text: string
  ) {
    if (text.trim().length === 0) {
      throw new Error("Empty string input");
    }
    const options = {
      method: "POST",
      url: "https://api.cohere.ai/summarize",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      data: {
        text: text,
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
