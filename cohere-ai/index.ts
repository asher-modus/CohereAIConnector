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

  constructor(apiKey: string) {
    this.apiKey = apiKey;
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
        prompt: "Please explain to me how LLMs work",
      },
    };
  }

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
}
