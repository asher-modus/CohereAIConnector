//Eventually have you just pass in a summary true false boolean variable to determine which method to apply
//We can make both the generatetext and summary methods private
//Have one public method that decides

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
  private summary: boolean;

  constructor(apiKey: string, text: string, summary: boolean) {
    this.apiKey = apiKey;
    this.text = text;
    this.summary = summary;
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
        max_tokens: 20,
        return_likelihoods: "NONE",
        truncate: "END",
        prompt: this.text,
      },
    };
  }

  //Generate text
  private generateText() {
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
  private summarize() {}

  public main() {
    if (this.summary) {
    } else {
      this.generateText();
    }
  }
}
